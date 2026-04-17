import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Star, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cricket Academies & Facilities in UAE | Dubai, Abu Dhabi, Sharjah',
  description: 'Find the best cricket academies, nets, grounds and indoor centres in UAE. ICC Academy, G Force, MS Dhoni Academy, Young Talents and more across Dubai, Abu Dhabi, Sharjah.',
}

const academies = [
  {
    name: 'ICC Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai Sports City',
    area: 'Dubai',
    description: 'The official ICC Academy — world-class facilities with indoor/outdoor pitches, high-speed bowling machines, video analysis. Home of UAE national team training.',
    phone: '+971 54 305 7133',
    website: 'https://www.icc-cricket.com/about/cricket/icc-academy',
    rating: 4.9, reviews: 312,
    price: 'AED 400/mo',
    tags: ['All Ages', 'Indoor Nets', 'Turf Wickets', 'Video Analysis'],
    verified: true, featured: true,
    icon: '🏛️',
  },
  {
    name: 'G Force Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Dubai Sports City',
    description: 'One of Dubai\'s oldest academies (est. 2001). Head coach Gopal Jaspara is a Level 3 former first-class cricketer. Legend coach Ramakant Achrekar (Sachin\'s guru) associated.',
    phone: '+971 55 226 5549',
    rating: 4.8, reviews: 241,
    price: 'AED 380/mo',
    tags: ['Junior', 'Adults', 'Pro', 'Indoor Nets'],
    verified: true, featured: true,
    icon: '⚡',
  },
  {
    name: 'MS Dhoni Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Sharjah Cricket Stadium',
    description: 'Official academy under MS Dhoni\'s brand. Certified DCA coaches, focused on youth development using Dhoni\'s training methodology.',
    rating: 4.7, reviews: 189,
    price: 'AED 350/mo',
    tags: ['U6–U18', 'Certified Coaches', 'MSD Method'],
    verified: true, featured: true,
    icon: '🏆',
  },
  {
    name: 'Rajasthan Royals Academy UAE',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Dubai Sports City',
    description: 'IPL franchise Rajasthan Royals\' official academy in UAE. Professional coaching with IPL-level methodology for all age groups.',
    rating: 4.7, reviews: 156,
    price: 'AED 420/mo',
    tags: ['All Ages', 'IPL Methodology', 'Residential Camps'],
    verified: true, featured: false,
    icon: '🌟',
  },
  {
    name: 'Young Talents Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai / Sharjah',
    area: 'Multiple Locations',
    description: 'Founded 1998 by Shahzad Altaf. Venues in Al Qusais, Sharjah & Bur Dubai. Hosts Gulf Cup, organises tours to UK & India. Level 1 & Level 2 certified trainers.',
    rating: 4.6, reviews: 178,
    price: 'AED 280/mo',
    tags: ['Est. 1998', 'Tours Abroad', 'Multiple Venues', 'Gulf Cup'],
    verified: true, featured: false,
    icon: '🌱',
  },
  {
    name: 'Danube Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Near Sheikh Zayed Road',
    description: 'Est. 2022. Head coach Raiphi Gomez — former Kerala Ranji captain & IPL player. Climate-controlled nets, video analytics, strength & conditioning.',
    rating: 4.6, reviews: 134,
    price: 'AED 350/mo',
    tags: ['Climate Controlled', 'Video Analytics', 'S&C Zone'],
    verified: true, featured: false,
    icon: '🏗️',
  },
  {
    name: 'Set Go Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Dubai',
    description: 'Founded by CP Rizwan — UAE national team captain & T20 World Cup player. International-standard coaching with real match exposure.',
    website: 'https://setgocricketacademy.com',
    rating: 4.7, reviews: 98,
    price: 'AED 300/mo',
    tags: ['UAE Captain-led', 'All Ages', 'Match Exposure'],
    verified: true, featured: false,
    icon: '🎯',
  },
  {
    name: 'Maxtalent Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Dubai',
    description: 'Cricket Australia Level II & ACC Level I coaches. Boys & girls ages 6–18. Sessions on Fridays & Saturdays. Strong local tournament participation.',
    rating: 4.5, reviews: 87,
    price: 'AED 300/mo',
    tags: ['Girls & Boys', 'CA Level II', 'U6–U18', 'Fri & Sat'],
    verified: true, featured: false,
    icon: '💪',
  },
  {
    name: 'Abu Dhabi Cricket (ICC Academy)',
    type: 'Ground',
    emirate: 'Abu Dhabi',
    area: 'Zayed Cricket Stadium',
    description: 'World-class cricket infrastructure at Zayed Cricket Stadium. Player Development Programs from Cricket Cubs (age 4) to Senior Warriors (18+).',
    phone: '+971 2 558 8228',
    website: 'https://www.abudhabicricket.ae',
    rating: 4.8, reviews: 203,
    price: 'AED 380/mo',
    tags: ['Age 4+', 'Full Stadium', 'Professional', 'ADIB Warriors'],
    verified: true, featured: true,
    icon: '🏟️',
  },
  {
    name: 'Sharjah Cricket Stadium Nets',
    type: 'Nets',
    emirate: 'Sharjah',
    area: 'Sharjah',
    description: 'Practice nets at the iconic Sharjah Cricket Stadium — one of the world\'s most storied cricket venues. Walk-in available.',
    rating: 4.6, reviews: 145,
    price: 'AED 100/hr',
    tags: ['Walk-in', 'Iconic Venue', 'Turf & Matting'],
    verified: true, featured: false,
    icon: '🏟️',
  },
  {
    name: 'Desert Cubs Cricket Academy',
    type: 'Academy',
    emirate: 'Dubai',
    area: 'Dubai',
    description: 'Specialist in junior cricket development. Fun-first approach for under-12s, competitive programs for older age groups. Weekend-friendly schedule.',
    rating: 4.5, reviews: 67,
    price: 'AED 250/mo',
    tags: ['Junior Focus', 'U12 Specialist', 'Weekends'],
    verified: false, featured: false,
    icon: '🐾',
  },
  {
    name: 'Ajman Oval Cricket Academy',
    type: 'Academy',
    emirate: 'Ajman',
    area: 'Ajman',
    description: 'Premier cricket academy in Ajman with outdoor oval grounds. Affordable coaching for all ages. Strong community following in the Gulf Malayali cricket circuit.',
    rating: 4.4, reviews: 89,
    price: 'AED 200/mo',
    tags: ['Outdoor Oval', 'All Ages', 'Ajman', 'Affordable'],
    verified: true, featured: false,
    icon: '⭕',
  },
]

