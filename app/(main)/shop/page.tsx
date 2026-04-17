import { Metadata } from 'next'
import Link from 'next/link'
import { Search, ShoppingCart, Star, Truck } from 'lucide-react'
import { PRODUCT_CATEGORIES, CRICKET_BRANDS, formatAED } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cricket Shop UAE — Bats, Kits, Gear & More',
  description: 'Buy cricket gear online in UAE. Bats, pads, gloves, helmets, jerseys and more from top brands. Multi-vendor cricket marketplace.',
}

const featuredProducts = [
  { id: '1', name: 'Gray Nicolls Legend DXM', brand: 'Gray Nicolls', category: 'Bats', price: 899, compare_price: 1100, rating: 4.8, reviews: 124, icon: '🏏', vendor: 'Cricket Store Dubai', badge: 'Best Seller' },
  { id: '2', name: 'Kookaburra Pro 500 Helmet', brand: 'Kookaburra', category: 'Helmets', price: 450, compare_price: 550, rating: 4.7, reviews: 89, icon: '⛑️', vendor: 'Sports World UAE', badge: 'Top Rated' },
  { id: '3', name: 'Custom Team Jersey Set (11)', brand: 'Custom Print', category: 'Jerseys', price: 950, compare_price: null, rating: 4.9, reviews: 203, icon: '🎽', vendor: 'UAE Cricket Kits', badge: 'Popular' },
  { id: '4', name: 'SG Test Match Red Ball (6pk)', brand: 'SG', category: 'Balls', price: 280, compare_price: 320, rating: 4.6, reviews: 67, icon: '⚾', vendor: 'Cricket Store Dubai', badge: null },
  { id: '5', name: 'Adidas Adipower Batting Gloves', brand: 'Adidas', category: 'Gloves', price: 195, compare_price: 230, rating: 4.5, reviews: 45, icon: '🥊', vendor: 'Sports World UAE', badge: 'Sale' },
  { id: '6', name: 'Complete Junior Kit — Age 8–12', brand: 'Kookaburra', category: 'Bundles', price: 750, compare_price: 950, rating: 4.8, reviews: 156, icon: '📦', vendor: 'Cricket Store Dubai', badge: 'Bundle Deal' },
  { id: '7', name: 'SS Ton Supreme Batting Pads', brand: 'SS Ton', category: 'Pads', price: 320, compare_price: null, rating: 4.4, reviews: 38, icon: '🦺', vendor: 'UAE Cricket Kits', badge: null },
  { id: '8', name: 'New Balance CK4040 Spikes', brand: 'New Balance', category: 'Shoes', price: 420, compare_price: 499, rating: 4.7, reviews: 91, icon: '👟', vendor: 'Sports World UAE', badge: 'New' },
]

const bannerFeatures = [
  { icon: <Truck size={18} />, text: 'Free delivery over AED 200' },
  { icon: <Star size={18} />, text: 'Verified UAE vendors only' },
  { icon: <ShoppingCart size={18} />, text: 'Secure Telr checkout' },
]

