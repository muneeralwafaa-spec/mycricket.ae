import { Metadata } from 'next'
import { Search, SlidersHorizontal, MapPin } from 'lucide-react'
import { EMIRATES, FACILITY_TYPES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cricket Academies & Facilities in UAE',
  description: 'Find cricket academies, nets, grounds and indoor facilities across Dubai, Abu Dhabi, Sharjah and all UAE emirates.',
}

const mockFacilities = [
  { name: 'ICC Cricket Academy', type: 'academy', emirate: 'Dubai Sports City', rating: 4.9, reviews: 312, price: 'AED 350/mo', tags: ['All Ages', 'Indoor', 'Turf Wicket'], verified: true, featured: true },
  { name: 'Zayed Cricket Academy', type: 'academy', emirate: 'Abu Dhabi', rating: 4.7, reviews: 189, price: 'AED 280/mo', tags: ['U8–U18', 'Outdoor'], verified: true, featured: false },
  { name: 'Dubai Cricket Practice Nets', type: 'nets', emirate: 'Dubai', rating: 4.5, reviews: 94, price: 'AED 80/hr', tags: ['Walk-in', 'Indoor Nets'], verified: false, featured: false },
  { name: 'G Force Cricket Academy', type: 'academy', emirate: 'Dubai', rating: 4.8, reviews: 241, price: 'AED 400/mo', tags: ['Adults', 'Junior', 'Pro'], verified: true, featured: true },
  { name: 'Sharjah Cricket Ground', type: 'ground', emirate: 'Sharjah', rating: 4.6, reviews: 78, price: 'AED 500/day', tags: ['Full Ground', 'Floodlit'], verified: true, featured: false },
  { name: 'MCL Cricket Academy', type: 'academy', emirate: 'Dubai', rating: 4.4, reviews: 56, price: 'AED 250/mo', tags: ['U12–Adults'], verified: false, featured: false },
  { name: 'Spring Cricket Academy', type: 'academy', emirate: 'Sharjah', rating: 4.3, reviews: 42, price: 'AED 200/mo', tags: ['Beginners'], verified: false, featured: false },
  { name: 'Ajman Oval Cricket Academy', type: 'academy', emirate: 'Ajman', rating: 4.5, reviews: 67, price: 'AED 220/mo', tags: ['All Ages', 'Outdoor'], verified: true, featured: false },
]

export default function AcademiesPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
            Find & Book
          </div>
          <h1 className="font-display text-6xl text-white tracking-wide mb-3">
            Cricket Facilities
          </h1>
          <p className="text-white/50 text-sm max-w-md">
            Academies, nets, grounds & indoor centres across all 7 UAE emirates.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 px-4 py-2 rounded-lg"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}>
            <Search size={15} style={{ color: 'var(--ink-light)' }} />
            <input placeholder="Search facilities..." className="bg-transparent text-sm outline-none flex-1" style={{ color: 'var(--ink)' }} />
          </div>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option value="">All Emirates</option>
            {EMIRATES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>
          <select className="px-4 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <option value="">All Types</option>
            {FACILITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>
          Showing {mockFacilities.length} facilities
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mockFacilities.map((f, i) => (
            <a key={i} href={`/academies/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="no-underline rounded-xl overflow-hidden block transition-all duration-200 hover:-translate-y-1 group"
              style={{ background: '#fff', border: f.featured ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
              {/* Image placeholder */}
              <div className="h-36 flex items-center justify-center relative"
                style={{ background: 'var(--green-light)' }}>
                <span className="text-4xl">🏟️</span>
                {f.featured && (
                  <span className="absolute top-2 left-2 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                    Featured
                  </span>
                )}
                {f.verified && (
                  <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--green)', color: '#fff' }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-sm font-medium mb-1 group-hover:text-[var(--green)] transition-colors" style={{ color: 'var(--ink)' }}>
                  {f.name}
                </div>
                <div className="flex items-center gap-1 text-xs mb-3" style={{ color: 'var(--ink-light)' }}>
                  <MapPin size={11} /> {f.emirate}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {f.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs" style={{ color: 'var(--gold)' }}>★ {f.rating}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--ink-light)' }}>({f.reviews})</span>
                  </div>
                  <span className="font-display text-base tracking-wide" style={{ color: 'var(--green)' }}>
                    {f.price}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
