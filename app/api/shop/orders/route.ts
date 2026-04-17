import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const body = await req.json()
  const { items, shipping_address, payment_method, notes, customer_email, customer_name, customer_phone } = body

  if (!items?.length) return NextResponse.json({ error: 'No items in order' }, { status: 400 })
  if (!shipping_address || !customer_email) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  // Fetch product prices server-side (never trust client prices)
  const productIds = items.map((i: { product_id: string }) => i.product_id)
  const { data: products, error: pErr } = await supabase
    .from('products').select('id,price,vendor_id,name,stock_qty').in('id', productIds)
  if (pErr) return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })

  const productMap = Object.fromEntries((products ?? []).map(p => [p.id, p]))

  // Calculate totals
  let subtotal = 0
  const orderItems = items.map((item: { product_id: string; variant_id?: string; quantity: number; customisation_notes?: string }) => {
    const product = productMap[item.product_id]
    if (!product) throw new Error(`Product ${item.product_id} not found`)
    const lineTotal = product.price * item.quantity
    subtotal += lineTotal
    return {
      product_id: item.product_id,
      vendor_id: product.vendor_id,
      product_name: product.name,
      variant_id: item.variant_id ?? null,
      quantity: item.quantity,
      unit_price: product.price,
      total_price: lineTotal,
      customisation_notes: item.customisation_notes ?? null,
    }
  })

  const shipping_fee = subtotal >= 200 ? 0 : 25
  const total = subtotal + shipping_fee

  // Generate order number
  const { data: orderNumData } = await supabase.rpc('generate_order_number')
  const order_number = orderNumData ?? `MCK-${Date.now()}`

  const { data: { user } } = await supabase.auth.getUser()

  // Create order
  const { data: order, error: oErr } = await supabase
    .from('orders')
    .insert({
      order_number,
      customer_id: user?.id ?? null,
      customer_email,
      customer_name,
      customer_phone: customer_phone ?? null,
      shipping_address,
      subtotal,
      shipping_fee,
      discount: 0,
      total,
      payment_method: payment_method ?? 'telr',
      notes: notes ?? null,
      status: 'pending',
    })
    .select().single()

  if (oErr) return NextResponse.json({ error: oErr.message }, { status: 500 })

  // Create order items
  const { error: itemErr } = await supabase
    .from('order_items')
    .insert(orderItems.map((i: typeof orderItems[0]) => ({ ...i, order_id: order.id })))

  if (itemErr) return NextResponse.json({ error: itemErr.message }, { status: 500 })

  // Decrement stock
  for (const item of items) {
    const product = productMap[item.product_id]
    await supabase.from('products')
      .update({ stock_qty: Math.max(0, product.stock_qty - item.quantity) })
      .eq('id', item.product_id)
  }

  return NextResponse.json({
    data: { ...order, items: orderItems },
    message: `Order ${order_number} placed successfully`,
  }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
