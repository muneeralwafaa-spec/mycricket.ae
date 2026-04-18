import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Truck, Shield, RefreshCw, ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react'

const PRODUCTS: Record<string, {
  id: string; name: string; brand: string; category: string; price: number
  compare?: number; rating: number; reviews: number; vendor: string; vendor_id: string
  badge?: string; image: string; inStock: boolean; desc: string
  specs: Record<string, string>; includes?: string[]
  images?: string[]
}> = {
  'gn-legend-dxm': {
    id: 'gn-legend-dxm', name: 'Gray Nicolls Legend DXM', brand: 'Gray Nicolls', category: 'Bats',
    price: 899, compare: 1100, rating: 4.8, reviews: 124, vendor: 'Cricket Store Dubai', vendor_id: 'v1',
    badge: 'Best Seller', inStock: true,
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=85',
    images: ['https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80'],
    desc: 'The Gray Nicolls Legend DXM is a top-tier Grade 1 English Willow bat used by professional cricketers worldwide. Features a pronounced mid-to-low sweet spot for attacking play, full toe guard protection, and GN\'s signature DXM (Dynamic Xtra Mass) technology for maximum power transfer.\n\nPerfect for UAE cricketers who play on hard, true pitches at Dubai Sports City, Zayed Cricket Stadium and Sharjah. Used by several UAE national team players.',
    specs: { Brand: 'Gray Nicolls', Model: 'Legend DXM', Grade: 'Grade 1 English Willow', Weight: '2.9–3.0 lbs', Handle: 'Short/Long Handle', 'Sweet Spot': 'Mid-Low', Edges: '40mm', 'Country of Origin': 'England' },
    includes: ['Bat', 'Toe guard (fitted)', 'Anti-scuff sheet (fitted)', 'Gray Nicolls bat cover'],
  },
  'kookaburra-helmet-pro500': {
    id: 'kookaburra-helmet-pro500', name: 'Kookaburra Pro 500 Cricket Helmet', brand: 'Kookaburra', category: 'Helmets',
    price: 450, compare: 550, rating: 4.7, reviews: 89, vendor: 'Sports World UAE', vendor_id: 'v2',
    badge: 'Top Rated', inStock: true,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85',
    desc: 'The Kookaburra Pro 500 helmet meets all ICC safety standards. Features a premium composite shell, stainless steel grill, and adjustable rear cradle for perfect fit. Excellent ventilation design keeps players cool in UAE heat.\n\nAvailable in sizes: Small (54–56cm), Medium (56–58cm), Large (58–60cm), XL (60–62cm).',
    specs: { Brand: 'Kookaburra', Model: 'Pro 500', Standard: 'ICC Approved (AS/NZS 4499)', Shell: 'Composite', Grill: 'Stainless Steel', Sizes: 'S / M / L / XL', Ventilation: 'Yes', Adjustable: 'Rear cradle + chin strap' },
    includes: ['Helmet', 'Carry bag'],
  },
  'custom-jersey-11': {
    id: 'custom-jersey-11', name: 'Custom Team Jersey Set (11 players)', brand: 'Custom Print', category: 'Jerseys',
    price: 950, compare: undefined, rating: 4.9, reviews: 203, vendor: 'UAE Cricket Kits', vendor_id: 'v3',
    badge: 'Popular', inStock: true,
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=85',
    desc: 'Professional full sublimation custom cricket jerseys for your entire team. Send us your club name, logo and player numbers — we handle the design, printing and delivery.\n\nFull moisture-wicking polyester. Delivered anywhere in UAE within 7 days. Minimum 5 pieces (for smaller orders use our 5-piece listing).\n\nProcess: WhatsApp your logo → we send free design mockup → approve → print & deliver.',
    specs: { Minimum: '11 pieces (this listing)', Material: 'Moisture-wicking Polyester', Print: 'Full Sublimation (all-over)', Turnaround: '7 business days', Delivery: 'Free UAE-wide', Sizes: 'XS to 3XL', Customisation: 'Name, Number, Logo, Sponsor' },
    includes: ['11 custom jerseys', 'Free design service', 'Free UAE delivery'],
  },
  'bola-bowling-machine': {
    id: 'bola-bowling-machine', name: 'BOLA Professional Bowling Machine', brand: 'BOLA', category: 'Equipment',
    price: 4500, compare: 5200, rating: 4.9, reviews: 24, vendor: 'ICC Academy Store', vendor_id: 'v4',
    badge: 'Pro Equipment', inStock: true,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85',
    desc: 'The BOLA Professional bowling machine is used by cricket academies and national teams worldwide, including at the ICC Academy Dubai. Delivers accurate line and length from 40–90mph.\n\nFull speed control, line and height adjustment. Suitable for all formats. Used by ICC Academy Dubai and top UAE cricket clubs.',
    specs: { Brand: 'BOLA', Type: 'Professional', 'Speed Range': '40–90 mph (64–145 kph)', 'Ball Type': 'Any standard cricket ball', Power: '240V AC (UAE compatible)', Weight: '25kg', Warranty: '2 years (parts & labour)' },
    includes: ['Bowling machine', 'Auto ball feeder (30 balls)', '50 training balls', 'Remote control', 'Heavy-duty transport case', 'Setup guide'],
  },
  'sg-test-ball-6pk': {
    id: 'sg-test-ball-6pk', name: 'SG Test Match Red Balls × 6', brand: 'SG', category: 'Balls',
    price: 280, compare: 320, rating: 4.6, reviews: 67, vendor: 'Cricket Store Dubai', vendor_id: 'v1',
    badge: undefined, inStock: true,
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=85',
    desc: 'SG Test match balls — the same balls used in India domestic first-class and international cricket. 4-piece construction, best quality leather. Pack of 6 balls in original box.\n\nUsed in UAE domestic competitions (Emirates D50, D20). Excellent for club and academy use.',
    specs: { Brand: 'SG', Type: 'Test Match', Colour: 'Red', Quantity: '6 balls', Construction: '4-piece', Grade: 'Match Quality', 'Seam Type': 'Raised' },
    includes: ['6 SG Test Red Balls', 'Original packaging'],
  },
  'complete-junior-kit': {
    id: 'complete-junior-kit', name: 'Complete Junior Cricket Kit Age 8–12', brand: 'Kookaburra', category: 'Kits',
    price: 750, compare: 950, rating: 4.8, reviews: 156, vendor: 'Cricket Store Dubai', vendor_id: 'v1',
    badge: 'Bundle Deal', inStock: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85',
    desc: 'Everything your child needs to start playing cricket. Complete kit for ages 8–12, professionally assembled by Cricket Store Dubai. All items are from reputable brands — no cheap substitutes.\n\nPerfect for children joining academies like ICC Academy, G Force, or Young Talents Cricket Academy.',
    specs: { 'Age Range': '8–12 years', Bat: 'Kookaburra Youth (Size 5)', Pads: 'Pair — Youth size', Gloves: 'Pair — Youth size', Helmet: 'Shrey Youth (with grill)', Bag: 'Kookaburra duffle', Extras: 'Thigh guard + arm guard' },
    includes: ['Kookaburra youth bat', 'Youth batting pads (pair)', 'Youth batting gloves (pair)', 'Shrey youth helmet', 'Kit bag', 'Thigh guard', 'Arm guard'],
  },
  'adidas-batting-gloves': {
    id: 'adidas-batting-gloves', name: 'Adidas Adipower Batting Gloves', brand: 'Adidas', category: 'Gloves',
    price: 195, compare: 230, rating: 4.5, reviews: 45, vendor: 'Sports World UAE', vendor_id: 'v2',
    badge: undefined, inStock: true,
    image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&q=85',
    desc: 'Adidas Adipower batting gloves used by professional cricketers. Genuine leather palm for excellent grip. Full finger protection with reinforced knuckle guards.',
    specs: { Brand: 'Adidas', Model: 'Adipower', Palm: 'Genuine Leather', Sizes: 'S / M / L / XL', Hand: 'Right or Left', 'Knuckle Guard': 'Reinforced composite' },
    includes: ['1 pair batting gloves (specify right/left at checkout)'],
  },
  'nb-ck4040-spikes': {
    id: 'nb-ck4040-spikes', name: 'New Balance CK4040 Cricket Spikes', brand: 'New Balance', category: 'Shoes',
    price: 420, compare: 499, rating: 4.7, reviews: 91, vendor: 'Sports World UAE', vendor_id: 'v2',
    badge: 'New', inStock: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85',
    desc: 'New Balance CK4040 professional cricket spikes. Worn by international cricketers including Bangladesh and Pakistan players. Full metal spike system for excellent grip on turf.',
    specs: { Brand: 'New Balance', Model: 'CK4040', Type: 'Full Metal Spikes', Surface: 'Turf/Grass', Sizes: 'UK 6–13', Upper: 'Synthetic leather', Sole: 'Spiked outsole' },
    includes: ['1 pair cricket spikes'],
  },
  'mrf-virat-bat': {
    id: 'mrf-virat-bat', name: 'MRF Genius Grand Edition', brand: 'MRF', category: 'Bats',
    price: 780, compare: 920, rating: 4.7, reviews: 89, vendor: 'ICC Academy Store', vendor_id: 'v4',
    badge: 'New', inStock: true,
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=85',
    desc: 'MRF Genius Grand Edition — the bat associated with Virat Kohli. Grade 1 English Willow with a high sweet spot for aggressive strokeplay. Premium blade with excellent pickup.',
    specs: { Brand: 'MRF', Model: 'Genius Grand Edition', Grade: 'Grade 1 English Willow', Weight: '2.8–2.12 lbs', Handle: 'Short Handle', 'Sweet Spot': 'High', Edges: '42mm' },
    includes: ['Bat', 'MRF bat cover', 'Anti-scuff sheet (fitted)'],
  },
  'shrey-pro-guard-helmet': {
    id: 'shrey-pro-guard-helmet', name: 'Shrey Pro Guard Helmet — Steel Grill', brand: 'Shrey', category: 'Helmets',
    price: 380, compare: 450, rating: 4.7, reviews: 112, vendor: 'ICC Academy Store', vendor_id: 'v4',
    badge: 'Top Rated', inStock: true,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85',
    desc: 'Shrey Pro Guard — the helmet preferred by UAE international cricketers and several IPL players. Full composite shell, steel grill. Titanium grill available as upgrade option.',
    specs: { Brand: 'Shrey', Model: 'Pro Guard', Standard: 'ICC Approved', Grill: 'Steel (Titanium available)', Shell: 'Composite', Sizes: 'S (54–56) / M (56–58) / L (58–60)' },
    includes: ['Helmet', 'Carry bag'],
  },
}

