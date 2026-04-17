import Link from 'next/link'

const outbound = ['🇮🇳 India', '🇵🇰 Pakistan', '🇱🇰 Sri Lanka', '🇧🇩 Bangladesh', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇦🇺 Australia', '🇿🇦 South Africa', '+ More']
const inbound  = ['🏟️ Dubai Sports City', '🏟️ Sharjah Stadium', '🏟️ Zayed Cricket', '🌤️ Best weather Oct–Apr']

export default function ToursSection() {
  return (
    <section style={{ background: 'var(--black)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
            Exclusive Feature
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">Cricket Tours Connect</h2>
          <p className="text-sm mt-2 max-w-lg" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            The only platform in the region connecting UAE cricket teams with overseas clubs for international tours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { dir: 'uae-outbound', icon: '✈️', label: 'UAE Teams Going Abroad', title: 'Tour Any Country in the World', desc: 'Register your UAE team, pick your destination, and we connect you with host clubs who arrange matches, grounds, and logistics.', tags: outbound, cta: 'Register Your Team →', href: '/tours/register?direction=outbound' },
            { dir: 'uae-inbound',  icon: '🛬', label: 'Overseas Teams Visiting UAE', title: 'Bring Your Team to the UAE', desc: 'Overseas clubs get matched with local teams, world-class venues in Dubai, Sharjah & Abu Dhabi, plus full logistics support.', tags: inbound, cta: 'Plan Your Tour →', href: '/tours/register?direction=inbound' },
          ].map(card => (
            <div key={card.dir} className="rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all hover:scale-[1.01]"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(0,154,68,0.08) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'rgba(239,51,64,0.15)' }}>{card.icon}</span>
                  <span className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: 'var(--red-mid)' }}>
                    {card.label}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">{card.title}</h3>
                <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{card.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {card.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link href={card.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                  style={{ background: 'var(--green)' }}>
                  {card.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
