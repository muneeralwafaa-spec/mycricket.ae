const stats = [
  { num: '120+', label: 'Academies & Facilities' },
  { num: '350+', label: 'Coaches & Umpires' },
  { num: '40+', label: 'Active Tournaments' },
  { num: '7', label: 'Emirates Covered' },
]

export default function StatsStrip() {
  return (
    <div style={{ background: 'var(--green-dark)', borderBottom: '2px solid var(--gold)' }}
      className="px-4 py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl tracking-wide" style={{ color: 'var(--gold)' }}>
              {s.num}
            </div>
            <div className="text-xs uppercase tracking-widest text-white/50 mt-0.5 font-mono-dm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
