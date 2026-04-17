import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const emirate = searchParams.get('emirate')
  const category = searchParams.get('category')
  const condition = searchParams.get('condition')
  const q = searchParams.get('q')
  const limit = Number(searchParams.get('limit') ?? 24)
  const offset = Number(searchParams.get('offset') ?? 0)

  let query = supabase
    .from('classifieds')
    .select('*', { count: 'exact' })
    .eq('is_sold', false)
    .gt('expires_at', new Date().toISOString())
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (emirate) query = query.eq('emirate', emirate)
  if (category) query = query.eq('category', category)
  if (condition) query = query.eq('condition', condition)
  if (q) query = query.ilike('title', `%${q}%`)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, limit, offset })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  const { data, error } = await supabase
    .from('classifieds')
    .insert({
      ...body,
      seller_id: user.id,
      views: 0,
      is_sold: false,
      is_featured: false,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
