import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Star, Phone } from 'lucide-react'

const academies: Record<string, {
  name: string; type: string; emirate: string; area: string; desc: string
  phone?: string; website?: string; rating: number; reviews: number; price: string
  tags: string[]; verified: boolean; image: string; color: string
  about: string; facilities: string[]; programs: string[]; coaches: string
}> = {
  'icc-cricket-academy': {
    name: 'ICC Cricket Academy', type: 'Academy · Ground', emirate: 'Dubai', area: 'Dubai Sports City, Street 69',
    desc: 'The world\'s leading cricket development facility, managed by the International Cricket Council.',
    phone: '+971 54 305 7133', website: 'https://www.iccacademy.com',
    rating: 4.9, reviews: 312, price: 'AED 400/mo',
    tags: ['All Ages', 'Floodlit Ovals', 'Hawk-Eye', '36 Nets', 'ODI Accredited', 'Gym'],
    verified: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85',
    color: '#EF3340',
    about: 'The ICC Academy opened in 2009 and is located in Dubai Sports City, directly next to the ICC global headquarters. It is the world\'s premier cricket development centre, hosting training camps for national teams and developing elite players from across the globe.',
    facilities: ['2 floodlit ODI/T20 accredited ovals', '36 practice pitches (Australian, Pakistani, English, Spin)', 'Hawk-Eye ball-tracking technology', 'Indoor practice hall', 'Cricket-specific gymnasium', 'Video analysis studio', 'Fully equipped cricket retail store', 'Food & beverage area'],
    programs: ['ADIB Warriors Youth Programme (age 7–17)', 'Cricket Cubs (age 4–6)', 'Adult development programme', 'National team training camps', 'Umpire & coach education', 'Elite high-performance camps'],
    coaches: 'ICC-qualified international coaches including certified Level 3 coaches',
  },
  'g-force-cricket-academy': {
    name: 'G Force Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City',
    desc: 'One of Dubai\'s oldest and most respected cricket academies, est. 2001.',
    phone: '+971 55 226 5549', website: undefined,
    rating: 4.8, reviews: 241, price: 'AED 380/mo',
    tags: ['Est. 2001', 'ECB Level 3', 'Junior & Adult', 'Indoor Nets'],
    verified: true, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85',
    color: '#009A44',
    about: 'G Force Cricket Academy has been developing cricketers in the UAE since 2001. Head coach Gopal Jaspara brings ECB Level 3 certification and first-class playing experience to every session. The academy is associated with the legendary Ramakant Achrekar — the Mumbai coach who developed Sachin Tendulkar.',
    facilities: ['Indoor cricket nets', 'Outdoor practice area', 'Bowling machines', 'Video analysis'],
    programs: ['Junior development (age 6–16)', 'Adult recreational', 'Competitive player development', 'One-on-one coaching', 'Summer & winter camps'],
    coaches: 'Gopal Jaspara (ECB Level 3, former first-class cricketer)',
  },
  'abu-dhabi-cricket-adib-warriors': {
    name: 'Abu Dhabi Cricket — ADIB Warriors', type: 'Academy · Ground', emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium',
    desc: 'World-class cricket development at Zayed Cricket Stadium, Abu Dhabi.',
    phone: '+971 2 558 8228', website: 'https://www.abudhabicricket.ae',
    rating: 4.8, reviews: 203, price: 'AED 380/mo',
    tags: ['Age 4+', 'Zayed Stadium', 'ADIB Warriors', 'ODI Ground'],
    verified: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=85',
    color: '#1a6fa8',
    about: 'Abu Dhabi Cricket operates at the world-class Zayed Cricket Stadium, one of the UAE\'s premier international cricket venues. The ADIB Warriors programme takes players from complete beginners (Cricket Cubs, age 4) all the way to senior competitive players.',
    facilities: ['Zayed Cricket Stadium — full international ground', 'Multiple practice nets', 'Indoor training facility', 'Gym & conditioning area', 'Video analysis'],
    programs: ['Cricket Cubs (age 4–6)', 'Junior Warriors (7–12)', 'Senior Warriors (13–18)', 'Adult leagues', 'Corporate cricket'],
    coaches: 'ECB-certified professional coaching staff',
  },
  'sharjah-cricket-stadium-nets': {
    name: 'Sharjah Cricket Stadium Nets', type: 'Nets · Ground', emirate: 'Sharjah', area: 'Sharjah Cricket Stadium',
    desc: 'Practice at the iconic Sharjah Cricket Stadium — world record venue.',
    phone: undefined, website: undefined,
    rating: 4.6, reviews: 145, price: 'AED 100/hr',
    tags: ['Walk-in', 'Historic Venue', 'Turf & Matting', 'ODI Ground'],
    verified: true, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=85',
    color: '#009A44',
    about: 'The iconic Sharjah Cricket Stadium holds the record for the most ODI centuries ever scored at a single venue. Practice nets are available for walk-in sessions on non-match days. Both turf and matting wickets are available.',
    facilities: ['Turf practice nets', 'Matting practice nets', 'Full stadium ground', 'Changing facilities'],
    programs: ['Walk-in net sessions', 'Team bookings', 'Match-day venue hire'],
    coaches: 'Ground staff on site',
  },
  'young-talents-cricket-academy': {
    name: 'Young Talents Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Al Qusais, Dubai & Sharjah',
    desc: 'UAE\'s oldest running cricket academy, founded 1998 by Shahzad Altaf.',
    phone: undefined, website: undefined,
    rating: 4.6, reviews: 178, price: 'AED 280/mo',
    tags: ['Est. 1998', 'Gulf Cup Host', 'Tours: UK & India', 'Multiple Venues'],
    verified: true, image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=1200&q=85',
    color: '#009A44',
    about: 'Founded in 1998 by Shahzad Altaf, Young Talents Cricket Academy is one of the longest-running cricket development programmes in the UAE. The academy operates across multiple venues in Dubai and Sharjah, and regularly organises international tours to the UK and India.',
    facilities: ['Multiple venues: Al Qusais Dubai, Sharjah', 'Pakistan Association Bur Dubai venue', 'Skyline University Sharjah venue', 'Outdoor practice areas'],
    programs: ['Junior development (age 7+)', 'Competitive youth cricket', 'Gulf Cup (hosted by academy)', 'International tours to UK & India', 'Summer camps'],
    coaches: 'Shahzad Altaf (Director, ECB Level 2) + Level 1 & 2 certified coaches',
  },
}

