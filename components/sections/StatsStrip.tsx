const stats = [
  { num: '120+', label: 'Academies & Facilities' },
  { num: '350+', label: 'Coaches & Umpires' },
  { num: '40+',  label: 'Tournaments & Leagues' },
  { num: '7',    label: 'Emirates Covered' },
]

export default function StatsStrip() {
  return (
    <div style={{ background: 'var(--green-dark)', borderBottom: '3px solid var(--red)' }}>
      <div className="container-uae py-4 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center py-2"
            style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div className="font-display text-3xl md:text-4xl text-white">{s.num}</div>
            <div className="text-xs uppercase tracking-widest mt-0.5 font-mono-dm"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
