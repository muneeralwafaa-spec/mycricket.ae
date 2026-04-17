import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  let query = supabase
    .from('bookings')
    .select(`
      *,
      vendor:vendor_profiles(business_name, phone, whatsapp, logo_url),
      facility:facilities(name, address, emirate),
      slot:facility_slots(name),
      coach_service:coach_services(name)
    `)
    .eq('customer_id', user.id)
    .order('booking_date', { ascending: false })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('booking_type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    vendor_id, booking_type, facility_id, slot_id,
    coach_service_id, booking_date, start_time, end_time,
    duration_mins, num_players, notes, total_aed, payment_method
  } = body

  // Check for conflicts
  const { data: conflict } = await supabase
    .from('bookings')
    .select('id')
    .eq('facility_id', facility_id)
    .eq('slot_id', slot_id)
    .eq('booking_date', booking_date)
    .eq('start_time', start_time)
    .in('status', ['pending', 'confirmed'])
    .single()

  if (conflict) {
    return NextResponse.json({ error: 'This slot is already booked for that time' }, { status: 409 })
  }

  // Get vendor commission rate
  const { data: sub } = await supabase
    .from('vendor_subscriptions')
    .select('plan_name')
    .eq('vendor_id', vendor_id)
    .eq('is_active', true)
    .single()

  const commissionRates: Record<string, number> = { free: 0.10, starter: 0.08, pro: 0.05 }
  const rate = commissionRates[sub?.plan_name ?? 'free']
  const commission_aed = parseFloat((total_aed * rate).toFixed(2))
  const subtotal_aed = parseFloat((total_aed - commission_aed).toFixed(2))

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      customer_id: user.id,
      vendor_id, booking_type, facility_id, slot_id,
      coach_service_id, booking_date, start_time, end_time,
      duration_mins, num_players: num_players || 1,
      notes, subtotal_aed, commission_aed, total_aed,
      payment_method: payment_method || 'telr',
      status: 'pending',
      payment_status: 'pending'
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
