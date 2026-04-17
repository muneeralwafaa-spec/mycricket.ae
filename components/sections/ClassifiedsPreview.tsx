import Link from 'next/link'

const items = [
  { icon: '🏏', name: 'Gray Nicolls Bat — Grade 1', price: 'AED 180', condition: 'Used', location: 'Dubai Marina' },
  { icon: '🥊', name: 'SG Batting Gloves — Large', price: 'AED 95', condition: 'New', location: 'Sharjah' },
  { icon: '👕', name: 'Full Cricket Kit — Junior', price: 'AED 350', condition: 'Used', location: 'Abu Dhabi' },
  { icon: '⚾', name: 'Kookaburra Match Balls ×6', price: 'AED 240', condition: 'New', location: 'Al Ain' },
  { icon: '🦺', name: 'Batting Pads — Adult M', price: 'AED 120', condition: 'Used', location: 'Ajman' },
  { icon: '🎽', name: 'Team Jersey (10 pcs custom)', price: 'AED 650', condition: 'New', location: 'Dubai' },
]

export default function ClassifiedsPreview() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>
              Buy & Sell
            </div>
            <h2 className="font-display text-5xl tracking-wide" style={{ color: 'var(--ink)' }}>
              Cricket Classifieds
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>
              New and used cricket gear — bats, pads, kits, balls and more.
            </p>
          </div>
          <Link href="/classifieds/new"
            className="text-sm font-medium no-underline px-5 py-2.5 rounded-lg transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
            Post a Free Ad →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {items.map((item, i) => (
            <Link key={i} href="/classifieds"
              className="no-underline rounded-xl overflow-hidden block transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ border: '1px solid var(--border)', background: '#fff' }}>
              <div className="h-28 flex items-center justify-center text-4xl relative"
                style={{ background: 'var(--green-light)' }}>
                {item.icon}
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium font-mono-dm"
                  style={{
                    background: item.condition === 'New' ? 'var(--green)' : 'var(--gold-light)',
                    color: item.condition === 'New' ? '#fff' : 'var(--gold)',
                  }}>
                  {item.condition}
                </span>
              </div>
              <div className="p-3">
                <div className="text-xs font-medium leading-tight mb-1" style={{ color: 'var(--ink)' }}>
                  {item.name}
                </div>
                <div className="font-display text-xl tracking-wide" style={{ color: 'var(--green)' }}>
                  {item.price}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>
                  📍 {item.location}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/classifieds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium no-underline transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
            Browse All Classifieds →
          </Link>
        </div>
      </div>
    </section>
  )
}
