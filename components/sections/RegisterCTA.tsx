import Link from 'next/link'

export default function RegisterCTA() {
  return (
    <section className="text-center relative overflow-hidden" style={{ background: 'var(--black)', padding: '5rem 0' }}>
      {/* UAE flag colors background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: 'var(--green)' }} />
        <div className="absolute inset-y-0 right-0 w-1.5" style={{ background: 'var(--red)' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--green), var(--white), var(--red))' }} />
      </div>
      <div className="container-uae relative z-10 max-w-2xl mx-auto">
        <div className="text-5xl mb-4">🇦🇪🏏</div>
        <h2 className="font-display leading-none text-white mb-4"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
          Get Your Cricket<br />
          <span style={{ color: 'var(--red)' }}>Business Listed</span>
        </h2>
        <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
          Academy, coaching services, shop, team, or ground — get discovered by thousands of cricket enthusiasts across the UAE.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/list-business"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'var(--red)', color: 'white' }}>
            List Your Business — Free
          </Link>
          <Link href="/classifieds/new"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-medium transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
            Post a Classified →
          </Link>
        </div>
      </div>
    </section>
  )
}
