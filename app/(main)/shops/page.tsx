import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Star, Phone } from 'lucide-react'
export const metadata: Metadata = { title: 'Cricket Shops in UAE | Buy Cricket Gear — MyCricket.ae' }

const shops = [
  { name: 'ICC Academy Cricket Store', area: 'Dubai Sports City, Dubai', desc: 'Fully equipped cricket retail store at the ICC Academy. Wide range of bats, kits, gloves, pads, balls from top brands including Gray Nicolls, Kookaburra, SG, SS Ton, Dukes.', brands: ['Gray Nicolls', 'Kookaburra', 'SG', 'SS Ton'], phone: '+971 54 305 7133', website: 'https://www.iccacademy.com', rating: 4.8, reviews: 134, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=400&q=80', verified: true },
  { name: 'Sun & Sand Sports — JBR', area: 'Jumeirah Beach Residence, Dubai', desc: 'Sun & Sand Sports multi-brand sports store. Good selection of cricket equipment including Kookaburra and SG range. Also stocks cricket shoes and accessories.', brands: ['Kookaburra', 'SG', 'Adidas'], phone: null, website: 'https://www.sunandsand.com', rating: 4.3, reviews: 89, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', verified: true },
  { name: 'Al Ain Sports — Bur Dubai', area: 'Bur Dubai', desc: 'Popular cricket equipment shop in Bur Dubai. Good prices on bats, pads, gloves and kit bags. Popular with the South Asian cricket community in Dubai.', brands: ['SG', 'SS Ton', 'BDM', 'MRF'], phone: null, website: null, rating: 4.2, reviews: 67, image: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=400&q=80', verified: false },
  { name: 'Cricket Gear UAE (Online)', area: 'Delivers UAE-wide', desc: 'Online cricket equipment store delivering across UAE. Competitive prices on all major brands. Free delivery on orders over AED 200.', brands: ['All major brands'], phone: null, website: null, rating: 4.4, reviews: 156, image: 'https://images.unsplash.com/photo-1625245488600-e55f92498e37?w=400&q=80', verified: false },
  { name: 'Danube Sports World — Cricket Section', area: 'Near SZR, Dubai', desc: 'Sports megastore with dedicated cricket section. Danube Cricket Academy is based here. Wide range of equipment from beginner to professional level.', brands: ['Kookaburra', 'Gray Nicolls', 'SG'], phone: null, website: null, rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=80', verified: true },
  { name: 'List Your Cricket Shop', area: 'All UAE', desc: 'Are you a cricket gear retailer? Get listed on MyCricket.ae and reach thousands of cricket players across the UAE.', brands: [], phone: null, website: null, rating: 0, reviews: 0, image: null, cta: true, verified: false },
]

export default function ShopsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Buy Gear</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Shops UAE</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Find cricket equipment stores and online retailers across the UAE</p>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="flex gap-3 mb-6 flex-wrap">
          <Link href="/shop" className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>🛒 Shop Online Now →</Link>
          <Link href="/classifieds" className="px-4 py-2 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: 'var(--white)' }}>📋 Buy Used Gear</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shops.map((s, i) => (
            <div key={i} className="rounded-2xl overflow-hidden card-hover"
              style={{ background: (s as any).cta ? 'var(--black)' : 'var(--white)', border: (s as any).cta ? '2px dashed rgba(239,51,64,0.4)' : '1px solid var(--border)' }}>
              {s.image && <img src={s.image} alt={s.name} className="w-full h-36 object-cover" loading="lazy" />}
              {(s as any).cta && <div className="h-36 flex items-center justify-center text-5xl" style={{ background: 'rgba(255,255,255,0.05)' }}>🏪</div>}
              <div className="p-5">
                <h3 className="text-sm font-medium mb-1" style={{ color: (s as any).cta ? 'white' : 'var(--black)' }}>{s.name}</h3>
                <div className="flex items-center gap-1 text-xs mb-2" style={{ color: (s as any).cta ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>
                  <MapPin size={11} /> {s.area}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: (s as any).cta ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>{s.desc}</p>
                {s.brands.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.brands.map(b => <span key={b} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{b}</span>)}
                  </div>
                )}
                {(s as any).cta ? (
                  <Link href="/list-business" className="block py-2 rounded-xl text-xs font-medium text-center text-white" style={{ background: 'var(--red)' }}>
                    List Your Shop Free →
                  </Link>
                ) : (
                  <div className="flex items-center justify-between">
                    {s.rating > 0 && <div className="flex items-center gap-1 text-xs"><Star size={11} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} /><span style={{ color: 'var(--gold)' }}>{s.rating}</span><span style={{ color: 'var(--ink-light)' }}>({s.reviews})</span></div>}
                    {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs font-medium" style={{ color: 'var(--red)' }}>Visit ↗</a>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
