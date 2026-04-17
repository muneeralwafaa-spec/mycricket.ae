import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

// Telr sends a server-to-server notification for each transaction
// Configure this URL in your Telr merchant dashboard
export async function POST(req: NextRequest) {
  const supabase = createAdminClient()

  // Telr sends form-encoded data
  const body = await req.text()
  const params = new URLSearchParams(body)

  const cartRef = params.get('cart_id')       // your order_number
  const telrRef = params.get('tran_ref')      // Telr transaction ref
  const status = params.get('tran_type')       // A=Auth, V=Void, R=Refund
  const amount = params.get('tran_amount')
  const storeId = params.get('store_id')

  // Verify the store ID matches ours
  if (storeId !== process.env.TELR_STORE_ID) {
    return NextResponse.json({ error: 'Invalid store' }, { status: 401 })
  }

  if (!cartRef || !telrRef) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  // Find the order
  const { data: order } = await supabase
    .from('orders')
    .select('id, status, total')
    .eq('order_number', cartRef)
    .single()

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Handle different transaction types
  if (status === 'A') {
    // Authorised — confirm order
    await supabase
      .from('orders')
      .update({
        status: 'confirmed',
        payment_ref: telrRef,
        payment_method: 'telr',
      })
      .eq('id', order.id)

    await supabase
      .from('order_items')
      .update({ vendor_status: 'confirmed' })
      .eq('order_id', order.id)

  } else if (status === 'R') {
    // Refund
    await supabase
      .from('orders')
      .update({ status: 'refunded' })
      .eq('id', order.id)

  } else if (status === 'V') {
    // Voided
    await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', order.id)
  }

  // Log the webhook event (optional audit trail)
  await supabase.from('orders').update({
    notes: `Telr webhook: ${status} — ref ${telrRef} — amount ${amount}`,
  }).eq('id', order.id)

  return NextResponse.json({ ok: true })
}
