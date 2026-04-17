import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)
  const emirate = searchParams.get('emirate')
  const type = searchParams.get('type')
  const date = searchParams.get('date')

  let query = supabase
    .from('facilities')
    .select(`
      *,
      vendor:vendor_profiles(business_name, phone, whatsapp, rating, is_verified),
      slots:facility_slots(id, name, price_aed, duration_mins, slot_type, available_days, open_time, close_time)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (emirate) query = query.eq('emirate', emirate)
  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // If date provided, filter out booked slots
  if (date && data) {
    const { data: booked } = await supabase
      .from('bookings')
      .select('slot_id, start_time, end_time')
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed'])

    const bookedSlotTimes = booked?.map(b => `${b.slot_id}-${b.start_time}`) || []
    return NextResponse.json({ data, bookedSlotTimes })
  }

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Get vendor profile
  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!vendor) return NextResponse.json({ error: 'Vendor profile not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('facilities')
    .insert({ ...body, vendor_id: vendor.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
