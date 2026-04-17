import { NextResponse } from 'next/server'
import { getLiveMatches } from '@/lib/cricapi'

export const revalidate = 60  // revalidate every 60 seconds

export async function GET() {
  try {
    const matches = await getLiveMatches()
    return NextResponse.json({ data: matches, cached_at: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 })
  }
}
