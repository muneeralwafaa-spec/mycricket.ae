import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: vendor } = await supabase.from('vendor_profiles').select('id').eq('user_id', user.id).single()
  if (!vendor) return NextResponse.json({ data: [] })

  const { data, error } = await supabase.from('payouts').select('*').eq('vendor_id', vendor.id).order('period_start', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