export default function AcademiesPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Find & Book
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Cricket Facilities</h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {academies.length} academies, nets, grounds & indoor centres across all 7 UAE emirates
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2">
          {['All', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Academy', 'Nets', 'Ground'].map((f, i) => (
            <button key={f} className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: i === 0 ? 'var(--red)' : 'var(--cream)',
                color: i === 0 ? 'white' : 'var(--ink)',
                border: `1px solid ${i === 0 ? 'var(--red)' : 'var(--border)'}`,
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container-uae py-10">
        <div className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>
          Showing {academies.length} facilities across the UAE
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {academies.map((a, i) => (
            <div key={i} className="rounded-2xl overflow-hidden card-hover"
              style={{
                background: 'var(--white)',
                border: a.featured ? '2px solid var(--red)' : '1px solid var(--border)',
              }}>
              {/* Image placeholder */}
              <div className="h-36 flex items-center justify-center relative text-5xl"
                style={{ background: a.featured ? 'rgba(239,51,64,0.08)' : 'var(--green-light)' }}>
                {a.icon}
                <div className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: a.featured ? 'var(--red)' : 'var(--green)' }} />
                {a.featured && (
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium text-white"
                    style={{ background: 'var(--red)' }}>
                    Featured
                  </span>
                )}
                {a.verified && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--green)' }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-medium leading-snug" style={{ color: 'var(--black)' }}>{a.name}</h3>
                  <span className="font-display text-base flex-shrink-0" style={{ color: 'var(--green)' }}>{a.price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs mb-3" style={{ color: 'var(--ink-light)' }}>
                  <MapPin size={11} /> {a.emirate}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>
                  {a.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={11} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                    <span style={{ color: 'var(--gold)' }}>{a.rating}</span>
                    <span style={{ color: 'var(--ink-light)' }}>({a.reviews} reviews)</span>
                  </div>
                  {a.phone && (
                    <a href={`tel:${a.phone}`} className="flex items-center gap-1 text-xs"
                      style={{ color: 'var(--green)' }}>
                      <Phone size={11} /> {a.phone}
                    </a>
                  )}
                </div>
                {a.website && (
                  <a href={a.website} target="_blank" rel="noopener noreferrer"
                    className="block mt-3 py-2 rounded-xl text-xs font-medium text-center text-white transition-all"
                    style={{ background: 'var(--red)' }}>
                    Visit Website ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl p-8 text-center"
          style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.2)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Run a Cricket Academy or Facility?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            List your facility for free and get discovered by cricket enthusiasts across the UAE.
          </p>
          <Link href="/list-business"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'var(--red)' }}>
            List Your Facility — Free
          </Link>
        </div>
      </div>
    </div>
  )
}
