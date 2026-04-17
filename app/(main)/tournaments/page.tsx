'use client'
import { useState } from 'react'
import Link from 'next/link'

const tournaments = [
  { slug: 'ilt20-season-5', name: 'DP World ILT20 Season 5', org: 'Emirates Cricket Board', format: 'T20', level: 'Elite', emirate: 'Dubai / Sharjah / Abu Dhabi', start: 'Jan 2027', end: 'Feb 2027', status: 'upcoming', desc: 'UAE\'s premier franchise T20 league. 6 teams featuring world\'s top players. Desert Vipers won Season 4 (Dec 2025). ICC List A status.', prize: 'USD 2.5M+', teams: ['Gulf Giants', 'Desert Vipers', 'MI Emirates', 'Dubai Capitals', 'Abu Dhabi Knight Riders', 'Sharjah Warriors'], icon: '🏆', featured: true },
  { slug: 'emirates-d50', name: 'Emirates D50 April 2026', org: 'Emirates Cricket Board', format: '50-over', level: 'Open', emirate: 'UAE', start: 'Apr 2026', end: 'May 2026', status: 'registration-open', desc: 'ECB\'s flagship 50-over domestic league. Division A, B & C. Season registration open now on CricClubs.', prize: null, teams: [], icon: '🏅', featured: true },
  { slug: 'u19-girls', name: 'ECB U19 Girls Inter Emirates League', org: 'Emirates Cricket Board', format: 'T20', level: 'U19 Girls', emirate: 'UAE', start: 'Apr 2026', end: 'May 2026', status: 'ongoing', desc: '4 teams representing UAE emirates in women\'s U19 inter-emirate competition.', prize: null, teams: [], icon: '👩', featured: false },
  { slug: 'emirates-d20', name: 'Emirates D20 League', org: 'Emirates Cricket Board', format: 'T20', level: 'Open', emirate: 'UAE', start: 'Oct 2026', end: 'Nov 2026', status: 'upcoming', desc: 'UAE domestic T20 league for club teams. Most competitive club cricket in the Gulf.', prize: null, teams: [], icon: '⚡', featured: false },
  { slug: 'emirates-d10', name: 'Emirates D10 League', org: 'Emirates Cricket Board', format: 'T10', level: 'Open', emirate: 'UAE', start: 'Jan 2026', end: 'Jan 2026', status: 'completed', desc: 'Fast-paced 10-over format. Previous edition completed January 2026.', prize: null, teams: [], icon: '⚡', featured: false },
  { slug: 'u18-academy', name: 'U18 Academy League 2025/26', org: 'Emirates Cricket Board', format: 'T20', level: 'U18', emirate: 'UAE', start: 'Nov 2025', end: 'Mar 2026', status: 'ongoing', desc: 'ECB Youth Development pathway for under-18 academy players.', prize: null, teams: [], icon: '🌱', featured: false },
  { slug: 't20-world-cup-2026', name: 'ICC T20 World Cup 2026', org: 'ICC', format: 'T20', level: 'International', emirate: 'India & Sri Lanka', start: 'Feb 2026', end: 'Mar 2026', status: 'ongoing', desc: 'UAE qualified! Muhammad Waseem leads UAE. Biggest stage for UAE cricket.', prize: 'USD 11.25M total', teams: ['UAE', 'India', 'Pakistan', 'England', 'Australia', '+ 15 more'], icon: '🌍', featured: true },
]

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  upcoming:            { bg: '#E6F7ED', color: 'var(--green)',    label: 'Upcoming' },
  'registration-open': { bg: '#FDEAEB', color: 'var(--red)',      label: 'Register Now' },
  ongoing:             { bg: '#FDF3DC', color: 'var(--gold)',      label: 'Ongoing' },
  completed:           { bg: '#F5F5F5', color: 'var(--ink-light)', label: 'Completed' },
}

export default function TournamentsPage() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'T20', '50-over', 'T10', 'International', 'Ongoing', 'Upcoming']

  const filtered = tournaments.filter(t => {
    if (filter === 'All') return true
    if (filter === 'Ongoing') return t.status === 'ongoing'
    if (filter === 'Upcoming') return t.status === 'upcoming'
    return t.format === filter || t.level === filter
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Leagues & Events</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Tournaments</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>ILT20, Emirates D50, D20, D10, ECB Academy leagues and international fixtures</p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((t) => {
            const st = statusStyle[t.status]
            return (
              <Link key={t.slug} href={`/tournaments/${t.slug}`}
                className="rounded-2xl overflow-hidden card-hover block"
                style={{ background: 'var(--white)', border: t.featured ? '2px solid var(--red)' : '1px solid var(--border)', textDecoration: 'none' }}>
                <div className="h-1.5" style={{ background: t.featured ? 'var(--red)' : 'var(--green)' }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{t.icon}</span>
                      <div>
                        <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{t.name}</h3>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{t.org} · {t.emirate}</div>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0"
                      style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{t.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>{t.format}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t.level}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-mono-dm" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>{t.start}{t.end !== t.start ? ` – ${t.end}` : ''}</span>
                    {t.prize && <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#FDF3DC', color: 'var(--gold)' }}>💰 {t.prize}</span>}
                  </div>
                  {t.teams.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {t.teams.map(team => (
                        <span key={team} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--off-white)', color: 'var(--ink-light)', border: '1px solid var(--border)' }}>{team}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Organise a Tournament?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>List your cricket tournament, league or event on MyCricket.ae for free.</p>
          <Link href="/list-business" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>List Your Tournament</Link>
        </div>
      </div>
    </div>
  )
}
