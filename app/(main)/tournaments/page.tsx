import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cricket Tournaments & Leagues UAE 2026 | ILT20, Emirates D50, D20',
  description: 'Find all cricket tournaments, leagues and events in UAE. ILT20, Emirates D50, D20, D10, ECB Academy leagues, club tournaments and more.',
}

const tournaments = [
  {
    name: 'DP World ILT20 Season 5',
    organiser: 'Emirates Cricket Board',
    format: 'T20', level: 'Elite',
    emirate: 'Dubai / Sharjah / Abu Dhabi',
    start: 'Jan 2027', end: 'Feb 2027',
    status: 'upcoming',
    description: 'UAE\'s premier franchise T20 league. 6 teams featuring world\'s top players. Desert Vipers won Season 4 (Dec 2025). List A status granted by ICC.',
    prize: 'USD 2.5M+',
    teams: ['Gulf Giants', 'Desert Vipers', 'MI Emirates', 'Dubai Capitals', 'Abu Dhabi Knight Riders', 'Sharjah Warriors'],
    icon: '🏆',
    featured: true,
  },
  {
    name: 'Emirates D50 — April 2026',
    organiser: 'Emirates Cricket Board',
    format: '50-over', level: 'Open',
    emirate: 'UAE',
    start: 'Apr 2026', end: 'May 2026',
    status: 'registration-open',
    description: 'ECB\'s flagship 50-over domestic league. Division A, B & C. Season registration open now on CricClubs.',
    prize: null, teams: [],
    icon: '🏅',
    featured: true,
  },
  {
    name: 'ECB U19 Girls Inter Emirates League',
    organiser: 'Emirates Cricket Board',
    format: 'T20', level: 'U19 Girls',
    emirate: 'UAE',
    start: 'Apr 2026', end: 'May 2026',
    status: 'ongoing',
    description: '4 teams representing UAE emirates in women\'s U19 inter-emirate competition. Developing next generation of UAE women\'s cricket.',
    prize: null, teams: [],
    icon: '👩',
    featured: false,
  },
  {
    name: 'Emirates D20 League',
    organiser: 'Emirates Cricket Board',
    format: 'T20', level: 'Open',
    emirate: 'UAE',
    start: 'Oct 2026', end: 'Nov 2026',
    status: 'upcoming',
    description: 'UAE domestic T20 league for club teams. One of the most competitive club cricket competitions in the Gulf region.',
    prize: null, teams: [],
    icon: '⚡',
    featured: false,
  },
  {
    name: 'Emirates D10 League',
    organiser: 'Emirates Cricket Board',
    format: 'T10', level: 'Open',
    emirate: 'UAE',
    start: 'Jan 2026', end: 'Jan 2026',
    status: 'completed',
    description: 'Fast-paced 10-over format. Previous edition completed January 2026. Next edition dates TBA.',
    prize: null, teams: [],
    icon: '⚡',
    featured: false,
  },
  {
    name: 'U18 Academy League 2025/26',
    organiser: 'Emirates Cricket Board',
    format: 'T20', level: 'U18',
    emirate: 'UAE',
    start: 'Nov 2025', end: 'Mar 2026',
    status: 'ongoing',
    description: 'ECB Youth Development pathway. Under-18 academy league feeding into UAE national age group teams.',
    prize: null, teams: [],
    icon: '🌱',
    featured: false,
  },
  {
    name: 'T20 World Cup 2026',
    organiser: 'ICC',
    format: 'T20', level: 'International',
    emirate: 'India & Sri Lanka',
    start: 'Feb 2026', end: 'Mar 2026',
    status: 'ongoing',
    description: 'UAE qualified! Muhammad Waseem leads UAE in Group stage. UAE in same group as strong opponents. Biggest stage for UAE cricket.',
    prize: 'USD 11.25M total',
    teams: ['UAE', 'India', 'Pakistan', 'Oman', '+ 16 more'],
    icon: '🌍',
    featured: true,
  },
]

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  upcoming:            { bg: '#E6F7ED', color: 'var(--green)',    label: 'Upcoming' },
  'registration-open': { bg: '#FDEAEB', color: 'var(--red)',      label: 'Register Now' },
  ongoing:             { bg: '#FDF3DC', color: 'var(--gold)',      label: 'Ongoing' },
  completed:           { bg: '#F5F5F5', color: 'var(--ink-light)', label: 'Completed' },
}

export default function TournamentsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Leagues & Events
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Tournaments</h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            ILT20, Emirates D50, D20, D10, ECB Academy leagues, club tournaments and international fixtures
          </p>
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tournaments.map((t, i) => {
            const st = statusStyle[t.status]
            return (
              <div key={i} className="rounded-2xl overflow-hidden card-hover"
                style={{ background: 'var(--white)', border: t.featured ? '2px solid var(--red)' : '1px solid var(--border)' }}>
                <div className="h-2" style={{ background: t.featured ? 'var(--red)' : 'var(--green)' }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{t.icon}</span>
                      <div>
                        <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{t.name}</h3>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                          {t.organiser} · {t.emirate}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0"
                      style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{t.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                      {t.format}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      {t.level}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-mono-dm"
                      style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>
                      {t.start}{t.end !== t.start ? ` – ${t.end}` : ''}
                    </span>
                    {t.prize && (
                      <span className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: '#FDF3DC', color: 'var(--gold)' }}>
                        💰 {t.prize}
                      </span>
                    )}
                  </div>
                  {t.teams.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {t.teams.map(team => (
                        <span key={team} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--off-white)', color: 'var(--ink-light)', border: '1px solid var(--border)' }}>
                          {team}
                        </span>
                      ))}
                    </div>
                  )}
                  {t.status === 'registration-open' && (
                    <a href="https://cricclubs.com/UAE" target="_blank" rel="noopener noreferrer"
                      className="block text-center py-2 rounded-xl text-xs font-medium text-white transition-all"
                      style={{ background: 'var(--red)' }}>
                      Register on CricClubs →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Organise a Tournament?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            List your cricket tournament, league or event on MyCricket.ae for free.
          </p>
          <Link href="/list-business"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'var(--red)' }}>
            List Your Tournament
          </Link>
        </div>
      </div>
    </div>
  )
}
