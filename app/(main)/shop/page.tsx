'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Star, Truck, Shield, RefreshCw, Filter } from 'lucide-react'

const CATEGORIES = ['All', 'Bats', 'Pads', 'Gloves', 'Helmets', 'Balls', 'Shoes', 'Jerseys', 'Kits', 'Bags', 'Equipment']
const BRANDS = ['All Brands', 'Gray Nicolls', 'Kookaburra', 'SG', 'SS Ton', 'Adidas', 'New Balance', 'Shrey', 'GM', 'MRF']
const PRICE_RANGES = ['Any Price', 'Under AED 100', 'AED 100–300', 'AED 300–600', 'Above AED 600']

// Real product data — multiple vendors
const ALL_PRODUCTS = [
  // Cricket Store Dubai
  { id: 'gn-legend-dxm', name: 'Gray Nicolls Legend DXM', brand: 'Gray Nicolls', category: 'Bats', price: 899, compare: 1100, rating: 4.8, reviews: 124, vendor: 'Cricket Store Dubai', vendor_id: 'v1', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80', inStock: true, desc: 'Grade 1 English Willow. Professional grade bat used by UAE international players.' },
  { id: 'sg-test-ball-6pk', name: 'SG Test Match Red Balls × 6', brand: 'SG', category: 'Balls', price: 280, compare: 320, rating: 4.6, reviews: 67, vendor: 'Cricket Store Dubai', vendor_id: 'v1', badge: null, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80', inStock: true, desc: 'Official SG Test match balls. Used in UAE domestic competitions.' },
  { id: 'complete-junior-kit', name: 'Complete Junior Cricket Kit Age 8–12', brand: 'Kookaburra', category: 'Kits', price: 750, compare: 950, rating: 4.8, reviews: 156, vendor: 'Cricket Store Dubai', vendor_id: 'v1', badge: 'Bundle Deal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', inStock: true, desc: 'Complete junior kit including bat, pads, gloves, helmet and bag.' },
  { id: 'gn-bat-legend-2', name: 'Gray Nicolls Destroyer DXM', brand: 'Gray Nicolls', category: 'Bats', price: 650, compare: 780, rating: 4.6, reviews: 88, vendor: 'Cricket Store Dubai', vendor_id: 'v1', badge: 'Sale', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80', inStock: true, desc: 'Grade 2 English Willow. Great value for club cricketers.' },

  // Sports World UAE
  { id: 'kookaburra-helmet-pro500', name: 'Kookaburra Pro 500 Helmet', brand: 'Kookaburra', category: 'Helmets', price: 450, compare: 550, rating: 4.7, reviews: 89, vendor: 'Sports World UAE', vendor_id: 'v2', badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80', inStock: true, desc: 'ICC approved. Steel grill. Available in all sizes.' },
  { id: 'adidas-batting-gloves', name: 'Adidas Adipower Batting Gloves', brand: 'Adidas', category: 'Gloves', price: 195, compare: 230, rating: 4.5, reviews: 45, vendor: 'Sports World UAE', vendor_id: 'v2', badge: null, image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=400&q=80', inStock: true, desc: 'Premium leather palm, excellent grip and protection.' },
  { id: 'nb-ck4040-spikes', name: 'New Balance CK4040 Cricket Spikes', brand: 'New Balance', category: 'Shoes', price: 420, compare: 499, rating: 4.7, reviews: 91, vendor: 'Sports World UAE', vendor_id: 'v2', badge: 'New', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', inStock: true, desc: 'Professional grade cricket spikes. Used by international players.' },
  { id: 'gm-pads-six6', name: 'GM Six6 Batting Pads', brand: 'GM', category: 'Pads', price: 280, compare: null, rating: 4.5, reviews: 52, vendor: 'Sports World UAE', vendor_id: 'v2', badge: null, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=400&q=80', inStock: true, desc: 'Lightweight pads with maximum protection. Top choice for UAE club cricketers.' },

  // UAE Cricket Kits
  { id: 'custom-jersey-11', name: 'Custom Team Jersey Set (11 players)', brand: 'Custom Print', category: 'Jerseys', price: 950, compare: null, rating: 4.9, reviews: 203, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: 'Popular', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&q=80', inStock: true, desc: 'Full sublimation. Your club name, number, logo. Delivered in 7 days.' },
  { id: 'ss-ton-pads-supreme', name: 'SS Ton Supreme Batting Pads', brand: 'SS Ton', category: 'Pads', price: 320, compare: null, rating: 4.4, reviews: 38, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: null, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=400&q=80', inStock: true, desc: 'Used by Indian national team players. Premium protection.' },
  { id: 'custom-jersey-5', name: 'Custom Club Jerseys (Min 5 pieces)', brand: 'Custom Print', category: 'Jerseys', price: 350, compare: null, rating: 4.8, reviews: 167, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: 'Popular', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&q=80', inStock: true, desc: 'Minimum 5 pieces. Full sublimation, moisture-wicking polyester.' },
  { id: 'kit-bag-duffle', name: 'Large Cricket Kit Bag — Duffle Style', brand: 'Kookaburra', category: 'Bags', price: 180, compare: 220, rating: 4.5, reviews: 73, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: null, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80', inStock: true, desc: 'Fits full adult kit. Bat sleeve, shoe compartment, multiple pockets.' },

  // ICC Academy Store
  { id: 'bola-bowling-machine', name: 'BOLA Professional Bowling Machine', brand: 'BOLA', category: 'Equipment', price: 4500, compare: 5200, rating: 4.9, reviews: 24, vendor: 'ICC Academy Store', vendor_id: 'v4', badge: 'Pro Equipment', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80', inStock: true, desc: 'Professional bowling machine. 40–90mph. Used by national teams.' },
  { id: 'kookaburra-match-balls', name: 'Kookaburra Match Balls × 12', brand: 'Kookaburra', category: 'Balls', price: 480, compare: 540, rating: 4.8, reviews: 45, vendor: 'ICC Academy Store', vendor_id: 'v4', badge: null, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80', inStock: true, desc: 'Official match balls. Bulk pack of 12. Used in ILT20.' },
  { id: 'shrey-pro-guard-helmet', name: 'Shrey Pro Guard Helmet — Steel Grill', brand: 'Shrey', category: 'Helmets', price: 380, compare: 450, rating: 4.7, reviews: 112, vendor: 'ICC Academy Store', vendor_id: 'v4', badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80', inStock: true, desc: 'ICC Standard. Titanium grill available. Preferred by UAE international players.' },
  { id: 'mrf-virat-bat', name: 'MRF Genius Grand Edition', brand: 'MRF', category: 'Bats', price: 780, compare: 920, rating: 4.7, reviews: 89, vendor: 'ICC Academy Store', vendor_id: 'v4', badge: 'New', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80', inStock: true, desc: 'Grade 1 EW. The bat associated with Virat Kohli. Premium blade.' },
]

const VENDORS = [
  { id: 'v1', name: 'Cricket Store Dubai', rating: 4.8, products: 24, verified: true, emirate: 'Dubai' },
  { id: 'v2', name: 'Sports World UAE', rating: 4.7, products: 18, verified: true, emirate: 'Dubai' },
  { id: 'v3', name: 'UAE Cricket Kits', rating: 4.9, products: 12, verified: true, emirate: 'Dubai' },
  { id: 'v4', name: 'ICC Academy Store', rating: 4.9, products: 31, verified: true, emirate: 'Dubai Sports City' },
]

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All Brands')
  const [priceRange, setPriceRange] = useState('Any Price')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [cart, setCart] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filtered = ALL_PRODUCTS.filter(p => {
    if (category !== 'All' && p.category !== category) return false
    if (brand !== 'All Brands' && p.brand !== brand) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false
    if (priceRange === 'Under AED 100' && p.price >= 100) return false
    if (priceRange === 'AED 100–300' && (p.price < 100 || p.price > 300)) return false
    if (priceRange === 'AED 300–600' && (p.price < 300 || p.price > 600)) return false
    if (priceRange === 'Above AED 600' && p.price <= 600) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return b.reviews - a.reviews // popular
  })

  const addToCart = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setCart(prev => [...prev, id])
    // Show brief feedback
    const btn = e.currentTarget as HTMLElement
    btn.textContent = '✓ Added!'
    setTimeout(() => { btn.textContent = 'Add to Cart' }, 1500)
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-14">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Multi-Vendor Marketplace
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Cricket Shop UAE</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {ALL_PRODUCTS.length}+ products from {VENDORS.length} verified UAE vendors
          </p>
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl max-w-xl"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search bats, helmets, jerseys, equipment..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40" />
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-5">
            {[
              { icon: <Truck size={14} />, text: 'Free delivery over AED 200' },
              { icon: <Shield size={14} />, text: 'Verified vendors only' },
              { icon: <RefreshCw size={14} />, text: '7-day returns' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ color: 'var(--green)' }}>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor strip */}
      <div style={{ background: 'var(--green-dark)', borderBottom: '2px solid var(--red)' }} className="px-4 py-3">
        <div className="container-uae flex gap-4 overflow-x-auto">
          {VENDORS.map(v => (
            <div key={v.id} className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <span className="text-xs font-medium text-white">{v.name}</span>
              {v.verified && <span className="text-xs text-white" style={{ color: 'var(--green)' }}>✓</span>}
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>⭐ {v.rating}</span>
            </div>
          ))}
          <Link href="/vendor/onboarding"
            className="flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'var(--red)', color: 'white' }}>
            + Sell on MyCricket.ae
          </Link>
        </div>
      </div>

      {/* Filters sticky */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3">
          {/* Category tabs */}
          <div className="flex gap-1.5 overflow-x-auto mb-2 pb-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
                style={{ background: category === c ? 'var(--red)' : 'var(--cream)', color: category === c ? 'white' : 'var(--black)', border: `1px solid ${category === c ? 'var(--red)' : 'var(--border)'}` }}>
                {c}
              </button>
            ))}
          </div>
          {/* Filter row */}
          <div className="flex gap-2 flex-wrap">
            <select value={brand} onChange={e => setBrand(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
              {BRANDS.map(b => <option key={b}>{b}</option>)}
            </select>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
              {PRICE_RANGES.map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs outline-none ml-auto"
              style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm" style={{ color: 'var(--ink-light)' }}>
            {filtered.length} products found
          </div>
          {cart.length > 0 && (
            <Link href="/shop/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--red)' }}>
              <ShoppingCart size={14} /> View Cart ({cart.length})
            </Link>
          )}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="rounded-2xl overflow-hidden card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <Link href={`/shop/product/${p.id}`} className="block">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
                  {p.badge && (
                    <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: p.badge === 'Sale' ? 'var(--red)' : p.badge === 'New' ? 'var(--green)' : 'var(--gold)', color: 'white', fontSize: 10 }}>
                      {p.badge}
                    </span>
                  )}
                  {!p.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <span className="text-white text-xs font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <div className="text-xs mb-0.5 truncate" style={{ color: 'var(--red)' }}>{p.vendor}</div>
                <Link href={`/shop/product/${p.id}`} className="block">
                  <div className="text-xs font-medium leading-tight mb-1.5 line-clamp-2" style={{ color: 'var(--black)' }}>{p.name}</div>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={10} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                  <span className="text-xs" style={{ color: 'var(--gold)' }}>{p.rating}</span>
                  <span className="text-xs" style={{ color: 'var(--ink-light)' }}>({p.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {p.price}</span>
                  {p.compare && <span className="text-xs line-through" style={{ color: 'var(--ink-light)' }}>AED {p.compare}</span>}
                </div>
                <button onClick={e => addToCart(p.id, e)} disabled={!p.inStock}
                  className="w-full py-2 rounded-xl text-xs font-medium transition-all"
                  style={{ background: p.inStock ? 'var(--red)' : 'var(--border)', color: p.inStock ? 'white' : 'var(--ink-light)', cursor: p.inStock ? 'pointer' : 'not-allowed' }}>
                  {p.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No products found</h3>
            <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Try different filters</p>
          </div>
        )}

        {/* Sell on platform CTA */}
        <div className="mt-10 rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.3)' }}>
          <div>
            <h3 className="font-display text-2xl text-white mb-1">Sell Cricket Gear on MyCricket.ae</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Join {VENDORS.length} verified vendors. Free to list. Only 10% commission on sales.
            </p>
          </div>
          <Link href="/vendor/onboarding"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0"
            style={{ background: 'var(--red)' }}>
            Start Selling →
          </Link>
        </div>
      </div>
    </div>
  )
}
