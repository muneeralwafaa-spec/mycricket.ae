import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Cricket Coaches & Umpires UAE | Find Certified Coaches — MyCricket.ae' }

const coaches = [
  { slug: 'lalchand-rajput', name: 'Lalchand Rajput', role: 'Head Coach — UAE National Team', specs: ['Batting', 'Team Management'], emirate: 'Dubai', cert: 'Former India International', exp: 25, bio: 'Former India Test opener (1987). Coached Zimbabwe national team. Appointed UAE Head Coach 2023. Led UAE to T20 WC 2026 qualification.', nationality: '🇮🇳 Indian', rate: 'National Team', verified: true, featured: true, initials: 'LR', color: '#EF3340' },
  { slug: 'cp-rizwan', name: 'CP Rizwan', role: 'Former UAE Captain · Set Go Academy', specs: ['Batting', 'All Ages'], emirate: 'Dubai', cert: 'Former UAE National Captain', exp: 15, bio: 'Former UAE T20I captain & T20 WC player. Founded Set Go Cricket Academy. Coached alongside Pollard & other IPL legends.', nationality: '🇦🇪 UAE', rate: 'AED 300/hr', verified: true, featured: true, initials: 'CR', color: '#009A44', website: 'https://setgocricketacademy.com', academy: 'Set Go Cricket Academy' },
  { slug: 'gopal-jaspara', name: 'Gopal Jaspara', role: 'Head Coach — G Force Academy', specs: ['Batting', 'Fielding', 'All Levels'], emirate: 'Dubai', cert: 'ECB Level 3', exp: 20, bio: 'Head coach at G Force Cricket Academy since 2001. ECB Level 3, former first-class cricketer. Associated with Ramakant Achrekar (Sachin\'s guru).', nationality: '🇮🇳 Indian', rate: 'AED 250/hr', verified: true, featured: true, initials: 'GJ', color: '#1a6fa8', academy: 'G Force Cricket Academy' },
  { slug: 'raiphi-gomez', name: 'Raiphi Vincent Gomez', role: 'Head Coach — Danube Cricket Academy', specs: ['Batting', 'Conditioning'], emirate: 'Dubai', cert: 'Former IPL Player · Ranji Trophy', exp: 18, bio: 'Former Kerala Ranji Trophy captain & IPL player. Head coach at Danube Cricket Academy (est. 2022). Specialises in video analytics.', nationality: '🇮🇳 Indian', rate: 'AED 300/hr', verified: true, featured: false, initials: 'RG', color: '#C8961E', academy: 'Danube Cricket Academy' },
  { slug: 'shahzad-altaf', name: 'Shahzad Altaf', role: 'Founder — Young Talents Academy', specs: ['All-round', 'Youth Development'], emirate: 'Dubai / Sharjah', cert: 'ECB Level 2', exp: 26, bio: 'Founded Young Talents Cricket Academy in 1998. 26+ years developing UAE cricket. Organises Gulf Cup and international tours to UK & India.', nationality: '🇵🇰 Pakistani', rate: 'AED 200/hr', verified: true, featured: false, initials: 'SA', color: '#009A44', academy: 'Young Talents Cricket Academy' },
  { slug: 'indika-batuwitaarachchi', name: 'Indika Batuwitaarachchi', role: 'Head Coach — Bespartan Academy', specs: ['Batting', 'Spin Bowling'], emirate: 'Dubai', cert: 'Former UAE International', exp: 14, bio: 'Former UAE international with Sri Lanka first-class experience. Deep knowledge of UAE cricket conditions and international game.', nationality: '🇱🇰 Sri Lankan', rate: 'AED 220/hr', verified: true, featured: false, initials: 'IB', color: '#EF3340' },
]

const umpires = [
  { name: 'Tanvir Ahmed', panel: 'ECB Panel A', formats: ['T20', 'ODI', 'Club'], emirate: 'Dubai', cert: 'ECB Level 3 Umpire', initials: 'TA', color: '#EF3340' },
  { name: 'Shozab Raza', panel: 'ECB Panel A', formats: ['T20', 'ODI', 'Club'], emirate: 'Abu Dhabi', cert: 'ECB Panel', initials: 'SR', color: '#009A44' },
  { name: 'Ahmed Shah Pakteen', panel: 'ECB Panel B', formats: ['T20', 'Club'], emirate: 'Dubai', cert: 'ECB Certified', initials: 'AP', color: '#1a6fa8' },
  { name: 'Register as Umpire', panel: 'Join Our Directory', formats: ['All formats'], emirate: 'UAE', cert: 'ECB / ACC Certified', initials: '+', color: '#EF3340', cta: true },
]

export default function CoachesPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85" alt="Cricket coaching" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)' }} />
        <div className="absolute inset-0 flex flex-col justify-end container-uae pb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>People</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Coaches & Umpires</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>ICC-certified coaches, ECB panel umpires and scorers across the UAE</p>
        </div>
      </div>

      <div className="container-uae py-10">
        {/* Coaches */}
        <div className="mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>Coaches</div>
          <h2 className="font-display text-4xl mb-6" style={{ color: 'var(--black)' }}>Cricket Coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coaches.map(c => (
              <Link key={c.slug} href={`/coaches/${c.slug}`}
                className="rounded-2xl p-5 card-hover block"
                style={{ background: 'var(--white)', border: c.featured ? '2px solid var(--red)' : '1px solid var(--border)', textDecoration: 'none' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display text-xl text-white flex-shrink-0"
                    style={{ background: c.color, fontSize: 16 }}>{c.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{c.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--red)' }}>{c.role}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{c.nationality} · {c.emirate} · {c.exp}y exp</div>
                  </div>
                  {c.verified && <span className="text-xs px-2 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: 'var(--green)', fontSize: 10 }}>✓</span>}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>{c.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.specs.map(s => <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{s}</span>)}
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>{c.cert}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg" style={{ color: 'var(--green)' }}>{c.rate}</span>
                  <span className="text-xs" style={{ color: 'var(--red)' }}>View Profile →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Umpires */}
        <div>
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>Officials</div>
          <h2 className="font-display text-4xl mb-6" style={{ color: 'var(--black)' }}>Umpires & Officials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {umpires.map(u => (
              <div key={u.name} className="rounded-2xl p-5 card-hover"
                style={{ background: (u as any).cta ? 'var(--black)' : 'var(--white)', border: (u as any).cta ? '2px dashed rgba(239,51,64,0.4)' : '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-base text-white" style={{ background: u.color, fontSize: 14 }}>{u.initials}</div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: (u as any).cta ? 'white' : 'var(--black)' }}>{u.name}</div>
                    <div className="text-xs" style={{ color: (u as any).cta ? 'rgba(255,255,255,0.5)' : 'var(--red)' }}>{u.panel}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {u.formats.map(f => <span key={f} className="text-xs px-2 py-0.5 rounded-full" style={{ background: (u as any).cta ? 'rgba(255,255,255,0.1)' : 'var(--green-light)', color: (u as any).cta ? 'rgba(255,255,255,0.6)' : 'var(--green)' }}>{f}</span>)}
                </div>
                <div className="text-xs mb-2" style={{ color: (u as any).cta ? 'rgba(255,255,255,0.4)' : 'var(--ink-light)' }}>{u.emirate} · {u.cert}</div>
                {(u as any).cta && (
                  <Link href="/list-business" className="block mt-2 py-2 rounded-xl text-xs font-medium text-center text-white" style={{ background: 'var(--red)' }}>
                    Register as Umpire →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
