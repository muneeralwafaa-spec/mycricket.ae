import Link from 'next/link'

const outboundDests = ['🇮🇳 India', '🇵🇰 Pakistan', '🇱🇰 Sri Lanka', '🇧🇩 Bangladesh', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇦🇺 Australia', '🇿🇦 South Africa', '+ More']
const inboundHighlights = ['🏟️ Dubai Sports City', '🏟️ Sharjah Stadium', '🏟️ Zayed Cricket', '🌤️ Best weather Oct–Apr']

export default function ToursSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
            Exclusive Feature
          </div>
          <h2 className="font-display text-5xl tracking-wide text-white">Cricket Tours Connect</h2>
          <p className="text-sm text-white/50 mt-2 max-w-lg leading-relaxed">
            The only platform in the region connecting UAE cricket teams with overseas clubs for international tours — and vice versa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Outbound */}
          <div className="rounded-2xl p-8 relative overflow-hidden transition-all duration-200 hover:border-[var(--gold)]/30"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(26,122,74,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'rgba(200,150,30,0.15)' }}>✈️</span>
                <span className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                  UAE Teams Going Abroad
                </span>
              </div>
              <h3 className="font-display text-3xl text-white tracking-wide mb-3">
                Tour Any Country in the World
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Register your UAE team, pick your destination, and we connect you with host clubs who arrange matches, grounds, and logistics.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {outboundDests.map(d => (
                  <span key={d} className="text-xs px-3 py-1.5 rounded-full text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {d}
                  </span>
                ))}
              </div>
              <Link href="/tours/register?direction=outbound"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white no-underline transition-colors"
                style={{ background: 'var(--green)' }}>
                Register Your Team →
              </Link>
            </div>
          </div>

          {/* Inbound */}
          <div className="rounded-2xl p-8 relative overflow-hidden transition-all duration-200 hover:border-[var(--gold)]/30"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(26,122,74,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'rgba(200,150,30,0.15)' }}>🛬</span>
                <span className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                  Overseas Teams Visiting UAE
                </span>
              </div>
              <h3 className="font-display text-3xl text-white tracking-wide mb-3">
                Bring Your Team to the UAE
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Overseas clubs wanting to tour the UAE get matched with local teams, world-class venues, and full logistics support.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {inboundHighlights.map(d => (
                  <span key={d} className="text-xs px-3 py-1.5 rounded-full text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {d}
                  </span>
                ))}
              </div>
              <Link href="/tours/register?direction=inbound"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white no-underline transition-colors"
                style={{ background: 'var(--green)' }}>
                Plan Your Tour →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
