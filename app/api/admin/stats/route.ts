import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [vendors, bookings, users, products, payouts] = await Promise.all([
    supabase.from('vendor_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('payouts').select('net_aed').eq('status', 'pending'),
  ])

  const pendingPayouts = payouts.data?.reduce((s, p) => s + Number(p.net_aed), 0) || 0
  const bookingRevenue = await supabase.from('bookings').select('commission_aed').eq('payment_status', 'paid')
  const revenue = bookingRevenue.data?.reduce((s, b) => s + Number(b.commission_aed), 0) || 0

  return NextResponse.json({
    data: {
      vendors: vendors.count || 0,
      bookings: bookings.count || 0,
      users: users.count || 0,
      products: products.count || 0,
      revenue: Math.round(revenue),
      pending_payouts: Math.round(pendingPayouts),
    }
  })
}
