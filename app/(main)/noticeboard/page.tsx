import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UAE Cricket Notice Board | Tryouts, Announcements, Jobs',
  description: 'Latest UAE cricket notices — team tryouts, tournament registrations, ECB announcements, coaching jobs and club news.',
}

const notices = [
  {
    type: 'announcement',
    title: 'Emirates D50 April 2026 — Season Registration Now Open',
    org: 'Emirates Cricket Board',
    location: 'UAE',
    date: '17 Apr 2026',
    body: 'ECB has opened team registrations for the Emirates D50 April 2026 season. Division A, B & C available. Register on CricClubs before deadline.',
    link: 'https://cricclubs.com/UAE',
    urgent: true,
  },
  {
    type: 'tryout',
    title: 'Gulf Giants — Community Cricket Programme Open for Registration',
    org: 'Gulf Giants / ILT20',
    location: 'Dubai Sports City',
    date: '15 Apr 2026',
    body: 'Gulf Giants are opening their community cricket programme for the upcoming season. Players of all levels welcome to register.',
    link: null,
    urgent: false,
  },
  {
    type: 'announcement',
    title: 'UAE Qualify for ICC T20 World Cup 2026 — Full Squad Announced',
    org: 'Emirates Cricket Board',
    location: 'UAE',
    date: '30 Jan 2026',
    body: 'UAE have qualified for the T20 World Cup 2026 in India & Sri Lanka. Muhammad Waseem leads a 15-member squad including Alishan Sharafu, Junaid Siddique & Simranjeet Singh.',
    link: 'https://emiratescricket.com',
    urgent: false,
  },
  {
    type: 'job',
    title: 'Head Coach Vacancy — Abu Dhabi Cricket Club',
    org: 'Abu Dhabi Cricket Association',
    location: 'Abu Dhabi',
    date: '12 Apr 2026',
    body: 'Experienced cricket coach required for Abu Dhabi Cricket Club. Minimum ICC Level 2 certification. Competitive salary + accommodation package.',
    link: null,
    urgent: false,
  },
  {
    type: 'tryout',
    title: 'ICC Academy Dubai — Summer Camp 2026 Registrations Open',
    org: 'ICC Cricket Academy',
    location: 'Dubai Sports City',
    date: '10 Apr 2026',
    body: 'ICC Academy\'s popular Summer Cricket Camp is now accepting registrations for June–August 2026. Ages 8–18. Professional coaching staff.',
    link: 'https://www.icc-cricket.com/about/cricket/icc-academy',
    urgent: false,
  },
  {
    type: 'announcement',
    title: 'DP World ILT20 Season 4 — Desert Vipers Win Championship',
    org: 'Emirates Cricket Board / ILT20',
    location: 'Dubai',
    date: '4 Jan 2026',
    body: 'Desert Vipers defeated Gulf Giants in the final to claim the ILT20 Season 4 title. Season ran Dec 2025 – Jan 2026.',
    link: null,
    urgent: false,
  },
  {
    type: 'urgent',
    title: 'Umpires Required — ECB U19 Girls Inter Emirates League',
    org: 'Emirates Cricket Board',
    location: 'Multiple Emirates',
    date: '8 Apr 2026',
    body: 'ECB urgently requires certified umpires for the ongoing U19 Girls Inter Emirates League. ECB panel registration preferred. Contact ECB directly.',
    link: 'https://emiratescricket.com',
    urgent: true,
  },
  {
    type: 'tryout',
    title: 'Young Talents Cricket Academy — New Batch Enrolling May 2026',
    org: 'Young Talents Cricket Academy',
    location: 'Dubai / Sharjah',
    date: '5 Apr 2026',
    body: 'New training batch starting May 2026 at Al Qusais & Sharjah venues. Ages 7–18. ICC & ECB certified coaching staff.',
    link: null,
    urgent: false,
  },
]

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  announcement: { color: 'var(--green)',    bg: 'var(--green-light)',  label: 'Announcement' },
  tryout:       { color: 'var(--red)',       bg: 'var(--red-light)',    label: 'Tryout' },
  job:          { color: 'var(--gold)',      bg: 'var(--gold-light)',   label: 'Job' },
  urgent:       { color: '#fff',             bg: 'var(--red)',          label: '🔴 Urgent' },
}

export default function NoticeBoardPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Community
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">Notice Board</h1>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tryouts, tournament registrations, ECB announcements, coaching jobs & club news
          </p>
        </div>
      </div>

      <div className="container-uae py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Announcements', 'Tryouts', 'Jobs', 'Urgent'].map((f, i) => (
            <button key={f} className="px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: i === 0 ? 'var(--red)' : 'var(--white)',
                color: i === 0 ? 'white' : 'var(--ink)',
                border: `1px solid ${i === 0 ? 'var(--red)' : 'var(--border)'}`,
              }}>
              {f}
            </button>
          ))}
          <Link href="/noticeboard/new"
            className="ml-auto px-5 py-1.5 rounded-full text-xs font-medium text-white"
            style={{ background: 'var(--green)' }}>
            + Post a Notice
          </Link>
        </div>

        <div className="space-y-4">
          {notices.map((n, i) => {
            const tc = typeConfig[n.type]
            return (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--white)',
                  border: n.urgent ? '2px solid var(--red)' : '1px solid var(--border)',
                }}>
                <div className="flex items-start gap-4 p-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background: tc.bg, color: tc.color }}>
                        {tc.label}
                      </span>
                      <span className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>
                        {n.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--black)' }}>{n.title}</h3>
                    <div className="text-xs mb-2" style={{ color: 'var(--red)' }}>
                      {n.org} · 📍 {n.location}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-light)' }}>{n.body}</p>
                    {n.link && (
                      <a href={n.link} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs font-medium"
                        style={{ color: 'var(--green)' }}>
                        More info → 
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Post a Notice</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Announce tryouts, jobs, tournaments or club news to the UAE cricket community.
          </p>
          <Link href="/noticeboard/new"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'var(--red)' }}>
            Post a Notice — Free
          </Link>
        </div>
      </div>
    </div>
  )
}
