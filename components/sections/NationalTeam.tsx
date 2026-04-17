import Link from 'next/link'

const players = [
  { initials: 'MA', name: 'M. Asghar', role: 'Captain' },
  { initials: 'CP', name: 'C. Pooran', role: 'Batsman' },
  { initials: 'ZK', name: 'Z. Khan', role: 'Bowler' },
  { initials: 'BZ', name: 'B. Zahir', role: 'All-rounder' },
]

export default function NationalTeam() {
  return (
    <section className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, var(--green), var(--green-dark))' }}>
                🇦🇪
              </div>
              <div>
                <div className="text-xs text-[var(--ink-light)]">Official info hub</div>
                <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>UAE Cricket</div>
              </div>
            </div>
            <h2 className="font-display leading-none mb-4" style={{ fontSize: 52, color: 'var(--ink)' }}>
              UAE<br />
              <span style={{ color: 'var(--green)' }}>National</span><br />
              Teams
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-light)' }}>
              Squad info, fixtures, results, and rankings for UAE men's, women's, and age-group national teams — all in one place.
            </p>
            <Link href="/national-team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium no-underline transition-all"
              style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
              View Full Squad & Fixtures →
            </Link>
          </div>

          {/* Right */}
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--ink-light)' }}>
              Featured Players
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {players.map(p => (
                <div key={p.initials} className="rounded-xl p-4 text-center" style={{ background: 'var(--green-light)' }}>
                  <div className="w-11 h-11 rounded-full mx-auto mb-2 flex items-center justify-center font-display text-base text-white"
                    style={{ background: 'var(--green)' }}>
                    {p.initials}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{p.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{p.role}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{ background: 'var(--green-light)' }}>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--ink-light)' }}>
                Next Fixture
              </div>
              <div className="text-base font-medium" style={{ color: 'var(--ink)' }}>UAE vs Oman</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                T20I · Dubai Sports City · 22 Apr 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
