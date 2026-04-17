import Link from 'next/link'

const modules = [
  { icon: '🏟️', name: 'Facilities', desc: 'Academies, nets, grounds & indoor centres across all 7 emirates.', count: '120+ listed', href: '/academies', featured: false },
  { icon: '👤', name: 'Coaches & Umpires', desc: 'Find verified, accredited coaches, umpires, scorers & commentators.', count: '350+ profiles', href: '/coaches', featured: false },
  { icon: '🛒', name: 'Cricket Shop', desc: 'Multi-vendor marketplace — bats, kits, jerseys, gear and more.', count: 'Buy now', href: '/shop', featured: false },
  { icon: '🎽', name: 'Custom Jerseys', desc: 'Custom team kits & sublimation printing delivered across UAE.', count: 'Min 5 pcs', href: '/shop/custom', featured: false },
  { icon: '📋', name: 'Classifieds', desc: 'Buy & sell new or used bats, kits, pads, balls and more.', count: 'Post free', href: '/classifieds', featured: false },
  { icon: '🏆', name: 'Tournaments', desc: 'UAE leagues, tournaments, team registrations & match fixtures.', count: '40+ events', href: '/tournaments', featured: false },
  { icon: '✈️', name: 'Cricket Tours', desc: 'Connect UAE teams touring abroad with overseas teams visiting UAE.', count: 'New feature', href: '/tours', featured: true },
  { icon: '📰', name: 'News & Jobs', desc: 'UAE cricket news, coaching vacancies & club announcements.', count: 'Daily updates', href: '/news', featured: false },
  { icon: '🏛️', name: 'Councils & Boards', desc: 'Emirates Cricket Board, ICC, UAE associations & contacts.', count: 'Official info', href: '/councils', featured: false },
]

export default function ModulesGrid() {
  return (
    <section className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>
            What we offer
          </div>
          <h2 className="font-display text-5xl tracking-wide" style={{ color: 'var(--ink)' }}>
            The Complete Cricket Hub
          </h2>
          <p className="text-sm mt-2" style={{ color: 'var(--ink-light)' }}>
            Every cricket need in the UAE, under one platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: 'var(--border)', border: '1.5px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {modules.map(m => (
            <Link key={m.href} href={m.href}
              className="no-underline group block p-7 relative overflow-hidden transition-colors duration-200"
              style={{ background: m.featured ? 'var(--ink)' : '#fff' }}>
              {/* hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: m.featured ? 'var(--ink-mid)' : 'var(--green-light)' }} />
              {/* gold underline on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: 'var(--gold)' }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-200 group-hover:scale-105"
                  style={{ background: m.featured ? 'rgba(200,150,30,0.15)' : 'var(--green-light)' }}>
                  {m.icon}
                </div>
                <div className="font-display text-xl tracking-wide mb-1"
                  style={{ color: m.featured ? '#fff' : 'var(--ink)' }}>
                  {m.name}
                </div>
                <p className="text-xs leading-relaxed mb-4"
                  style={{ color: m.featured ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>
                  {m.desc}
                </p>
                <span className="text-xs px-3 py-1 rounded-full font-mono-dm"
                  style={{
                    background: m.featured ? 'rgba(200,150,30,0.15)' : 'var(--green-light)',
                    color: m.featured ? 'var(--gold)' : 'var(--green)',
                  }}>
                  {m.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
