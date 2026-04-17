import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const tournaments: Record<string, { name: string; desc: string; status: string; format: string; teams: string[]; dates: string }> = {
  'ilt20-season-5': { name: 'DP World ILT20 Season 5', desc: 'UAE\'s premier franchise T20 league. 6 teams, world\'s top players. List A status granted by ICC.', status: 'Upcoming', format: 'T20', teams: ['Gulf Giants', 'Desert Vipers', 'MI Emirates', 'Dubai Capitals', 'Abu Dhabi Knight Riders', 'Sharjah Warriors'], dates: 'Jan–Feb 2027' },
  'emirates-d50': { name: 'Emirates D50 April 2026', desc: 'ECB flagship 50-over domestic league. Division A, B & C. Registration open on CricClubs.', status: 'Registration Open', format: '50-over', teams: [], dates: 'Apr–May 2026' },
  't20-world-cup-2026': { name: 'ICC T20 World Cup 2026', desc: 'UAE qualified! Muhammad Waseem leads UAE. Hosted in India & Sri Lanka.', status: 'Ongoing', format: 'T20', teams: ['UAE', 'India', 'Pakistan', 'England', '+ 16 more'], dates: 'Feb–Mar 2026' },
  'emirates-d20': { name: 'Emirates D20 League', desc: 'UAE domestic T20 league for club teams.', status: 'Upcoming', format: 'T20', teams: [], dates: 'Oct–Nov 2026' },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = tournaments[slug]
  if (!t) return { title: 'Tournament Not Found — MyCricket.ae' }
  return { title: `${t.name} | UAE Cricket Tournament — MyCricket.ae` }
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = tournaments[slug]
  if (!t) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <Link href="/tournaments" className="text-xs font-mono-dm mb-6 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Back to Tournaments</Link>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white mb-4 inline-block" style={{ background: 'var(--red)' }}>{t.status}</span>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">{t.name}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.format} · {t.dates}</p>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--black)' }}>About</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-light)' }}>{t.desc}</p>
          </div>
          {t.teams.length > 0 && (
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--black)' }}>Teams</h2>
              <div className="flex flex-wrap gap-2">
                {t.teams.map(team => (
                  <span key={team} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{team}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        {t.status === 'Registration Open' && (
          <div className="mt-6 rounded-2xl p-6 text-center" style={{ background: 'var(--black)' }}>
            <h3 className="font-display text-2xl text-white mb-2">Register Your Team</h3>
            <a href="https://cricclubs.com/UAE" target="_blank" rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white mt-3" style={{ background: 'var(--red)' }}>
              Register on CricClubs →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
