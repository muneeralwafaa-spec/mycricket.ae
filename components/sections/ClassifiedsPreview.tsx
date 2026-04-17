import Link from 'next/link'

const items = [
  { icon: '🏏', name: 'Gray Nicolls Bat — Grade 1 English Willow', price: 'AED 180', condition: 'Used', location: 'Dubai Marina', img: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=300&q=70' },
  { icon: '🥊', name: 'SG Batting Gloves — Right Hand Large',      price: 'AED 95',  condition: 'New',  location: 'Sharjah',      img: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=300&q=70' },
  { icon: '👕', name: 'Full Cricket Kit — Junior (Ages 8–12)',      price: 'AED 350', condition: 'Used', location: 'Abu Dhabi',    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=70' },
  { icon: '⚾', name: 'Kookaburra Match Balls ×6 (New in Box)',    price: 'AED 240', condition: 'New',  location: 'Al Ain',       img: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=300&q=70' },
  { icon: '🦺', name: 'SS Ton Batting Pads — Adult Medium',         price: 'AED 120', condition: 'Used', location: 'Ajman',        img: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=300&q=70' },
  { icon: '🎽', name: 'Custom Team Jersey — 10 pieces sublimation', price: 'AED 650', condition: 'New',  location: 'Dubai',        img: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=300&q=70' },
]

export default function ClassifiedsPreview() {
  return (
    <section style={{ background: 'var(--off-white)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>Buy & Sell</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--black)' }}>Cricket Classifieds</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>
              New and used cricket gear across UAE. Free to list, free to browse.
            </p>
          </div>
          <Link href="/classifieds/new"
            className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
            + Post Free Ad
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          {items.map((item, i) => (
            <Link key={i} href="/classifieds" className="rounded-2xl overflow-hidden block card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="h-28 overflow-hidden relative">
                <img src={item.img} alt={item.name}
                  className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: item.condition === 'New' ? 'var(--green)' : 'rgba(239,51,64,0.85)',
                    color: 'white', fontSize: 9,
                  }}>
                  {item.condition}
                </span>
              </div>
              <div className="p-3">
                <div className="text-xs font-medium leading-tight mb-1 truncate" style={{ color: 'var(--black)' }}>{item.name}</div>
                <div className="font-display text-lg" style={{ color: 'var(--green)' }}>{item.price}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--ink-light)' }}>📍 {item.location}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link href="/classifieds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
            style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
            Browse All Classifieds →
          </Link>
        </div>
      </div>
    </section>
  )
}
