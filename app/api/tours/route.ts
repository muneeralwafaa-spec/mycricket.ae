import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendTourRegistrationConfirmation, sendTourAdminNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const body = await req.json()

  const required = ['team_name', 'contact_name', 'contact_email', 'contact_phone', 'direction', 'travel_dates_from', 'travel_dates_to', 'team_size']
  for (const field of required) {
    if (!body[field]) return NextResponse.json({ error: `${field} is required` }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('tours')
    .insert({ ...body, status: 'pending' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const destination = body.direction === 'uae-outbound'
    ? (body.destination_country ?? 'Unspecified')
    : body.emirate_preference ?? 'UAE'

  const dates = `${body.travel_dates_from} to ${body.travel_dates_to}`

  // Send emails (non-blocking)
  Promise.all([
    sendTourRegistrationConfirmation({
      to: body.contact_email,
      teamName: body.team_name,
      contactName: body.contact_name,
      direction: body.direction,
      destination,
      dates,
      teamSize: body.team_size,
    }),
    sendTourAdminNotification({
      teamName: body.team_name,
      contactName: body.contact_name,
      contactEmail: body.contact_email,
      contactPhone: body.contact_phone,
      direction: body.direction,
      destination,
      dates,
      teamSize: body.team_size,
      notes: body.notes,
    }),
  ]).catch(err => console.error('Email error:', err))

  return NextResponse.json({
    data,
    message: 'Tour registration submitted. We will contact you within 48 hours.',
  }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id ?? '').single()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const direction = searchParams.get('direction')
  const status = searchParams.get('status')

  let query = supabase.from('tours').select('*').order('created_at', { ascending: false })
  if (direction) query = query.eq('direction', direction)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
