import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UAE Cricket News 2026 | Latest Updates from Emirates Cricket Board',
  description: 'Latest UAE cricket news — national team updates, ECB announcements, ILT20 news, academy updates and more.',
}

const news = [
  {
    category: 'National Team',
    title: 'UAE Name Squad for T20 World Cup 2026 — Muhammad Waseem Leads', slug: 'uae-t20-world-cup-2026-squad',
    excerpt: 'The Emirates Cricket Board has announced UAE\'s 15-member squad for the ICC Men\'s T20 World Cup 2026 to be held in India and Sri Lanka. Muhammad Waseem leads the side with a strong mix of experienced players and emerging talent.',
    date: '30 Jan 2026',
    source: 'Emirates Cricket Board',
    sourceUrl: 'https://emiratescricket.com',
    featured: true,
    icon: '🏆',
  },
  {
    category: 'ILT20',
    title: 'Desert Vipers Win ILT20 Season 4 Championship', slug: 'desert-vipers-win-ilt20-season-4',
    excerpt: 'Desert Vipers claimed the ILT20 Season 4 title, defeating Gulf Giants in a thrilling final. The season ran from December 2025 to January 2026 across Dubai, Sharjah and Abu Dhabi venues.',
    date: '4 Jan 2026',
    source: 'ILT20',
    sourceUrl: 'https://ilt20.ae',
    featured: true,
    icon: '🏟️',
  },
  {
    category: 'National Team',
    title: 'Muhammad Waseem Becomes First UAE Player to 3,000 T20I Runs', slug: 'waseem-3000-t20i-runs',
    excerpt: 'UAE captain Muhammad Waseem made history during the Asia Cup 2025, becoming the first player from the UAE to reach 3,000 runs in T20 Internationals. He is now the 11th player globally to achieve this milestone.',
    date: '15 Sep 2025',
    source: 'Gulf News',
    sourceUrl: 'https://gulfnews.com',
    featured: false,
    icon: '🌟',
  },
  {
    category: 'Asia Cup',
    title: 'UAE Beat Oman in Asia Cup 2025 Group Stage',
    excerpt: 'UAE defeated Oman in their Asia Cup 2025 group stage match at Sheikh Zayed Cricket Stadium, Abu Dhabi. UAE were placed in Group A alongside India, Pakistan and Oman.',
    date: '15 Sep 2025',
    source: 'ESPNCricinfo',
    sourceUrl: 'https://www.espncricinfo.com',
    featured: false,
    icon: '🇦🇪',
  },
  {
    category: 'Domestic',
    title: 'Emirates D50 April 2026 — Season Registration Open',
    excerpt: 'The Emirates Cricket Board has opened team registrations for the Emirates D50 April 2026 season. Clubs can register on CricClubs across Division A, B and C.',
    date: '1 Apr 2026',
    source: 'Emirates Cricket Board',
    sourceUrl: 'https://cricclubs.com/UAE',
    featured: false,
    icon: '📋',
  },
  {
    category: 'Historic',
    title: 'UAE Stun New Zealand in T20I — First Win Over a Full Member',
    excerpt: 'In August 2023, UAE pulled off a stunning 7-wicket win over New Zealand in the second T20I at Dubai International Stadium — UAE\'s first-ever international win over a Full Member nation and New Zealand\'s first defeat against an associate team.',
    date: 'Aug 2023',
    source: 'ESPNCricinfo',
    sourceUrl: 'https://www.espncricinfo.com',
    featured: false,
    icon: '⚡',
  },
  {
    category: 'ILT20',
    title: 'ILT20 Becomes First Associate-Run League with ICC List A Status',
    excerpt: 'In a historic milestone for UAE cricket, the DP World ILT20 became the first franchise league run by an Associate ICC member to be granted official List A status. This means all player statistics are officially recognised internationally.',
    date: 'Dec 2023',
    source: 'ICC',
    sourceUrl: 'https://www.icc-cricket.com',
    featured: false,
    icon: '📜',
  },
  {
    category: 'Academy',
    title: 'Rajasthan Royals Open Official Cricket Academy in UAE',
    excerpt: 'IPL franchise Rajasthan Royals have opened their official cricket academy in Dubai, bringing IPL-level coaching methodology to UAE youth cricketers. The academy is based in Dubai Sports City.',
    date: '2025',
    source: 'Rajasthan Royals',
    sourceUrl: 'https://rajasthanroyals.com',
    featured: false,
    icon: '🏫',
  },
]

const categories = ['All', 'National Team', 'ILT20', 'Domestic', 'Asia Cup', 'Academy', 'Historic']

export default function NewsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Latest</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">UAE Cricket News</h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            National team updates, ECB announcements, ILT20 news and more
          </p>
        </div>
      </div>

      <div className="container-uae py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
          {categories.map((c, i) => (
            <button key={c} className="px-4 py-1.5 rounded-full text-xs font-medium flex-shrink-0"
              style={{
                background: i === 0 ? 'var(--red)' : 'var(--white)',
                color: i === 0 ? 'white' : 'var(--ink)',
                border: `1px solid ${i === 0 ? 'var(--red)' : 'var(--border)'}`,
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {news.filter(n => n.featured).map((n, i) => (
          <div key={i} className="rounded-2xl p-6 md:p-8 mb-6 card-hover"
            style={{ background: 'var(--black)', border: '1px solid rgba(239,51,64,0.3)' }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--red)', color: 'white' }}>
                {n.category}
              </span>
              <span className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{n.date}</span>
              <span className="text-2xl ml-auto">{n.icon}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-3">{n.title}</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.excerpt}</p>
            <a href={n.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium" style={{ color: 'var(--red-mid)' }}>
              Source: {n.source} ↗
            </a>
          </div>
        ))}

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.filter(n => !n.featured).map((n, i) => (
            <div key={i} className="rounded-2xl p-5 card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                  {n.category}
                </span>
                <span className="text-xl">{n.icon}</span>
              </div>
              <h3 className="text-sm font-medium leading-snug mb-2" style={{ color: 'var(--black)' }}>{n.title}</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>{n.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>{n.date}</span>
                <a href={n.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs" style={{ color: 'var(--green)' }}>
                  {n.source} ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--ink-light)' }}>
            For official UAE cricket news, follow{' '}
            <a href="https://emiratescricket.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)' }}>
              Emirates Cricket Board
            </a>
            {' '}and{' '}
            <a href="https://twitter.com/EmiratesCricket" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)' }}>
              @EmiratesCricket on X
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
