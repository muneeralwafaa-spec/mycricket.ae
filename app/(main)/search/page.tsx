'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const ALL_RESULTS = [
  // Academies
  { type: 'Academy', title: 'ICC Cricket Academy', desc: 'World-class cricket development facility at Dubai Sports City', href: '/academies/icc-cricket-academy', tag: 'Dubai', icon: '🏟️' },
  { type: 'Academy', title: 'G Force Cricket Academy', desc: 'Est. 2001. ECB Level 3 certified. Dubai Sports City', href: '/academies/g-force-cricket-academy', tag: 'Dubai', icon: '🏟️' },
  { type: 'Academy', title: 'Abu Dhabi Cricket — ADIB Warriors', desc: 'Zayed Cricket Stadium. Age 4+', href: '/academies/abu-dhabi-cricket-adib-warriors', tag: 'Abu Dhabi', icon: '🏟️' },
  { type: 'Academy', title: 'Young Talents Cricket Academy', desc: 'Est. 1998. 26+ years developing UAE cricket', href: '/academies/young-talents-cricket-academy', tag: 'Dubai/Sharjah', icon: '🏟️' },
  // Coaches
  { type: 'Coach', title: 'Lalchand Rajput', desc: 'UAE Head Coach. Former India Test player', href: '/coaches/lalchand-rajput', tag: 'Dubai', icon: '👤' },
  { type: 'Coach', title: 'CP Rizwan', desc: 'Former UAE captain. Set Go Cricket Academy', href: '/coaches/cp-rizwan', tag: 'Dubai', icon: '👤' },
  { type: 'Coach', title: 'Gopal Jaspara', desc: 'ECB Level 3. G Force Cricket Academy', href: '/coaches/gopal-jaspara', tag: 'Dubai', icon: '👤' },
  { type: 'Coach', title: 'Raiphi Gomez', desc: 'Former IPL player. Danube Cricket Academy', href: '/coaches/raiphi-gomez', tag: 'Dubai', icon: '👤' },
  // Tournaments
  { type: 'Tournament', title: 'ILT20 Season 5', desc: 'UAE premier franchise T20 league. 6 teams', href: '/tournaments/ilt20-season-5', tag: 'Dubai', icon: '🏆' },
  { type: 'Tournament', title: 'Emirates D50 April 2026', desc: 'ECB flagship 50-over domestic league. Registration open', href: '/tournaments/emirates-d50', tag: 'UAE', icon: '🏆' },
  // Shop
  { type: 'Product', title: 'Gray Nicolls Legend DXM', desc: 'Grade 1 English Willow bat. AED 899', href: '/shop/product/gn-legend-dxm', tag: 'Cricket Store Dubai', icon: '🏏' },
  { type: 'Product', title: 'Kookaburra Pro 500 Helmet', desc: 'ICC approved. Steel grill. AED 450', href: '/shop/product/kookaburra-helmet-pro500', tag: 'Sports World UAE', icon: '⛑️' },
  { type: 'Product', title: 'Custom Team Jerseys', desc: 'Full sublimation. 11 players. AED 950', href: '/shop/product/custom-jersey-11', tag: 'UAE Cricket Kits', icon: '🎽' },
  // Booking
  { type: 'Booking', title: 'Book Cricket Nets', desc: 'Book nets across Dubai, Abu Dhabi, Sharjah', href: '/book/nets', tag: 'UAE', icon: '🎯' },
  { type: 'Booking', title: 'Book a Cricket Coach', desc: 'Book sessions with UAE top coaches', href: '/book/coach', tag: 'UAE', icon: '👤' },
  // Classifieds
  { type: 'Classified', title: 'Gray Nicolls Legend — Grade 1 EW', desc: 'Used. AED 480. Dubai Marina', href: '/classifieds/gray-nicolls-legend-1', tag: 'Dubai', icon: '💰' },
  { type: 'Classified', title: 'BOLA Bowling Machine — Full Setup', desc: 'Used. AED 2800. Dubai Sports City', href: '/classifieds/bowling-machine-1', tag: 'Dubai', icon: '⚙️' },
]

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  Academy:    { bg: '#E6F7ED', color: '#009A44' },
  Coach:      { bg: '#FDEAEB', color: '#EF3340' },
  Tournament: { bg: '#FDF3DC', color: '#C8961E' },
  Product:    { bg: '#EBF5FF', color: '#1a6fa8' },
  Booking:    { bg: '#1a1a2e', color: '#fff' },
  Classified: { bg: '#F5F5F5', color: '#666' },
}

function SearchResults() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filter, setFilter] = useState('All')

  const results = ALL_RESULTS.filter(r => {
    if (filter !== 'All' && r.type !== filter) return false
    if (!query) return true
    const q = query.toLowerCase()
    return r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q)
  })

  const types = ['All', ...Array.from(new Set(ALL_RESULTS.map(r => r.type)))]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <h1 className="font-display text-5xl text-white mb-5">Search</h1>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xl"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Search size={18} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search academies, coaches, products, classifieds..."
              autoFocus
              className="flex-1 bg-transparent text-white text-base outline-none placeholder-white/40" />
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2 overflow-x-auto">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className="px-4 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-all"
              style={{ background: filter === t ? 'var(--red)' : 'var(--cream)', color: filter === t ? 'white' : 'var(--black)', border: `1px solid ${filter === t ? 'var(--red)' : 'var(--border)'}` }}>
              {t} {t !== 'All' && `(${ALL_RESULTS.filter(r => r.type === t && (!query || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase()))).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        {query ? (
          <div className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>
            {results.length} results for &quot;<strong style={{ color: 'var(--black)' }}>{query}</strong>&quot;
          </div>
        ) : (
          <div className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Showing all {results.length} items</div>
        )}

        {results.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No results found</h3>
            <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Try different keywords or browse our sections</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r, i) => {
              const tc = TYPE_COLORS[r.type] || TYPE_COLORS.Classified
              return (
                <Link key={i} href={r.href}
                  className="flex items-start gap-4 p-4 rounded-2xl card-hover"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: tc.bg }}>
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: tc.bg, color: tc.color }}>{r.type}</span>
                      <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{r.tag}</span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{r.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{r.desc}</div>
                  </div>
                  <span style={{ color: 'var(--ink-light)', flexShrink: 0 }}>→</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Browse sections */}
        {!query && (
          <div className="mt-10">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { href: '/academies', icon: '🏟️', label: 'Facilities' },
                { href: '/coaches', icon: '👤', label: 'Coaches' },
                { href: '/shop', icon: '🏏', label: 'Shop' },
                { href: '/classifieds', icon: '💰', label: 'Classifieds' },
                { href: '/tournaments', icon: '🏆', label: 'Tournaments' },
                { href: '/book/nets', icon: '🎯', label: 'Book Nets' },
              ].map(c => (
                <Link key={c.href} href={c.href}
                  className="rounded-2xl p-4 text-center card-hover"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--black)' }}>{c.label}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-uae py-20 text-center" style={{ color: 'var(--ink-light)' }}>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
