import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UAE National Cricket Team | Squad, Fixtures, Stats 2026',
  description: 'UAE national cricket team — T20 World Cup 2026 squad, fixtures, results, player profiles. Muhammad Waseem leads UAE at ICC T20 World Cup 2026 in India & Sri Lanka.',
}

const squad = [
  {
    name: 'Muhammad Waseem',
    role: 'Opening Batter · T20I Captain',
    born: '12 Feb 1996, Pakistan',
    stats: { matches: '68 T20Is', runs: '3,000+', avg: '42.8', sr: '144.2' },
    highlights: 'First UAE player to 3,000 T20I runs. 3rd fastest globally. 107* vs Ireland (debut century). ILT20 standout for MI Emirates.',
    flag: '🇵🇰→🇦🇪',
    initials: 'MW',
    color: '#EF3340',
  },
  {
    name: 'Alishan Sharafu',
    role: 'Opening Batter',
    born: '27 Dec 2002, UAE',
    stats: { matches: '40+ T20Is', runs: '1,200+', avg: '30.5', sr: '135.0' },
    highlights: 'Born in UAE — one of the few UAE-born players in the national squad. Consistent top-order performer.',
    flag: '🇦🇪',
    initials: 'AS',
    color: '#009A44',
  },
  {
    name: 'Aryansh Sharma',
    role: 'Wicketkeeper Batter',
    born: '2004, India',
    stats: { matches: '20+ T20Is', runs: '500+', avg: '28.0', sr: '130.0' },
    highlights: 'Young wicketkeeper in the T20 WC 2026 squad. Explosive lower-order batter.',
    flag: '🇮🇳→🇦🇪',
    initials: 'AR',
    color: '#1a6fa8',
  },
  {
    name: 'Asif Khan',
    role: 'Middle-order Batter',
    born: 'Pakistan',
    stats: { matches: '50+ T20Is', runs: '1,500+', avg: '32.0', sr: '138.5' },
    highlights: 'Highest individual ODI score 151* vs USA. Dependable middle-order anchor.',
    flag: '🇵🇰→🇦🇪',
    initials: 'AK',
    color: '#009A44',
  },
  {
    name: 'Junaid Siddique',
    role: 'Right-arm Fast · Bowler',
    born: 'Bangladesh',
    stats: { matches: '59 T20Is / 71 ODIs', wkts: '96 ODI / 76 T20I wkts', avg: '28.4', econ: '7.2' },
    highlights: '96 ODI wickets & 76 T20I wickets. One of UAE\'s most experienced bowlers. Played in ILT20 & Global T20 Canada.',
    flag: '🇧🇩→🇦🇪',
    initials: 'JS',
    color: '#EF3340',
  },
  {
    name: 'Simranjeet Singh',
    role: 'Left-arm Fast Bowler',
    born: 'India',
    stats: { matches: '30+ T20Is', wkts: '45+', avg: '22.0', econ: '8.1' },
    highlights: '3 wickets vs Pakistan in Asia Cup 2025. Key weapon in UAE\'s bowling attack. Left-arm pace specialist.',
    flag: '🇮🇳→🇦🇪',
    initials: 'SS',
    color: '#009A44',
  },
  {
    name: 'Muhammad Jawadullah',
    role: 'Left-arm Pace All-rounder',
    born: 'Pakistan',
    stats: { matches: '33 T20Is / 12 ODIs', wkts: '40+', avg: '31.0', econ: '8.4' },
    highlights: 'Useful left-arm seam bowling with lower-order batting contribution.',
    flag: '🇵🇰→🇦🇪',
    initials: 'MJ',
    color: '#1a6fa8',
  },
  {
    name: 'Muhammad Farooq',
    role: 'Leg-spin All-rounder',
    born: 'Pakistan',
    stats: { matches: '8 T20Is / 2 ODIs', wkts: '12+', avg: '28.0', econ: '7.8' },
    highlights: 'Dangerous leg-spin option. Growing presence in UAE\'s squad.',
    flag: '🇵🇰→🇦🇪',
    initials: 'MF',
    color: '#C8961E',
  },
  {
    name: 'Dhruv Parashar',
    role: 'Batter',
    born: 'India',
    stats: { matches: '20+ T20Is', runs: '400+', avg: '25.0', sr: '128.0' },
    highlights: 'Stylish middle-order batter. Part of T20 WC 2026 squad.',
    flag: '🇮🇳→🇦🇪',
    initials: 'DP',
    color: '#009A44',
  },
  {
    name: 'Rahul Chopra',
    role: 'Wicketkeeper Batter · ODI Captain',
    born: 'India',
    stats: { matches: '20+ T20Is / 10+ ODIs', runs: '600+', avg: '35.0', sr: '132.0' },
    highlights: 'ODI captain. Hit century vs Scotland in CWC League 2 2025. Keeps wickets and opens batting.',
    flag: '🇮🇳→🇦🇪',
    initials: 'RC',
    color: '#EF3340',
  },
  {
    name: 'Haider Ali',
    role: 'Batter',
    born: 'Pakistan',
    stats: { matches: '15+ T20Is', runs: '300+', avg: '24.0', sr: '125.0' },
    highlights: 'Hard-hitting batter. Part of T20 WC 2026 squad.',
    flag: '🇵🇰→🇦🇪',
    initials: 'HA',
    color: '#009A44',
  },
  {
    name: 'Harshit Kaushik',
    role: 'Left-hand Batter · Part-time Spin',
    born: 'India',
    stats: { matches: '10+ T20Is', runs: '200+', avg: '22.0', sr: '118.0' },
    highlights: '28-year-old left-handed middle-order batter. Bowls part-time left-arm spin.',
    flag: '🇮🇳→🇦🇪',
    initials: 'HK',
    color: '#1a6fa8',
  },
]

