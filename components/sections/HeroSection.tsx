'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

const quickLinks = [
  { label: '🏟️ Nets in Dubai',   href: '/academies?type=nets&emirate=dubai' },
  { label: '👤 Coaches',          href: '/coaches' },
  { label: '🛍️ Buy a bat',       href: '/classifieds?category=bats' },
  { label: '✈️ Tour Pakistan',    href: '/tours?destination=PK' },
  { label: '🏆 Tournaments',      href: '/tournaments' },
  { label: '📋 ECB D50 Register', href: 'https://cricclubs.com/UAE' },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Real background image */}
      <img
        src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=85"
        alt="Cricket stadium"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay with UAE-colored gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(15,82,51,0.7) 50%, rgba(0,0,0,0.85) 100%)' }} />

      {/* UAE flag vertical stripe on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ background: 'linear-gradient(180deg, var(--red) 0%, var(--green) 50%, var(--black) 100%)' }} />

      <div className="container-uae relative z-10 py-24 md:py-32 w-full">
        {/* UAE badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(239,51,64,0.15)', border: '1px solid rgba(239,51,64,0.3)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--red)' }} />
          <span className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: 'var(--red)' }}>
            UAE's #1 Cricket Platform
          </span>
          <span>🇦🇪</span>
        </div>

        {/* Title */}
        <h1 className="font-display leading-none mb-6 text-white"
          style={{ fontSize: 'clamp(52px, 10vw, 110px)' }}>
          <span className="block">Everything</span>
          <span className="block" style={{ color: 'var(--red)' }}>Cricket</span>
          <span className="block">in the <span style={{ color: 'var(--green)' }}>UAE</span></span>
        </h1>

        <p className="text-base md:text-lg font-light mb-10 max-w-xl"
          style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Academies, coaches, gear, umpires, tournaments and tours — all in one platform built for UAE cricket.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-2xl mb-8 px-4 py-2 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
          <Search size={17} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search academies, coaches, gear, umpires..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2.5 placeholder-white/40" />
          <div className="hidden sm:flex items-center gap-1.5 px-3 text-sm border-l"
            style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <MapPin size={13} /> Dubai
          </div>
          <button type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-medium flex-shrink-0"
            style={{ background: 'var(--red)', color: 'white' }}>
            Search
          </button>
        </form>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs mr-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Popular:</span>
          {quickLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Live match ticker */}
        <div className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl max-w-md"
          style={{ background: 'rgba(239,51,64,0.1)', border: '1px solid rgba(239,51,64,0.2)' }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: 'var(--red)' }} />
          <span className="text-xs text-white/70">
            <span className="font-medium text-white">LIVE: </span>
            ECB Emirates D50 April 2026 — Season registration open on CricClubs
          </span>
          <a href="https://cricclubs.com/UAE" target="_blank" rel="noopener noreferrer"
            className="text-xs ml-auto flex-shrink-0" style={{ color: 'var(--red)' }}>
            Register →
          </a>
        </div>
      </div>
    </section>
  )
}
