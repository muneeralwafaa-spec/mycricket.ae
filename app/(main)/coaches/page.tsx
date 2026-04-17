import { Metadata } from 'next'
import { Search, MapPin } from 'lucide-react'
import { EMIRATES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cricket Coaches & Umpires in UAE',
  description: 'Find verified, accredited cricket coaches and umpires across Dubai, Abu Dhabi, Sharjah and all UAE emirates.',
}

const mockCoaches = [
  { name: 'Rajan Menon', role: 'Coach', specs: ['Batting', 'Fielding'], emirate: 'Dubai', exp: 12, rate: 'AED 150/hr', cert: 'ICC Level 2', rating: 4.9, reviews: 87, verified: true, featured: true, langs: ['English', 'Malayalam', 'Hindi'] },
  { name: 'Arjun Sharma', role: 'Coach', specs: ['Fast Bowling'], emirate: 'Abu Dhabi', exp: 8, rate: 'AED 120/hr', cert: 'Cricket Australia L2', rating: 4.7, reviews: 63, verified: true, featured: false, langs: ['English', 'Hindi'] },
  { name: 'Ali Hassan', role: 'Umpire', specs: ['T20', 'ODI'], emirate: 'Sharjah', exp: 15, rate: 'AED 200/match', cert: 'ECB Panel', rating: 4.8, reviews: 124, verified: true, featured: false, langs: ['English', 'Arabic', 'Urdu'] },
  { name: 'Pradeep Kumar', role: 'Coach', specs: ['Spin Bowling', 'Batting'], emirate: 'Dubai', exp: 10, rate: 'AED 130/hr', cert: 'BCCI Level 1', rating: 4.6, reviews: 45, verified: false, featured: false, langs: ['English', 'Tamil', 'Hindi'] },
  { name: 'James Williams', role: 'Coach', specs: ['Batting', 'Wicket Keeping'], emirate: 'Dubai', exp: 20, rate: 'AED 200/hr', cert: 'ECB Level 3', rating: 5.0, reviews: 156, verified: true, featured: true, langs: ['English'] },
  { name: 'Khalid Al Rashid', role: 'Umpire', specs: ['Club', 'U17'], emirate: 'Ajman', exp: 6, rate: 'AED 150/match', cert: 'ECB Panel', rating: 4.5, reviews: 38, verified: true, featured: false, langs: ['English', 'Arabic'] },
]

const roleColor = (role: string) => role === 'Umpire'
  ? { bg: 'var(--gold-light)', color: 'var(--gold)' }
  : { bg: 'var(--green-light)', color: 'var(--green)' }

export default function CoachesPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>People</div>
          <h1 className="font-display text-6xl text-white tracking-wide mb-3">Coaches & Umpires</h1>
          <p className="text-white/50 text-sm max-w-md">
            Verified, accredited coaches, umpires, scorers & commentators across the UAE.
          </p>
        </div>
      </div>

      {/* Tabs + filter */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {['All', 'Coaches', 'Umpires', 'Scorers'].map((tab, i) => (
              <button key={tab} className="px-4 py-1.5 text-sm transition-colors"
                style={{
                  background: i === 0 ? 'var(--green)' : 'transparent',
                  color: i === 0 ? '#fff' : 'var(--ink-light)',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-40 px-4 py-2 rounded-lg"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
            <Search size={15} style={{ color: 'var(--ink-light)' }} />
            <input placeholder="Search coaches..." className="bg-transparent text-sm outline-none flex-1" style={{ color: 'var(--ink)' }} />
          </div>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option value="">All Emirates</option>
            {EMIRATES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockCoaches.map((c, i) => {
            const rc = roleColor(c.role)
            return (
              <a key={i} href={`/coaches/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="no-underline rounded-xl p-5 block transition-all duration-200 hover:-translate-y-1 group"
                style={{ background: '#fff', border: c.featured ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl flex-shrink-0"
                    style={{ background: 'var(--green)', color: '#fff' }}>
                    {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium group-hover:text-[var(--green)] transition-colors" style={{ color: 'var(--ink)' }}>
                        {c.name}
                      </span>
                      {c.verified && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--green)', color: '#fff' }}>✓</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: rc.bg, color: rc.color }}>
                        {c.role}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--ink-light)' }}>
                        <MapPin size={10} className="inline" /> {c.emirate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-lg tracking-wide" style={{ color: 'var(--green)' }}>{c.rate}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.specs.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs" style={{ color: 'var(--ink-light)' }}>
                  <span>{c.exp} yrs exp · {c.cert}</span>
                  <span style={{ color: 'var(--gold)' }}>★ {c.rating} ({c.reviews})</span>
                </div>

                <div className="mt-3 pt-3 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--ink-light)' }}>
                  🗣 {c.langs.join(' · ')}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
