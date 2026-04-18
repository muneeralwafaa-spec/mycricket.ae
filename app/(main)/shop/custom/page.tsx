import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Custom Cricket Jerseys UAE | Team Kits — MyCricket.ae' }
export default function CustomJerseysPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div className="relative overflow-hidden" style={{ height: 300 }}>
        <img src="https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=1400&q=85"
          alt="Custom jerseys" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)' }} />
        <div className="absolute inset-0 flex flex-col justify-end container-uae pb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Custom Orders</div>
          <h1 className="font-display text-5xl text-white mb-2">Custom Team Jerseys</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Full sublimation team kits with name & number. Min 5 pcs.</p>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { title: 'Club Kit', price: 'From AED 95/pc', min: 'Min 10 pcs', features: ['Full sublimation', 'Name & number', 'Club logo', '3–5 day delivery'] },
            { title: 'Tournament Kit', price: 'From AED 120/pc', min: 'Min 5 pcs', features: ['Full sublimation', 'Name & number', 'Sponsor logos', 'Premium fabric', '5–7 day delivery'], featured: true },
            { title: 'Premium Kit', price: 'From AED 180/pc', min: 'Min 5 pcs', features: ['Full sublimation', 'All logos', 'Premium polyester', 'Moisture-wicking', '7–10 day delivery'] },
          ].map(p => (
            <div key={p.title} className="rounded-2xl p-6 card-hover"
              style={{ background: 'var(--white)', border: (p as any).featured ? '2px solid var(--red)' : '1px solid var(--border)' }}>
              {(p as any).featured && <div className="text-xs font-medium text-white px-3 py-1 rounded-full inline-block mb-3" style={{ background: 'var(--red)' }}>Most Popular</div>}
              <h3 className="font-display text-2xl mb-1" style={{ color: 'var(--black)' }}>{p.title}</h3>
              <div className="font-display text-3xl mb-1" style={{ color: 'var(--green)' }}>{p.price}</div>
              <div className="text-xs mb-4" style={{ color: 'var(--ink-light)' }}>{p.min}</div>
              <div className="space-y-2 mb-5">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-mid)' }}>
                    <span style={{ color: 'var(--green)' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="block py-2.5 rounded-xl text-sm font-medium text-white text-center"
                style={{ background: (p as any).featured ? 'var(--red)' : 'var(--green)' }}>
                Get Quote
              </Link>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Ready to Order?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>WhatsApp us your design and we'll send a quote within 24 hours.</p>
          <a href="https://wa.me/971000000000" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--green)' }}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}
