'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

const quickLinks = [
  { label: '🏟️ Nets in Dubai', href: '/academies?type=nets&emirate=dubai' },
  { label: '👤 Coaches', href: '/coaches' },
  { label: '🛍️ Buy a bat', href: '/classifieds?category=bats' },
  { label: '✈️ Tour Pakistan', href: '/tours?destination=PK' },
  { label: '🏆 Tournaments', href: '/tournaments' },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <section style={{ background: 'var(--ink)', minHeight: '100vh' }}
      className="relative flex items-center overflow-hidden">

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(26,122,74,0.07) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(26,122,74,0.07) 60px)',
        }} />

      {/* Glow circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(200,150,30,0.1)', transform: 'translate(30%, -30%)' }} />

      {/* Pitch glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(26,122,74,0.2) 0%, transparent 70%)', borderRadius: '50% 50% 0 0' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 w-full">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(200,150,30,0.12)', border: '1px solid rgba(200,150,30,0.25)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
          <span className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
            UAE's #1 Cricket Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display leading-none mb-6"
          style={{ fontSize: 'clamp(64px, 10vw, 116px)', letterSpacing: '0.02em' }}>
          <span className="text-white block">Everything</span>
          <span style={{ color: 'var(--gold)' }} className="block">Cricket</span>
          <span className="text-white block">
            in the <span style={{ color: 'var(--green-mid)' }}>UAE</span>
          </span>
        </h1>

        <p className="text-lg font-light text-white/60 max-w-lg leading-relaxed mb-10">
          Find academies, coaches, gear, umpires, tournaments, and connect with cricket tours across the world — all in one place.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch}
          className="flex items-center gap-3 max-w-2xl mb-8 px-5 py-1.5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Search size={18} className="text-white/40 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search academies, coaches, gear, nets..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/35 py-2"
          />
          <div className="hidden md:flex items-center gap-2 px-3 text-white/35 text-sm border-l border-white/10">
            <MapPin size={14} />
            <span>Dubai</span>
          </div>
          <button type="submit"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0">
            Search
          </button>
        </form>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-white/30 mr-1">Popular:</span>
          {quickLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs text-white/55 px-3 py-1.5 rounded-full no-underline transition-all hover:text-[var(--gold)]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
