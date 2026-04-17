import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const emirate = searchParams.get('emirate')
  const type = searchParams.get('type')
  const featured = searchParams.get('featured')
  const limit = Number(searchParams.get('limit') ?? 20)
  const offset = Number(searchParams.get('offset') ?? 0)

  let query = supabase
    .from('facilities')
    .select('*', { count: 'exact' })
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
    .range(offset, offset + limit - 1)

  if (emirate) query = query.eq('emirate', emirate)
  if (type) query = query.eq('type', type)
  if (featured === 'true') query = query.eq('is_featured', true)

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, limit, offset })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  const { data, error } = await supabase
    .from('facilities')
    .insert({ ...body, slug, owner_id: user.id, status: 'pending' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
