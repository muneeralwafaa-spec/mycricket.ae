import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Phone, MessageCircle, Share2, Flag, ChevronLeft } from 'lucide-react'

const ads: Record<string, {
  id: string; icon: string; title: string; price: number; condition: string
  emirate: string; area: string; age: string; category: string; featured: boolean
  seller: string; phone: string; desc: string; image: string
  specs?: Record<string, string>
}> = {
  'gray-nicolls-legend-1': {
    id: 'gray-nicolls-legend-1', icon: '🏏', title: 'Gray Nicolls Legend — Grade 1 English Willow', price: 480,
    condition: 'Used', emirate: 'Dubai Marina', area: 'Dubai', age: '2 days ago', category: 'Bats',
    featured: true, seller: 'Ahmed K.', phone: '+971501234567',
    desc: 'Excellent condition Gray Nicolls Legend Grade 1 English Willow bat. Used for one season only. Full toe guard and anti-scuff sheet applied. Small surface marks only, no cracks or dents.\n\nPerfect for serious club cricketers looking for a premium bat at a fraction of the retail price. Retail price AED 850+.',
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=85',
    specs: { Brand: 'Gray Nicolls', Model: 'Legend', Grade: 'Grade 1 English Willow', Weight: '2.9 lbs', Handle: 'Short Handle', 'Edge Thickness': '38mm', Condition: 'Used — Good' }
  },
  'sg-test-gloves-1': {
    id: 'sg-test-gloves-1', icon: '🥊', title: 'SG Test Batting Gloves — Right Hand Large', price: 95,
    condition: 'New', emirate: 'Sharjah', area: 'Sharjah', age: '3 days ago', category: 'Gloves',
    featured: false, seller: 'Rajan M.', phone: '+971502345678',
    desc: 'Brand new SG Test batting gloves, right hand, size Large. Still in original packaging, never used. Bought as a spare pair but not needed.\n\nTop quality leather palm with full finger protection. SG Test is the professional grade glove used by Indian national team players.',
    image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&q=85',
    specs: { Brand: 'SG', Model: 'Test', Hand: 'Right Hand', Size: 'Large', Condition: 'New — Sealed', Material: 'Leather Palm' }
  },
  'junior-kit-1': {
    id: 'junior-kit-1', icon: '👕', title: 'Full Junior Cricket Kit — Age 10-12', price: 350,
    condition: 'Used', emirate: 'Abu Dhabi', area: 'Abu Dhabi', age: '1 day ago', category: 'Kits',
    featured: false, seller: 'Priya S.', phone: '+971503456789',
    desc: 'Complete junior cricket kit for age 10-12. Son has outgrown it, all items in good condition. Kit includes everything needed to play cricket.\n\nIncludes: SG bat, pads (pair), batting gloves, Shrey helmet, thigh guard, arm guard, and kit bag. All items usable and in good condition.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85',
    specs: { Age: '10–12 years', 'Bat Brand': 'SG', Helmet: 'Shrey Youth', 'Items Included': '7 items', Condition: 'Used — Good', 'Kit Bag': 'Included' }
  },
  'kookaburra-balls-1': {
    id: 'kookaburra-balls-1', icon: '⚾', title: 'Kookaburra Red Match Balls × 6 (New in Box)', price: 240,
    condition: 'New', emirate: 'Al Ain', area: 'Al Ain', age: '5 days ago', category: 'Balls',
    featured: false, seller: 'Farhan A.', phone: '+971504567890',
    desc: 'Six Kookaburra red match balls, brand new in original box. Bought for a tournament that was cancelled — completely unused.\n\nKookaburra is the official ball of international cricket. Used in all UAE domestic competitions. Retail price AED 60 each = AED 360 total. Selling for AED 240 for all 6.',
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=85',
    specs: { Brand: 'Kookaburra', Colour: 'Red', Quantity: '6 balls', Standard: 'Match Quality', Condition: 'New — Unused', 'Original Box': 'Yes' }
  },
  'gm-batting-pads-1': {
    id: 'gm-batting-pads-1', icon: '🦺', title: 'Gunn & Moore Batting Pads — Adult Medium', price: 120,
    condition: 'Used', emirate: 'Ajman', area: 'Ajman', age: '1 day ago', category: 'Pads',
    featured: false, seller: 'Salim T.', phone: '+971505678901',
    desc: 'GM Six6 batting pads, adult medium. Used for one season. Good protective padding throughout, all three straps intact and fully functional.\n\nMinor scuff marks on the front face from normal use, no structural damage. Still has plenty of life left.',
    image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=800&q=85',
    specs: { Brand: 'Gunn & Moore', Model: 'Six6', Size: 'Adult Medium', Straps: 'All 3 intact', Condition: 'Used — Good', Style: 'Right Hand Batsman' }
  },
  'custom-jerseys-1': {
    id: 'custom-jerseys-1', icon: '🎽', title: 'Custom Team Jerseys — 10 Pieces Sublimation', price: 650,
    condition: 'New', emirate: 'Dubai Sports City', area: 'Dubai', age: '6 hours ago', category: 'Jerseys',
    featured: true, seller: 'SportsPrint UAE', phone: '+971506789012',
    desc: 'Professional full sublimation custom team jerseys. Your club name, player number and logo printed throughout. Made to order.\n\nMoisture-wicking polyester fabric. Available in all sizes. Minimum 5 pieces. Delivered within 7 days anywhere in UAE.\n\nPrice includes design service. Send us your logo and team name via WhatsApp and we\'ll send you a free mockup.',
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=85',
    specs: { Minimum: '5 pieces', Price: 'AED 65/jersey (10 pcs)', Material: 'Moisture-wicking Polyester', Print: 'Full Sublimation', Turnaround: '7 days', Delivery: 'Free UAE-wide' }
  },
  'shrey-helmet-1': {
    id: 'shrey-helmet-1', icon: '⛑️', title: 'Shrey Pro Guard Cricket Helmet — Medium Steel Grill', price: 180,
    condition: 'Used', emirate: 'Jumeirah', area: 'Dubai', age: '4 days ago', category: 'Helmets',
    featured: false, seller: 'Vikram P.', phone: '+971507890123',
    desc: 'Shrey Pro Guard helmet with steel grill, size Medium. Used for one full season. All adjustable fittings and straps are intact and fully functional.\n\nMeets ICC Standards (AS/NZS 4499). Steel grille, composite body. Good condition — no cracks or structural damage. Foam padding still provides good protection.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85',
    specs: { Brand: 'Shrey', Model: 'Pro Guard', Size: 'Medium (56–58cm)', Grill: 'Steel', Standard: 'ICC Approved', Condition: 'Used — Good' }
  },
  'adidas-spikes-1': {
    id: 'adidas-spikes-1', icon: '👟', title: 'Adidas Cricket Spikes — UK Size 9', price: 110,
    condition: 'Used', emirate: 'Sharjah', area: 'Sharjah', age: '2 days ago', category: 'Shoes',
    featured: false, seller: 'Deepak R.', phone: '+971508901234',
    desc: 'Adidas cricket spikes, UK size 9. Used for one season, still in good condition with plenty of wear left. Full metal spike system for excellent grip on turf.\n\nSelling because I upgraded to a larger size. Light scuff marks from normal use.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85',
    specs: { Brand: 'Adidas', Size: 'UK 9 / EU 43', Type: 'Metal Spikes', Surface: 'Turf/Grass', Condition: 'Used — Good' }
  },
  'ss-ton-1': {
    id: 'ss-ton-1', icon: '🏏', title: 'SS Ton Player Edition Bat — Barely Used', price: 320,
    condition: 'Used', emirate: 'Al Quoz', area: 'Dubai', age: '1 day ago', category: 'Bats',
    featured: false, seller: 'Mohammad Z.', phone: '+971509012345',
    desc: 'SS Ton Player Edition cricket bat, barely used — only 2 net sessions. Full toe guard and anti-scuff sheet applied before first use.\n\nExcellent pickup and balance. 2.8lbs, short handle. English willow Grade 2. Condition is essentially brand new.',
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=85',
    specs: { Brand: 'SS Ton', Model: 'Player Edition', Grade: 'Grade 2 English Willow', Weight: '2.8 lbs', Handle: 'Short Handle', Condition: 'Used — Excellent (2 sessions)' }
  },
  'kookaburra-kahuna-1': {
    id: 'kookaburra-kahuna-1', icon: '🏏', title: 'Kookaburra Kahuna Pro — Grade 2 English Willow', price: 280,
    condition: 'Used', emirate: 'Khalidiyah', area: 'Abu Dhabi', age: '3 days ago', category: 'Bats',
    featured: false, seller: 'Suresh N.', phone: '+971500123456',
    desc: 'Kookaburra Kahuna Pro Grade 2 EW bat. Used for half a season. Well knocked in, anti-scuff applied from new. Slight marks on face from normal use, no damage.\n\n2.10lbs long handle. Good pickup, traditional shape.',
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=85',
    specs: { Brand: 'Kookaburra', Model: 'Kahuna Pro', Grade: 'Grade 2 English Willow', Weight: '2.10 lbs', Handle: 'Long Handle', Condition: 'Used — Good' }
  },
  'cricket-kit-bag-1': {
    id: 'cricket-kit-bag-1', icon: '🎒', title: 'Duffle Cricket Kit Bag — Gray Nicolls', price: 85,
    condition: 'Used', emirate: 'Deira', area: 'Dubai', age: '7 days ago', category: 'Bags',
    featured: false, seller: 'Arjun K.', phone: '+971501112223',
    desc: 'Gray Nicolls duffle style cricket kit bag. Multiple compartments, dedicated bat sleeve for up to 3 bats, separate shoe compartment. Good condition with minor wear.\n\nFits a full adult cricket kit comfortably. Padded shoulder straps.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=85',
    specs: { Brand: 'Gray Nicolls', Style: 'Duffle', 'Bat Sleeve': 'Up to 3 bats', 'Shoe Compartment': 'Yes', Condition: 'Used — Good' }
  },
  'bowling-machine-1': {
    id: 'bowling-machine-1', icon: '⚙️', title: 'BOLA Bowling Machine — Full Professional Setup', price: 2800,
    condition: 'Used', emirate: 'Dubai Sports City', area: 'Dubai', age: '10 days ago', category: 'Equipment',
    featured: true, seller: 'Cricket Academy Dubai', phone: '+97154305133',
    desc: 'BOLA Professional bowling machine, complete setup. Can bowl from 40–80mph. Full speed and line/length adjustment. Used in academy setting, upgrading to newer model.\n\nIncludes: machine, automatic ball feeder (holds 30 balls), 50 practice balls, remote control, and heavy-duty transport bag. Delivery can be arranged within Dubai.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=85',
    specs: { Brand: 'BOLA', Type: 'Professional', 'Speed Range': '40–80 mph', 'Ball Feeder': 'Auto (30 balls)', 'Balls Included': '50 practice balls', Condition: 'Used — Good Working Order' }
  },
}

