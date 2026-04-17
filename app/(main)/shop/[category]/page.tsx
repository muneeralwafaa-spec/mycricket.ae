import { Metadata } from 'next'
import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import { PRODUCT_CATEGORIES, CRICKET_BRANDS, formatAED } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const cat = PRODUCT_CATEGORIES.find(c => c.slug === category)
  return {
    title: `${cat?.name ?? 'Products'} — Cricket Shop UAE`,
    description: `Buy cricket ${cat?.name.toLowerCase() ?? 'gear'} in UAE. Best brands, competitive prices, fast UAE delivery.`,
  }
}

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ['Gray Nicolls Legend DXM 5 Star', 'Kookaburra Kahuna Pro 600', 'SS Ton Supreme Grade 1', 'Gunn & Moore Diamond 606', 'MRF Grand Edition', 'CA Sports Plus 15000'][i % 6],
  brand: ['Gray Nicolls', 'Kookaburra', 'SS Ton', 'Gunn & Moore', 'MRF', 'CA Sports'][i % 6],
  price: [899, 1200, 750, 680, 550, 420][i % 6],
  compare_price: [1100, null, 900, 800, null, 500][i % 6],
  rating: [4.8, 4.9, 4.6, 4.5, 4.3, 4.7][i % 6],
  reviews: [124, 89, 67, 45, 23, 91][i % 6],
  icon: '🏏',
  vendor: ['Cricket Store Dubai', 'Sports World UAE', 'UAE Cricket Kits'][i % 3],
  in_stock: i !== 3,
  is_featured: i < 2,
}))

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = PRODUCT_CATEGORIES.find(c => c.slug === category) ?? { name: 'All Products', icon: '🏏', slug: category }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
            <Link href="/shop" className="no-underline text-white/40 hover:text-white/70">Shop</Link>
            <span>/</span>
            <span className="text-white/70">{cat.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{cat.icon}</span>
            <h1 className="font-display text-5xl text-white tracking-wide">{cat.name}</h1>
          </div>
          <p className="text-white/50 text-sm">{mockProducts.length} products available</p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 px-4 py-2 rounded-lg"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
            <Search size={14} style={{ color: 'var(--ink-light)' }} />
            <input placeholder={`Search ${cat.name.toLowerCase()}...`}
              className="bg-transparent text-sm outline-none flex-1" style={{ color: 'var(--ink)' }} />
          </div>
          <select className="px-4 py-2 rounded-lg text-sm outline-none"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option>All Brands</option>
            {CRICKET_BRANDS.map(b => <option key={b}>{b}</option>)}
          </select>
          <select className="px-4 py-2 rounded-lg text-sm outline-none"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option>Any Price</option>
            <option>Under AED 200</option>
            <option>AED 200–500</option>
            <option>AED 500–1000</option>
            <option>Over AED 1000</option>
          </select>
          <select className="px-4 py-2 rounded-lg text-sm outline-none"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option>Sort: Featured</option>
            <option>Price: Low–High</option>
            <option>Price: High–Low</option>
            <option>Best Rated</option>
            <option>Newest</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <SlidersHorizontal size={14} /> More Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Other categories quick nav */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {PRODUCT_CATEGORIES.map(c => (
            <Link key={c.id} href={`/shop/${c.slug}`}
              className="no-underline flex items-center gap-1.5 px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: c.slug === category ? 'var(--green)' : '#fff',
                color: c.slug === category ? '#fff' : 'var(--ink)',
                border: `1px solid ${c.slug === category ? 'var(--green)' : 'var(--border)'}`,
              }}>
              {c.icon} {c.name}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockProducts.map(p => (
            <Link key={p.id}
              href={`/shop/product/${p.id}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="no-underline rounded-xl overflow-hidden block group transition-all hover:-translate-y-1"
              style={{ background: '#fff', border: p.is_featured ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
              <div className="h-44 flex items-center justify-center relative" style={{ background: 'var(--green-light)' }}>
                <span className="text-5xl">{p.icon}</span>
                {!p.in_stock && (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--ink-light)' }}>
                      Out of Stock
                    </span>
                  </div>
                )}
                {p.is_featured && (
                  <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs font-mono-dm mb-0.5" style={{ color: 'var(--ink-light)' }}>{p.brand}</div>
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
                <div className="flex justify-between items-center text-xs mb-3">
                  <span style={{ color: 'var(--gold)' }}>★ {p.rating} ({p.reviews})</span>
                  <span style={{ color: 'var(--ink-light)' }}>{p.vendor}</span>
                </div>
                <button className="w-full py-2 rounded-lg text-xs font-medium transition-all"
                  style={{ background: p.in_stock ? 'var(--green-light)' : 'var(--cream)', color: p.in_stock ? 'var(--green)' : 'var(--ink-light)', border: '1px solid var(--border)' }}
                  disabled={!p.in_stock}>
                  {p.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          {[1, 2, 3, 4].map(n => (
            <button key={n} className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
              style={{
                background: n === 1 ? 'var(--green)' : '#fff',
                color: n === 1 ? '#fff' : 'var(--ink)',
                border: '1px solid var(--border)',
              }}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
