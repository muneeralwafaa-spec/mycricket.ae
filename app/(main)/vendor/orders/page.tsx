'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Package, Truck, CheckCircle, MessageCircle } from 'lucide-react'

const DEMO_ORDERS = [
  { id: '1', ref: 'MCK-ORD-20260418-A1B2C3', customer: 'Ahmed Al Mansoori', phone: '+971501234567', whatsapp: '+971501234567', emirate: 'Dubai', items: [{ name: 'Gray Nicolls Legend DXM', qty: 1, price: 899 }], total: 899, delivery: 0, status: 'pending', created: '2026-04-18 09:30', address: 'Villa 12, Al Barsha 1, Dubai' },
  { id: '2', ref: 'MCK-ORD-20260418-D4E5F6', customer: 'Rohan Sharma', phone: '+971502345678', whatsapp: '+971502345678', emirate: 'Sharjah', items: [{ name: 'Custom Team Jerseys (11)', qty: 1, price: 950 }, { name: 'Kookaburra Kit Bag', qty: 2, price: 180 }], total: 1310, delivery: 0, status: 'confirmed', created: '2026-04-17 14:20', address: 'Apt 405, Al Nahda, Sharjah' },
  { id: '3', ref: 'MCK-ORD-20260417-G7H8I9', customer: 'Mohammad Waseem', phone: '+971503456789', whatsapp: '+971503456789', emirate: 'Abu Dhabi', items: [{ name: 'BOLA Bowling Machine', qty: 1, price: 4500 }], total: 4500, delivery: 0, status: 'processing', created: '2026-04-17 11:05', tracking: 'TRK123456', address: 'Villa 8, Khalidiyah, Abu Dhabi' },
  { id: '4', ref: 'MCK-ORD-20260416-J1K2L3', customer: 'Priya Nair', phone: '+971504567890', whatsapp: '+971504567890', emirate: 'Dubai', items: [{ name: 'SG Test Balls × 6', qty: 2, price: 280 }], total: 560, delivery: 25, status: 'shipped', created: '2026-04-16 16:40', tracking: 'TRK789012', address: 'Apt 201, JLT, Dubai' },
  { id: '5', ref: 'MCK-ORD-20260415-M4N5O6', customer: 'Hamza Ali', phone: '+971505678901', whatsapp: '+971505678901', emirate: 'Ajman', items: [{ name: 'Adidas Batting Gloves', qty: 1, price: 195 }], total: 195, delivery: 25, status: 'delivered', created: '2026-04-15 10:15', address: 'Villa 5, Rashidiya, Ajman' },
]

const STATUS_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
const STATUS_COLORS: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  pending:    { bg: '#FDF3DC', color: '#C8961E', icon: <Package size={12} /> },
  confirmed:  { bg: '#E6F7ED', color: '#009A44', icon: <CheckCircle size={12} /> },
  processing: { bg: '#E6F7ED', color: '#009A44', icon: <Package size={12} /> },
  shipped:    { bg: '#EBF5FF', color: '#1a6fa8', icon: <Truck size={12} /> },
  delivered:  { bg: '#F5F5F5', color: '#666', icon: <CheckCircle size={12} /> },
  cancelled:  { bg: '#FDEAEB', color: '#EF3340', icon: <Package size={12} /> },
}

