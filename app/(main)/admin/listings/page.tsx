'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { CheckCircle, XCircle, Eye, Search, SlidersHorizontal } from 'lucide-react'

const mockListings = [
  { id: '1', type: 'Facility', name: 'Dubai Cricket Hub', owner: 'Mohammed Al-Rashid', email: 'mo@dxbcricket.ae', emirate: 'Dubai', submitted: '2h ago', status: 'pending', desc: 'Indoor cricket nets and training facility in Al Quoz.' },
  { id: '2', type: 'Coach', name: 'Pradeep Kumar', owner: 'Pradeep Kumar', email: 'pk@gmail.com', emirate: 'Dubai', submitted: '5h ago', status: 'pending', desc: 'ICC Level 2 certified coach, 10 years experience.' },
  { id: '3', type: 'Facility', name: 'Ajman Sports Centre', owner: 'Sports World LLC', email: 'info@ajmansports.ae', emirate: 'Ajman', submitted: '1d ago', status: 'pending', desc: 'Full cricket ground with floodlights and practice nets.' },
  { id: '4', type: 'Shop', name: 'Top Spin Sports', owner: 'Khalid Hassan', email: 'topspin@gmail.com', emirate: 'Sharjah', submitted: '1d ago', status: 'pending', desc: 'Cricket gear and equipment store with all major brands.' },
  { id: '5', type: 'Coach', name: 'James Williams', owner: 'James Williams', email: 'jw@cricket.com', emirate: 'Abu Dhabi', submitted: '2d ago', status: 'pending', desc: 'ECB Level 3 batting coach, specialising in junior development.' },
  { id: '6', type: 'Facility', name: 'Sharjah Cricket Nets', owner: 'SCA', email: 'sca@sharjahcricket.ae', emirate: 'Sharjah', submitted: '3d ago', status: 'approved', desc: 'Official SCA practice facility.' },
  { id: '7', type: 'Shop', name: 'Cricket Zone', owner: 'Arjun Mehta', email: 'arjun@zone.ae', emirate: 'Dubai', submitted: '4d ago', status: 'rejected', desc: 'Online cricket gear shop.' },
]

type Status = 'all' | 'pending' | 'approved' | 'rejected'

const statusStyle: Record<string, { bg: string; color: string }> = {
  pending:  { bg: '#FAEEDA', color: '#854F0B' },
  approved: { bg: '#EAF3DE', color: '#3B6D11' },
  rejected: { bg: '#FCEBEB', color: '#A32D2D' },
}

const typeIcon: Record<string, string> = {
  Facility: '🏟️', Coach: '👤', Shop: '🛍️', Umpire: '⚖️',
}

export default function AdminListingsPage() {
  const [filter, setFilter] = useState<Status>('pending')
  const [search, setSearch] = useState('')
  const [listings, setListings] = useState(mockListings)
  const [selected, setSelected] = useState<string | null>(null)

  const approve = (id: string) => setListings(l => l.map(x => x.id === id ? { ...x, status: 'approved' } : x))
  const reject = (id: string) => setListings(l => l.map(x => x.id === id ? { ...x, status: 'rejected' } : x))

  const filtered = listings.filter(l =>
    (filter === 'all' || l.status === filter) &&
    (search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.owner.toLowerCase().includes(search.toLowerCase()))
  )

  const counts = {
    all: listings.length,
    pending: listings.filter(l => l.status === 'pending').length,
    approved: listings.filter(l => l.status === 'approved').length,
    rejected: listings.filter(l => l.status === 'rejected').length,
  }

  const selectedItem = listings.find(l => l.id === selected)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide" style={{ color: 'var(--ink)' }}>Listings</h1>
        <span className="text-sm" style={{ color: 'var(--ink-light)' }}>
          {counts.pending} pending approval
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as Status[]).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all"
            style={{
              background: filter === s ? 'var(--green)' : '#fff',
              color: filter === s ? '#fff' : 'var(--ink)',
              border: `1px solid ${filter === s ? 'var(--green)' : 'var(--border)'}`,
            }}>
            {s} <span className="ml-1 opacity-60">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg max-w-sm"
        style={{ border: '1px solid var(--border)', background: '#fff' }}>
        <Search size={14} style={{ color: 'var(--ink-light)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search listings..." className="bg-transparent text-sm outline-none flex-1"
          style={{ color: 'var(--ink)' }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Listings table */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid var(--border)' }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm" style={{ color: 'var(--ink-light)' }}>
              No listings found
            </div>
          ) : (
            filtered.map((l, i) => (
              <div key={l.id}
                onClick={() => setSelected(l.id === selected ? null : l.id)}
                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors"
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                  background: selected === l.id ? 'var(--green-light)' : 'transparent',
                }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'var(--green-light)' }}>
                  {typeIcon[l.type] ?? '📋'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{l.name}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-mono-dm"
                      style={{ background: 'var(--green-light)', color: 'var(--green)', fontSize: 10 }}>
                      {l.type}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                    {l.owner} · {l.emirate} · {l.submitted}
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                  style={{ background: statusStyle[l.status].bg, color: statusStyle[l.status].color }}>
                  {l.status}
                </span>
                {l.status === 'pending' && (
                  <div className="flex gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => approve(l.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                      style={{ background: '#EAF3DE' }}>
                      <CheckCircle size={14} style={{ color: '#3B6D11' }} />
                    </button>
                    <button onClick={() => reject(l.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                      style={{ background: '#FCEBEB' }}>
                      <XCircle size={14} style={{ color: '#A32D2D' }} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          {selectedItem ? (
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">{typeIcon[selectedItem.type]}</div>
                <div>
                  <div className="font-display text-xl tracking-wide" style={{ color: 'var(--ink)' }}>
                    {selectedItem.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                    {selectedItem.type} · {selectedItem.emirate}
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  ['Owner', selectedItem.owner],
                  ['Email', selectedItem.email],
                  ['Submitted', selectedItem.submitted],
                  ['Status', selectedItem.status],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--ink-light)' }}>{k}</span>
                    <span style={{ color: 'var(--ink)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-light)' }}>
                {selectedItem.desc}
              </p>
              {selectedItem.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => approve(selectedItem.id)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                    style={{ background: 'var(--green)', color: '#fff' }}>
                    ✓ Approve
                  </button>
                  <button onClick={() => reject(selectedItem.id)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                    style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                    ✗ Reject
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Eye size={28} className="mb-3" style={{ color: 'var(--ink-light)', opacity: 0.4 }} />
              <p className="text-sm" style={{ color: 'var(--ink-light)' }}>
                Click a listing to review details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