const relatedAds = [
  { id: 'ss-ton-1', icon: '🏏', title: 'SS Ton Player Edition', price: 320, condition: 'Used', area: 'Dubai', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=300&q=70' },
  { id: 'kookaburra-kahuna-1', icon: '🏏', title: 'Kookaburra Kahuna Pro', price: 280, condition: 'Used', area: 'Abu Dhabi', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=300&q=70' },
  { id: 'gray-nicolls-legend-1', icon: '🏏', title: 'Gray Nicolls Legend', price: 480, condition: 'Used', area: 'Dubai', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=300&q=70' },
]

export async function generateStaticParams() {
  return Object.keys(ads).map(id => ({ id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const ad = ads[id]
  if (!ad) return { title: 'Ad Not Found — MyCricket.ae' }
  return {
    title: `${ad.title} — AED ${ad.price} | MyCricket.ae Classifieds`,
    description: `${ad.condition} ${ad.title} for AED ${ad.price} in ${ad.area}, UAE. ${ad.desc.slice(0, 120)}`,
  }
}

export default async function ClassifiedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ad = ads[id]
  if (!ad) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="px-4 py-3">
        <div className="container-uae flex items-center gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
          <Link href="/classifieds" className="flex items-center gap-1 hover:text-red-500 transition-colors" style={{ color: 'var(--ink-light)' }}>
            <ChevronLeft size={13} /> Classifieds
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>{ad.category}</span>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Images + Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden relative" style={{ height: 360 }}>
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              {ad.featured && (
                <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-medium text-white" style={{ background: 'var(--red)' }}>
                  Featured
                </span>
              )}
              <span className="absolute top-4 right-4 text-sm px-3 py-1.5 rounded-full font-medium text-white"
                style={{ background: ad.condition === 'New' ? 'var(--green)' : 'rgba(0,0,0,0.6)' }}>
                {ad.condition}
              </span>
            </div>

            {/* Title + Price */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-mono-dm mb-2 inline-block"
                    style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                    {ad.category}
                  </span>
                  <h1 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--black)', lineHeight: 1.2 }}>{ad.title}</h1>
                </div>
                <div className="font-display text-4xl" style={{ color: 'var(--green)' }}>AED {ad.price}</div>
              </div>
              <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: 'var(--ink-light)' }}>
                <span className="flex items-center gap-1"><MapPin size={12} /> {ad.emirate}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {ad.age}</span>
                <span>Listed by <strong style={{ color: 'var(--black)' }}>{ad.seller}</strong></span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--black)' }}>Description</h2>
              {ad.desc.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{para}</p>
              ))}
            </div>

            {/* Specs */}
            {ad.specs && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Item Details</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(ad.specs).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-xl" style={{ background: 'var(--off-white)' }}>
                      <div className="text-xs font-mono-dm uppercase tracking-wide mb-0.5" style={{ color: 'var(--ink-light)' }}>{k}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety tips */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
              <div className="font-display text-lg mb-1" style={{ color: 'var(--green-dark)' }}>🛡️ Safety Tips</div>
              <ul className="space-y-1">
                {['Meet in a public place or well-known location', 'Inspect the item before paying', 'Avoid sending money in advance', 'Prefer cash or UAE bank transfer'].map(tip => (
                  <li key={tip} className="text-xs flex items-start gap-1.5" style={{ color: 'var(--green-dark)' }}>
                    <span>✓</span><span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Contact sidebar */}
          <div className="space-y-4">
            {/* Price card */}
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: 'var(--white)', border: '2px solid var(--red)' }}>
              <div className="font-display text-4xl mb-1" style={{ color: 'var(--green)' }}>AED {ad.price}</div>
              <div className="text-xs mb-5" style={{ color: 'var(--ink-light)' }}>
                {ad.condition} · {ad.category} · {ad.area}
              </div>

              {/* Contact buttons */}
              <div className="space-y-3">
                <a href={`https://wa.me/${ad.phone.replace(/\D/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white"
                  style={{ background: '#25D366' }}>
                  <MessageCircle size={16} /> WhatsApp Seller
                </a>
                <a href={`tel:${ad.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'var(--red)' }}>
                  <Phone size={16} /> Call {ad.phone}
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                  <Share2 size={14} /> Share
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs"
                  style={{ color: 'var(--ink-light)' }}>
                  <Flag size={12} /> Report Ad
                </button>
              </div>

              {/* Seller info */}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-white"
                    style={{ background: 'var(--green)', fontSize: 16 }}>
                    {ad.seller[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{ad.seller}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>Member seller</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post your own */}
            <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--black)' }}>Got gear to sell?</div>
              <p className="text-xs mb-3" style={{ color: 'var(--ink-light)' }}>Post a free ad and reach UAE cricket players</p>
              <Link href="/classifieds/new"
                className="block py-2.5 rounded-xl text-xs font-medium text-white"
                style={{ background: 'var(--red)' }}>
                Post Free Ad →
              </Link>
            </div>
          </div>
        </div>

        {/* Related listings */}
        <div className="mt-10">
          <h2 className="font-display text-3xl mb-5" style={{ color: 'var(--black)' }}>Similar Listings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedAds.filter(r => r.id !== id).slice(0, 4).map(r => (
              <Link key={r.id} href={`/classifieds/${r.id}`}
                className="rounded-2xl overflow-hidden card-hover block"
                style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                <div className="h-28 overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-3">
                  <div className="text-xs font-medium leading-tight mb-1" style={{ color: 'var(--black)' }}>{r.title}</div>
                  <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {r.price}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>📍 {r.area}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
