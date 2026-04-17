'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Star, Phone, ExternalLink } from 'lucide-react'

const academies = [
  { name: 'ICC Cricket Academy', slug: 'icc-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'World\'s leading cricket facility. 2 floodlit ODI/T20 ovals, 36 practice pitches (Australian, Pakistani, English, Spin), Hawk-Eye technology, power gym. Home of UAE national team.', phone: '+971 54 305 7133', website: 'https://www.iccacademy.com', rating: 4.9, reviews: 312, price: 'AED 400/mo', tags: ['All Ages', 'Floodlit Ovals', 'Hawk-Eye', '36 Nets', 'ODI Accredited'], verified: true, featured: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80', color: '#EF3340' },
  { name: 'G Force Cricket Academy', slug: 'g-force-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'Est. 2001. Head coach Gopal Jaspara — ECB Level 3, former first-class cricketer. Associated with legendary Ramakant Achrekar (Sachin\'s guru). Indoor and outdoor facilities.', phone: '+971 55 226 5549', website: null, rating: 4.8, reviews: 241, price: 'AED 380/mo', tags: ['Est. 2001', 'ECB Level 3', 'Junior & Adult', 'Indoor Nets'], verified: true, featured: true, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80', color: '#009A44' },
  { name: 'MS Dhoni Cricket Academy', slug: 'ms-dhoni-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai / Sharjah', desc: 'Official MS Dhoni branded academy. DCA-certified coaches using Dhoni\'s methodology. Focus on youth development, wicketkeeping and batting techniques.', phone: null, website: null, rating: 4.7, reviews: 189, price: 'AED 350/mo', tags: ['MSD Method', 'U6–U18', 'DCA Certified', 'Wicketkeeping'], verified: true, featured: true, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&q=80', color: '#1a6fa8' },
  { name: 'Rajasthan Royals Academy UAE', slug: 'rajasthan-royals-academy-uae', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City', desc: 'IPL franchise Rajasthan Royals\' official UAE academy. IPL-level coaching, residential camps, year-round training.', phone: null, website: 'https://rajasthanroyals.com/academy', rating: 4.7, reviews: 156, price: 'AED 420/mo', tags: ['IPL Methodology', 'All Ages', 'Residential Camps'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=80', color: '#FF69B4' },
  { name: 'Young Talents Cricket Academy', slug: 'young-talents-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Al Qusais, Dubai & Sharjah', desc: 'Founded 1998 by Shahzad Altaf. Multiple venues. Level 1 & 2 coaches. Hosts Gulf Cup, organises UK & India tours.', phone: null, website: null, rating: 4.6, reviews: 178, price: 'AED 280/mo', tags: ['Est. 1998', 'Gulf Cup Host', 'Tours: UK & India', 'Multiple Venues'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80', color: '#009A44' },
  { name: 'Danube Cricket Academy', slug: 'danube-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Near Sheikh Zayed Rd', desc: 'Est. 2022. Head coach Raiphi Gomez — former Kerala Ranji captain & IPL player. Climate-controlled nets, video analytics, S&C zone.', phone: null, website: null, rating: 4.6, reviews: 134, price: 'AED 350/mo', tags: ['Climate Controlled', 'Video Analytics', 'IPL-trained Coach'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&q=80', color: '#EF3340' },
  { name: 'Set Go Cricket Academy', slug: 'set-go-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai', desc: 'Founded by CP Rizwan — former UAE T20I captain. International-standard training, real match exposure.', phone: null, website: 'https://setgocricketacademy.com', rating: 4.7, reviews: 98, price: 'AED 300/mo', tags: ['UAE Captain-founded', 'Match Exposure', 'All Ages'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=600&q=80', color: '#009A44' },
  { name: 'Maxtalent Cricket Academy', slug: 'maxtalent-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai', desc: 'Cricket Australia Level II & ACC Level I coaches. Boys & girls ages 6–18. Friday & Saturday sessions.', phone: null, website: null, rating: 4.5, reviews: 87, price: 'AED 300/mo', tags: ['CA Level II', 'Girls & Boys', 'Ages 6–18', 'Fri & Sat'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', color: '#C8961E' },
  { name: 'Abu Dhabi Cricket — ADIB Warriors', slug: 'abu-dhabi-cricket-adib-warriors', type: 'Ground', emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium', desc: 'World-class facility at Zayed Cricket Stadium. Programs from Cricket Cubs (age 4) to Senior Warriors (18+). Professional coaching staff.', phone: '+971 2 558 8228', website: 'https://www.abudhabicricket.ae', rating: 4.8, reviews: 203, price: 'AED 380/mo', tags: ['Age 4+', 'Zayed Stadium', 'ADIB Warriors', 'ODI Ground'], verified: true, featured: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80', color: '#1a6fa8' },
  { name: 'Sharjah Cricket Stadium Nets', slug: 'sharjah-cricket-stadium-nets', type: 'Nets', emirate: 'Sharjah', area: 'Sharjah Cricket Stadium', desc: 'Practice at the iconic Sharjah Cricket Stadium. Walk-in sessions available. Turf and matting nets.', phone: null, website: null, rating: 4.6, reviews: 145, price: 'AED 100/hr', tags: ['Walk-in', 'Historic Venue', 'Turf & Matting'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80', color: '#009A44' },
  { name: 'Desert Cubs Cricket Academy', slug: 'desert-cubs-cricket-academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai', desc: 'Junior cricket specialists. Fun-first approach for under-12s, competitive programmes for older age groups.', phone: null, website: null, rating: 4.5, reviews: 67, price: 'AED 250/mo', tags: ['Junior Focus', 'U12 Specialist', 'Weekend Sessions'], verified: false, featured: false, image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=80', color: '#EF3340' },
  { name: 'Ajman Oval Cricket Academy', slug: 'ajman-oval-cricket-academy', type: 'Academy', emirate: 'Ajman', area: 'Ajman', desc: 'Premier academy in Ajman with outdoor oval ground. Affordable coaching for all ages. Strong community following.', phone: null, website: null, rating: 4.4, reviews: 89, price: 'AED 200/mo', tags: ['Outdoor Oval', 'Ajman', 'Affordable'], verified: true, featured: false, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', color: '#C8961E' },
]

const FILTERS = ['All', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Academy', 'Nets', 'Ground']

export default function AcademiesPage() {
  const [active, setActive] = useState('All')

  const filtered = academies.filter(a => {
    if (active === 'All') return true
    if (['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'].includes(active)) return a.emirate === active
    return a.type === active
  })

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 300 }}>
        <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=85" alt="Cricket stadium UAE" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
        <div className="absolute inset-0 flex flex-col justify-end container-uae pb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Find & Book</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Facilities</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{academies.length} academies, nets & grounds across all 7 UAE emirates</p>
        </div>
      </div>

      {/* Sticky filter */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: active === f ? 'var(--red)' : 'var(--cream)',
                color: active === f ? 'white' : 'var(--black)',
                border: `1px solid ${active === f ? 'var(--red)' : 'var(--border)'}`,
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>
          {filtered.length} {active === 'All' ? 'facilities' : `facilities in ${active}`} found
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, i) => (
            <a key={i} href={`/academies/${(a as any).slug || a.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`}
              className="rounded-2xl overflow-hidden card-hover block"
              style={{ background: 'var(--white)', border: a.featured ? `2px solid ${a.color}` : '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="relative h-44 overflow-hidden">
                <img src={a.image} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                {a.featured && <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ background: a.color }}>⭐ Featured</span>}
                {a.verified && <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--green)', fontSize: 10 }}>✓ Verified</span>}
                <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>{a.type}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-medium leading-snug" style={{ color: 'var(--black)' }}>{a.name}</h3>
                  <span className="font-display text-base flex-shrink-0" style={{ color: 'var(--green)' }}>{a.price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs mb-3" style={{ color: 'var(--ink-light)' }}>
                  <MapPin size={11} /> {a.area}, {a.emirate}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>{a.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={11} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                    <span style={{ color: 'var(--gold)' }}>{a.rating}</span>
                    <span style={{ color: 'var(--ink-light)' }}>({a.reviews})</span>
                  </div>
                  {a.phone && <a href={`tel:${a.phone}`} className="flex items-center gap-1 text-xs" style={{ color: 'var(--green)' }}><Phone size={11} /> {a.phone}</a>}
                </div>
                {a.website && (
                  <a href={a.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-3 py-2 rounded-xl text-xs font-medium text-white"
                    style={{ background: a.color }}>
                    <ExternalLink size={12} /> Visit Website
                  </a>
                )}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-3xl text-white mb-2">Run a Cricket Academy?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>List your facility free and reach thousands of UAE cricket players.</p>
          <Link href="/list-business" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>List Your Facility — Free</Link>
        </div>
      </div>
    </div>
  )
}
