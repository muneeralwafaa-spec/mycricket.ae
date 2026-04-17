import Link from 'next/link'

const players = [
  { initials: 'MW', name: 'Muhammad Waseem', role: 'Captain · Batting All-rounder', nationality: '🇵🇰' },
  { initials: 'AS', name: 'Alishan Sharafu', role: 'Opening Batter', nationality: '🇦🇪' },
  { initials: 'JS', name: 'Junaid Siddique', role: 'Right-arm Fast · 96 ODI wkts', nationality: '🇧🇩' },
  { initials: 'AK', name: 'Asif Khan', role: 'Middle-order Batter', nationality: '🇵🇰' },
  { initials: 'SS', name: 'Simranjeet Singh', role: 'Right-arm Fast Bowler', nationality: '🇮🇳' },
  { initials: 'AR', name: 'Aryansh Sharma', role: 'Wicketkeeper Batter', nationality: '🇮🇳' },
]

const recentResults = [
  { opponent: 'Pakistan', result: 'L', score: '137 vs 138/4', format: 'T20I', date: 'Sep 2025' },
  { opponent: 'India', result: 'L', score: '108 vs 184/5', format: 'T20I', date: 'Sep 2025' },
  { opponent: 'New Zealand', result: 'W', score: '136/3 vs 135', format: 'T20I', date: 'Aug 2023' },
]

export default function NationalTeam() {
  return (
    <section style={{ background: 'var(--off-white)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--green), var(--red))' }}>🇦🇪</div>
              <div>
                <div className="text-xs font-mono-dm uppercase tracking-widest" style={{ color: 'var(--red)' }}>
                  Official info hub
                </div>
                <div className="font-display text-2xl" style={{ color: 'var(--black)' }}>UAE Cricket</div>
              </div>
            </div>
            <h2 className="font-display leading-none mb-2" style={{ fontSize: 'clamp(40px, 6vw, 56px)', color: 'var(--black)' }}>
              UAE <span style={{ color: 'var(--red)' }}>National</span> Teams
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>
              Qualified for T20 World Cup 2026 · Head Coach: Lalchand Rajput · Ranked 17th T20I
            </p>

            {/* Recent results */}
            <div className="rounded-2xl overflow-hidden mb-5" style={{ border: '1px solid var(--border)' }}>
              <div className="px-4 py-2.5 font-mono-dm text-xs tracking-widest uppercase"
                style={{ background: 'var(--black)', color: 'rgba(255,255,255,0.5)' }}>
                Recent Results
              </div>
              {recentResults.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < recentResults.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: r.result === 'W' ? 'var(--green)' : 'var(--red)', fontSize: 11 }}>
                      {r.result}
                    </span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                        UAE vs {r.opponent}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{r.format} · {r.date}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>{r.score}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/national-team"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: 'var(--red)' }}>
                Full Squad & Fixtures →
              </Link>
              <a href="https://emiratescricket.com" target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: 'var(--white)' }}>
                ECB Official Site ↗
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--ink-light)' }}>
              T20 World Cup 2026 Squad
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {players.map(p => (
                <div key={p.initials} className="rounded-2xl p-4 text-center card-hover"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-display text-white"
                    style={{ background: 'var(--green)', fontSize: 16 }}>
                    {p.initials}
                  </div>
                  <div className="text-xs font-medium leading-tight mb-0.5" style={{ color: 'var(--black)' }}>
                    {p.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{p.role}</div>
                  <div className="text-base mt-1">{p.nationality}</div>
                </div>
              ))}
            </div>
            {/* T20 WC 2026 banner */}
            <div className="rounded-2xl p-4 mt-4 flex items-center gap-4"
              style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.3)' }}>
              <div className="text-3xl flex-shrink-0">🏆</div>
              <div>
                <div className="text-xs font-mono-dm uppercase tracking-widest mb-0.5" style={{ color: 'var(--red)' }}>
                  Qualified!
                </div>
                <div className="text-sm font-medium text-white">ICC T20 World Cup 2026</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  India & Sri Lanka · Feb–Mar 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
