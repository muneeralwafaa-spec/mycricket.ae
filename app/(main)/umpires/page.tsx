import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Umpires — MyCricket.ae' }
export default function Page() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-6xl text-white tracking-wide">Umpires</h1>
          <p className="text-white/50 text-sm mt-2">Coming soon — fully functional page launching with Phase 2.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-8 text-center" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <div className="text-5xl mb-4">🏏</div>
          <p className="text-sm" style={{ color: 'var(--ink-light)' }}>
            This section is being populated with UAE cricket data. Check back soon!
          </p>
        </div>
      </div>
    </div>
  )
}
