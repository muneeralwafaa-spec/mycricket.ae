'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { formatAED } from '@/lib/utils'

const mockVendors = [
  { id: 'V1', name: 'Cricket Store Dubai', owner: 'Ahmed Hassan', email: 'ah@csd.ae', emirate: 'Dubai', products: 23, sales: 14850, commission: 8, status: 'active', joined: '3 months ago' },
  { id: 'V2', name: 'Sports World UAE', owner: 'Priya Nair', email: 'pn@sw.ae', emirate: 'Abu Dhabi', products: 18, sales: 9200, commission: 8, status: 'active', joined: '2 months ago' },
  { id: 'V3', name: 'UAE Cricket Kits', owner: 'Zain Malik', email: 'zm@kits.ae', emirate: 'Sharjah', products: 12, sales: 6700, commission: 7, status: 'active', joined: '1 month ago' },
  { id: 'V4', name: 'Cricket World UAE', owner: 'Rajesh Kumar', email: 'rk@cw.ae', emirate: 'Dubai', products: 0, sales: 0, commission: 8, status: 'pending', joined: '2 days ago' },
  { id: 'V5', name: 'Top Spin Sports', owner: 'Khalid Ali', email: 'ka@ts.ae', emirate: 'Ajman', products: 0, sales: 0, commission: 8, status: 'pending', joined: '5 days ago' },
]

const statusStyle: Record<string, { bg: string; color: string }> = {
  active:    { bg: '#EAF3DE', color: '#3B6D11' },
  pending:   { bg: '#FAEEDA', color: '#854F0B' },
  suspended: { bg: '#FCEBEB', color: '#A32D2D' },
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState(mockVendors)
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all')

  const approve = (id: string) => setVendors(v => v.map(x => x.id === id ? { ...x, status: 'active' } : x))
  const suspend = (id: string) => setVendors(v => v.map(x => x.id === id ? { ...x, status: 'suspended' } : x))

  const filtered = vendors.filter(v => filter === 'all' || v.status === filter)
  const totalRevenue = vendors.filter(v => v.status === 'active').reduce((s, v) => s + v.sales, 0)
  const totalCommission = vendors.filter(v => v.status === 'active').reduce((s, v) => s + (v.sales * v.commission / 100), 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-3xl tracking-wide" style={{ color: 'var(--ink)' }}>Vendors</h1>
        <div className="flex gap-4 text-sm">
          <div>
            <span style={{ color: 'var(--ink-light)' }}>Total Sales </span>
            <span className="font-display text-lg" style={{ color: 'var(--green)' }}>{formatAED(totalRevenue)}</span>
          </div>
          <div>
            <span style={{ color: 'var(--ink-light)' }}>Commission </span>
            <span className="font-display text-lg" style={{ color: 'var(--gold)' }}>{formatAED(totalCommission)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'active', 'pending'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all"
            style={{
              background: filter === s ? 'var(--green)' : '#fff',
              color: filter === s ? '#fff' : 'var(--ink)',
              border: `1px solid ${filter === s ? 'var(--green)' : 'var(--border)'}`,
            }}>
            {s} ({vendors.filter(v => s === 'all' || v.status === s).length})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0"
                  style={{ background: 'var(--green)', color: '#fff' }}>
                  {v.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{v.name}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{v.emirate} · {v.joined}</div>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full capitalize"
                style={{ background: statusStyle[v.status].bg, color: statusStyle[v.status].color }}>
                {v.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Products', value: v.products },
                { label: 'Sales', value: formatAED(v.sales) },
                { label: 'Commission', value: `${v.commission}%` },
              ].map(s => (
                <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: 'var(--green-light)' }}>
                  <div className="font-display text-sm tracking-wide" style={{ color: 'var(--ink)' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="text-xs mb-3" style={{ color: 'var(--ink-light)' }}>
              {v.owner} · {v.email}
            </div>

            <div className="flex gap-2">
              {v.status === 'pending' && (
                <button onClick={() => approve(v.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--green)', color: '#fff' }}>
                  <CheckCircle size={12} /> Approve
                </button>
              )}
              {v.status === 'active' && (
                <>
                  <button className="flex-1 py-2 rounded-lg text-xs font-medium"
                    style={{ background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--border)' }}>
                    View Shop
                  </button>
                  <button onClick={() => suspend(v.id)}
                    className="py-2 px-3 rounded-lg text-xs"
                    style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                    Suspend
                  </button>
                </>
              )}
              {v.status === 'pending' && (
                <button onClick={() => suspend(v.id)}
                  className="py-2 px-3 rounded-lg text-xs"
                  style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
