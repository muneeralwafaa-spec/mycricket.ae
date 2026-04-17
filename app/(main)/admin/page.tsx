'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { formatAED, ORDER_STATUS_LABELS } from '@/lib/utils'

const statsData = [
  { label: 'Total Revenue', value: 'AED 48,250', change: '+18%', up: true, sub: 'this month' },
  { label: 'Active Listings', value: '247', change: '+12', up: true, sub: 'vs last month' },
  { label: 'Pending Approvals', value: '17', change: '5 urgent', up: false, sub: 'need action' },
  { label: 'New Users', value: '312', change: '+24%', up: true, sub: 'this month' },
  { label: 'Shop Orders', value: '89', change: '+31%', up: true, sub: 'this month' },
  { label: 'Tour Requests', value: '24', change: '8 unmatched', up: null, sub: 'pending match' },
]

const pendingItems = [
  { type: 'Facility', name: 'Dubai Cricket Hub', submitted: '2h ago', status: 'pending' },
  { type: 'Vendor', name: 'Cricket World UAE', submitted: '5h ago', status: 'pending' },
  { type: 'Facility', name: 'Ajman Sports Centre', submitted: '1d ago', status: 'pending' },
  { type: 'Coach', name: 'Rahul Dravid Jr.', submitted: '1d ago', status: 'pending' },
  { type: 'Vendor', name: 'Top Spin Sports', submitted: '2d ago', status: 'pending' },
]

const recentOrders = [
  { id: 'MCK-20260416-4821', customer: 'Rahul M.', amount: 1849, status: 'confirmed', time: '10:23 AM' },
  { id: 'MCK-20260416-4790', customer: 'Dubai Lions CC', amount: 950, status: 'processing', time: '9:11 AM' },
  { id: 'MCK-20260415-4201', customer: 'James T.', amount: 280, status: 'shipped', time: 'Yesterday' },
  { id: 'MCK-20260415-4180', customer: 'Ali H.', amount: 450, status: 'delivered', time: 'Yesterday' },
]

const recentTours = [
  { team: 'Dubai Falcons CC', direction: 'UAE → India', dates: 'Jun 15–25', status: 'pending', size: 15 },
  { team: 'Mumbai Stars CC', direction: 'India → UAE', dates: 'Jul 4–14', status: 'matched', size: 18 },
  { team: 'Sharjah Warriors', direction: 'UAE → Pakistan', dates: 'Aug 1–10', status: 'pending', size: 14 },
  { team: 'Yorkshire CC', direction: 'England → UAE', dates: 'Nov 5–15', status: 'confirmed', size: 16 },
]

const tourStatusColor: Record<string, string> = {
  pending: '#854F0B', matched: '#185FA5', confirmed: '#3B6D11', completed: '#5F5E5A',
}

export default function AdminDashboard() {
  const [greeting] = useState(() => {
    const h = new Date().getHours()
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide" style={{ color: 'var(--ink)' }}>
            {greeting} 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--ink-light)' }}>
            Here's what's happening on MyCricket.ae today
          </p>
        </div>
        <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>
          {new Date().toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsData.map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <div className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
            <div className="font-display text-2xl tracking-wide mb-1" style={{ color: 'var(--ink)' }}>
              {s.value}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {s.up === true && <TrendingUp size={11} style={{ color: '#3B6D11' }} />}
              {s.up === false && <TrendingDown size={11} style={{ color: '#A32D2D' }} />}
              {s.up === null && <AlertCircle size={11} style={{ color: '#854F0B' }} />}
              <span style={{ color: s.up === true ? '#3B6D11' : s.up === false ? '#A32D2D' : '#854F0B' }}>
                {s.change}
              </span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Pending approvals */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <Clock size={15} style={{ color: 'var(--gold)' }} />
              <h2 className="font-display text-lg tracking-wide" style={{ color: 'var(--ink)' }}>
                Pending Approvals
              </h2>
            </div>
            <Link href="/admin/listings" className="text-xs no-underline" style={{ color: 'var(--green)' }}>
              View all →
            </Link>
          </div>
          {pendingItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-[var(--cream)]"
              style={{ borderBottom: i < pendingItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0"
                style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                {item.type[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{item.name}</div>
                <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{item.type} · {item.submitted}</div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                  style={{ background: '#EAF3DE' }}>
                  <CheckCircle size={13} style={{ color: '#3B6D11' }} />
                </button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                  style={{ background: '#FCEBEB' }}>
                  <XCircle size={13} style={{ color: '#A32D2D' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-display text-lg tracking-wide" style={{ color: 'var(--ink)' }}>Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs no-underline" style={{ color: 'var(--green)' }}>
              View all →
            </Link>
          </div>
          {recentOrders.map((o, i) => {
            const st = ORDER_STATUS_LABELS[o.status]
            return (
              <div key={o.id} className="px-5 py-3 transition-colors hover:bg-[var(--cream)]"
                style={{ borderBottom: i < recentOrders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>{o.id}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: st.color + '18', color: st.color }}>
                    {st.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{o.customer}</span>
                  <span className="font-display text-base tracking-wide" style={{ color: 'var(--green)' }}>
                    {formatAED(o.amount)}
                  </span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{o.time}</div>
              </div>
            )
          })}
        </div>

        {/* Tour registrations */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-display text-lg tracking-wide" style={{ color: 'var(--ink)' }}>Tour Requests</h2>
            <Link href="/admin/tours" className="text-xs no-underline" style={{ color: 'var(--green)' }}>
              View all →
            </Link>
          </div>
          {recentTours.map((t, i) => (
            <div key={i} className="px-5 py-3 transition-colors hover:bg-[var(--cream)]"
              style={{ borderBottom: i < recentTours.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{t.team}</span>
                <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{ background: tourStatusColor[t.status] + '18', color: tourStatusColor[t.status] }}>
                  {t.status}
                </span>
              </div>
              <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{t.direction}</div>
              <div className="flex justify-between text-xs mt-1">
                <span style={{ color: 'var(--ink-light)' }}>{t.dates}</span>
                <span style={{ color: 'var(--ink-light)' }}>{t.size} players</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Approve Listings', href: '/admin/listings', color: 'var(--green)', icon: '✓' },
          { label: 'Match Tours', href: '/admin/tours', color: '#185FA5', icon: '✈️' },
          { label: 'Review Vendors', href: '/admin/vendors', color: '#854F0B', icon: '🛍️' },
          { label: 'Manage Notices', href: '/admin/notices', color: '#534AB7', icon: '📋' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className="no-underline flex items-center gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: a.color + '15' }}>
              {a.icon}
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
