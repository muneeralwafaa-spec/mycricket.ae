'use client'
export const dynamic = 'force-dynamic'
export default function Page() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>
        Classifieds
      </h1>
      <div className="rounded-xl p-8 text-center" style={{ background: '#fff', border: '1px solid var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Full management coming in Phase 2.</p>
      </div>
    </div>
  )
}
