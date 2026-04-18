'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, MapPin, Clock } from 'lucide-react'

const ads = [
  { id: 'gray-nicolls-legend-1', icon: '🏏', title: 'Gray Nicolls Legend — Grade 1 English Willow', price: 480, condition: 'Used', emirate: 'Dubai Marina', area: 'Dubai', age: '2d', category: 'Bats', featured: true, seller: 'Ahmed K.', phone: '+971501234567', desc: 'Excellent condition Gray Nicolls Legend Grade 1 English Willow bat. Used for one season only. 2.9lbs, short handle. Full toe guard, anti-scuff sheet applied. Small surface marks only, no cracks. Perfect for serious club cricketers.', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&q=80' },
  { id: 'sg-test-gloves-1', icon: '🥊', title: 'SG Test Batting Gloves — Right Hand Large', price: 95, condition: 'New', emirate: 'Sharjah', area: 'Sharjah', age: '3d', category: 'Gloves', featured: false, seller: 'Rajan M.', phone: '+971502345678', desc: 'Brand new SG Test batting gloves, right hand, size Large. Still in original packaging. Bought as spare but not needed. Top quality leather palm, full finger protection.', image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=80' },
  { id: 'junior-kit-1', icon: '👕', title: 'Full Junior Cricket Kit — Age 10-12', price: 350, condition: 'Used', emirate: 'Abu Dhabi', area: 'Abu Dhabi', age: '1d', category: 'Kits', featured: false, seller: 'Priya S.', phone: '+971503456789', desc: 'Complete junior cricket kit for age 10-12. Includes: bat (SG), pads (2), gloves, helmet (Shrey), thigh guard, arm guard, kit bag. Son has outgrown it. All items in good condition.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80' },
  { id: 'kookaburra-balls-1', icon: '⚾', title: 'Kookaburra Red Match Balls × 6 (New in Box)', price: 240, condition: 'New', emirate: 'Al Ain', area: 'Al Ain', age: '5d', category: 'Balls', featured: false, seller: 'Farhan A.', phone: '+971504567890', desc: 'Six Kookaburra red match balls, brand new in original box. Unused, bought for tournament that was cancelled. Perfect for club or academy use. Retail price AED 60 each.', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&q=80' },
  { id: 'gm-batting-pads-1', icon: '🦺', title: 'Gunn & Moore Batting Pads — Adult Medium', price: 120, condition: 'Used', emirate: 'Ajman', area: 'Ajman', age: '1d', category: 'Pads', featured: false, seller: 'Salim T.', phone: '+971505678901', desc: 'GM Six6 batting pads, adult medium. Used for one season. Good protective padding, all straps intact. Minor scuff marks on the front face, no structural damage.', image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=600&q=80' },
  { id: 'custom-jerseys-1', icon: '🎽', title: 'Custom Team Jerseys — 10 Pieces Sublimation', price: 650, condition: 'New', emirate: 'Dubai', area: 'Dubai Sports City', age: '6h', category: 'Jerseys', featured: true, seller: 'SportsPrint UAE', phone: '+971506789012', desc: 'Full sublimation custom team jerseys, 10 pieces. Your club name, number and logo. Made to order, delivered in 7 days. We also do 5-piece minimum. Moisture-wicking polyester fabric.', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80' },
  { id: 'shrey-helmet-1', icon: '⛑️', title: 'Shrey Pro Guard Cricket Helmet — Medium Steel Grill', price: 180, condition: 'Used', emirate: 'Dubai', area: 'Jumeirah', age: '4d', category: 'Helmets', featured: false, seller: 'Vikram P.', phone: '+971507890123', desc: 'Shrey Pro Guard helmet with steel grill, size Medium. Used for one season. All straps and fittings intact. Meets ICC standards. Good condition, no cracks or structural damage.', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80' },
  { id: 'adidas-spikes-1', icon: '👟', title: 'Adidas Cricket Spikes — UK Size 9', price: 110, condition: 'Used', emirate: 'Sharjah', area: 'Sharjah', age: '2d', category: 'Shoes', featured: false, seller: 'Deepak R.', phone: '+971508901234', desc: 'Adidas cricket spikes, UK size 9. Used for one season, still good condition. Full metal spikes, good grip. Selling because upgraded to larger size.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { id: 'ss-ton-1', icon: '🏏', title: 'SS Ton Player Edition Bat — Barely Used', price: 320, condition: 'Used', emirate: 'Dubai', area: 'Al Quoz', age: '1d', category: 'Bats', featured: false, seller: 'Mohammad Z.', phone: '+971509012345', desc: 'SS Ton Player Edition cricket bat, barely used — only 2 net sessions. Full toe guard, anti-scuff sheet. 2.8lbs, short handle. English willow Grade 2. Excellent pickup and balance.', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&q=80' },
  { id: 'kookaburra-kahuna-1', icon: '🏏', title: 'Kookaburra Kahuna Pro — Grade 2 English Willow', price: 280, condition: 'Used', emirate: 'Abu Dhabi', area: 'Khalidiyah', age: '3d', category: 'Bats', featured: false, seller: 'Suresh N.', phone: '+971500123456', desc: 'Kookaburra Kahuna Pro Grade 2 EW bat. Used for half a season. Good knocking in, anti-scuff applied. 2.10lbs, long handle. Slight marks on face, no damage.', image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&q=80' },
  { id: 'cricket-kit-bag-1', icon: '🎒', title: 'Duffle Cricket Kit Bag — Gray Nicolls', price: 85, condition: 'Used', emirate: 'Dubai', area: 'Deira', age: '7d', category: 'Bags', featured: false, seller: 'Arjun K.', phone: '+971501112223', desc: 'Gray Nicolls duffle style cricket kit bag. Multiple compartments, bat sleeve, shoe compartment. Good condition with minor wear. Fits full kit.', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80' },
  { id: 'bowling-machine-1', icon: '⚙️', title: 'BOLA Bowling Machine — Full Setup', price: 2800, condition: 'Used', emirate: 'Dubai', area: 'Dubai Sports City', age: '10d', category: 'Equipment', featured: true, seller: 'ICC Academy', phone: '+97154305133', desc: 'BOLA Professional bowling machine, full setup with feeder. Can bowl up to 80mph. Speed and line adjustable. Used in academy, upgrading to newer model. Comes with 50 balls, remote control, and transport bag.', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80' },
]

const CATEGORIES = ['All', 'Bats', 'Pads', 'Gloves', 'Helmets', 'Kits', 'Balls', 'Shoes', 'Jerseys', 'Bags', 'Equipment']
const EMIRATES_FILTER = ['All Emirates', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain']
const CONDITIONS = ['All', 'New', 'Used']

export default function ClassifiedsPage() {
  const [category, setCategory] = useState('All')
  const [emirate, setEmirate] = useState('All Emirates')
  const [condition, setCondition] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ads.filter(a => {
    if (category !== 'All' && a.category !== category) return false
    if (emirate !== 'All Emirates' && a.area !== emirate) return false
    if (condition !== 'All' && a.condition !== condition) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-14">
        <div className="container-uae">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Buy & Sell</div>
              <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Classifieds</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>New and used cricket gear across the UAE. Free to list.</p>
            </div>
            <Link href="/classifieds/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--red)' }}>
              <Plus size={15} /> Post Free Ad
            </Link>
          </div>
          {/* Search */}
          <div className="flex items-center gap-3 mt-6 px-4 py-2.5 rounded-2xl max-w-xl"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search bats, pads, kits, balls..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2 items-center">
          <div className="flex gap-1.5 overflow-x-auto">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
                style={{ background: category === c ? 'var(--red)' : 'var(--cream)', color: category === c ? 'white' : 'var(--black)', border: `1px solid ${category === c ? 'var(--red)' : 'var(--border)'}` }}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <select value={emirate} onChange={e => setEmirate(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
              {EMIRATES_FILTER.map(e => <option key={e}>{e}</option>)}
            </select>
            <select value={condition} onChange={e => setCondition(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
              {CONDITIONS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} found
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(ad => (
            <Link key={ad.id} href={`/classifieds/${ad.id}`}
              className="rounded-2xl overflow-hidden card-hover block"
              style={{ background: 'var(--white)', border: ad.featured ? '2px solid var(--red)' : '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="relative h-36 overflow-hidden">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                {ad.featured && (
                  <span className="absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--red)', fontSize: 10 }}>Featured</span>
                )}
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: ad.condition === 'New' ? 'var(--green)' : 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10 }}>
                  {ad.condition}
                </span>
              </div>
              <div className="p-3">
                <div className="text-xs font-medium leading-tight mb-1.5 line-clamp-2" style={{ color: 'var(--black)' }}>{ad.title}</div>
                <div className="font-display text-xl mb-1" style={{ color: 'var(--green)' }}>AED {ad.price}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <MapPin size={10} /> {ad.emirate}
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <Clock size={10} /> {ad.age}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No listings found</h3>
            <p className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Try different filters or be the first to list!</p>
            <Link href="/classifieds/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              Post a Free Ad
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Got Cricket Gear to Sell?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Post a free ad and reach thousands of UAE cricket players.</p>
          <Link href="/classifieds/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
            Post Free Ad →
          </Link>
        </div>
      </div>
    </div>
  )
}
