'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ vendors: 0, bookings: 0, products: 0, users: 0, revenue: 0, pending_payouts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetch('/api/admin/stats').then(r => r.json()).then(d => {
      if (d.data) setStats(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  const ADMIN_SECTIONS = [
    { href: '/admin/vendors', icon: '🏪', label: 'Vendors', desc: 'Approve, verify and manage vendors', stat: stats.vendors },
    { href: '/admin/bookings', icon: '📅', label: 'Bookings', desc: 'All bookings across platform', stat: stats.bookings },
    { href: '/admin/orders', icon: '📦', label: 'Orders', desc: 'Shop orders and fulfilment', stat: 0 },
    { href: '/admin/listings', icon: '📋', label: 'Listings', desc: 'Academies, coaches, classifieds', stat: 0 },
    { href: '/admin/users', icon: '👥', label: 'Users', desc: 'All registered users', stat: stats.users },
    { href: '/admin/payouts', icon: '💰', label: 'Payouts', desc: 'Weekly payout management', stat: 0 },
    { href: '/admin/notices', icon: '📢', label: 'Notices', desc: 'Noticeboard moderation', stat: 0 },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings', desc: 'Platform configuration', stat: 0 },
  ]

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Admin access required</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-10">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>Admin</div>
          <h1 className="font-display text-5xl text-white mb-6">MyCricket.ae Admin</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total Vendors', value: stats.vendors, color: 'var(--red)' },
              { label: 'Total Bookings', value: stats.bookings, color: 'var(--green)' },
              { label: 'Total Users', value: stats.users, color: 'var(--gold)' },
              { label: 'Products Live', value: stats.products, color: 'var(--red)' },
              { label: 'Platform Revenue', value: `AED ${stats.revenue}`, color: 'var(--green)' },
              { label: 'Pending Payouts', value: `AED ${stats.pending_payouts}`, color: 'var(--gold)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>
                  {loading ? '...' : s.value}
                </div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADMIN_SECTIONS.map(s => (
            <Link key={s.href} href={s.href}
              className="rounded-2xl p-5 card-hover block"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-display text-xl mb-1" style={{ color: 'var(--black)' }}>{s.label}</div>
              <p className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>{s.desc}</p>
              {s.stat > 0 && (
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                  {s.stat} total
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-8 rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Approve Pending Vendors', href: '/admin/vendors', color: 'var(--red)' },
              { label: 'Process Payouts', href: '/admin/payouts', color: 'var(--green)' },
              { label: 'Review Flagged Ads', href: '/admin/classifieds', color: 'var(--gold)' },
              { label: 'Moderate Notices', href: '/admin/notices', color: 'var(--red)' },
            ].map(a => (
              <Link key={a.label} href={a.href}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: a.color }}>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
