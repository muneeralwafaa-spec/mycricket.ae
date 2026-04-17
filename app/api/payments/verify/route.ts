import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { verifyTelrPayment, getTelrStatus } from '@/lib/telr'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const orderId = searchParams.get('order_id')
  const telrRef = searchParams.get('ref') // Telr passes this back
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycricket.ae'

  if (!orderId || !telrRef) {
    return NextResponse.redirect(`${siteUrl}/shop/payment-failed?reason=missing_params`)
  }

  // Verify with Telr
  const verification = await verifyTelrPayment(telrRef)

  if ('error' in verification) {
    return NextResponse.redirect(`${siteUrl}/shop/payment-failed?order_id=${orderId}&reason=verify_failed`)
  }

  const statusCode = verification.order?.status?.code ?? '-9'
  const paymentStatus = getTelrStatus(statusCode)

  if (paymentStatus === 'success') {
    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'confirmed',
        payment_ref: telrRef,
        payment_method: 'telr',
      })
      .eq('id', orderId)

    // Update vendor order items status
    await supabase
      .from('order_items')
      .update({ vendor_status: 'confirmed' })
      .eq('order_id', orderId)

    return NextResponse.redirect(`${siteUrl}/shop/order-confirmed?order_id=${orderId}`)
  }

  if (paymentStatus === 'cancelled') {
    return NextResponse.redirect(`${siteUrl}/shop/checkout?cancelled=true`)
  }

  // Failed
  await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)

  return NextResponse.redirect(`${siteUrl}/shop/payment-failed?order_id=${orderId}&reason=declined`)
}
