'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, MapPin, Clock } from 'lucide-react'

const ads = [
  { id: 'gray-nicolls-legend-1', icon: '🏏', title: 'Gray Nicolls Legend — Grade 1 English Willow', price: 480, condition: 'Used', emirate: 'Dubai Marina', area: 'Dubai', age: '2d', category: 'Bats', featured: true, seller: 'Ahmed K.', bg: '#1a1a2e' },
  { id: 'sg-test-gloves-1', icon: '🥊', title: 'SG Test Batting Gloves — Right Hand Large', price: 95, condition: 'New', emirate: 'Sharjah', area: 'Sharjah', age: '3d', category: 'Gloves', featured: false, seller: 'Rajan M.', bg: '#0d2137' },
  { id: 'junior-kit-1', icon: '🎒', title: 'Full Junior Cricket Kit — Age 10-12', price: 350, condition: 'Used', emirate: 'Abu Dhabi', area: 'Abu Dhabi', age: '1d', category: 'Kits', featured: false, seller: 'Priya S.', bg: '#1a2e1a' },
  { id: 'kookaburra-balls-1', icon: '🔴', title: 'Kookaburra Red Match Balls × 6 (New in Box)', price: 240, condition: 'New', emirate: 'Al Ain', area: 'Al Ain', age: '5d', category: 'Balls', featured: false, seller: 'Farhan A.', bg: '#2e1a1a' },
  { id: 'gm-batting-pads-1', icon: '🦺', title: 'Gunn & Moore Batting Pads — Adult Medium', price: 120, condition: 'Used', emirate: 'Ajman', area: 'Ajman', age: '1d', category: 'Pads', featured: false, seller: 'Salim T.', bg: '#1a1a2e' },
  { id: 'custom-jerseys-1', icon: '🎽', title: 'Custom Team Jerseys — 10 Pieces Sublimation', price: 650, condition: 'New', emirate: 'Dubai Sports City', area: 'Dubai', age: '6h', category: 'Jerseys', featured: true, seller: 'SportsPrint UAE', bg: '#0d2137' },
  { id: 'shrey-helmet-1', icon: '⛑️', title: 'Shrey Pro Guard Cricket Helmet — Medium Steel Grill', price: 180, condition: 'Used', emirate: 'Jumeirah', area: 'Dubai', age: '4d', category: 'Helmets', featured: false, seller: 'Vikram P.', bg: '#2e1a1a' },
  { id: 'adidas-spikes-1', icon: '👟', title: 'Adidas Cricket Spikes — UK Size 9', price: 110, condition: 'Used', emirate: 'Sharjah', area: 'Sharjah', age: '2d', category: 'Shoes', featured: false, seller: 'Deepak R.', bg: '#1a2e1a' },
  { id: 'ss-ton-1', icon: '🏏', title: 'SS Ton Player Edition Bat — Barely Used', price: 320, condition: 'Used', emirate: 'Al Quoz', area: 'Dubai', age: '1d', category: 'Bats', featured: false, seller: 'Mohammad Z.', bg: '#1a1a2e' },
  { id: 'kookaburra-kahuna-1', icon: '🏏', title: 'Kookaburra Kahuna Pro — Grade 2 English Willow', price: 280, condition: 'Used', emirate: 'Khalidiyah', area: 'Abu Dhabi', age: '3d', category: 'Bats', featured: false, seller: 'Suresh N.', bg: '#0d2137' },
  { id: 'cricket-kit-bag-1', icon: '🎒', title: 'Duffle Cricket Kit Bag — Gray Nicolls', price: 85, condition: 'Used', emirate: 'Deira', area: 'Dubai', age: '7d', category: 'Bags', featured: false, seller: 'Arjun K.', bg: '#1a2e1a' },
  { id: 'bowling-machine-1', icon: '⚙️', title: 'BOLA Professional Bowling Machine — Full Setup', price: 2800, condition: 'Used', emirate: 'Dubai Sports City', area: 'Dubai', age: '10d', category: 'Equipment', featured: true, seller: 'Cricket Academy Dubai', bg: '#2e2a1a' },
]

const CATEGORIES = ['All', 'Bats', 'Pads', 'Gloves', 'Helmets', 'Kits', 'Balls', 'Shoes', 'Jerseys', 'Bags', 'Equipment']
const EMIRATES_FILTER = ['All Emirates', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain']

// Category colors for card backgrounds
const CAT_COLORS: Record<string, string> = {
  Bats: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  Gloves: 'linear-gradient(135deg, #0d2137, #1a3a5c)',
  Kits: 'linear-gradient(135deg, #1a2e1a, #2d4a2d)',
  Balls: 'linear-gradient(135deg, #2e1a1a, #4a2d2d)',
  Pads: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  Helmets: 'linear-gradient(135deg, #2e1a1a, #4a2d2d)',
  Shoes: 'linear-gradient(135deg, #1a2e1a, #2d4a2d)',
  Jerseys: 'linear-gradient(135deg, #0d2137, #1a3a5c)',
  Bags: 'linear-gradient(135deg, #1a2e1a, #2d4a2d)',
  Equipment: 'linear-gradient(135deg, #2e2a1a, #4a3d1a)',
}

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
          <div className="flex items-center gap-3 mt-6 px-4 py-2.5 rounded-2xl max-w-xl"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search bats, pads, kits, balls..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40" />
          </div>
        </div>
      </div>

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
              {['All', 'New', 'Used'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} found
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(ad => (
            <Link key={ad.id} href={`/classifieds/${ad.id}`}
              className="rounded-2xl overflow-hidden card-hover block"
              style={{ background: 'var(--white)', border: ad.featured ? '2px solid var(--red)' : '1px solid var(--border)', textDecoration: 'none' }}>
              {/* Emoji card — no broken images */}
              <div className="relative flex items-center justify-center" style={{ height: 130, background: CAT_COLORS[ad.category] || 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                <span style={{ fontSize: 52 }}>{ad.icon}</span>
                {ad.featured && (
                  <span className="absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--red)', fontSize: 10 }}>⭐ Featured</span>
                )}
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: ad.condition === 'New' ? 'var(--green)' : 'rgba(255,255,255,0.15)', color: 'white', fontSize: 10 }}>
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
            <Link href="/classifieds/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Post a Free Ad</Link>
          </div>
        )}

        <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Got Cricket Gear to Sell?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Post a free ad and reach thousands of UAE cricket players.</p>
          <Link href="/classifieds/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Post Free Ad →</Link>
        </div>
      </div>
    </div>
  )
}
