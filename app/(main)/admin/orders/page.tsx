'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Search, Package } from 'lucide-react'
import { formatAED, ORDER_STATUS_LABELS } from '@/lib/utils'

const mockOrders = [
  { id: 'MCK-20260416-4821', customer: 'Rahul M.', email: 'rahul@gmail.com', amount: 1849, status: 'confirmed', items: 2, date: 'Today 10:23', vendor: 'Cricket Store Dubai' },
  { id: 'MCK-20260416-4790', customer: 'Dubai Lions CC', email: 'admin@dubailions.ae', amount: 950, status: 'processing', items: 1, date: 'Today 9:11', vendor: 'UAE Cricket Kits' },
  { id: 'MCK-20260415-4201', customer: 'James T.', email: 'james@t.com', amount: 280, status: 'shipped', items: 1, date: 'Yesterday', vendor: 'Cricket Store Dubai' },
  { id: 'MCK-20260415-4180', customer: 'Ali H.', email: 'ali@h.ae', amount: 450, status: 'delivered', items: 2, date: 'Yesterday', vendor: 'Sports World UAE' },
  { id: 'MCK-20260414-3990', customer: 'Priya K.', email: 'priya@k.com', amount: 750, status: 'delivered', items: 3, date: '2 days ago', vendor: 'Cricket Store Dubai' },
  { id: 'MCK-20260413-3771', customer: 'Zain M.', email: 'zain@m.ae', amount: 320, status: 'cancelled', items: 1, date: '3 days ago', vendor: 'UAE Cricket Kits' },
]

type OrderStatus = 'all' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = mockOrders.filter(o =>
    (filter === 'all' || o.status === filter) &&
    (search === '' || o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase()))
  )

  const totalRevenue = mockOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide" style={{ color: 'var(--ink)' }}>Orders</h1>
        <div className="text-sm font-display text-xl tracking-wide" style={{ color: 'var(--green)' }}>
          {formatAED(totalRevenue)} total revenue
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map(s => {
          const count = s === 'all' ? mockOrders.length : mockOrders.filter(o => o.status === s).length
          return (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
              style={{
                background: filter === s ? 'var(--green)' : '#fff',
                color: filter === s ? '#fff' : 'var(--ink)',
                border: `1px solid ${filter === s ? 'var(--green)' : 'var(--border)'}`,
              }}>
              {s} ({count})
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg max-w-sm"
        style={{ border: '1px solid var(--border)', background: '#fff' }}>
        <Search size={14} style={{ color: 'var(--ink-light)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search order ID or customer..." className="bg-transparent text-sm outline-none flex-1"
          style={{ color: 'var(--ink)' }} />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
              {['Order ID', 'Customer', 'Vendor', 'Items', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-mono-dm uppercase tracking-wider"
                  style={{ color: 'var(--ink-light)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => {
              const st = ORDER_STATUS_LABELS[o.status]
              return (
                <tr key={o.id} className="transition-colors hover:bg-[var(--cream)]"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono-dm" style={{ color: 'var(--ink)' }}>{o.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm" style={{ color: 'var(--ink)' }}>{o.customer}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{o.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--ink-light)' }}>{o.vendor}</td>
                  <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--ink)' }}>{o.items}</td>
                  <td className="px-4 py-3">
                    <span className="font-display text-base tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(o.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: st.color + '18', color: st.color }}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--ink-light)' }}>{o.date}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--green-light)]"
                      style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm" style={{ color: 'var(--ink-light)' }}>
            No orders found
          </div>
        )}
      </div>
    </div>
  )
}
