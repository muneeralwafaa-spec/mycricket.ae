import Link from 'next/link'

const notices = [
  { type: 'tryout', title: 'Dubai Lions CC — Player Tryouts Open (All Levels)', org: 'Dubai Lions Cricket Club · Dubai Sports City', date: '16 Apr' },
  { type: 'announcement', title: 'ECB Announces UAE Domestic T20 Season 2026 Registrations', org: 'Emirates Cricket Board · Official', date: '14 Apr' },
  { type: 'tryout', title: 'Sharjah Premier League — Team Registration Deadline Extended', org: 'Sharjah Cricket Association', date: '12 Apr' },
  { type: 'urgent', title: 'Urgent: Umpires Needed for Under-17 Tournament — Abu Dhabi', org: 'Abu Dhabi Cricket · Volunteer', date: '11 Apr' },
  { type: 'announcement', title: 'ICC Academy Dubai — Summer Camp 2026 Bookings Now Open', org: 'ICC Cricket Academy · Dubai Sports City', date: '10 Apr' },
  { type: 'tryout', title: 'Ajman Oval Cricket Academy — New Batch Starting May 2026', org: 'Ajman Oval Cricket Academy', date: '09 Apr' },
]

const dotColor: Record<string, string> = {
  tryout: 'var(--green)',
  announcement: 'var(--gold)',
  urgent: '#c0392b',
}

export default function NoticeBoard() {
  return (
    <section className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>
              Community
            </div>
            <h2 className="font-display text-5xl tracking-wide" style={{ color: 'var(--ink)' }}>
              Notice Board
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>
              Tryouts, tournaments, announcements & club news from across the UAE.
            </p>
          </div>
          <Link href="/noticeboard/new"
            className="text-sm font-medium no-underline px-5 py-2.5 rounded-lg transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
            Post a Notice →
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {notices.map((n, i) => (
            <Link key={i} href="/noticeboard"
              className="no-underline flex items-start gap-4 px-6 py-4 transition-colors hover:bg-[var(--green-light)] group"
              style={{ borderBottom: i < notices.length - 1 ? '1px solid var(--border)' : 'none', background: '#fff' }}>
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: dotColor[n.type] }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{n.title}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{n.org}</div>
              </div>
              <div className="font-mono-dm text-xs flex-shrink-0 mt-0.5" style={{ color: 'var(--ink-light)' }}>
                {n.date}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/noticeboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium no-underline transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
            View All Notices →
          </Link>
        </div>
      </div>
    </section>
  )
}
