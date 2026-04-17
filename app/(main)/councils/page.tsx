import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Cricket Governing Bodies | ECB, ICC, Abu Dhabi Cricket, Sharjah',
  description: 'Official contacts and information for UAE cricket governing bodies — Emirates Cricket Board, ICC, Abu Dhabi Cricket, Sharjah Cricket Association and more.',
}

const bodies = [
  {
    name: 'Emirates Cricket Board',
    short: 'ECB',
    scope: 'National — UAE',
    description: 'The official governing body for cricket in the UAE. Manages domestic leagues (ILT20, Emirates D50/D20/D10), national teams (men\'s, women\'s, age-group), umpire panels and club registrations.',
    email: 'info@emiratescricket.com',
    website: 'https://emiratescricket.com',
    address: 'PO Box 118900, Dubai, United Arab Emirates',
    icon: '🏛️',
    color: 'var(--red)',
    bg: 'var(--red-light)',
    links: [
      { label: 'Register Your Club', url: 'https://cricclubs.com/UAE/registerUser.do?clubId=15272' },
      { label: 'Fixtures & Results', url: 'https://cricclubs.com/UAE' },
    ],
  },
  {
    name: 'International Cricket Council',
    short: 'ICC',
    scope: 'International — HQ Dubai',
    description: 'The global governing body for cricket, headquartered at Dubai Sports City. Manages World Cups, ICC rankings, playing conditions and associate cricket globally. UAE under ICC Associate membership.',
    website: 'https://www.icc-cricket.com',
    address: 'ICC Cricket Academy, Dubai Sports City, Dubai UAE',
    icon: '🌍',
    color: 'var(--green)',
    bg: 'var(--green-light)',
    links: [
      { label: 'ICC T20 World Cup 2026', url: 'https://www.icc-cricket.com/tournaments/mens-t20-worldcup' },
      { label: 'ICC Academy Dubai', url: 'https://www.icc-cricket.com/about/cricket/icc-academy' },
    ],
  },
  {
    name: 'Abu Dhabi Cricket',
    short: 'ADC',
    scope: 'Emirate — Abu Dhabi',
    description: 'Cricket development body for the emirate of Abu Dhabi. Manages Zayed Cricket Stadium, runs ADC Player Development Programs (Cricket Cubs age 4 to Senior Warriors 18+), and ADIB Warriors coaching programmes.',
    phone: '+971 2 558 8228',
    website: 'https://www.abudhabicricket.ae',
    address: 'Zayed Cricket Stadium, Abu Dhabi',
    icon: '🏟️',
    color: '#1a6fa8',
    bg: '#E6F1FB',
    links: [
      { label: 'Player Development', url: 'https://www.abudhabicricket.ae' },
    ],
  },
  {
    name: 'Sharjah Cricket Authority',
    short: 'SCA',
    scope: 'Emirate — Sharjah',
    description: 'Oversees cricket in Sharjah — home of the iconic Sharjah Cricket Stadium, one of the world\'s most storied cricket venues. Manages Sharjah cricket leagues and development programmes.',
    address: 'Sharjah Cricket Stadium, Sharjah',
    icon: '🏏',
    color: 'var(--green)',
    bg: 'var(--green-light)',
    links: [],
  },
  {
    name: 'Asia Cricket Council',
    short: 'ACC',
    scope: 'Regional — Asia',
    description: 'Regional governing body for Asian cricket under ICC. Organises the Asia Cup (hosted in UAE in 2025), ACC Trophy and other regional competitions. UAE participate in ACC events.',
    website: 'https://www.asiancricket.org',
    icon: '🌙',
    color: 'var(--gold)',
    bg: 'var(--gold-light)',
    links: [
      { label: 'Asia Cup 2025 Details', url: 'https://www.asiancricket.org' },
    ],
  },
  {
    name: 'Dubai Sports Council',
    short: 'DSC',
    scope: 'Government — Dubai',
    description: 'Dubai\'s official sports authority. Oversees all sporting activities in Dubai including cricket. Manages Dubai Sports City infrastructure and licensing for sporting events.',
    website: 'https://www.dubaisportscouncil.ae',
    address: 'Dubai Sports City, Dubai',
    icon: '📋',
    color: 'var(--ink)',
    bg: 'var(--off-white)',
    links: [
      { label: 'Sports Events Licensing', url: 'https://www.dubaisportscouncil.ae' },
    ],
  },
]

export default function CouncilsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Official Bodies
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Councils & Governing Boards</h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Official contacts, resources and links for UAE and international cricket governing bodies
          </p>
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bodies.map((b, i) => (
            <div key={i} className="rounded-2xl overflow-hidden card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="h-1.5" style={{ background: b.color }} />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: b.bg }}>
                    {b.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium mb-0.5" style={{ color: 'var(--black)' }}>{b.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono-dm font-medium"
                        style={{ background: b.bg, color: b.color }}>
                        {b.short}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{b.scope}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{b.description}</p>
                <div className="space-y-1.5 mb-4">
                  {b.email && (
                    <div className="text-xs"><span style={{ color: 'var(--ink-light)' }}>Email: </span>
                      <a href={`mailto:${b.email}`} style={{ color: b.color }}>{b.email}</a>
                    </div>
                  )}
                  {b.phone && (
                    <div className="text-xs"><span style={{ color: 'var(--ink-light)' }}>Phone: </span>
                      <a href={`tel:${b.phone}`} style={{ color: b.color }}>{b.phone}</a>
                    </div>
                  )}
                  {b.address && (
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>📍 {b.address}</div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {b.website && (
                    <a href={b.website} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 rounded-xl font-medium text-white transition-all"
                      style={{ background: b.color }}>
                      Official Website ↗
                    </a>
                  )}
                  {b.links.map(l => (
                    <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 rounded-xl transition-all"
                      style={{ border: `1px solid ${b.color}30`, color: b.color }}>
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
