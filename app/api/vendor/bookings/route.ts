import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!vendor) return NextResponse.json({ error: 'Not a vendor' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const date = searchParams.get('date')

  let query = supabase
    .from('bookings')
    .select(`
      *,
      customer:profiles(full_name, phone, avatar_url),
      facility:facilities(name),
      slot:facility_slots(name),
      coach_service:coach_services(name)
    `)
    .eq('vendor_id', vendor.id)
    .order('booking_date', { ascending: true })
    .order('start_time', { ascending: true })

  if (status) query = query.eq('status', status)
  if (date) query = query.eq('booking_date', date)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const body = await req.json()
  const { booking_id, status, cancel_reason } = body

  const updateData: Record<string, unknown> = { status }
  if (status === 'confirmed') updateData.confirmed_at = new Date().toISOString()
  if (status === 'cancelled') {
    updateData.cancelled_at = new Date().toISOString()
    updateData.cancel_reason = cancel_reason
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', booking_id)
    .eq('vendor_id', vendor?.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
