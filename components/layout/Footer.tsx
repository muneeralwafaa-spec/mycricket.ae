import Link from 'next/link'

const cols = [
  { title: 'Discover', links: [
    { href: '/academies', label: 'Academies' },
    { href: '/academies?type=nets', label: 'Nets & Grounds' },
    { href: '/coaches', label: 'Coaches' },
    { href: '/umpires', label: 'Umpires' },
    { href: '/shops', label: 'Gear Shops' },
  ]},
  { title: 'Community', links: [
    { href: '/classifieds', label: 'Classifieds' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/noticeboard', label: 'Notice Board' },
    { href: '/tours', label: 'Cricket Tours' },
    { href: '/jobs', label: 'Jobs' },
  ]},
  { title: 'Info', links: [
    { href: '/national-team', label: 'UAE National Team' },
    { href: '/councils', label: 'Governing Bodies' },
    { href: '/news', label: 'News' },
    { href: '/list-business', label: 'List Your Business' },
    { href: '/contact', label: 'Contact Us' },
  ]},
]

export default function Footer() {
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-1" style={{ background: 'linear-gradient(90deg, var(--green) 33%, white 33%, white 66%, var(--red) 66%)' }} />
      <div className="container-uae pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl tracking-widest text-white mb-3">
              MY<span style={{ color: 'var(--red)' }}>CRICKET</span>.AE
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: 220 }}>
              UAE's definitive cricket platform — facilities, coaches, gear, tours, classifieds and more.
            </p>
            <div className="flex gap-2 mt-4">
              {['🇦🇪', '🏏', '🏆'].map(e => <span key={e} className="text-xl">{e}</span>)}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {col.title}
              </h4>
              {col.links.map(l => (
                <Link key={l.href} href={l.href} className="block text-sm mb-2 footer-link"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}>
          <span>© 2026 MyCricket.ae — All rights reserved</span>
          <span>Built with <span style={{ color: 'var(--red)' }}>♥</span> for UAE Cricket 🇦🇪</span>
        </div>
      </div>
    </footer>
  )
}
