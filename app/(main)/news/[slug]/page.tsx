import { notFound } from 'next/navigation'
import Link from 'next/link'

const articles: Record<string, { title: string; body: string; date: string; category: string; source: string; sourceUrl: string }> = {
  'uae-t20-world-cup-2026-squad': {
    title: 'UAE Name Squad for T20 World Cup 2026 — Muhammad Waseem Leads',
    body: 'The Emirates Cricket Board has announced UAE\'s 15-member squad for the ICC Men\'s T20 World Cup 2026 to be held in India and Sri Lanka from February to March 2026. Muhammad Waseem leads the side as T20I captain, with a strong mix of experienced players including Alishan Sharafu, Junaid Siddique, Asif Khan, and Simranjeet Singh.\n\nThe full squad: Muhammad Waseem (c), Alishan Sharafu, Aryansh Sharma (wk), Dhruv Parashar, Haider Ali, Harshit Kaushik, Junaid Siddique, Mayank Kumar, Muhammad Arfan, Muhammad Farooq, Muhammad Jawadullah, Muhammad Zohaib, Rohid Khan, Sohaib Khan, Simranjeet Singh.\n\nUAE are in Group stage and face strong opposition in the tournament. Head coach Lalchand Rajput expressed confidence in the squad\'s preparation.',
    date: '30 Jan 2026', category: 'National Team',
    source: 'Emirates Cricket Board', sourceUrl: 'https://emiratescricket.com',
  },
  'desert-vipers-win-ilt20-season-4': {
    title: 'Desert Vipers Win ILT20 Season 4 Championship',
    body: 'Desert Vipers claimed the ILT20 Season 4 title, defeating Gulf Giants in the final played at Dubai International Stadium. The season ran from December 2, 2025 to January 4, 2026, featuring world-class international players across six franchise teams: Gulf Giants, Desert Vipers, MI Emirates, Dubai Capitals, Abu Dhabi Knight Riders, and Sharjah Warriors.\n\nThis was the fourth edition of the DP World ILT20, which has grown to become one of the most watched cricket leagues globally, attracting over 340 million views across its first two seasons alone. The ILT20 holds the distinction of being the first Associate member-run T20 league to receive official List A status from the ICC.',
    date: '4 Jan 2026', category: 'ILT20',
    source: 'ILT20', sourceUrl: 'https://ilt20.ae',
  },
  'waseem-3000-t20i-runs': {
    title: 'Muhammad Waseem Becomes First UAE Player to 3,000 T20I Runs',
    body: 'UAE captain Muhammad Waseem made history during the Asia Cup 2025, becoming the first player from the UAE — and just the 11th player globally — to reach 3,000 runs in T20 Internationals. He achieved the milestone during UAE\'s Asia Cup clash against Oman in Abu Dhabi.\n\nWaseem scored 69 off 54 balls against Oman, striking six fours and three sixes at a strike rate of 127.77. He is now the third-fastest player to reach the milestone globally. Among T20I run leaders, Waseem now finds himself in elite company alongside Rohit Sharma, Virat Kohli and other legends of the format.',
    date: '15 Sep 2025', category: 'National Team',
    source: 'Gulf News', sourceUrl: 'https://gulfnews.com',
  },
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae max-w-3xl">
          <Link href="/news" className="text-xs font-mono-dm mb-6 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Back to News</Link>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white mb-4 inline-block" style={{ background: 'var(--red)' }}>{article.category}</span>
          <h1 className="font-display text-3xl md:text-5xl text-white mb-3">{article.title}</h1>
          <div className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>{article.date}</span>
            <span>·</span>
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)' }}>Source: {article.source}</a>
          </div>
        </div>
      </div>
      <div className="container-uae py-10 max-w-3xl">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          {article.body.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{para}</p>
          ))}
          <div className="pt-4 mt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: 'var(--green)' }}>
              Read original on {article.source} ↗
            </a>
          </div>
        </div>
        <Link href="/news" className="inline-block mt-5 px-5 py-2.5 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: 'var(--white)' }}>
          ← More News
        </Link>
      </div>
    </div>
  )
}
