'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Star, Phone } from 'lucide-react'

const academies = [
  { name: 'ICC Cricket Academy', slug: 'icc-cricket-academy', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'World\'s leading cricket development facility. 2 floodlit ODI/T20 ovals, 36 practice pitches, Hawk-Eye technology. Home of UAE national team.', phone: '+971 54 305 7133', website: 'https://www.iccacademy.com', rating: 4.9, reviews: 312, price: 'AED 400/mo', tags: ['All Ages', 'ODI Accredited', '36 Nets', 'Hawk-Eye'], verified: true, featured: true, color: '#EF3340', emoji: '🏆' },
  { name: 'G Force Cricket Academy', slug: 'g-force-cricket-academy', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'Est. 2001. ECB Level 3 head coach Gopal Jaspara. Former first-class cricketer. Associated with legendary Ramakant Achrekar — Sachin Tendulkar\'s coach.', phone: '+971 55 226 5549', website: undefined, rating: 4.8, reviews: 241, price: 'AED 380/mo', tags: ['Est. 2001', 'ECB Level 3', 'Junior & Adult'], verified: true, featured: true, color: '#009A44', emoji: '🎓' },
  { name: 'MS Dhoni Cricket Academy', slug: 'ms-dhoni-cricket-academy', emirate: 'Dubai', area: 'Dubai / Sharjah', desc: 'Official MS Dhoni academy UAE. DCA-certified coaches using Dhoni\'s methodology. Wicketkeeping and batting specialists.', phone: undefined, website: undefined, rating: 4.7, reviews: 189, price: 'AED 350/mo', tags: ['MSD Method', 'U6–U18', 'DCA Certified', 'Wicketkeeping'], verified: true, featured: true, color: '#1a6fa8', emoji: '🏏' },
  { name: 'Rajasthan Royals Academy UAE', slug: 'rajasthan-royals-academy-uae', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'Official UAE academy of IPL franchise Rajasthan Royals. IPL-level coaching, residential camps, year-round training.', phone: undefined, website: 'https://rajasthanroyals.com/academy', rating: 4.7, reviews: 156, price: 'AED 420/mo', tags: ['IPL Methodology', 'Residential Camps', 'All Ages'], verified: true, featured: false, color: '#FF69B4', emoji: '🏅' },
  { name: 'Danube Cricket Academy', slug: 'danube-cricket-academy', emirate: 'Dubai', area: 'Near Sheikh Zayed Road', desc: 'Est. 2022. Head coach Raiphi Gomez — former Kerala Ranji Trophy captain & IPL player. Climate-controlled nets, video analytics.', phone: undefined, website: undefined, rating: 4.6, reviews: 134, price: 'AED 350/mo', tags: ['Climate Controlled', 'Video Analytics', 'IPL Coach'], verified: true, featured: false, color: '#EF3340', emoji: '🎯' },
  { name: 'Set Go Cricket Academy', slug: 'set-go-cricket-academy', emirate: 'Dubai', area: 'Dubai', desc: 'Founded by CP Rizwan — former UAE T20I captain. International-standard training, real match exposure.', phone: undefined, website: 'https://setgocricketacademy.com', rating: 4.7, reviews: 98, price: 'AED 300/mo', tags: ['UAE Captain-founded', 'Match Exposure', 'All Ages'], verified: true, featured: false, color: '#009A44', emoji: '🌟' },
  { name: 'Young Talents Cricket Academy', slug: 'young-talents-cricket-academy', emirate: 'Dubai', area: 'Al Qusais & Sharjah', desc: 'Founded 1998 by Shahzad Altaf — UAE\'s oldest running cricket academy. ECB Level 2. Hosts Gulf Cup, international tours to UK & India.', phone: undefined, website: undefined, rating: 4.6, reviews: 178, price: 'AED 280/mo', tags: ['Est. 1998', 'Gulf Cup Host', 'UK & India Tours'], verified: true, featured: false, color: '#009A44', emoji: '🎓' },
  { name: 'Maxtalent Cricket Academy', slug: 'maxtalent-cricket-academy', emirate: 'Dubai', area: 'Dubai', desc: 'Cricket Australia Level II & ACC Level I coaches. Co-ed programme for boys and girls aged 6–18. Friday & Saturday sessions.', phone: undefined, website: undefined, rating: 4.5, reviews: 87, price: 'AED 300/mo', tags: ['CA Level II', 'Girls & Boys', 'Ages 6–18'], verified: true, featured: false, color: '#C8961E', emoji: '⭐' },
  { name: 'Abu Dhabi Cricket — ADIB Warriors', slug: 'abu-dhabi-cricket-adib-warriors', emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium', desc: 'Cricket Cubs (Age 4) to Senior Warriors (18+). World-class Zayed Cricket Stadium facility. Professional coaching staff.', phone: '+971 2 558 8228', website: 'https://www.abudhabicricket.ae', rating: 4.8, reviews: 203, price: 'AED 380/mo', tags: ['Age 4+', 'Zayed Stadium', 'All Levels'], verified: true, featured: true, color: '#1a6fa8', emoji: '🏟️' },
  { name: 'Desert Cubs Cricket Academy', slug: 'desert-cubs-cricket-academy', emirate: 'Dubai', area: 'Dubai', desc: 'Junior cricket specialists. Fun-first philosophy for under-12s, structured competitive programmes for older groups.', phone: undefined, website: undefined, rating: 4.5, reviews: 67, price: 'AED 250/mo', tags: ['Junior Focus', 'U12 Specialist', 'Weekend Sessions'], verified: false, featured: false, color: '#EF3340', emoji: '🦁' },
  { name: 'Ajman Oval Cricket Academy', slug: 'ajman-oval-cricket-academy', emirate: 'Ajman', area: 'Ajman', desc: 'Premier academy in Ajman with full outdoor oval ground. Affordable coaching, strong community following, competitive league teams.', phone: undefined, website: undefined, rating: 4.4, reviews: 89, price: 'AED 200/mo', tags: ['Outdoor Oval', 'Community Cricket', 'Affordable'], verified: true, featured: false, color: '#C8961E', emoji: '🌴' },
]

const FILTERS = ['All', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']

export default function AcademiesPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = academies.filter(a => {
    if (filter !== 'All' && a.emirate !== filter) return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Enrol Now
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Academies</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {academies.length} cricket academies across UAE — from beginner to elite
          </p>
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl max-w-md"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search academies..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40" />
          </div>
          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { label: 'Academies', value: academies.length },
              { label: 'Emirates', value: [...new Set(academies.map(a => a.emirate))].length },
              { label: 'IPL-linked', value: 2 },
              { label: 'ICC-accredited', value: 1 },
            ].map(s => (
              <div key={s.label} className="px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span className="font-display text-xl text-white">{s.value} </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2 items-center">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f} {f !== 'All' && `(${academies.filter(a => a.emirate === f).length})`}
            </button>
          ))}
          <Link href="/facilities" className="ml-auto text-xs px-4 py-1.5 rounded-full font-medium"
            style={{ background: 'var(--green)', color: 'white' }}>
            🏟️ Book Nets/Grounds →
          </Link>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>
          {filtered.length} academies found
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(a => (
            <Link key={a.slug} href={`/academies/${a.slug}`}
              className="rounded-2xl overflow-hidden card-hover block"
              style={{ background: 'var(--white)', border: a.featured ? `2px solid ${a.color}` : '1px solid var(--border)', textDecoration: 'none' }}>
              {/* Emoji header */}
              <div className="flex items-center justify-center relative" style={{ height: 110, background: `linear-gradient(135deg, ${a.color}15, ${a.color}30)` }}>
                <span style={{ fontSize: 48 }}>{a.emoji}</span>
                {a.featured && (
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ background: a.color, fontSize: 10 }}>
                    ⭐ Featured
                  </span>
                )}
                {a.verified && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--green)', fontSize: 9 }}>
                    ✓ Verified
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--black)' }}>{a.name}</h3>
                <div className="flex items-center gap-1 text-xs mb-2" style={{ color: 'var(--ink-light)' }}>
                  <MapPin size={10} /> {a.area}, {a.emirate}
                </div>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--ink-light)' }}>{a.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      <Star size={10} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                      <span style={{ color: 'var(--gold)' }}>{a.rating}</span>
                      <span style={{ color: 'var(--ink-light)' }}>({a.reviews})</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-base" style={{ color: 'var(--green)' }}>{a.price}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  {a.phone ? (
                    <a href={`tel:${a.phone}`} onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs" style={{ color: 'var(--green)' }}>
                      <Phone size={11} /> {a.phone}
                    </a>
                  ) : <span />}
                  <span className="text-xs font-medium" style={{ color: a.color }}>View Academy →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🎓</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No academies found</h3>
            <button onClick={() => { setFilter('All'); setSearch('') }}
              className="px-5 py-2 rounded-xl text-sm text-white mt-2" style={{ background: 'var(--red)' }}>
              Show All Academies
            </button>
          </div>
        )}

        {/* Enrol CTA */}
        <div className="mt-10 rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)' }}>
          <div>
            <h3 className="font-display text-2xl text-white mb-1">Run a Cricket Academy?</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              List your academy free. Manage students, batches, attendance and fees through our platform.
            </p>
          </div>
          <Link href="/vendor/onboarding" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0" style={{ background: 'var(--red)' }}>
            List Your Academy →
          </Link>
        </div>
      </div>
    </div>
  )
}
