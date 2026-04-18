import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Cricket Shops UAE — Multi-Vendor Marketplace | MyCricket.ae' }

const VENDORS = [
  {
    id: 'cricket-store-dubai', name: 'Cricket Store Dubai', emirate: 'Dubai', area: 'Al Quoz',
    rating: 4.8, reviews: 312, products: 24, orders: 450, verified: true,
    desc: 'Dubai\'s largest cricket equipment store. Stocks all major brands — Gray Nicolls, Kookaburra, SG, MRF. Same-day delivery in Dubai.',
    speciality: 'Bats & Equipment', emoji: '🏏',
    highlights: ['Same-day Dubai delivery', 'Gray Nicolls authorised dealer', '24 products listed', 'Est. 2015'],
    whatsapp: '+97150000001',
  },
  {
    id: 'sports-world-uae', name: 'Sports World UAE', emirate: 'Dubai', area: 'Deira',
    rating: 4.7, reviews: 241, products: 18, orders: 380, verified: true,
    desc: 'Premium cricket and multi-sport retailer. Specialists in protective gear — helmets, pads, gloves. Adidas, New Balance, Kookaburra stockist.',
    speciality: 'Protective Gear & Shoes', emoji: '⛑️',
    highlights: ['Adidas official stockist', 'New Balance cricket range', '18 products', 'Walk-in store available'],
    whatsapp: '+97150000002',
  },
  {
    id: 'uae-cricket-kits', name: 'UAE Cricket Kits', emirate: 'Dubai', area: 'Dubai Sports City',
    rating: 4.9, reviews: 203, products: 12, orders: 620, verified: true,
    desc: 'UAE\'s #1 custom cricket jersey and kit specialist. Full sublimation printing, 7-day turnaround. Used by 200+ UAE cricket clubs.',
    speciality: 'Custom Jerseys & Kits', emoji: '🎽',
    highlights: ['200+ club clients', '7-day delivery', 'Min 5 pieces', 'Free design service'],
    whatsapp: '+97150000003',
  },
  {
    id: 'icc-academy-store', name: 'ICC Academy Store', emirate: 'Dubai', area: 'Dubai Sports City',
    rating: 4.9, reviews: 124, products: 31, orders: 290, verified: true,
    desc: 'Official store of ICC Cricket Academy Dubai. Professional and academy-grade equipment. Bowling machines, match balls, team kits.',
    speciality: 'Professional & Academy Equipment', emoji: '🏆',
    highlights: ['ICC Academy official', 'Professional grade only', 'Bowling machines in stock', 'Team discounts available'],
    whatsapp: '+97154305133',
  },
]

const STATS = [
  { label: 'Verified Vendors', value: '4+' },
  { label: 'Products Listed', value: '85+' },
  { label: 'Orders Completed', value: '1,700+' },
  { label: 'UAE Delivery', value: 'Free AED 200+' },
]

export default function ShopsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-14">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Multi-Vendor Marketplace</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Cricket Shops UAE</h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Verified cricket equipment vendors across the UAE. Shop from multiple stores in one checkout.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl text-white mb-0.5">{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        {/* How multi-vendor works */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>How Multi-Vendor Shopping Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: '1', icon: '🔍', title: 'Browse Products', desc: 'Shop from multiple UAE cricket vendors in one place' },
              { step: '2', icon: '🛒', title: 'Add to Cart', desc: 'Mix products from different vendors in one cart' },
              { step: '3', icon: '💳', title: 'Single Checkout', desc: 'Pay once — we handle distribution to each vendor' },
              { step: '4', icon: '📦', title: 'Direct Delivery', desc: 'Each vendor ships their items to your door' },
            ].map(s => (
              <div key={s.step} className="text-center p-4 rounded-2xl" style={{ background: 'var(--off-white)' }}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display text-lg mb-1" style={{ color: 'var(--black)' }}>{s.title}</div>
                <p className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor cards */}
        <h2 className="font-display text-3xl mb-5" style={{ color: 'var(--black)' }}>Our Verified Vendors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {VENDORS.map(v => (
            <div key={v.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--white)', border: '2px solid var(--border)' }}>
              {/* Vendor header */}
              <div className="p-5" style={{ background: 'var(--black)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.1)', fontSize: 28 }}>
                    {v.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xl text-white">{v.name}</h3>
                      {v.verified && <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--green)', fontSize: 10 }}>✓ Verified</span>}
                    </div>
                    <div className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      📍 {v.area}, {v.emirate} · ⭐ {v.rating} ({v.reviews} reviews)
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(239,51,64,0.2)', color: 'var(--red)' }}>
                      {v.speciality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vendor body */}
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{v.desc}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Products', value: v.products },
                    { label: 'Orders', value: v.orders + '+' },
                    { label: 'Rating', value: v.rating },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--off-white)' }}>
                      <div className="font-display text-xl" style={{ color: 'var(--red)' }}>{s.value}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {v.highlights.map(h => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/shop?vendor=${v.id}`}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white text-center"
                    style={{ background: 'var(--red)' }}>
                    Browse Products →
                  </Link>
                  <a href={`https://wa.me/${v.whatsapp.replace(/\D/g,'')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: '#25D366' }}>
                    💬
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sell CTA */}
        <div className="rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.3)' }}>
          <div>
            <h3 className="font-display text-3xl text-white mb-2">Sell Cricket Gear on MyCricket.ae</h3>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Join our verified vendor network. Free to start — only pay commission on sales.
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>✓ Free listing</span>
              <span>✓ Only 10% commission</span>
              <span>✓ Weekly payouts to UAE bank</span>
              <span>✓ Your own vendor dashboard</span>
            </div>
          </div>
          <Link href="/vendor/onboarding"
            className="px-6 py-3 rounded-xl text-sm font-medium text-white flex-shrink-0"
            style={{ background: 'var(--red)' }}>
            Start Selling Free →
          </Link>
        </div>
      </div>
    </div>
  )
}
