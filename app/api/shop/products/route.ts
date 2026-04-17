import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const category = searchParams.get('category')
  const brand = searchParams.get('brand')
  const vendor = searchParams.get('vendor')
  const featured = searchParams.get('featured')
  const q = searchParams.get('q')
  const minPrice = searchParams.get('min_price')
  const maxPrice = searchParams.get('max_price')
  const sort = searchParams.get('sort') ?? 'featured'
  const limit = Number(searchParams.get('limit') ?? 24)
  const offset = Number(searchParams.get('offset') ?? 0)

  let query = supabase
    .from('products')
    .select('*, vendor:vendors(id,shop_name,slug,rating), category:product_categories(id,name,icon)', { count: 'exact' })
    .eq('status', 'active')
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category_id', category)
  if (brand) query = query.ilike('brand', brand)
  if (vendor) query = query.eq('vendor_id', vendor)
  if (featured === 'true') query = query.eq('is_featured', true)
  if (q) query = query.or(`name.ilike.%${q}%,brand.ilike.%${q}%`)
  if (minPrice) query = query.gte('price', Number(minPrice))
  if (maxPrice) query = query.lte('price', Number(maxPrice))

  switch (sort) {
    case 'price_asc':  query = query.order('price', { ascending: true }); break
    case 'price_desc': query = query.order('price', { ascending: false }); break
    case 'rating':     query = query.order('rating', { ascending: false }); break
    case 'newest':     query = query.order('created_at', { ascending: false }); break
    default:
      query = query.order('is_featured', { ascending: false }).order('sales_count', { ascending: false })
  }

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, limit, offset })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get vendor id
  const { data: vendor } = await supabase
    .from('vendors').select('id').eq('user_id', user.id).eq('status', 'active').single()
  if (!vendor) return NextResponse.json({ error: 'No active vendor account' }, { status: 403 })

  const body = await req.json()
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()

  const { data, error } = await supabase
    .from('products')
    .insert({ ...body, slug, vendor_id: vendor.id, status: body.status ?? 'draft' })
    .select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
