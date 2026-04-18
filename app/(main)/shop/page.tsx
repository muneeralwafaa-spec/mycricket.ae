'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Star, Truck, Shield, RefreshCw } from 'lucide-react'
import { addToCart, getCartCount } from '@/lib/cart'

const CATEGORIES = ['All', 'Bats', 'Pads', 'Gloves', 'Helmets', 'Balls', 'Shoes', 'Jerseys', 'Kits', 'Bags', 'Equipment']
const BRANDS = ['All Brands', 'Gray Nicolls', 'Kookaburra', 'SG', 'SS Ton', 'Adidas', 'New Balance', 'Shrey', 'GM', 'MRF']
const PRICE_RANGES = ['Any Price', 'Under AED 100', 'AED 100–300', 'AED 300–600', 'Above AED 600']

const ALL_PRODUCTS = [
  { id: 'gn-legend-dxm',          name: 'Gray Nicolls Legend DXM',             brand: 'Gray Nicolls',  category: 'Bats',      price: 899,  compare: 1100, rating: 4.8, reviews: 124, vendor: 'Cricket Store Dubai',  vendor_id: 'v1', badge: 'Best Seller' },
  { id: 'sg-test-ball-6pk',        name: 'SG Test Match Red Balls × 6',         brand: 'SG',            category: 'Balls',     price: 280,  compare: 320,  rating: 4.6, reviews: 67,  vendor: 'Cricket Store Dubai',  vendor_id: 'v1', badge: undefined },
  { id: 'complete-junior-kit',     name: 'Complete Junior Cricket Kit Age 8–12', brand: 'Kookaburra',    category: 'Kits',      price: 750,  compare: 950,  rating: 4.8, reviews: 156, vendor: 'Cricket Store Dubai',  vendor_id: 'v1', badge: 'Bundle Deal' },
  { id: 'gn-bat-legend-2',         name: 'Gray Nicolls Destroyer DXM',          brand: 'Gray Nicolls',  category: 'Bats',      price: 650,  compare: 780,  rating: 4.6, reviews: 88,  vendor: 'Cricket Store Dubai',  vendor_id: 'v1', badge: 'Sale' },
  { id: 'kookaburra-helmet-pro500',name: 'Kookaburra Pro 500 Helmet',            brand: 'Kookaburra',    category: 'Helmets',   price: 450,  compare: 550,  rating: 4.7, reviews: 89,  vendor: 'Sports World UAE',     vendor_id: 'v2', badge: 'Top Rated' },
  { id: 'adidas-batting-gloves',   name: 'Adidas Adipower Batting Gloves',       brand: 'Adidas',        category: 'Gloves',    price: 195,  compare: 230,  rating: 4.5, reviews: 45,  vendor: 'Sports World UAE',     vendor_id: 'v2', badge: undefined },
  { id: 'nb-ck4040-spikes',        name: 'New Balance CK4040 Cricket Spikes',    brand: 'New Balance',   category: 'Shoes',     price: 420,  compare: 499,  rating: 4.7, reviews: 91,  vendor: 'Sports World UAE',     vendor_id: 'v2', badge: 'New' },
  { id: 'gm-pads-six6',            name: 'GM Six6 Batting Pads',                 brand: 'GM',            category: 'Pads',      price: 280,  compare: undefined, rating: 4.5, reviews: 52, vendor: 'Sports World UAE', vendor_id: 'v2', badge: undefined },
  { id: 'custom-jersey-11',        name: 'Custom Team Jersey Set (11 players)',  brand: 'Custom Print',  category: 'Jerseys',   price: 950,  compare: undefined, rating: 4.9, reviews: 203, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: 'Popular' },
  { id: 'ss-ton-pads-supreme',     name: 'SS Ton Supreme Batting Pads',          brand: 'SS Ton',        category: 'Pads',      price: 320,  compare: undefined, rating: 4.4, reviews: 38, vendor: 'UAE Cricket Kits',  vendor_id: 'v3', badge: undefined },
  { id: 'custom-jersey-5',         name: 'Custom Club Jerseys (Min 5 pieces)',   brand: 'Custom Print',  category: 'Jerseys',   price: 350,  compare: undefined, rating: 4.8, reviews: 167, vendor: 'UAE Cricket Kits', vendor_id: 'v3', badge: 'Popular' },
  { id: 'kit-bag-duffle',          name: 'Large Cricket Kit Bag — Duffle Style', brand: 'Kookaburra',    category: 'Bags',      price: 180,  compare: 220,  rating: 4.5, reviews: 73,  vendor: 'UAE Cricket Kits',     vendor_id: 'v3', badge: undefined },
  { id: 'bola-bowling-machine',    name: 'BOLA Professional Bowling Machine',    brand: 'BOLA',          category: 'Equipment', price: 4500, compare: 5200, rating: 4.9, reviews: 24,  vendor: 'ICC Academy Store',    vendor_id: 'v4', badge: 'Pro Equipment' },
  { id: 'kookaburra-match-balls',  name: 'Kookaburra Match Balls × 12',          brand: 'Kookaburra',    category: 'Balls',     price: 480,  compare: 540,  rating: 4.8, reviews: 45,  vendor: 'ICC Academy Store',    vendor_id: 'v4', badge: undefined },
  { id: 'shrey-pro-guard-helmet',  name: 'Shrey Pro Guard Helmet — Steel Grill', brand: 'Shrey',         category: 'Helmets',   price: 380,  compare: 450,  rating: 4.7, reviews: 112, vendor: 'ICC Academy Store',    vendor_id: 'v4', badge: 'Top Rated' },
  { id: 'mrf-virat-bat',           name: 'MRF Genius Grand Edition',             brand: 'MRF',           category: 'Bats',      price: 780,  compare: 920,  rating: 4.7, reviews: 89,  vendor: 'ICC Academy Store',    vendor_id: 'v4', badge: 'New' },
]

