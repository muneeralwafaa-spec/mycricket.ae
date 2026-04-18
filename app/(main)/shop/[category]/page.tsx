import { Metadata } from 'next'
import Link from 'next/link'
import { Star, ChevronLeft } from 'lucide-react'

const CATEGORY_PRODUCTS: Record<string, { id: string; name: string; brand: string; price: number; compare?: number; rating: number; reviews: number; vendor: string; badge?: string; image: string }[]> = {
  bats: [
    { id: 'gn-legend-dxm', name: 'Gray Nicolls Legend DXM', brand: 'Gray Nicolls', price: 899, compare: 1100, rating: 4.8, reviews: 124, vendor: 'Cricket Store Dubai', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80' },
    { id: 'gn-bat-legend-2', name: 'Gray Nicolls Destroyer DXM', brand: 'Gray Nicolls', price: 650, compare: 780, rating: 4.6, reviews: 88, vendor: 'Cricket Store Dubai', badge: 'Sale', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80' },
    { id: 'mrf-virat-bat', name: 'MRF Genius Grand Edition', brand: 'MRF', price: 780, compare: 920, rating: 4.7, reviews: 89, vendor: 'ICC Academy Store', badge: 'New', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80' },
    { id: 'ss-ton-1', name: 'SS Ton Player Edition', brand: 'SS Ton', price: 580, compare: 700, rating: 4.5, reviews: 62, vendor: 'UAE Cricket Kits', badge: undefined, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80' },
  ],
  helmets: [
    { id: 'kookaburra-helmet-pro500', name: 'Kookaburra Pro 500 Helmet', brand: 'Kookaburra', price: 450, compare: 550, rating: 4.7, reviews: 89, vendor: 'Sports World UAE', badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80' },
    { id: 'shrey-pro-guard-helmet', name: 'Shrey Pro Guard Steel Grill', brand: 'Shrey', price: 380, compare: 450, rating: 4.7, reviews: 112, vendor: 'ICC Academy Store', badge: 'Top Rated', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80' },
  ],
  balls: [
    { id: 'sg-test-ball-6pk', name: 'SG Test Match Red Balls × 6', brand: 'SG', price: 280, compare: 320, rating: 4.6, reviews: 67, vendor: 'Cricket Store Dubai', badge: undefined, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80' },
    { id: 'kookaburra-match-balls', name: 'Kookaburra Match Balls × 12', brand: 'Kookaburra', price: 480, compare: 540, rating: 4.8, reviews: 45, vendor: 'ICC Academy Store', badge: undefined, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80' },
  ],
  jerseys: [
    { id: 'custom-jersey-11', name: 'Custom Team Jersey Set (11 players)', brand: 'Custom Print', price: 950, rating: 4.9, reviews: 203, vendor: 'UAE Cricket Kits', badge: 'Popular', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&q=80' },
    { id: 'custom-jersey-5', name: 'Custom Club Jerseys (Min 5 pieces)', brand: 'Custom Print', price: 350, rating: 4.8, reviews: 167, vendor: 'UAE Cricket Kits', badge: 'Popular', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&q=80' },
  ],
  gloves: [
    { id: 'adidas-batting-gloves', name: 'Adidas Adipower Batting Gloves', brand: 'Adidas', price: 195, compare: 230, rating: 4.5, reviews: 45, vendor: 'Sports World UAE', badge: undefined, image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=400&q=80' },
  ],
  pads: [
    { id: 'gm-pads-six6', name: 'GM Six6 Batting Pads', brand: 'GM', price: 280, rating: 4.5, reviews: 52, vendor: 'Sports World UAE', badge: undefined, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=400&q=80' },
    { id: 'ss-ton-pads-supreme', name: 'SS Ton Supreme Batting Pads', brand: 'SS Ton', price: 320, rating: 4.4, reviews: 38, vendor: 'UAE Cricket Kits', badge: undefined, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=400&q=80' },
  ],
  shoes: [
    { id: 'nb-ck4040-spikes', name: 'New Balance CK4040 Spikes', brand: 'New Balance', price: 420, compare: 499, rating: 4.7, reviews: 91, vendor: 'Sports World UAE', badge: 'New', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  ],
  kits: [
    { id: 'complete-junior-kit', name: 'Complete Junior Kit Age 8–12', brand: 'Kookaburra', price: 750, compare: 950, rating: 4.8, reviews: 156, vendor: 'Cricket Store Dubai', badge: 'Bundle Deal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
  ],
  equipment: [
    { id: 'bola-bowling-machine', name: 'BOLA Professional Bowling Machine', brand: 'BOLA', price: 4500, compare: 5200, rating: 4.9, reviews: 24, vendor: 'ICC Academy Store', badge: 'Pro Equipment', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80' },
  ],
  bags: [
    { id: 'kit-bag-duffle', name: 'Cricket Kit Bag — Duffle Style', brand: 'Kookaburra', price: 180, compare: 220, rating: 4.5, reviews: 73, vendor: 'UAE Cricket Kits', badge: undefined, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80' },
  ],
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_PRODUCTS).map(category => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const name = category.charAt(0).toUpperCase() + category.slice(1)
  return { title: `Cricket ${name} UAE — MyCricket.ae Shop`, description: `Buy cricket ${category} in UAE. Best brands, verified vendors, free delivery over AED 200.` }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const products = CATEGORY_PRODUCTS[category.toLowerCase()] || []
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  if (products.length === 0) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <div style={{ background: 'var(--black)' }} className="px-4 py-16">
          <div className="container-uae">
            <Link href="/shop" className="flex items-center gap-1 text-xs font-mono-dm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}><ChevronLeft size={13} /> Shop</Link>
            <h1 className="font-display text-5xl text-white mb-2">{categoryName}</h1>
          </div>
        </div>
        <div className="container-uae py-16 text-center">
          <div className="text-5xl mb-4">🏏</div>
          <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Coming Soon</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Products in this category are being added by our vendors.</p>
          <Link href="/shop" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Browse All Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <Link href="/shop" className="flex items-center gap-1 text-xs font-mono-dm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}><ChevronLeft size={13} /> Shop</Link>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket {categoryName}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{products.length} products from verified UAE vendors</p>
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <Link key={p.id} href={`/shop/product/${p.id}`}
              className="rounded-2xl overflow-hidden card-hover block"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                {p.badge && <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: 'var(--red)', fontSize: 10 }}>{p.badge}</span>}
              </div>
              <div className="p-3">
                <div className="text-xs mb-0.5 truncate" style={{ color: 'var(--red)' }}>{p.vendor}</div>
                <div className="text-xs font-medium leading-tight mb-1.5 line-clamp-2" style={{ color: 'var(--black)' }}>{p.name}</div>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={10} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                  <span className="text-xs" style={{ color: 'var(--gold)' }}>{p.rating}</span>
                  <span className="text-xs" style={{ color: 'var(--ink-light)' }}>({p.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {p.price}</span>
                  {p.compare && <span className="text-xs line-through" style={{ color: 'var(--ink-light)' }}>AED {p.compare}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
