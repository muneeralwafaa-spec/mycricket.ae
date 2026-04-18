'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Star, Phone, Clock } from 'lucide-react'

const facilities = [
  {
    name: 'ICC Academy — Practice Nets', slug: 'icc-cricket-academy', type: 'Nets',
    emirate: 'Dubai', area: 'Dubai Sports City',
    desc: '36 practice pitches — Australian, Pakistani, English and spin surfaces. Floodlit for evening sessions. Hawk-Eye technology. UAE national team home ground.',
    phone: '+971 54 305 7133', website: 'https://www.iccacademy.com',
    rating: 4.9, reviews: 312, price: 'AED 150/hr', tags: ['Floodlit', '36 Nets', 'Turf & Matting', 'Hawk-Eye'],
    verified: true, featured: true, color: '#EF3340', emoji: '🏟️',
    hours: '6am – 11pm', lanes: 36,
  },
  {
    name: 'Sharjah Cricket Stadium Nets', slug: 'sharjah-cricket-stadium-nets', type: 'Nets',
    emirate: 'Sharjah', area: 'Sharjah Cricket Stadium',
    desc: 'Practice nets at the iconic Sharjah Cricket Stadium — world record venue for ODI centuries. Turf and matting wickets. Walk-in available on non-match days.',
    phone: undefined, website: undefined,
    rating: 4.6, reviews: 145, price: 'AED 100/hr', tags: ['Walk-in', 'Historic Venue', 'Turf & Matting', 'ODI Ground'],
    verified: true, featured: true, color: '#009A44', emoji: '🏟️',
    hours: '7am – 9pm', lanes: 8,
  },
  {
    name: 'Abu Dhabi Cricket Practice Nets', slug: 'abu-dhabi-cricket-adib-warriors', type: 'Nets',
    emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium',
    desc: 'World-class practice nets at Zayed Cricket Stadium. International standard turf surfaces. Available for public booking on non-match days.',
    phone: '+971 2 558 8228', website: 'https://www.abudhabicricket.ae',
    rating: 4.8, reviews: 203, price: 'AED 120/hr', tags: ['International Ground', 'Turf Nets', 'Floodlit', 'Professional Standard'],
    verified: true, featured: true, color: '#1a6fa8', emoji: '🏟️',
    hours: '7am – 10pm', lanes: 12,
  },
  {
    name: 'Danube Indoor Cricket Nets', slug: 'danube-cricket-academy', type: 'Indoor',
    emirate: 'Dubai', area: 'Near Sheikh Zayed Road',
    desc: 'Climate-controlled indoor cricket nets — essential for UAE summer training. Attached S&C gym and video analysis setup. No weather interruptions.',
    phone: undefined, website: undefined,
    rating: 4.6, reviews: 134, price: 'AED 200/hr', tags: ['Climate Controlled', 'Indoor', 'A/C', 'Year-round'],
    verified: true, featured: false, color: '#EF3340', emoji: '🏢',
    hours: '6am – 11pm', lanes: 4,
  },
  {
    name: 'G Force Indoor Nets', slug: 'g-force-cricket-academy', type: 'Indoor',
    emirate: 'Dubai', area: 'Dubai Sports City',
    desc: 'Indoor cricket nets at G Force Cricket Academy. ECB Level 3 coaching available. Well-maintained surfaces. Both mat and turf lanes.',
    phone: '+971 55 226 5549', website: undefined,
    rating: 4.8, reviews: 241, price: 'AED 130/hr', tags: ['Indoor', 'Turf & Mat', 'ECB Coach Available'],
    verified: true, featured: false, color: '#009A44', emoji: '🏢',
    hours: '7am – 10pm', lanes: 6,
  },
  {
    name: 'Ajman Oval Ground', slug: 'ajman-oval-cricket-academy', type: 'Ground',
    emirate: 'Ajman', area: 'Ajman',
    desc: 'Full outdoor oval cricket ground in Ajman. Available for team bookings, practice sessions and match hosting. Affordable rates.',
    phone: undefined, website: undefined,
    rating: 4.4, reviews: 89, price: 'AED 300/session', tags: ['Full Oval', 'Match Hosting', 'Team Bookings', 'Ajman'],
    verified: true, featured: false, color: '#C8961E', emoji: '🏏',
    hours: '6am – 9pm', lanes: undefined,
  },
]

const FILTERS = ['All', 'Nets', 'Indoor', 'Ground', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']

export default function FacilitiesPage() {
  const [filter, setFilter] = useState('All')

  const filtered = facilities.filter(f => {
    if (filter === 'All') return true
    if (['Nets', 'Indoor', 'Ground'].includes(filter)) return f.type === filter
    return f.emirate === filter
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Book Now</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Facilities</h1>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Book nets, grounds and indoor centres across all 7 UAE emirates
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: '🎯', label: 'Cricket Nets', count: facilities.filter(f => f.type === 'Nets').length },
              { icon: '🏢', label: 'Indoor Centres', count: facilities.filter(f => f.type === 'Indoor').length },
              { icon: '🏟️', label: 'Oval Grounds', count: facilities.filter(f => f.type === 'Ground').length },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span>{s.icon}</span>
                <span className="text-sm text-white">{s.count} {s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(f => (
            <div key={f.slug} className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--white)', border: f.featured ? `2px solid ${f.color}` : '1px solid var(--border)' }}>
              {/* Card header with emoji */}
              <div className="flex items-center justify-center relative" style={{ height: 120, background: `linear-gradient(135deg, ${f.color}22, ${f.color}44)` }}>
                <span style={{ fontSize: 52 }}>{f.emoji}</span>
                {f.featured && (
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ background: f.color, fontSize: 10 }}>
                    ⭐ Featured
                  </span>
                )}
                <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium text-white"
                  style={{ background: f.type === 'Indoor' ? '#1a6fa8' : f.type === 'Ground' ? '#009A44' : 'var(--black)', fontSize: 10 }}>
                  {f.type}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div>
                    <h3 className="text-sm font-medium leading-tight" style={{ color: 'var(--black)' }}>{f.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <MapPin size={10} /> {f.area}, {f.emirate}
                    </div>
                  </div>
                  {f.verified && <span className="text-xs text-white px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'var(--green)', fontSize: 9 }}>✓</span>}
                </div>

                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)', lineHeight: 1.6 }}>{f.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {f.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--ink-light)' }}>
                    <span className="flex items-center gap-1"><Star size={10} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />{f.rating}</span>
                    {f.hours && <span className="flex items-center gap-1"><Clock size={10} />{f.hours}</span>}
                  </div>
                  <div className="font-display text-lg" style={{ color: 'var(--green)' }}>{f.price}</div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/book/nets`}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white text-center"
                    style={{ background: 'var(--red)' }}>
                    🏏 Book Now
                  </Link>
                  {f.phone && (
                    <a href={`tel:${f.phone}`}
                      className="px-3 py-2.5 rounded-xl text-xs font-medium"
                      style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                      <Phone size={13} />
                    </a>
                  )}
                  <Link href={`/academies/${f.slug}`}
                    className="px-3 py-2.5 rounded-xl text-xs"
                    style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                    Info →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book nets CTA */}
        <div className="mt-10 rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)' }}>
          <div>
            <h3 className="font-display text-2xl text-white mb-1">List Your Facility</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Own cricket nets, a ground or indoor centre? List free and start receiving online bookings.
            </p>
          </div>
          <Link href="/vendor/onboarding" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0" style={{ background: 'var(--red)' }}>
            List Your Facility →
          </Link>
        </div>
      </div>
    </div>
  )
}