export default function VendorOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(DEMO_ORDERS)
  const [tab, setTab] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [trackingInput, setTrackingInput] = useState<Record<string, string>>({})

  const filtered = tab === 'all' ? orders : orders.filter(o => o.status === tab)

  const advanceStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o
      const idx = STATUS_FLOW.indexOf(o.status)
      if (idx < STATUS_FLOW.length - 1) return { ...o, status: STATUS_FLOW[idx + 1] }
      return o
    }))
  }

  const totalRevenue = orders.filter(o => ['confirmed','processing','shipped','delivered'].includes(o.status)).reduce((s, o) => s + o.total, 0)
  const pendingCount = orders.filter(o => o.status === 'pending').length

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <h1 className="font-display text-5xl text-white mb-2">My Orders</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Total Orders', value: orders.length, color: 'var(--red)' },
              { label: 'Pending Action', value: pendingCount, color: 'var(--gold)' },
              { label: 'Revenue', value: `AED ${totalRevenue.toLocaleString()}`, color: 'var(--green)' },
              { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2 overflow-x-auto">
          {['all', ...STATUS_FLOW].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize flex-shrink-0 transition-all"
              style={{ background: tab === t ? 'var(--red)' : 'var(--cream)', color: tab === t ? 'white' : 'var(--black)', border: `1px solid ${tab === t ? 'var(--red)' : 'var(--border)'}` }}>
              {t} ({t === 'all' ? orders.length : orders.filter(o => o.status === t).length})
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8 space-y-4">
        {filtered.map(o => {
          const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending
          const isExpanded = expandedOrder === o.id
          const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(o.status) + 1]

          return (
            <div key={o.id} className="rounded-2xl overflow-hidden" style={{ border: o.status === 'pending' ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
              {/* Order header */}
              <div className="px-5 py-4 cursor-pointer" style={{ background: 'var(--white)' }}
                onClick={() => setExpandedOrder(isExpanded ? null : o.id)}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono-dm text-xs font-bold" style={{ color: 'var(--black)' }}>{o.ref}</span>
                      <span className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize"
                        style={{ background: sc.bg, color: sc.color }}>
                        {sc.icon} {o.status}
                      </span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{o.customer}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                      📍 {o.emirate} · {o.items.length} item{o.items.length > 1 ? 's' : ''} · {o.created}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-xl" style={{ color: 'var(--green)' }}>AED {o.total}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                      {o.delivery === 0 ? 'Free delivery' : `+AED ${o.delivery} delivery`}
                    </div>
                  </div>
                  <span style={{ color: 'var(--ink-light)', fontSize: 18 }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5" style={{ background: 'var(--off-white)', borderTop: '1px solid var(--border)' }}>
                  {/* Items */}
                  <div className="py-3 mb-3">
                    <div className="text-xs font-mono-dm uppercase mb-2" style={{ color: 'var(--ink-light)' }}>Order Items</div>
                    {o.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm py-1.5">
                        <span style={{ color: 'var(--black)' }}>{item.name} × {item.qty}</span>
                        <span style={{ color: 'var(--ink)' }}>AED {item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery address */}
                  <div className="rounded-xl p-3 mb-3" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                    <div className="text-xs font-mono-dm uppercase mb-1" style={{ color: 'var(--ink-light)' }}>Delivery Address</div>
                    <div className="text-sm" style={{ color: 'var(--black)' }}>{o.address}</div>
                  </div>

                  {/* Tracking number for shipped */}
                  {(o.status === 'processing' || o.status === 'shipped') && (
                    <div className="flex gap-2 mb-3">
                      <input
                        value={trackingInput[o.id] || (o as { tracking?: string }).tracking || ''}
                        onChange={e => setTrackingInput(prev => ({ ...prev, [o.id]: e.target.value }))}
                        placeholder="Enter tracking number"
                        className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
                        style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                      <button className="px-4 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
                        Save
                      </button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {nextStatus && o.status !== 'delivered' && (
                      <button onClick={() => advanceStatus(o.id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                        style={{ background: o.status === 'pending' ? 'var(--green)' : o.status === 'confirmed' ? 'var(--green)' : o.status === 'processing' ? 'var(--green)' : 'var(--green)' }}>
                        {o.status === 'pending' ? '✓ Confirm Order' : o.status === 'confirmed' ? '📦 Mark Processing' : o.status === 'processing' ? '🚚 Mark Shipped' : '✓ Mark Delivered'}
                      </button>
                    )}
                    <a href={`https://wa.me/${o.whatsapp.replace(/\D/g,'')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                      style={{ background: '#25D366' }}>
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a href={`tel:${o.phone}`}
                      className="px-4 py-2.5 rounded-xl text-sm"
                      style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                      📞 Call
                    </a>
                    {o.status === 'pending' && (
                      <button className="px-4 py-2.5 rounded-xl text-sm" style={{ border: '1px solid var(--red)', color: 'var(--red)' }}>
                        ✕ Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
