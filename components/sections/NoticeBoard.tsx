import Link from 'next/link'

const notices = [
  { type: 'announcement', title: 'Emirates D50 April 2026 — Season Registration Now Open', org: 'Emirates Cricket Board', date: '17 Apr', urgent: true },
  { type: 'tryout',       title: 'ICC Academy Dubai — Summer Camp 2026 Registrations Open', org: 'ICC Cricket Academy · Dubai Sports City', date: '10 Apr', urgent: false },
  { type: 'job',          title: 'Head Coach Vacancy — Abu Dhabi Cricket Club (Level 2+ Required)', org: 'Abu Dhabi Cricket Association', date: '12 Apr', urgent: false },
  { type: 'urgent',       title: 'ECB Umpires Urgently Required — U19 Girls Inter Emirates League', org: 'Emirates Cricket Board', date: '8 Apr', urgent: true },
  { type: 'announcement', title: 'UAE Qualify for T20 World Cup 2026 — Muhammad Waseem to Lead', org: 'Emirates Cricket Board · Official', date: '30 Jan', urgent: false },
  { type: 'tryout',       title: 'Young Talents Cricket Academy — New Batch Enrolling May 2026', org: 'Young Talents Cricket Academy · Dubai/Sharjah', date: '5 Apr', urgent: false },
]

const dotColor: Record<string, string> = {
  announcement: 'var(--green)',
  tryout: 'var(--red)',
  job: 'var(--gold)',
  urgent: 'var(--red)',
}

export default function NoticeBoard() {
  return (
    <section style={{ background: 'var(--white)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>Community</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--black)' }}>Notice Board</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>Latest from Emirates Cricket Board & UAE cricket community</p>
          </div>
          <Link href="/noticeboard/new" className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
            Post a Notice →
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {notices.map((n, i) => (
            <Link key={i} href="/noticeboard"
              className="flex items-center gap-4 px-5 py-4 group"
              style={{ borderBottom: i < notices.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)', display: 'flex' }}
              >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dotColor[n.type] }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--black)' }}>{n.title}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--ink-light)' }}>{n.org}</div>
              </div>
              {n.urgent && (
                <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                  style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                  Urgent
                </span>
              )}
              <div className="font-mono-dm text-xs flex-shrink-0" style={{ color: 'var(--ink-light)' }}>{n.date}</div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link href="/noticeboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
            style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
            View All Notices →
          </Link>
        </div>
      </div>
    </section>
  )
}