const RELATED_IDS = ['gn-legend-dxm', 'sg-test-ball-6pk', 'kookaburra-helmet-pro500', 'adidas-batting-gloves']

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = PRODUCTS[slug]
  if (!p) return { title: 'Product Not Found — MyCricket.ae Shop' }
  return {
    title: `${p.name} — AED ${p.price} | MyCricket.ae Shop`,
    description: `Buy ${p.name} by ${p.brand} for AED ${p.price}. ${p.desc.slice(0, 120)}`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = PRODUCTS[slug]
  if (!p) return notFound()

  const related = RELATED_IDS.filter(id => id !== slug && PRODUCTS[id]?.category === p.category || PRODUCTS[id]?.vendor_id === p.vendor_id).slice(0, 4)

  const discount = p.compare ? Math.round((1 - p.price / p.compare) * 100) : 0

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="px-4 py-3">
        <div className="container-uae flex items-center gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
          <Link href="/shop" className="flex items-center gap-1" style={{ color: 'var(--ink-light)' }}>
            <ChevronLeft size={13} /> Shop
          </Link>
          <span>/</span>
          <Link href={`/shop/${p.category.toLowerCase()}`} style={{ color: 'var(--ink-light)' }}>{p.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }} className="truncate max-w-40">{p.name}</span>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div>
            <div className="rounded-2xl overflow-hidden relative mb-3" style={{ height: 400 }}>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && (
                <span className="absolute top-4 left-4 text-sm px-3 py-1 rounded-full font-medium"
                  style={{ background: p.badge === 'Sale' ? 'var(--red)' : p.badge === 'New' ? 'var(--green)' : 'var(--gold)', color: 'white' }}>
                  {p.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 text-sm px-3 py-1 rounded-full font-medium text-white"
                  style={{ background: 'var(--red)' }}>
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="text-xs mb-2 font-medium" style={{ color: 'var(--red)' }}>{p.vendor}</div>
            <h1 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--black)', lineHeight: 1.2 }}>{p.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} style={{ color: 'var(--gold)', fill: s <= Math.floor(p.rating) ? 'var(--gold)' : 'transparent' }} />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--gold)' }}>{p.rating}</span>
              <span className="text-sm" style={{ color: 'var(--ink-light)' }}>({p.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-4xl" style={{ color: 'var(--green)' }}>AED {p.price}</span>
              {p.compare && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--ink-light)' }}>AED {p.compare}</span>
                  <span className="text-sm font-medium px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--red)' }}>
                    Save AED {p.compare - p.price}
                  </span>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { icon: <Truck size={14} />, text: 'Free delivery AED 200+' },
                { icon: <RefreshCw size={14} />, text: '7-day returns' },
                { icon: <Shield size={14} />, text: 'Verified vendor' },
              ].map(b => (
                <div key={b.text} className="flex flex-col items-center gap-1 p-2 rounded-xl text-center"
                  style={{ background: 'var(--green-light)' }}>
                  <span style={{ color: 'var(--green)' }}>{b.icon}</span>
                  <span className="text-xs" style={{ color: 'var(--green-dark)', fontSize: 10 }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Quantity + Add to cart */}
            <div className="space-y-3 mb-5">
              <button className="w-full py-4 rounded-2xl text-base font-medium text-white transition-all"
                style={{ background: 'var(--red)' }}>
                <ShoppingCart size={16} className="inline mr-2" />
                Add to Cart — AED {p.price}
              </button>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-2xl text-sm flex items-center justify-center gap-2"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                  <Heart size={14} /> Save
                </button>
                <button className="flex-1 py-3 rounded-2xl text-sm flex items-center justify-center gap-2"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            {/* Vendor info */}
            <div className="p-4 rounded-2xl" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-mono-dm uppercase mb-2" style={{ color: 'var(--ink-light)' }}>Sold by</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{p.vendor}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--green)' }}>✓ Verified UAE Vendor</div>
                </div>
                <Link href="/shop" className="text-xs px-3 py-1.5 rounded-xl"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                  View Store →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Description + Specs tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Description</h2>
            {p.desc.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{para}</p>
            ))}
            {p.includes && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="text-xs font-mono-dm uppercase mb-2" style={{ color: 'var(--ink-light)' }}>In the Box</div>
                {p.includes.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm mb-1.5" style={{ color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--green)' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Specifications</h2>
            <div className="space-y-2">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>{k}</span>
                  <span className="text-sm font-medium text-right" style={{ color: 'var(--black)', maxWidth: '60%' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl mb-5" style={{ color: 'var(--black)' }}>You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(rid => {
                const rp = PRODUCTS[rid]
                if (!rp) return null
                return (
                  <Link key={rid} href={`/shop/product/${rid}`}
                    className="rounded-2xl overflow-hidden card-hover block"
                    style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                    <div className="h-32 overflow-hidden">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-medium leading-tight mb-1 line-clamp-2" style={{ color: 'var(--black)' }}>{rp.name}</div>
                      <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {rp.price}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
