import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createTelrPayment } from '@/lib/telr'

const PLANS = {
  basic:    { amount: 99,  label: 'Basic Featured',   duration_days: 30 },
  standard: { amount: 299, label: 'Standard Featured', duration_days: 30 },
  premium:  { amount: 499, label: 'Premium Featured',  duration_days: 30 },
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { entity_type, entity_id, plan } = body

  if (!entity_type || !entity_id || !plan) {
    return NextResponse.json({ error: 'entity_type, entity_id, and plan are required' }, { status: 400 })
  }

  const planDetails = PLANS[plan as keyof typeof PLANS]
  if (!planDetails) {
    return NextResponse.json({ error: 'Invalid plan. Choose basic, standard, or premium' }, { status: 400 })
  }

  // Fetch user profile for billing
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycricket.ae'
  const internalRef = `FEAT-${entity_type.toUpperCase()}-${entity_id.slice(0, 8)}-${Date.now()}`

  const result = await createTelrPayment({
    order_id: internalRef,
    amount: planDetails.amount,
    description: `MyCricket.ae ${planDetails.label} — ${entity_type}`,
    customer_name: profile.full_name ?? user.email ?? 'Vendor',
    customer_email: profile.email ?? user.email!,
    customer_phone: profile.phone ?? '',
    return_url: `${siteUrl}/api/payments/verify?type=featured&entity_type=${entity_type}&entity_id=${entity_id}&plan=${plan}&ref=${internalRef}`,
    decline_url: `${siteUrl}/vendor/dashboard?payment=failed`,
    cancel_url: `${siteUrl}/vendor/dashboard`,
    billing_address: { city: 'Dubai', country: 'AE' },
  })

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({
    payment_url: result.url,
    ref: result.ref,
    plan: planDetails,
  })
}
