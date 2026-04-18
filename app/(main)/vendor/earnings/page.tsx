'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function VendorEarningsPage() {
  const { user } = useAuth()
  const [payouts, setPayouts] = useState<{ id: string; period_start: string; period_end: string; gross_aed: number; commission_aed: number; net_aed: number; booking_count: number; status: string; paid_at?: string }[]>([])
  const [stats, setStats] = useState({ total_earned: 0, pending_payout: 0, total_bookings: 0, this_month: 0 })

  useEffect(() => {
    if (!user) return
    fetch('/api/payouts').then(r => r.json()).then(d => {
      if (d.data) {
        setPayouts(d.data)
        setStats({
          total_earned: d.data.filter((p: { status: string }) => p.status === 'paid').reduce((s: number, p: { net_aed: number }) => s + Number(p.net_aed), 0),
          pending_payout: d.data.filter((p: { status: string }) => p.status === 'pending').reduce((s: number, p: { net_aed: number }) => s + Number(p.net_aed), 0),
          total_bookings: d.data.reduce((s: number, p: { booking_count: number }) => s + p.booking_count, 0),
          this_month: d.data.filter((p: { period_start: string }) => new Date(p.period_start).getMonth() === new Date().getMonth()).reduce((s: number, p: { net_aed: number }) => s + Number(p.net_aed), 0),
        })
      }
    })
  }, [user])

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <h1 className="font-display text-5xl text-white mb-6">Earnings & Payouts</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Total Earned', value: `AED ${stats.total_earned.toFixed(0)}`, color: 'var(--green)' },
              { label: 'Pending Payout', value: `AED ${stats.pending_payout.toFixed(0)}`, color: 'var(--gold)' },
              { label: 'This Month', value: `AED ${stats.this_month.toFixed(0)}`, color: 'var(--red)' },
              { label: 'Total Bookings', value: stats.total_bookings, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
          <div className="font-display text-xl mb-1" style={{ color: 'var(--green-dark)' }}>Weekly Auto-Payouts</div>
          <p className="text-xs" style={{ color: 'var(--green-dark)' }}>
            Your earnings are automatically transferred to your bank account every Monday. Make sure your IBAN is added in Settings.
          </p>
          <Link href="/vendor/settings" className="inline-block mt-3 px-4 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--green)' }}>Update Bank Details →</Link>
        </div>
        <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--black)' }}>Payout History</h2>
        {payouts.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">💰</div>
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--black)' }}>No payouts yet</h3>
            <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Your first payout will appear here after your first completed booking.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {payouts.map((p, i) => (
              <div key={p.id} className="px-5 py-4 flex flex-wrap items-center gap-4"
                style={{ borderBottom: i < payouts.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                    {new Date(p.period_start).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })} – {new Date(p.period_end).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{p.booking_count} bookings · Commission: AED {p.commission_aed}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl" style={{ color: 'var(--green)' }}>AED {p.net_aed}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ background: p.status === 'paid' ? 'var(--green-light)' : '#FDF3DC', color: p.status === 'paid' ? 'var(--green)' : 'var(--gold)' }}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
