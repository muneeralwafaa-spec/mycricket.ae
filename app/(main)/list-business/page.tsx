import { Metadata } from 'next'
import { EMIRATES, FACILITY_TYPES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'List Your Cricket Business — MyCricket.ae',
  description: 'Register your cricket academy, coaching service, shop, ground, or tournament on MyCricket.ae.',
}

const listingTypes = [
  { value: 'facility', label: '🏟️ Academy / Facility', desc: 'Cricket academy, nets, ground, indoor centre' },
  { value: 'coach', label: '👤 Coach / Trainer', desc: 'Individual coaching, group sessions' },
  { value: 'umpire', label: '⚖️ Umpire / Scorer', desc: 'Match officiating services' },
  { value: 'shop', label: '🛍️ Cricket Shop', desc: 'Gear store, equipment supplier' },
  { value: 'tournament', label: '🏆 Tournament / League', desc: 'Organise and list your event' },
]

export default function RegisterPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
            Free Listing
          </div>
          <h1 className="font-display text-5xl text-white tracking-wide mb-3">
            List Your Business
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Get discovered by thousands of cricket enthusiasts across the UAE. Basic listing is completely free.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Type selector */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-4" style={{ color: 'var(--ink)' }}>
            What are you listing?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {listingTypes.map((t, i) => (
              <label key={t.value}
                className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all"
                style={{ border: i === 0 ? '2px solid var(--green)' : '1px solid var(--border)', background: i === 0 ? 'var(--green-light)' : '#fff' }}>
                <input type="radio" name="listing_type" value={t.value} defaultChecked={i === 0} className="mt-0.5" />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{t.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{t.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>
            Your Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Business / Name *
              </label>
              <input placeholder="e.g. Dubai Cricket Academy" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Emirate *
              </label>
              <select className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
                <option value="">Select Emirate</option>
                {EMIRATES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Contact Name *
              </label>
              <input placeholder="Your full name" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Phone / WhatsApp *
              </label>
              <input placeholder="+971 50 000 0000" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Email Address *
              </label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                Website (optional)
              </label>
              <input placeholder="https://yoursite.com" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
              Description *
            </label>
            <textarea rows={4} placeholder="Tell us about your academy, services, facilities..."
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button className="px-8 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              Submit Listing
            </button>
            <span className="text-xs" style={{ color: 'var(--ink-light)' }}>
              We review all listings within 24 hours
            </span>
          </div>
        </div>

        {/* Upgrade hint */}
        <div className="mt-6 p-5 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
          <div className="text-sm font-medium mb-1" style={{ color: 'var(--green-dark)' }}>
            ⭐ Want more visibility?
          </div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-light)' }}>
            Upgrade to a Featured listing for AED 99–499/month to appear at the top of search results, get a verified badge, and reach more users.
          </div>
        </div>
      </div>
    </div>
  )
}
