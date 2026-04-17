import { Metadata } from 'next'
import Link from 'next/link'
import { Package, ShoppingCart, DollarSign, Star, Plus, TrendingUp, AlertCircle } from 'lucide-react'
import { formatAED, ORDER_STATUS_LABELS } from '@/lib/utils'

export const metadata: Metadata = { title: 'Vendor Dashboard — MyCricket.ae' }

const stats = [
  { label: 'Total Sales', value: 'AED 14,850', sub: '+12% this month', icon: <DollarSign size={18} />, color: 'var(--green)' },
  { label: 'Orders', value: '47', sub: '3 pending action', icon: <ShoppingCart size={18} />, color: 'var(--gold)' },
  { label: 'Products', value: '23', sub: '2 out of stock', icon: <Package size={18} />, color: '#185FA5' },
  { label: 'Rating', value: '4.8★', sub: '124 reviews', icon: <Star size={18} />, color: '#854F0B' },
]

const recentOrders = [
  { id: 'MCK-20260416-4821', product: 'Gray Nicolls Legend DXM', customer: 'Rahul M.', amount: 899, status: 'confirmed', date: 'Today 10:23' },
  { id: 'MCK-20260415-3319', product: 'Custom Jersey Set x11', customer: 'Dubai Lions CC', amount: 950, status: 'processing', date: 'Yesterday' },
  { id: 'MCK-20260415-2204', product: 'SG Test Balls x6', customer: 'James T.', amount: 280, status: 'shipped', date: 'Yesterday' },
  { id: 'MCK-20260414-1876', product: 'Kookaburra Junior Kit', customer: 'Priya K.', amount: 750, status: 'delivered', date: '2 days ago' },
  { id: 'MCK-20260414-1654', product: 'SS Ton Batting Pads', customer: 'Ali H.', amount: 320, status: 'delivered', date: '2 days ago' },
]

const lowStockProducts = [
  { name: 'Gray Nicolls Legend DXM — SH', stock: 2 },
  { name: 'Kookaburra Pro 500 Helmet — M', stock: 1 },
]

export default function VendorDashboardPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: 'var(--ink)' }} className="px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2 text-white/40">Vendor Portal</div>
            <h1 className="font-display text-4xl text-white tracking-wide">Cricket Store Dubai</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--green-mid)' }} />
              <span className="text-xs text-white/50">Active · Verified vendor</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/vendor/products/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium no-underline"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              <Plus size={16} /> Add Product
            </Link>
            <Link href="/vendor/orders"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium no-underline"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
              View Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: s.color }}>{s.icon}</span>
                <TrendingUp size={14} style={{ color: 'var(--ink-light)' }} />
              </div>
              <div className="font-display text-3xl tracking-wide mb-0.5" style={{ color: 'var(--ink)' }}>
                {s.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--green)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent orders */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--ink)' }}>Recent Orders</h2>
              <Link href="/vendor/orders" className="text-xs no-underline" style={{ color: 'var(--green)' }}>
                View all →
              </Link>
            </div>
            {recentOrders.map((o, i) => {
              const st = ORDER_STATUS_LABELS[o.status]
              return (
                <div key={o.id} className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-[var(--cream)]"
                  style={{ borderBottom: i < recentOrders.length-1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{o.product}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                      {o.id} · {o.customer}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-base tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(o.amount)}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{o.date}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                    style={{ background: st.color + '18', color: st.color }}>
                    {st.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* Low stock alert */}
            {lowStockProducts.length > 0 && (
              <div className="rounded-xl p-5" style={{ background: '#FAEEDA', border: '1px solid #FAC775' }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} style={{ color: '#854F0B' }} />
                  <span className="text-sm font-medium" style={{ color: '#854F0B' }}>Low Stock Alert</span>
                </div>
                {lowStockProducts.map(p => (
                  <div key={p.name} className="flex justify-between items-center text-xs py-2"
                    style={{ borderTop: '1px solid rgba(200,150,30,0.2)', color: '#633806' }}>
                    <span className="flex-1 truncate">{p.name}</span>
                    <span className="font-medium ml-2">{p.stock} left</span>
                  </div>
                ))}
                <Link href="/vendor/products" className="block mt-3 text-xs no-underline font-medium"
                  style={{ color: '#854F0B' }}>Update stock →</Link>
              </div>
            )}

            {/* Quick actions */}
            <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-xl tracking-wide mb-4" style={{ color: 'var(--ink)' }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: '+ Add New Product', href: '/vendor/products/new', primary: true },
                  { label: 'Manage Products', href: '/vendor/products', primary: false },
                  { label: 'View All Orders', href: '/vendor/orders', primary: false },
                  { label: 'Payout History', href: '/vendor/payouts', primary: false },
                  { label: 'Edit Shop Profile', href: '/vendor/settings', primary: false },
                ].map(a => (
                  <Link key={a.href} href={a.href}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium no-underline transition-all"
                    style={{
                      background: a.primary ? 'var(--green)' : 'var(--cream)',
                      color: a.primary ? '#fff' : 'var(--ink)',
                      border: `1px solid ${a.primary ? 'var(--green)' : 'var(--border)'}`,
                    }}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Payout summary */}
            <div className="rounded-xl p-5" style={{ background: 'var(--green-dark)' }}>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1 text-white/40">
                This month
              </div>
              <div className="font-display text-3xl text-white tracking-wide mb-0.5">AED 8,640</div>
              <div className="text-xs text-white/50 mb-4">Net payout (after 8% commission)</div>
              <div className="text-xs text-white/40 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                Next payout: 1 May 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
