import { Metadata } from 'next'
import Link from 'next/link'
import { TOUR_DESTINATIONS } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cricket Tours Connect — UAE',
  description: 'Connect UAE cricket teams with overseas clubs for international tours. UAE teams touring abroad and overseas teams visiting UAE.',
}

const howItWorks = [
  { step: '01', title: 'Register your team', desc: 'Fill in your team details, available dates, and tour preferences.' },
  { step: '02', title: 'Select destination', desc: 'Choose where you want to tour or which part of UAE you want to visit.' },
  { step: '03', title: 'Get matched', desc: 'We connect you with a compatible host or visiting team.' },
  { step: '04', title: 'Confirm & play', desc: 'Finalise fixtures, logistics, and enjoy your cricket tour.' },
]

export default function ToursPage() {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
            Exclusive to MyCricket.ae
          </div>
          <h1 className="font-display text-white tracking-wide mb-4" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1 }}>
            Cricket Tours<br /><span style={{ color: 'var(--gold)' }}>Connect</span>
          </h1>
          <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed mb-10">
            The only platform in the region connecting UAE cricket teams with overseas clubs for international tours — and vice versa. Whether you want to tour abroad or bring your team to the UAE, we make it happen.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/tours/register?direction=outbound"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              ✈️ Tour Abroad (UAE Team)
            </Link>
            <Link href="/tours/register?direction=inbound"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
              🛬 Tour UAE (Overseas Team)
            </Link>
          </div>
        </div>
      </div>

      {/* Destinations */}
      <div className="px-4 py-16" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3 text-center text-white/40">
            Available Destinations
          </div>
          <h2 className="font-display text-4xl text-white text-center tracking-wide mb-8">
            Where Do You Want to Play?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {TOUR_DESTINATIONS.map(d => (
              <Link key={d.code}
                href={`/tours/register?direction=outbound&destination=${d.code}`}
                className="no-underline rounded-xl p-4 text-center block transition-all hover:-translate-y-1 group"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-3xl mb-2">{d.flag}</div>
                <div className="text-xs text-white/60 group-hover:text-[var(--gold)] transition-colors">
                  {d.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3 text-center text-white/40">
            Simple Process
          </div>
          <h2 className="font-display text-4xl text-white text-center tracking-wide mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {howItWorks.map(h => (
              <div key={h.step} className="text-center">
                <div className="font-display text-5xl mb-3" style={{ color: 'var(--gold)' }}>{h.step}</div>
                <div className="text-base font-medium text-white mb-2">{h.title}</div>
                <div className="text-sm text-white/50 leading-relaxed">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-16 text-center" style={{ borderTop: '1px solid rgba(200,150,30,0.2)', background: 'rgba(200,150,30,0.05)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-4xl text-white tracking-wide mb-3">Ready to Connect?</h2>
          <p className="text-sm text-white/50 mb-8 leading-relaxed">
            Register your team today. Our team will reach out within 48 hours with matching options.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/tours/register?direction=outbound"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline"
              style={{ background: 'var(--green)', color: '#fff' }}>
              Register UAE Team →
            </Link>
            <Link href="/tours/register?direction=inbound"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
              Register Overseas Team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
