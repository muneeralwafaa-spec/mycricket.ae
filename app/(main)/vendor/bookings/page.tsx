'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

interface Booking {
  id: string; booking_ref: string; booking_type: string; booking_date: string
  start_time: string; end_time: string; total_aed: number; status: string
  num_players: number; notes: string
  customer?: { full_name: string; phone: string; avatar_url: string }
  facility?: { name: string }; coach_service?: { name: string }
}

const STATUS_TABS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

export default function VendorBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    fetch('/api/vendor/bookings').then(r => r.json()).then(d => {
      if (d.data) setBookings(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    const res = await fetch('/api/vendor/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking_id: id, status }),
    })
    if (res.ok) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    }
    setUpdating(null)
  }

  const filtered = tab === 'all' ? bookings : bookings.filter(b => b.status === tab)

  const statusStyle: Record<string, { bg: string; color: string }> = {
    pending:   { bg: '#FDF3DC', color: '#C8961E' },
    confirmed: { bg: '#E6F7ED', color: '#009A44' },
    cancelled: { bg: '#FDEAEB', color: '#EF3340' },
    completed: { bg: '#F5F5F5', color: '#666' },
    no_show:   { bg: '#F5F5F5', color: '#666' },
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <h1 className="font-display text-5xl text-white mb-2">Bookings</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Manage all customer bookings</p>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2 overflow-x-auto">
          {STATUS_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize flex-shrink-0 transition-all"
              style={{ background: tab === t ? 'var(--red)' : 'var(--cream)', color: tab === t ? 'white' : 'var(--black)', border: `1px solid ${tab === t ? 'var(--red)' : 'var(--border)'}` }}>
              {t} {t !== 'all' && `(${bookings.filter(b => b.status === t).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">📅</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No {tab} bookings</h3>
            <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Bookings will appear here once customers start booking.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => {
              const sc = statusStyle[b.status] || statusStyle.pending
              return (
                <div key={b.id} className="rounded-2xl p-5 md:p-6" style={{ background: 'var(--white)', border: b.status === 'pending' ? '2px solid var(--gold)' : '1px solid var(--border)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono-dm text-xs font-bold" style={{ color: 'var(--black)' }}>{b.booking_ref}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium capitalize" style={{ background: sc.bg, color: sc.color }}>{b.status}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>{b.booking_type}</span>
                      </div>
                      <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>
                        {b.customer?.full_name || 'Customer'} · {b.num_players} player{b.num_players > 1 ? 's' : ''}
                      </h3>
                      {b.customer?.phone && <div className="text-xs mt-0.5" style={{ color: 'var(--green)' }}>📱 {b.customer.phone}</div>}
                    </div>
                    <div className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {b.total_aed}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Service', value: b.facility?.name || b.coach_service?.name || 'Booking' },
                      { label: 'Date', value: new Date(b.booking_date).toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short' }) },
                      { label: 'Time', value: `${b.start_time?.slice(0,5)} – ${b.end_time?.slice(0,5)}` },
                      { label: 'Players', value: `${b.num_players} player${b.num_players > 1 ? 's' : ''}` },
                    ].map(d => (
                      <div key={d.label} className="rounded-xl p-3" style={{ background: 'var(--off-white)' }}>
                        <div className="text-xs font-mono-dm uppercase mb-0.5" style={{ color: 'var(--ink-light)' }}>{d.label}</div>
                        <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{d.value}</div>
                      </div>
                    ))}
                  </div>

                  {b.notes && <p className="text-xs mb-4 p-3 rounded-xl" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>Note: {b.notes}</p>}

                  {b.status === 'pending' && (
                    <div className="flex gap-3">
                      <button onClick={() => updateStatus(b.id, 'confirmed')} disabled={updating === b.id}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--green)' }}>
                        {updating === b.id ? 'Updating...' : '✓ Confirm Booking'}
                      </button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')} disabled={updating === b.id}
                        className="px-5 py-2.5 rounded-xl text-sm" style={{ border: '1px solid var(--red)', color: 'var(--red)' }}>
                        ✕ Decline
                      </button>
                      {b.customer?.phone && (
                        <a href={`https://wa.me/${b.customer.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: '#25D366' }}>
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  )}
                  {b.status === 'confirmed' && b.customer?.phone && (
                    <a href={`https://wa.me/${b.customer.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      className="inline-block px-5 py-2 rounded-xl text-sm font-medium text-white" style={{ background: '#25D366' }}>
                      💬 WhatsApp Customer
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
