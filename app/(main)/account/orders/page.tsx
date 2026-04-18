'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

const DEMO_ORDERS = [
  { id: '1', ref: 'MCK-ORD-20260417-D4E5F6', items: [{ name: 'Gray Nicolls Legend DXM', qty: 1 }, { name: 'Kookaburra Helmet Pro 500', qty: 1 }], total: 1349, status: 'shipped', date: '17 Apr 2026', tracking: 'TRK789012', vendor: 'Cricket Store Dubai' },
  { id: '2', ref: 'MCK-ORD-20260415-A1B2C3', items: [{ name: 'Custom Team Jerseys (11)', qty: 1 }], total: 950, status: 'delivered', date: '15 Apr 2026', tracking: 'TRK456789', vendor: 'UAE Cricket Kits' },
]

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#FDF3DC', color: '#C8961E' },
  confirmed: { bg: '#E6F7ED', color: '#009A44' },
  processing:{ bg: '#E6F7ED', color: '#009A44' },
  shipped:   { bg: '#EBF5FF', color: '#1a6fa8' },
  delivered: { bg: '#F5F5F5', color: '#666' },
}

export default function AccountOrdersPage() {
  const { user } = useAuth()
  const [orders] = useState(DEMO_ORDERS)

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to view your orders</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>My Account</div>
          <h1 className="font-display text-5xl text-white mb-2">My Orders</h1>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { href: '/account/bookings', label: '📅 My Bookings' },
              { href: '/account/orders', label: '📦 My Orders', active: true },
              { href: '/account/profile', label: '👤 Profile' },
            ].map(t => (
              <Link key={t.href} href={t.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ background: (t as { active?: boolean }).active ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        {orders.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">📦</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>No orders yet</h3>
            <p className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Browse our cricket gear marketplace and place your first order.</p>
            <Link href="/shop" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Shop Now →</Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(o => {
              const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending
              const stepIdx = STATUS_STEPS.indexOf(o.status)
              return (
                <div key={o.id} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div className="font-mono-dm text-xs font-bold mb-0.5" style={{ color: 'var(--black)' }}>{o.ref}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{o.date} · {o.vendor}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize" style={{ background: sc.bg, color: sc.color }}>{o.status}</span>
                      <div className="font-display text-xl" style={{ color: 'var(--green)' }}>AED {o.total}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="px-5 py-4" style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between">
                      {STATUS_STEPS.map((s, i) => (
                        <div key={s} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{ background: i <= stepIdx ? 'var(--green)' : 'var(--border)', color: i <= stepIdx ? 'white' : 'var(--ink-light)' }}>
                              {i <= stepIdx ? '✓' : i + 1}
                            </div>
                            <div className="text-xs mt-0.5 capitalize hidden sm:block" style={{ color: i <= stepIdx ? 'var(--green)' : 'var(--ink-light)', fontSize: 9 }}>{s}</div>
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className="flex-1 h-0.5 mx-1" style={{ background: i < stepIdx ? 'var(--green)' : 'var(--border)' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-5 py-4" style={{ background: 'var(--white)' }}>
                    <div className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>Items:</div>
                    {o.items.map((item, i) => (
                      <div key={i} className="text-sm" style={{ color: 'var(--black)' }}>{item.name} × {item.qty}</div>
                    ))}
                    {o.tracking && (
                      <div className="mt-2 text-xs" style={{ color: 'var(--green)' }}>🚚 Tracking: {o.tracking}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
