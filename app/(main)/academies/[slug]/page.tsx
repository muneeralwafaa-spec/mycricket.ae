import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Star, Phone } from 'lucide-react'

const academies: Record<string, {
  name: string; type: string; emirate: string; area: string
  about: string; phone?: string; website?: string
  rating: number; reviews: number; price: string
  tags: string[]; verified: boolean; color: string
  facilities: string[]; programs: string[]; coaches: string
}> = {
  'icc-cricket-academy': {
    name: 'ICC Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City, Street 69',
    about: 'The ICC Academy opened in 2009 in Dubai Sports City, next to ICC global headquarters. It is the world premier cricket development centre, hosting national team training camps and developing elite players globally. Home of UAE National Team and ADIB Warriors programme.',
    phone: '+971 54 305 7133', website: 'https://www.iccacademy.com',
    rating: 4.9, reviews: 312, price: 'AED 400/mo',
    tags: ['All Ages', 'Floodlit Ovals', 'Hawk-Eye', '36 Nets', 'ODI Accredited', 'Gym'],
    verified: true, color: '#EF3340',
    facilities: ['2 floodlit ODI/T20 accredited ovals', '36 practice pitches (Australian, Pakistani, English, Spin)', 'Hawk-Eye ball-tracking technology', 'Indoor practice hall', 'Cricket-specific gymnasium', 'Video analysis studio', 'Cricket retail store', 'Food and beverage area'],
    programs: ['ADIB Warriors Youth Programme (age 7-17)', 'Cricket Cubs (age 4-6)', 'Adult development programme', 'National team training camps', 'Umpire and coach education', 'Elite high-performance camps'],
    coaches: 'ICC-qualified international coaches including certified Level 3 coaches',
  },
  'g-force-cricket-academy': {
    name: 'G Force Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City',
    about: 'G Force Cricket Academy has been developing cricketers in the UAE since 2001. Head coach Gopal Jaspara brings ECB Level 3 certification and first-class playing experience. The academy is associated with the legendary Ramakant Achrekar — the Mumbai coach who developed Sachin Tendulkar.',
    phone: '+971 55 226 5549',
    rating: 4.8, reviews: 241, price: 'AED 380/mo',
    tags: ['Est. 2001', 'ECB Level 3', 'Junior and Adult', 'Indoor Nets'],
    verified: true, color: '#009A44',
    facilities: ['Indoor cricket nets', 'Outdoor practice area', 'Bowling machines', 'Video analysis'],
    programs: ['Junior development (age 6-16)', 'Adult recreational', 'Competitive player development', 'One-on-one coaching', 'Summer and winter camps'],
    coaches: 'Gopal Jaspara (ECB Level 3, former first-class cricketer)',
  },
  'ms-dhoni-cricket-academy': {
    name: 'MS Dhoni Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai / Sharjah',
    about: 'Official MS Dhoni Cricket Academy UAE. Coaches are DCA-certified and trained using the methodology developed by one of cricket greatest ever players. Strong focus on technically sound batting and wicketkeeping — the hallmarks of Dhoni career.',
    rating: 4.7, reviews: 189, price: 'AED 350/mo',
    tags: ['MSD Method', 'U6-U18', 'DCA Certified', 'Wicketkeeping'],
    verified: true, color: '#1a6fa8',
    facilities: ['Indoor nets', 'Outdoor practice area', 'Wicketkeeping specialist setup', 'Video analysis', 'Fielding drill zones'],
    programs: ['Cricket Cubs (Age 6-8)', 'Junior Development (Age 9-14)', 'Senior Programme (Age 15-18)', 'Wicketkeeping Specialist Programme', 'Weekend camps', 'Holiday intensive camps'],
    coaches: 'DCA-certified coaches trained under MS Dhoni methodology',
  },
  'rajasthan-royals-academy-uae': {
    name: 'Rajasthan Royals Academy UAE', type: 'Academy', emirate: 'Dubai', area: 'Dubai Sports City',
    about: 'Official UAE academy of IPL franchise Rajasthan Royals. Players are coached using the same performance frameworks used at franchise level — giving UAE cricketers access to truly elite methodology. Year-round programmes plus intensive residential holiday camps. Top performers get pathways into RR talent identification.',
    website: 'https://rajasthanroyals.com/academy',
    rating: 4.7, reviews: 156, price: 'AED 420/mo',
    tags: ['IPL Methodology', 'Residential Camps', 'All Ages', 'IPL Franchise'],
    verified: true, color: '#e91e8c',
    facilities: ['State-of-the-art nets', 'Outdoor practice ground', 'Performance analysis suite', 'Strength and conditioning gym', 'Video analysis'],
    programs: ['Junior Academy (Age 8-14)', 'Senior Development (Age 15+)', 'Residential Holiday Camps', 'Girls Programme', 'High Performance Programme'],
    coaches: 'RR-certified coaches using IPL-level coaching frameworks',
  },
  'danube-cricket-academy': {
    name: 'Danube Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Near Sheikh Zayed Road',
    about: 'Established 2022. Head coach Raiphi Vincent Gomez — former Kerala Ranji Trophy captain and IPL player. The academy is backed by Danube Group and features climate-controlled indoor nets (essential for UAE summer training), a dedicated video analytics setup, and a strength and conditioning zone.',
    rating: 4.6, reviews: 134, price: 'AED 350/mo',
    tags: ['Climate Controlled', 'Video Analytics', 'IPL Coach', 'Est. 2022'],
    verified: true, color: '#EF3340',
    facilities: ['Climate-controlled indoor nets', 'Outdoor practice area', 'Video analytics setup', 'Strength and conditioning zone', 'Changing rooms'],
    programs: ['Junior Programme (Age 6-15)', 'Adult Development (16+)', 'One-on-one coaching sessions', 'Group coaching (4-8 players)', 'Holiday camps'],
    coaches: 'Raiphi Vincent Gomez (Kerala Ranji Trophy Captain, IPL player) + Level 2 support coaches',
  },
  'set-go-cricket-academy': {
    name: 'Set Go Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai',
    about: 'Founded by CP Rizwan — former UAE T20I captain who played in the ICC T20 World Cup. Drawing on his experience at the highest level of UAE cricket, Rizwan built an academy that gives players genuine exposure to match-standard conditions. The academy has been associated with coaching events involving IPL legends including Kieron Pollard.',
    website: 'https://setgocricketacademy.com',
    rating: 4.7, reviews: 98, price: 'AED 300/mo',
    tags: ['UAE Captain-founded', 'Match Exposure', 'All Ages', 'T20 WC Alum'],
    verified: true, color: '#009A44',
    facilities: ['Cricket nets', 'Outdoor practice area', 'Match practice facilities', 'Video analysis'],
    programs: ['Youth Development (Age 6-16)', 'Adult Programme', 'One-on-one batting coaching', 'Match exposure programme', 'Summer and winter camps'],
    coaches: 'CP Rizwan (Former UAE T20I Captain) + certified coaching staff',
  },
  'young-talents-cricket-academy': {
    name: 'Young Talents Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Al Qusais, Dubai and Sharjah',
    about: 'Founded in 1998 by Shahzad Altaf, Young Talents Cricket Academy is one of the longest-running cricket development programmes in the UAE — over 26 years. Operates across multiple venues in Dubai and Sharjah. Regularly organises the Gulf Cup and international tours to UK and India.',
    rating: 4.6, reviews: 178, price: 'AED 280/mo',
    tags: ['Est. 1998', 'Gulf Cup Host', 'Tours: UK and India', 'Multiple Venues'],
    verified: true, color: '#009A44',
    facilities: ['Multiple venues across Dubai and Sharjah', 'Pakistan Association Bur Dubai', 'Skyline University Sharjah', 'Outdoor practice areas'],
    programs: ['Junior development (age 7+)', 'Competitive youth cricket', 'Gulf Cup (hosted by academy)', 'International tours to UK and India', 'Summer camps'],
    coaches: 'Shahzad Altaf (Director, ECB Level 2) + Level 1 and 2 certified coaches',
  },
  'maxtalent-cricket-academy': {
    name: 'Maxtalent Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai',
    about: 'Maxtalent stands out for its Cricket Australia Level II coaching certifications — among the highest globally recognised cricket coaching qualifications. Runs co-educational programmes for boys and girls aged 6-18. Sessions on Fridays and Saturdays fit around school commitments.',
    rating: 4.5, reviews: 87, price: 'AED 300/mo',
    tags: ['CA Level II', 'Girls and Boys', 'Ages 6-18', 'Fri and Sat Sessions'],
    verified: true, color: '#C8961E',
    facilities: ['Cricket nets', 'Outdoor practice area', 'Age-appropriate training equipment'],
    programs: ['Mini Cricket (Age 6-8)', 'Junior Boys (Age 9-14)', 'Junior Girls (Age 9-14)', 'Senior Programme (Age 15-18)', 'Holiday camps'],
    coaches: 'CA Level II and ACC Level I certified coaches',
  },
  'abu-dhabi-cricket-adib-warriors': {
    name: 'Abu Dhabi Cricket — ADIB Warriors', type: 'Academy', emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium',
    about: 'Abu Dhabi Cricket operates at world-class Zayed Cricket Stadium — one of the UAE premier international cricket venues. The ADIB Warriors programme takes players from complete beginners (Cricket Cubs, age 4) all the way through to senior competitive players.',
    phone: '+971 2 558 8228', website: 'https://www.abudhabicricket.ae',
    rating: 4.8, reviews: 203, price: 'AED 380/mo',
    tags: ['Age 4+', 'Zayed Stadium', 'ADIB Warriors', 'ODI Ground'],
    verified: true, color: '#1a6fa8',
    facilities: ['Zayed Cricket Stadium — full international ground', 'Multiple practice nets', 'Indoor training facility', 'Gym and conditioning area', 'Video analysis'],
    programs: ['Cricket Cubs (age 4-6)', 'Junior Warriors (7-12)', 'Senior Warriors (13-18)', 'Adult leagues', 'Corporate cricket'],
    coaches: 'ECB-certified professional coaching staff',
  },
  'sharjah-cricket-stadium-nets': {
    name: 'Sharjah Cricket Stadium Nets', type: 'Nets', emirate: 'Sharjah', area: 'Sharjah Cricket Stadium',
    about: 'The iconic Sharjah Cricket Stadium holds the record for the most ODI centuries ever scored at a single venue. Practice nets are available for walk-in sessions on non-match days. Both turf and matting wickets are available.',
    rating: 4.6, reviews: 145, price: 'AED 100/hr',
    tags: ['Walk-in', 'Historic Venue', 'Turf and Matting', 'ODI Ground'],
    verified: true, color: '#009A44',
    facilities: ['Turf practice nets', 'Matting practice nets', 'Full stadium ground', 'Changing facilities'],
    programs: ['Walk-in net sessions', 'Team bookings', 'Match-day venue hire'],
    coaches: 'Ground staff on site',
  },
  'desert-cubs-cricket-academy': {
    name: 'Desert Cubs Cricket Academy', type: 'Academy', emirate: 'Dubai', area: 'Dubai',
    about: 'Desert Cubs specialises in junior cricket development with a fun-first philosophy. For younger children (under 12), the emphasis is on enjoying the game and building a love of cricket. For older age groups, the academy transitions to more structured competitive programmes. Strong community following among expat families.',
    rating: 4.5, reviews: 67, price: 'AED 250/mo',
    tags: ['Junior Focus', 'U12 Specialist', 'Weekend Sessions', 'Fun First'],
    verified: false, color: '#EF3340',
    facilities: ['Age-appropriate cricket nets', 'Outdoor practice area', 'Junior cricket equipment'],
    programs: ['Cricket Tots (Age 4-6)', 'Junior Cubs (Age 7-10)', 'Senior Cubs (Age 11-14)', 'Weekend fun sessions', 'Holiday camps'],
    coaches: 'ECB-qualified junior cricket specialists',
  },
  'ajman-oval-cricket-academy': {
    name: 'Ajman Oval Cricket Academy', type: 'Academy', emirate: 'Ajman', area: 'Ajman',
    about: 'Premier cricket academy in Ajman with a full outdoor oval ground — rare among UAE academies. Known for affordability (AED 200/month) and strong community roots. Fields competitive teams in UAE domestic leagues. Strong following among Ajman cricket community.',
    rating: 4.4, reviews: 89, price: 'AED 200/mo',
    tags: ['Outdoor Oval', 'Community Cricket', 'Affordable', 'League Teams'],
    verified: true, color: '#C8961E',
    facilities: ['Full outdoor oval cricket ground', 'Practice nets', 'Changing facilities', 'Ground equipment storage'],
    programs: ['Junior Development (Age 6-16)', 'Senior competitive cricket', 'Community league teams', 'Weekend nets sessions'],
    coaches: 'ECB-certified local coaches with UAE domestic experience',
  },
}

