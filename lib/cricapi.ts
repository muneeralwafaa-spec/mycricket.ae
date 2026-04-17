// CricAPI integration for live scores
// Free tier: 100 calls/day — https://cricapi.com

const CRICAPI_BASE = 'https://api.cricapi.com/v1'

export interface LiveMatch {
  id: string
  name: string
  matchType: string         // 't20', 'odi', 'test'
  status: string            // match status string
  venue: string
  date: string
  teams: string[]
  score: ScoreEntry[]
  series_id?: string
}

export interface ScoreEntry {
  r: number                 // runs
  w: number                 // wickets
  o: number                 // overs
  inning: string            // e.g. "UAE Inning 1"
}

export interface ProcessedMatch {
  id: string
  tournament: string
  team1: string
  team2: string
  team1Score?: string
  team2Score?: string
  status: string
  isLive: boolean
  venue?: string
}

/**
 * Get current live cricket matches
 */
export async function getLiveMatches(): Promise<ProcessedMatch[]> {
  const apiKey = process.env.CRICAPI_KEY
  if (!apiKey) return getMockScores()

  try {
    const res = await fetch(
      `${CRICAPI_BASE}/cricScore?apikey=${apiKey}`,
      { next: { revalidate: 60 } }   // cache for 60s
    )
    const data = await res.json()

    if (data.status !== 'success' || !data.data) return getMockScores()

    return (data.data as LiveMatch[])
      .filter(m => m.matchType === 't20' || m.matchType === 'odi')
      .slice(0, 6)
      .map(processMatch)
  } catch {
    return getMockScores()
  }
}

/**
 * Get UAE-specific matches from series search
 */
export async function getUAEMatches(): Promise<ProcessedMatch[]> {
  const apiKey = process.env.CRICAPI_KEY
  if (!apiKey) return getMockScores()

  try {
    const res = await fetch(
      `${CRICAPI_BASE}/matches?apikey=${apiKey}&search=UAE`,
      { next: { revalidate: 300 } }
    )
    const data = await res.json()
    if (data.status !== 'success') return []
    return (data.data ?? []).slice(0, 4).map(processMatch)
  } catch {
    return []
  }
}

function processMatch(m: LiveMatch): ProcessedMatch {
  const isLive = m.status === 'live' ||
    m.status.toLowerCase().includes('live') ||
    m.status.toLowerCase().includes('innings')

  const scores = m.score ?? []
  const team1Score = scores[0] ? `${scores[0].r}/${scores[0].w} (${scores[0].o})` : undefined
  const team2Score = scores[1] ? `${scores[1].r}/${scores[1].w} (${scores[1].o})` : undefined

  return {
    id: m.id,
    tournament: m.name.split(',')[0] ?? m.name,
    team1: m.teams?.[0] ?? 'TBD',
    team2: m.teams?.[1] ?? 'TBD',
    team1Score,
    team2Score,
    status: m.status,
    isLive,
    venue: m.venue,
  }
}

/**
 * Fallback mock data when API key not set or API fails
 */
export function getMockScores(): ProcessedMatch[] {
  return [
    {
      id: 'mock-1',
      tournament: 'UAE Domestic T20',
      team1: 'Dubai Lions',
      team2: 'Abu Dhabi Knights',
      team1Score: '142/4 (20)',
      team2Score: '98/6 (15.2)',
      status: 'Abu Dhabi need 45 off 28',
      isLive: true,
    },
    {
      id: 'mock-2',
      tournament: 'ICC WC Qualifier',
      team1: 'UAE',
      team2: 'Oman',
      team1Score: '187/7 (20)',
      team2Score: '112/4 (14.4)',
      status: 'Oman need 76 off 32',
      isLive: true,
    },
    {
      id: 'mock-3',
      tournament: 'Sharjah Premier League',
      team1: 'Sharjah CC',
      team2: 'Ajman Eagles',
      team1Score: '201/5 (20)',
      team2Score: '178/9 (20)',
      status: 'Sharjah CC won by 23 runs',
      isLive: false,
    },
  ]
}