const recentResults = [
  { vs: 'Pakistan', result: 'L', score: '137 vs 138/4', format: 'T20I', venue: 'Dubai', date: '17 Sep 2025', tournament: 'Asia Cup 2025' },
  { vs: 'India', result: 'L', score: '108 vs 184/5', format: 'T20I', venue: 'Dubai', date: '10 Sep 2025', tournament: 'Asia Cup 2025' },
  { vs: 'Oman', result: 'W', score: '147/4 vs 143/8', format: 'T20I', venue: 'Abu Dhabi', date: '15 Sep 2025', tournament: 'Asia Cup 2025' },
  { vs: 'Bangladesh', result: 'L', score: '142/7 vs 143/5', format: 'T20I', venue: 'Sharjah', date: '19 May 2025', tournament: 'Bilateral T20I' },
  { vs: 'Bangladesh', result: 'L', score: '118 vs 119/3', format: 'T20I', venue: 'Sharjah', date: '17 May 2025', tournament: 'Bilateral T20I' },
  { vs: 'Kuwait', result: 'W', score: 'Won', format: 'T20I', venue: 'UAE', date: 'Dec 2024', tournament: 'Gulf T20 Championship (Final)' },
  { vs: 'New Zealand', result: 'W', score: '136/3 vs 135', format: 'T20I', venue: 'Dubai', date: 'Aug 2023', tournament: 'Bilateral — Historic win!' },
]

