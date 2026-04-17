'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Package, ChevronRight } from 'lucide-react'
import { formatAED, ORDER_STATUS_LABELS } from '@/lib/utils'
import { useAuth } from '@/components/auth/AuthProvider'

const mockOrders = [
  { id: 'MCK-20260416-4821', date: 'Today, 10:23 AM', items: 2, total: 1849, status: 'confirmed' },
  { id: 'MCK-20260410-3112', date: '10 Apr 2026', items: 1, total: 280, status: 'delivered' },
  { id: 'MCK-20260401-2891', date: '1 Apr 2026', items: 3, total: 1420, status: 'delivered' },
]

export default function OrdersPage() {
  const { profile } = useAuth()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--ink)' }} className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2 text-white/40">My Account</div>
          <h1 className="font-display text-4xl text-white tracking-wide">My Orders</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Account nav */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {[
            { href: '/account/orders', label: 'Orders', active: true },
            { href: '/account/profile', label: 'Profile', active: false },
            { href: '/account/wishlist', label: 'Wishlist', active: false },
          ].map(t => (
            <Link key={t.href} href={t.href}
              className="no-underline px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: t.active ? 'var(--green)' : '#fff',
                color: t.active ? '#fff' : 'var(--ink)',
                border: `1px solid ${t.active ? 'var(--green)' : 'var(--border)'}`,
              }}>
              {t.label}
            </Link>
          ))}
        </div>

        {mockOrders.length === 0 ? (
          <div className="text-center py-20 rounded-2xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <Package size={40} className="mx-auto mb-4" style={{ color: 'var(--ink-light)' }} />
            <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--ink)' }}>No orders yet</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Your order history will appear here.</p>
            <Link href="/shop" className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium no-underline"
              style={{ background: 'var(--green)', color: '#fff' }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map(order => {
              const st = ORDER_STATUS_LABELS[order.status]
              return (
                <Link key={order.id} href={`/account/orders/${order.id}`}
                  className="no-underline flex items-center gap-4 p-5 rounded-xl transition-all hover:-translate-y-0.5 group"
                  style={{ background: '#fff', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--green-light)' }}>
                    <Package size={18} style={{ color: 'var(--green)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{order.id}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                      {order.date} · {order.items} item{order.items > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 mr-2">
                    <div className="font-display text-lg tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(order.total)}
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: st.color + '18', color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--ink-light)' }} className="group-hover:text-[var(--green)] transition-colors" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