export default function ShopPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
            Multi-vendor marketplace
          </div>
          <h1 className="font-display text-6xl text-white tracking-wide mb-3">Cricket Shop</h1>
          <p className="text-white/50 text-sm max-w-lg mb-8">
            Bats, pads, helmets, jerseys, custom kits & more — from trusted UAE cricket vendors.
          </p>
          {/* Search */}
          <div className="flex items-center gap-3 max-w-xl px-5 py-1.5 rounded-2xl mb-6"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={16} className="text-white/40 flex-shrink-0" />
            <input placeholder="Search bats, jerseys, gloves..."
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-white/35 py-2.5" />
            <button className="px-5 py-2 rounded-xl text-sm font-medium flex-shrink-0"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              Search
            </button>
          </div>
          {/* Feature strip */}
          <div className="flex flex-wrap gap-5">
            {bannerFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                <span style={{ color: 'var(--gold)' }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="px-4 py-12" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-3xl tracking-wide" style={{ color: 'var(--ink)' }}>
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
            {PRODUCT_CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/shop/${cat.slug}`}
                className="no-underline flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:-translate-y-0.5 group"
                style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-center font-medium leading-tight group-hover:text-[var(--green)] transition-colors"
                  style={{ color: 'var(--ink)' }}>
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured products */}
      <div className="px-4 py-12" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--green)' }}>
                Handpicked
              </div>
              <h2 className="font-display text-4xl tracking-wide" style={{ color: 'var(--ink)' }}>
                Featured Products
              </h2>
            </div>
            <Link href="/shop/all" className="text-sm no-underline px-4 py-2 rounded-lg transition-all"
              style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts.map(p => (
              <Link key={p.id} href={`/shop/product/${p.id}-${p.name.toLowerCase().replace(/\s+/g,'-')}`}
                className="no-underline rounded-xl overflow-hidden block group transition-all hover:-translate-y-1"
                style={{ background: '#fff', border: '1px solid var(--border)' }}>
                {/* Image */}
                <div className="h-44 flex items-center justify-center relative" style={{ background: 'var(--green-light)' }}>
                  <span className="text-5xl">{p.icon}</span>
                  {p.badge && (
                    <span className="absolute top-2 left-2 text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: p.badge === 'Sale' ? '#c0392b' : 'var(--green)', color: '#fff' }}>
                      {p.badge}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: '#fff', border: '1px solid var(--border)' }}>
                    ♡
                  </button>
                </div>
                {/* Details */}
                <div className="p-4">
                  <div className="text-xs mb-0.5 font-mono-dm" style={{ color: 'var(--ink-light)' }}>{p.brand}</div>
                  <div className="text-sm font-medium leading-snug mb-2 group-hover:text-[var(--green)] transition-colors"
                    style={{ color: 'var(--ink)' }}>
                    {p.name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-xl tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(p.price)}
                    </span>
                    {p.compare_price && (
                      <span className="text-xs line-through" style={{ color: 'var(--ink-light)' }}>
                        {formatAED(p.compare_price)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-xs">
                      <span style={{ color: 'var(--gold)' }}>★ {p.rating}</span>
                      <span style={{ color: 'var(--ink-light)' }}>({p.reviews})</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{p.vendor}</span>
                  </div>
                  <button className="w-full mt-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    style={{ background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--border)' }}>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom jersey CTA */}
      <div className="px-4 py-12" style={{ background: 'var(--green-dark)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2 text-white/50">
              Most popular
            </div>
            <h2 className="font-display text-4xl text-white tracking-wide mb-2">
              Custom Team Jerseys & Kits
            </h2>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Full sublimation printing, your logo, name & number. Minimum 5 pieces. Delivered across UAE in 7–10 days.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Sublimation Print', 'Name & Number', 'Min 5 pcs', 'All sizes', '7–10 days delivery'].map(f => (
                <span key={f} className="text-xs px-3 py-1.5 rounded-full text-white/70"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/shop/custom"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline text-center"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              Design Your Kit →
            </Link>
            <Link href="/shop/jerseys"
              className="px-8 py-3.5 rounded-lg text-sm font-medium no-underline text-center"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
              Browse Ready-made Kits
            </Link>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="px-4 py-10" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-6 text-center" style={{ color: 'var(--ink-light)' }}>
            Top brands available
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CRICKET_BRANDS.map(b => (
              <Link key={b} href={`/shop/all?brand=${encodeURIComponent(b)}`}
                className="no-underline px-4 py-2 rounded-lg text-xs font-medium transition-all hover:border-[var(--green)] hover:text-[var(--green)]"
                style={{ border: '1px solid var(--border)', color: 'var(--ink-light)', background: 'var(--cream)' }}>
                {b}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor CTA */}
      <div className="px-4 py-12" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl tracking-wide mb-3" style={{ color: 'var(--ink)' }}>
            Sell on MyCricket.ae
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-light)' }}>
            Have cricket gear to sell? Join our multi-vendor marketplace and reach thousands of cricket enthusiasts across the UAE.
          </p>
          <Link href="/vendor/dashboard"
            className="inline-block px-8 py-3.5 rounded-lg text-sm font-medium no-underline"
            style={{ background: 'var(--green)', color: '#fff' }}>
            Become a Vendor →
          </Link>
        </div>
      </div>
    </div>
  )
}
