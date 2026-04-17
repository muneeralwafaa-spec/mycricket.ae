import Link from 'next/link'

const cols = [
  {
    title: 'Discover',
    links: [
      { href: '/academies', label: 'Academies' },
      { href: '/academies?type=nets', label: 'Nets & Grounds' },
      { href: '/coaches', label: 'Coaches' },
      { href: '/umpires', label: 'Umpires' },
      { href: '/shops', label: 'Gear Shops' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/classifieds', label: 'Classifieds' },
      { href: '/tournaments', label: 'Tournaments' },
      { href: '/noticeboard', label: 'Notice Board' },
      { href: '/tours', label: 'Cricket Tours' },
      { href: '/jobs', label: 'Jobs' },
    ],
  },
  {
    title: 'Info',
    links: [
      { href: '/national-team', label: 'UAE National Team' },
      { href: '/councils', label: 'Governing Bodies' },
      { href: '/news', label: 'News' },
      { href: '/register', label: 'List Your Business' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#070e08', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      className="px-4 pt-12 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl tracking-widest text-white mb-2">
              MY<span style={{ color: 'var(--gold)' }}>CRICKET</span>.AE
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              UAE's definitive cricket platform — facilities, coaches, gear, tours, classifieds and more under one roof.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="font-mono-dm text-xs tracking-widest uppercase text-white/30 mb-4">
                {col.title}
              </h4>
              {col.links.map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-sm text-white/50 hover:text-[var(--gold)] transition-colors mb-2 no-underline">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/25">
          <span>© 2026 MyCricket.ae — All rights reserved</span>
          <span>Built with <span style={{ color: 'var(--gold)' }}>♥</span> for UAE Cricket</span>
        </div>
      </div>
    </footer>
  )
}
