import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createTelrPayment } from '@/lib/telr'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const body = await req.json()

  const { order_id, payment_type = 'shop_order' } = body

  if (!order_id) {
    return NextResponse.json({ error: 'order_id is required' }, { status: 400 })
  }

  // Fetch order details
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', order_id)
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  if (order.status !== 'pending') {
    return NextResponse.json({ error: 'Order already processed' }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycricket.ae'

  const result = await createTelrPayment({
    order_id: order.order_number,
    amount: order.total,
    description: `MyCricket.ae Order ${order.order_number}`,
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    return_url: `${siteUrl}/api/payments/verify?order_id=${order_id}&type=${payment_type}`,
    decline_url: `${siteUrl}/shop/payment-failed?order_id=${order_id}`,
    cancel_url: `${siteUrl}/shop/checkout`,
    billing_address: {
      city: order.shipping_address?.emirate ?? 'Dubai',
      country: 'AE',
    },
  })

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  // Save Telr ref to order
  await supabase
    .from('orders')
    .update({ payment_ref: result.ref, payment_method: 'telr' })
    .eq('id', order_id)

  return NextResponse.json({ payment_url: result.url, ref: result.ref })
}
