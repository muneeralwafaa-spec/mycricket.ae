'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function AccountBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<{ id: string; booking_ref: string; booking_type: string; booking_date: string; start_time: string; end_time: string; total_aed: number; status: string; payment_status: string; vendor?: { business_name: string; phone: string; whatsapp: string }; facility?: { name: string } }[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('upcoming')

  useEffect(() => {
    if (!user) return
    fetch('/api/bookings').then(r => r.json()).then(d => { if (d.data) setBookings(d.data) }).finally(() => setLoading(false))
  }, [user])

  const today = new Date().toISOString().split('T')[0]
  const upcoming = bookings.filter(b => b.booking_date >= today && b.status !== 'cancelled')
  const past = bookings.filter(b => b.booking_date < today || b.status === 'completed')
  const cancelled = bookings.filter(b => b.status === 'cancelled')
  const display = tab === 'upcoming' ? upcoming : tab === 'past' ? past : cancelled

  const statusColors: Record<string, { bg: string; color: string }> = {
    pending:   { bg: '#FDF3DC', color: '#C8961E' },
    confirmed: { bg: '#E6F7ED', color: '#009A44' },
    completed: { bg: '#F5F5F5', color: '#666' },
    cancelled: { bg: '#FDEAEB', color: '#EF3340' },
  }

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to view your bookings</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <h1 className="font-display text-5xl text-white mb-2">My Bookings</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Your cricket net, coaching and academy bookings</p>
        </div>
      </div>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2">
          {[
            { id: 'upcoming', label: `Upcoming (${upcoming.length})` },
            { id: 'past', label: `Past (${past.length})` },
            { id: 'cancelled', label: `Cancelled (${cancelled.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: tab === t.id ? 'var(--red)' : 'var(--cream)', color: tab === t.id ? 'white' : 'var(--black)', border: `1px solid ${tab === t.id ? 'var(--red)' : 'var(--border)'}` }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="container-uae py-8">
        {loading ? <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading...</div>
        : display.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">📅</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>No {tab} bookings</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Book cricket nets, coaching sessions and more across the UAE.</p>
            <Link href="/book/nets" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Book Cricket Nets →</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {display.map(b => {
              const sc = statusColors[b.status] || statusColors.pending
              return (
                <div key={b.id} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono-dm text-xs font-bold" style={{ color: 'var(--black)' }}>{b.booking_ref}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium capitalize" style={{ background: sc.bg, color: sc.color }}>{b.status}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>{b.booking_type}</span>
                      </div>
                      <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{b.vendor?.business_name}</h3>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{b.facility?.name}</div>
                    </div>
                    <div className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {b.total_aed}</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Date', value: new Date(b.booking_date).toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) },
                      { label: 'Time', value: `${b.start_time?.slice(0,5)} – ${b.end_time?.slice(0,5)}` },
                      { label: 'Payment', value: b.payment_status },
                    ].map(d => (
                      <div key={d.label} className="rounded-xl p-3" style={{ background: 'var(--off-white)' }}>
                        <div className="text-xs font-mono-dm uppercase mb-0.5" style={{ color: 'var(--ink-light)' }}>{d.label}</div>
                        <div className="text-sm font-medium capitalize" style={{ color: 'var(--black)' }}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                  {b.vendor?.whatsapp && b.status === 'confirmed' && (
                    <a href={`https://wa.me/${b.vendor.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-xl text-xs font-medium text-white" style={{ background: '#25D366' }}>
                      💬 WhatsApp Facility
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/book/nets', icon: '🏟️', label: 'Book Nets' },
            { href: '/book/coach', icon: '👤', label: 'Book Coach' },
            { href: '/book/academy', icon: '🎓', label: 'Enrol Academy' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="rounded-2xl p-4 text-center card-hover" style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="text-2xl mb-1">{l.icon}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{l.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
