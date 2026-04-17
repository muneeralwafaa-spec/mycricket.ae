import Link from 'next/link'

export default function RegisterCTA() {
  return (
    <section className="py-20 px-4 text-center" style={{ background: 'var(--ink)', borderTop: '3px solid var(--gold)' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display leading-none text-white mb-4"
          style={{ fontSize: 'clamp(40px, 6vw, 68px)' }}>
          Get Your Cricket<br />
          <span style={{ color: 'var(--gold)' }}>Business Listed</span>
        </h2>
        <p className="text-base text-white/50 leading-relaxed mb-10">
          Academy, coaching services, shop, team, or ground — get discovered by thousands of cricket enthusiasts across the UAE.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/list-business"
            className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-90"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            List Your Business — Free
          </Link>
          <Link href="/classifieds/new"
            className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium no-underline transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
            Post a Classified →
          </Link>
        </div>
      </div>
    </section>
  )
}