// Generate static slugs
export async function generateStaticParams() {
  return Object.keys(academies).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = academies[slug]
  if (!a) return { title: 'Academy Not Found — MyCricket.ae' }
  return { title: `${a.name} | Cricket Academy ${a.emirate} — MyCricket.ae`, description: a.about.slice(0, 160) }
}

export default async function AcademyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = academies[slug]
  if (!a) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero image */}
      <div className="relative overflow-hidden" style={{ height: 300 }}>
        <img src={a.image} alt={a.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
        <div className="absolute inset-0 flex flex-col justify-end container-uae pb-8">
          <Link href="/academies" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
            ← Back to Facilities
          </Link>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ background: a.color }}>{a.type}</span>
            {a.verified && <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--green)', fontSize: 10 }}>✓ Verified</span>}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-1">{a.name}</h1>
          <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <MapPin size={13} /> {a.area}, {a.emirate}
          </div>
        </div>
      </div>

      <div className="container-uae py-10">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={14} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
              <span className="font-display text-2xl" style={{ color: 'var(--gold)' }}>{a.rating}</span>
            </div>
            <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>{a.reviews} reviews</div>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="font-display text-2xl" style={{ color: 'var(--green)' }}>{a.price}</div>
            <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>from / month</div>
          </div>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="font-display text-2xl" style={{ color: 'var(--red)' }}>{a.emirate}</div>
            <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>location</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>About</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{a.about}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Facilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {a.facilities.map(f => (
                  <div key={f} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                    <span className="text-xs" style={{ color: 'var(--ink)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Programmes</h2>
              <div className="space-y-2">
                {a.programs.map(p => (
                  <div key={p} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>🏏</span>
                    <span className="text-xs" style={{ color: 'var(--green-dark)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: 'var(--white)', border: `2px solid ${a.color}` }}>
              <h3 className="font-display text-xl mb-4" style={{ color: 'var(--black)' }}>Get in Touch</h3>
              {a.phone && (
                <a href={`tel:${a.phone}`} className="flex items-center gap-2 py-3 px-4 rounded-xl mb-3 text-white text-sm font-medium" style={{ background: 'var(--green)' }}>
                  <Phone size={14} /> {a.phone}
                </a>
              )}
              {a.website && (
                <a href={a.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl mb-3 text-white text-sm font-medium" style={{ background: a.color }}>
                  Visit Website ↗
                </a>
              )}
              <Link href="/contact" className="block text-center py-3 px-4 rounded-xl text-sm"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                Send Enquiry
              </Link>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-lg mb-3" style={{ color: 'var(--black)' }}>Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-mono-dm uppercase tracking-wide mb-1" style={{ color: 'var(--ink-light)' }}>Coaching Staff</div>
              <p className="text-xs" style={{ color: 'var(--ink)' }}>{a.coaches}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
