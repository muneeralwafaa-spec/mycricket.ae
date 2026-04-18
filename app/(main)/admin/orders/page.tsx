'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<{ id: string; booking_ref: string; booking_type: string; booking_date: string; total_aed: number; commission_aed: number; status: string; payment_status: string; created_at: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    // Admin can see all bookings via service role
    fetch('/api/admin/bookings').then(r => r.json()).then(d => {
      if (d.data) setBookings(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  const totalRevenue = bookings.filter(b => b.payment_status === 'paid').reduce((s, b) => s + Number(b.commission_aed), 0)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/admin" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Admin</Link>
          <h1 className="font-display text-5xl text-white mb-2">All Bookings</h1>
          <div className="flex gap-4 mt-4">
            <div className="rounded-xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="font-display text-2xl text-white">{bookings.length}</div>
              <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>Total Bookings</div>
            </div>
            <div className="rounded-xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {totalRevenue.toFixed(0)}</div>
              <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>Platform Revenue</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        {loading ? <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading...</div>
        : bookings.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">📅</div>
            <h3 className="font-display text-2xl" style={{ color: 'var(--black)' }}>No bookings yet</h3>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {bookings.map((b, i) => (
              <div key={b.id} className="flex flex-wrap items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < bookings.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                <div className="flex-1 min-w-0">
                  <div className="font-mono-dm text-xs font-bold mb-0.5" style={{ color: 'var(--black)' }}>{b.booking_ref}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{b.booking_type} · {b.booking_date}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {b.total_aed}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>Commission: AED {b.commission_aed}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{ background: b.status === 'confirmed' ? 'var(--green-light)' : b.status === 'cancelled' ? 'var(--red-light)' : '#FDF3DC', color: b.status === 'confirmed' ? 'var(--green)' : b.status === 'cancelled' ? 'var(--red)' : 'var(--gold)' }}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