const CAT_EMOJI: Record<string, string> = {
  Bats: '🏏', Pads: '🦺', Gloves: '🥊', Helmets: '⛑️', Balls: '🔴',
  Shoes: '👟', Jerseys: '🎽', Kits: '🎒', Bags: '🎒', Equipment: '⚙️',
}
const CAT_BG: Record<string, string> = {
  Bats: 'linear-gradient(135deg,#1a1a2e,#16213e)',
  Pads: 'linear-gradient(135deg,#1a1a2e,#16213e)',
  Gloves: 'linear-gradient(135deg,#0d2137,#1a3a5c)',
  Helmets: 'linear-gradient(135deg,#2e1a1a,#4a2d2d)',
  Balls: 'linear-gradient(135deg,#2e1a1a,#4a2d2d)',
  Shoes: 'linear-gradient(135deg,#1a2e1a,#2d4a2d)',
  Jerseys: 'linear-gradient(135deg,#0d2137,#1a3a5c)',
  Kits: 'linear-gradient(135deg,#1a2e1a,#2d4a2d)',
  Bags: 'linear-gradient(135deg,#1a2e1a,#2d4a2d)',
  Equipment: 'linear-gradient(135deg,#2e2a1a,#4a3d1a)',
}

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All Brands')
  const [priceRange, setPriceRange] = useState('Any Price')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [cartCount, setCartCount] = useState(0)
  const [addedIds, setAddedIds] = useState<string[]>([])

  useEffect(() => {
    setCartCount(getCartCount())
    const handler = () => setCartCount(getCartCount())
    window.addEventListener('cart-updated', handler)
    return () => window.removeEventListener('cart-updated', handler)
  }, [])

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
    return b.reviews - a.reviews
  })

  const handleAddToCart = (p: typeof ALL_PRODUCTS[0], e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ id: p.id, name: p.name, price: p.price, vendor: p.vendor, vendor_id: p.vendor_id, category: p.category })
    setAddedIds(prev => [...prev, p.id])
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== p.id)), 2000)
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-14">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Multi-Vendor Marketplace</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Cricket Shop UAE</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {ALL_PRODUCTS.length}+ products from 4 verified UAE vendors
          </p>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl max-w-xl"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search bats, helmets, jerseys, equipment..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40" />
          </div>
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
        <div className="container-uae flex gap-4 overflow-x-auto items-center">
          {['Cricket Store Dubai ✓', 'Sports World UAE ✓', 'UAE Cricket Kits ✓', 'ICC Academy Store ✓'].map(v => (
            <div key={v} className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <span className="text-xs font-medium text-white">{v}</span>
            </div>
          ))}
          <Link href="/shops" className="flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ml-auto"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
            View All Vendors →
          </Link>
          <Link href="/vendor/onboarding"
            className="flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'var(--red)', color: 'white' }}>
            + Sell Here
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3">
          <div className="flex gap-1.5 overflow-x-auto mb-2 pb-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
                style={{ background: category === c ? 'var(--red)' : 'var(--cream)', color: category === c ? 'white' : 'var(--black)', border: `1px solid ${category === c ? 'var(--red)' : 'var(--border)'}` }}>
                {c}
              </button>
            ))}
          </div>
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
          <div className="text-sm" style={{ color: 'var(--ink-light)' }}>{filtered.length} products found</div>
          {cartCount > 0 && (
            <Link href="/shop/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white animate-pulse"
              style={{ background: 'var(--red)' }}>
              <ShoppingCart size={14} /> Cart ({cartCount} items)
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => {
            const added = addedIds.includes(p.id)
            return (
              <div key={p.id} className="rounded-2xl overflow-hidden card-hover"
                style={{ background: 'var(--white)', border: added ? '2px solid var(--green)' : '1px solid var(--border)', transition: 'border 0.3s' }}>
                <Link href={`/shop/product/${p.id}`} className="block">
                  <div className="relative flex items-center justify-center" style={{ height: 176, background: CAT_BG[p.category] || 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                    <span style={{ fontSize: 56 }}>{CAT_EMOJI[p.category] || '🏏'}</span>
                    {p.badge && (
                      <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: p.badge === 'Sale' ? 'var(--red)' : p.badge === 'New' ? 'var(--green)' : 'var(--gold)', color: 'white', fontSize: 10 }}>
                        {p.badge}
                      </span>
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
                  <button onClick={e => handleAddToCart(p, e)}
                    className="w-full py-2 rounded-xl text-xs font-medium transition-all"
                    style={{
                      background: added ? 'var(--green)' : 'var(--red)',
                      color: 'white',
                      transform: added ? 'scale(0.98)' : 'scale(1)',
                    }}>
                    {added ? '✓ Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No products found</h3>
            <button onClick={() => { setCategory('All'); setBrand('All Brands'); setPriceRange('Any Price'); setSearch('') }}
              className="px-5 py-2 rounded-xl text-sm text-white mt-2" style={{ background: 'var(--red)' }}>
              Clear Filters
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.3)' }}>
          <div>
            <h3 className="font-display text-2xl text-white mb-1">Sell Cricket Gear on MyCricket.ae</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Free to list. Only 10% commission on sales. Weekly UAE bank payouts.</p>
          </div>
          <Link href="/vendor/onboarding" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0" style={{ background: 'var(--red)' }}>
            Start Selling →
          </Link>
        </div>
      </div>
    </div>
  )
}
