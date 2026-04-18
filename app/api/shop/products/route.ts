import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const vendor = searchParams.get('vendor')
  const search = searchParams.get('search')
  const isVendorView = vendor === 'true'

  if (isVendorView) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: vendorProfile } = await supabase.from('vendor_profiles').select('id').eq('user_id', user.id).single()
    if (!vendorProfile) return NextResponse.json({ data: [] })
    const { data, error } = await supabase.from('products').select('*').eq('vendor_id', vendorProfile.id).order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  }

  let query = supabase.from('products').select(`*, vendor:vendors(business_name, is_verified)`).eq('is_active', true).order('created_at', { ascending: false })
  if (category) query = query.eq('category', category)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: vendorProfile } = await supabase.from('vendor_profiles').select('id').eq('user_id', user.id).single()
  if (!vendorProfile) return NextResponse.json({ error: 'Vendor profile not found' }, { status: 404 })

  const body = await req.json()
  const { name, description, category, brand, condition, price, compare_price, stock_qty, sku, images, is_active, specifications, includes } = body

  const { data, error } = await supabase.from('products').insert({
    name, description, category, brand,
    condition: condition || 'new',
    price, compare_price, stock_qty,
    sku, images: images || [],
    is_active: is_active !== false,
    vendor_id: vendorProfile.id,
    vendor_profile_id: vendorProfile.id,
    specifications: specifications?.filter((s: { key: string; value: string }) => s.key && s.value) || [],
    includes_list: includes?.filter((s: string) => s) || [],
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
