import Link from 'next/link'

const modules = [
  { icon: '🏟️', name: 'Facilities',       desc: '120+ academies, nets & grounds across Dubai, Abu Dhabi, Sharjah & all 7 emirates.', count: '120+ listed', href: '/academies',   featured: false },
  { icon: '👤', name: 'Coaches & Umpires', desc: 'Find ICC-certified coaches, ECB panel umpires, scorers & commentators.',              count: '350+ profiles', href: '/coaches',    featured: false },
  { icon: '🛒', name: 'Cricket Shop',      desc: 'Bats, kits, jerseys, gear — from Gray Nicolls, Kookaburra, SG, SS Ton & more.',     count: 'Shop now',     href: '/shop',        featured: false },
  { icon: '🎽', name: 'Custom Jerseys',    desc: 'Full sublimation team kits with name & number. Delivered across UAE in 7–10 days.',  count: 'Min 5 pcs',    href: '/shop/custom', featured: false },
  { icon: '📋', name: 'Classifieds',       desc: 'Buy & sell new or used bats, kits, pads, balls. Free listing for UAE sellers.',       count: 'Post free',    href: '/classifieds', featured: false },
  { icon: '🏆', name: 'Tournaments',       desc: 'ILT20, Emirates D50, D20, D10 leagues, ECB Academy leagues & club tournaments.',     count: '40+ events',   href: '/tournaments', featured: false },
  { icon: '✈️', name: 'Cricket Tours',     desc: 'Connect UAE teams touring India, Pakistan, UK with overseas teams visiting UAE.',     count: 'Unique feature', href: '/tours',     featured: true  },
  { icon: '📰', name: 'News & Jobs',       desc: 'Latest UAE cricket news, ECB announcements, coaching jobs & club vacancies.',         count: 'Daily updates', href: '/news',       featured: false },
  { icon: '🏛️', name: 'Councils & Boards', desc: 'Emirates Cricket Board, ICC HQ Dubai, Abu Dhabi Cricket, Sharjah Cricket contacts.', count: 'Official info', href: '/councils',   featured: false },
]

export default function ModulesGrid() {
  return (
    <section style={{ background: 'var(--white)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>What we offer</div>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--black)' }}>The Complete Cricket Hub</h2>
          <p className="text-sm mt-2 max-w-lg" style={{ color: 'var(--ink-light)' }}>
            Everything cricket in the UAE — from grassroots to the national team, all under one platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(m => (
            <Link key={m.href} href={m.href}
              className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: m.featured ? 'var(--black)' : 'var(--off-white)',
                border: m.featured ? '2px solid var(--red)' : '1px solid var(--border)',
              }}>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: 'var(--red)' }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: m.featured ? 'rgba(239,51,64,0.15)' : 'var(--green-light)' }}>
                {m.icon}
              </div>
              <div className="font-display text-xl mb-1" style={{ color: m.featured ? 'white' : 'var(--black)' }}>{m.name}</div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: m.featured ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>{m.desc}</p>
              <span className="text-xs px-3 py-1 rounded-full font-mono-dm"
                style={{ background: m.featured ? 'rgba(239,51,64,0.2)' : 'var(--green-light)', color: m.featured ? 'var(--red-mid)' : 'var(--green)' }}>
                {m.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