export async function generateStaticParams() {
  return Object.keys(academies).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = academies[slug]
  if (!a) return { title: 'Not Found — MyCricket.ae' }
  return {
    title: `${a.name} | Cricket Academy ${a.emirate} — MyCricket.ae`,
    description: a.about.slice(0, 160),
  }
}

export default async function AcademyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = academies[slug]
  if (!a) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <Link href="/academies" className="text-xs font-mono-dm mb-5 block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ← Back to Academies
          </Link>
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background: `${a.color}22`, border: `2px solid ${a.color}44` }}>
              🎓
            </div>
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: a.color }}>
                {a.type} · {a.emirate}
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-1">{a.name}</h1>
              <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MapPin size={13} /> {a.area}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Rating', value: `⭐ ${a.rating}` },
              { label: 'Reviews', value: `${a.reviews}+` },
              { label: 'From', value: a.price },
              { label: 'Status', value: a.verified ? '✓ Verified' : 'Listed' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-xl text-white mb-0.5">{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--black)' }}>About</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{a.about}</p>
            </div>

            {/* Facilities */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Facilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {a.facilities.map(f => (
                  <div key={f} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'var(--off-white)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                    <span className="text-xs" style={{ color: 'var(--ink)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Programmes */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Programmes</h2>
              <div className="space-y-2">
                {a.programs.map(p => (
                  <div key={p} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>🏏</span>
                    <span className="text-xs" style={{ color: 'var(--green-dark)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {a.tags.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: 'var(--white)', border: `2px solid ${a.color}` }}>
              <h3 className="font-display text-xl mb-4" style={{ color: 'var(--black)' }}>Get in Touch</h3>

              {a.phone && (
                <a href={`tel:${a.phone}`}
                  className="flex items-center gap-2 py-3 px-4 rounded-xl mb-3 text-white text-sm font-medium"
                  style={{ background: 'var(--green)' }}>
                  <Phone size={14} /> {a.phone}
                </a>
              )}
              {a.phone && (
                <a href={`https://wa.me/${a.phone.replace(/\D/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl mb-3 text-white text-sm font-medium"
                  style={{ background: '#25D366' }}>
                  💬 WhatsApp
                </a>
              )}
              {a.website && (
                <a href={a.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl mb-3 text-white text-sm font-medium"
                  style={{ background: a.color }}>
                  Visit Website ↗
                </a>
              )}
              <Link href="/contact"
                className="block text-center py-3 px-4 rounded-xl text-sm"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                Send Enquiry
              </Link>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="text-xs font-mono-dm uppercase mb-1" style={{ color: 'var(--ink-light)' }}>Coaching Staff</div>
                <p className="text-xs" style={{ color: 'var(--ink)' }}>{a.coaches}</p>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <Star size={14} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                  <span className="font-display text-xl" style={{ color: 'var(--gold)' }}>{a.rating}</span>
                  <span className="text-xs" style={{ color: 'var(--ink-light)' }}>({a.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <Link href="/book/academy"
              className="block text-center py-3.5 rounded-2xl text-sm font-medium text-white"
              style={{ background: 'var(--red)' }}>
              🎓 Enrol Now →
            </Link>

            <Link href="/facilities"
              className="block text-center py-3 rounded-2xl text-sm"
              style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
              🏟️ Book Nets Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
