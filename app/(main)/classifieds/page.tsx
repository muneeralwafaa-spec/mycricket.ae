import { Metadata } from 'next'
import Link from 'next/link'
import { Search, Plus } from 'lucide-react'
import { CLASSIFIED_CATEGORIES, EMIRATES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cricket Classifieds UAE — Buy & Sell Cricket Gear',
  description: 'Buy and sell new or used cricket gear in the UAE. Bats, pads, kits, balls, gloves and more.',
}

const mockAds = [
  { icon: '🏏', title: 'Gray Nicolls Legend — Grade 1 English Willow', price: 480, condition: 'Used', emirate: 'Dubai Marina', age: '2d', featured: true },
  { icon: '🥊', title: 'SG Test Batting Gloves — Right Hand Large', price: 95, condition: 'New', emirate: 'Sharjah', age: '3d', featured: false },
  { icon: '👕', title: 'Full Junior Cricket Kit — Age 10-12', price: 350, condition: 'Used', emirate: 'Abu Dhabi', age: '1d', featured: false },
  { icon: '⚾', title: 'Kookaburra Red Match Balls × 6', price: 240, condition: 'New', emirate: 'Al Ain', age: '5d', featured: false },
  { icon: '🦺', title: 'Gunn & Moore Batting Pads — Adult Medium', price: 120, condition: 'Used', emirate: 'Ajman', age: '1d', featured: false },
  { icon: '🎽', title: 'Custom Team Jerseys — 10 Pieces (Sublimation)', price: 650, condition: 'New', emirate: 'Dubai', age: '6h', featured: true },
  { icon: '⛑️', title: 'Shrey Cricket Helmet — Medium, Steel Grill', price: 180, condition: 'Used', emirate: 'Dubai', age: '4d', featured: false },
  { icon: '👟', title: 'Adidas Cricket Spikes — UK Size 9', price: 110, condition: 'Used', emirate: 'Sharjah', age: '2d', featured: false },
  { icon: '🏏', title: 'SS Ton Player Edition — Barely Used', price: 320, condition: 'Used', emirate: 'Dubai', age: '1d', featured: false },
]

export default function ClassifiedsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Buy & Sell</div>
            <h1 className="font-display text-6xl text-white tracking-wide mb-3">Cricket Classifieds</h1>
            <p className="text-white/50 text-sm max-w-md">
              New and used cricket gear — bats, pads, kits, balls and more across the UAE.
            </p>
          </div>
          <Link href="/classifieds/new"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium no-underline"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            <Plus size={16} /> Post a Free Ad
          </Link>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }} className="px-4 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 min-w-max">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: 'var(--green)', color: '#fff' }}>
            All Items
          </button>
          {CLASSIFIED_CATEGORIES.map(c => (
            <button key={c.value} className="px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap"
              style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 px-4 py-2 rounded-lg"
            style={{ border: '1px solid var(--border)', background: '#fff' }}>
            <Search size={15} style={{ color: 'var(--ink-light)' }} />
            <input placeholder="Search classifieds..." className="bg-transparent text-sm outline-none flex-1" style={{ color: 'var(--ink)' }} />
          </div>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: '#fff', color: 'var(--ink)' }}>
            <option>All Emirates</option>
            {EMIRATES.map(e => <option key={e.value}>{e.label}</option>)}
          </select>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: '#fff', color: 'var(--ink)' }}>
            <option>Any Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: '#fff', color: 'var(--ink)' }}>
            <option>Sort: Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>
          {mockAds.length} items listed
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockAds.map((ad, i) => (
            <a key={i} href="/classifieds"
              className="no-underline rounded-xl overflow-hidden block transition-all duration-200 hover:-translate-y-1 group"
              style={{ background: '#fff', border: ad.featured ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
              <div className="h-32 flex items-center justify-center relative" style={{ background: 'var(--green-light)' }}>
                <span className="text-4xl">{ad.icon}</span>
                {ad.featured && (
                  <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                    Featured
                  </span>
                )}
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium font-mono-dm"
                  style={{
                    background: ad.condition === 'New' ? 'var(--green)' : 'var(--gold-light)',
                    color: ad.condition === 'New' ? '#fff' : 'var(--gold)',
                  }}>
                  {ad.condition}
                </span>
              </div>
              <div className="p-3">
                <div className="text-xs font-medium leading-snug mb-2 group-hover:text-[var(--green)] transition-colors"
                  style={{ color: 'var(--ink)' }}>
                  {ad.title}
                </div>
                <div className="font-display text-xl tracking-wide mb-1" style={{ color: 'var(--green)' }}>
                  AED {ad.price}
                </div>
                <div className="flex justify-between items-center text-xs" style={{ color: 'var(--ink-light)' }}>
                  <span>📍 {ad.emirate}</span>
                  <span>{ad.age}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
