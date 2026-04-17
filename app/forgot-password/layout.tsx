import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }} className="flex flex-col">
      {/* Minimal header */}
      <header className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="no-underline flex items-center gap-2.5">
          <div style={{ background: 'var(--gold)', borderRadius: 6 }}
            className="w-8 h-8 flex items-center justify-center font-display text-sm text-[var(--ink)]">
            MC
          </div>
          <span className="font-display text-lg tracking-widest text-white">
            MY<span style={{ color: 'var(--gold)' }}>CRICKET</span>.AE
          </span>
        </Link>
        <Link href="/" className="text-xs text-white/40 hover:text-white/70 no-underline transition-colors">
          ← Back to site
        </Link>
      </header>

      {/* Auth content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center text-xs text-white/20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        © 2026 MyCricket.ae — All rights reserved
      </div>
    </div>
  )
}