export default function NationalTeamPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🇦🇪</div>
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--red)' }}>
                Official Info Hub
              </div>
              <h1 className="font-display text-5xl md:text-6xl text-white">UAE National Cricket</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'T20I Ranking', value: '#17', sub: 'ICC Associate' },
              { label: 'T20I Captain', value: 'M. Waseem', sub: '3,000+ T20I runs' },
              { label: 'Head Coach', value: 'L. Rajput', sub: 'Former India opener' },
              { label: 'T20 WC 2026', value: 'Qualified ✓', sub: 'India & Sri Lanka' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl text-white mb-0.5">{s.value}</div>
                <div className="text-xs font-mono-dm uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--red-mid)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-10">

        {/* T20 WC 2026 Banner */}
        <div className="rounded-2xl p-6 mb-10 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--black)', border: '2px solid var(--red)' }}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">🏆</span>
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--red)' }}>
                UAE Qualified!
              </div>
              <h2 className="font-display text-3xl text-white">ICC Men's T20 World Cup 2026</h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                India & Sri Lanka · February–March 2026 · Muhammad Waseem leads UAE
              </p>
            </div>
          </div>
          <a href="https://www.icc-cricket.com/tournaments/mens-t20-worldcup" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
            style={{ background: 'var(--red)' }}>
            ICC Tournament Page ↗
          </a>
        </div>

        {/* Full Squad */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--red)' }}>
                T20 World Cup 2026 Squad
              </div>
              <h2 className="font-display text-4xl" style={{ color: 'var(--black)' }}>Full Squad</h2>
            </div>
            <a href="https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2025-26-1502138/united-arab-emirates-squad-1521603/series-squads"
              target="_blank" rel="noopener noreferrer"
              className="text-xs px-4 py-2 rounded-xl" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
              View on ESPNCricinfo ↗
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {squad.map(p => (
              <div key={p.name} className="rounded-2xl p-5 card-hover"
                style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 relative flex items-center justify-center font-display text-xl text-white"
                    style={{ background: p.color, fontSize: 16 }}>
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{p.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{p.role}</div>
                    <div className="text-xs mt-0.5">{p.flag} · {p.born}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>
                  {p.highlights}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(p.stats).map(([k, v]) => (
                    <div key={k} className="rounded-lg p-2 text-center" style={{ background: 'var(--off-white)' }}>
                      <div className="text-xs font-medium" style={{ color: 'var(--black)' }}>{v}</div>
                      <div className="text-xs font-mono-dm capitalize" style={{ color: 'var(--ink-light)' }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div className="mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>
            Match History
          </div>
          <h2 className="font-display text-4xl mb-6" style={{ color: 'var(--black)' }}>Recent Results</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {recentResults.map((r, i) => (
              <div key={i} className="flex flex-wrap items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < recentResults.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: r.result === 'W' ? 'var(--green)' : 'var(--red)' }}>
                  {r.result}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                    UAE vs {r.vs}
                    {r.result === 'W' && r.vs === 'New Zealand' && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--gold-light)', color: 'var(--gold)' }}>
                        🌟 Historic Win
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                    {r.tournament} · {r.venue} · {r.date}
                  </div>
                </div>
                <div className="text-xs text-right">
                  <div className="font-mono-dm" style={{ color: 'var(--ink)' }}>{r.score}</div>
                  <div className="font-medium px-2 py-0.5 rounded-full mt-0.5 inline-block"
                    style={{ background: r.format === 'T20I' ? 'var(--red-light)' : 'var(--green-light)', color: r.format === 'T20I' ? 'var(--red)' : 'var(--green)', fontSize: 10 }}>
                    {r.format}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historic Records */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Highest Team Total (ODI)', value: '348/3', detail: 'vs Namibia · Sharjah · Mar 2022' },
            { label: 'Highest Individual Score', value: '151*', detail: 'Asif Khan vs USA · Jul 2023' },
            { label: 'Best Bowling Figures', value: '6/34', detail: 'Zahoor Khan vs Ireland · Mar 2017' },
          ].map(r => (
            <div key={r.label} className="rounded-2xl p-5 text-center card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="font-display text-4xl mb-1" style={{ color: 'var(--red)' }}>{r.value}</div>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--black)' }}>{r.label}</div>
              <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{r.detail}</div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-4">Official Resources</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Emirates Cricket Board', url: 'https://emiratescricket.com' },
              { label: 'UAE on ESPNCricinfo', url: 'https://www.espncricinfo.com/team/united-arab-emirates-27' },
              { label: 'ICC T20 WC 2026 Squad', url: 'https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2025-26-1502138/united-arab-emirates-squad-1521603/series-squads' },
              { label: 'ECB CricClubs', url: 'https://cricclubs.com/UAE' },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-sm text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
