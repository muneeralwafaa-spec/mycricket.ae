'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

const DASH_LINKS = [
  { href: '/vendor/bookings',  icon: '📅', label: 'Bookings',     desc: 'Manage all your bookings' },
  { href: '/vendor/calendar',  icon: '📆', label: 'Calendar',     desc: 'Live booking calendar + walk-ins' },
  { href: '/vendor/facility',  icon: '🏟️', label: 'Facilities',   desc: 'Nets, grounds, slots' },
  { href: '/vendor/students',  icon: '👨‍🎓', label: 'Students',    desc: 'Academy student management' },
  { href: '/vendor/batches',   icon: '👥', label: 'Batches',      desc: 'Training groups & schedules' },
  { href: '/vendor/attendance',icon: '📋', label: 'Attendance',   desc: 'Mark daily attendance' },
  { href: '/vendor/fees',      icon: '💵', label: 'Fees',         desc: 'Fee collection & reminders' },
  { href: '/vendor/packages',  icon: '📦', label: 'Packages',     desc: 'Coach session packages' },
  { href: '/vendor/orders',    icon: '🛍️', label: 'Orders',       desc: 'Shop order fulfilment' },
  { href: '/vendor/products',  icon: '🛒', label: 'Products',     desc: 'Shop products & inventory' },
  { href: '/vendor/earnings',  icon: '💰', label: 'Earnings',     desc: 'Revenue & payouts' },
  { href: '/vendor/settings',  icon: '⚙️', label: 'Settings',     desc: 'Profile, bank details, plan' },
]

export default function VendorDashboardPage() {
  const { user } = useAuth()
  const [vendor, setVendor] = useState<{ business_name: string; vendor_type: string; is_verified: boolean; rating: number; subscription?: { plan_name: string }[] } | null>(null)
  const [bookings, setBookings] = useState<{ id: string; booking_ref: string; booking_date: string; start_time: string; end_time: string; total_aed: number; status: string; customer?: { full_name: string }; facility?: { name: string }; coach_service?: { name: string } }[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ today: 0, confirmed: 0, pending: 0, revenue: 0 })

  useEffect(() => {
    if (!user) return
    Promise.all([
      fetch('/api/vendor/profile').then(r => r.json()),
      fetch('/api/vendor/bookings').then(r => r.json()),
    ]).then(([vData, bData]) => {
      if (vData.data) setVendor(vData.data)
      if (bData.data) {
        const bs = bData.data
        setBookings(bs.slice(0, 6))
        const today = new Date().toISOString().split('T')[0]
        setStats({
          today: bs.filter((b: { booking_date: string }) => b.booking_date === today).length,
          confirmed: bs.filter((b: { status: string }) => b.status === 'confirmed').length,
          pending: bs.filter((b: { status: string }) => b.status === 'pending').length,
          revenue: bs.filter((b: { payment_status?: string }) => b.payment_status === 'paid').reduce((s: number, b: { total_aed: number }) => s + Number(b.total_aed), 0),
        })
      }
    }).catch(console.error).finally(() => setLoading(false))
  }, [user])

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to access your vendor dashboard</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  if (!loading && !vendor) return (
    <div className="container-uae py-20 text-center">
      <div className="text-6xl mb-4">🏏</div>
      <h2 className="font-display text-4xl mb-3" style={{ color: 'var(--black)' }}>Not listed yet?</h2>
      <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
        List your facility, coaching services, academy or shop and start receiving bookings from thousands of UAE cricket players.
      </p>
      <Link href="/vendor/onboarding" className="inline-block px-8 py-3.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
        🚀 List My Business — Free
      </Link>
    </div>
  )

  const plan = vendor?.subscription?.[0]?.plan_name || 'free'

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-10">
        <div className="container-uae">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>Vendor Dashboard</div>
              <h1 className="font-display text-4xl text-white mb-1">{loading ? '...' : vendor?.business_name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>{vendor?.vendor_type}</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                  style={{ background: plan === 'pro' ? 'var(--gold)' : plan === 'starter' ? 'var(--green)' : 'rgba(255,255,255,0.1)', color: plan === 'free' ? 'rgba(255,255,255,0.5)' : 'white' }}>
                  {plan} plan
                </span>
                {vendor?.is_verified && <span className="text-xs px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--green)' }}>✓ Verified</span>}
              </div>
            </div>
            <Link href="/vendor/settings" className="px-4 py-2 rounded-xl text-xs" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>⚙️ Settings</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: "Today's Bookings", value: stats.today, color: 'var(--red)' },
              { label: 'Confirmed', value: stats.confirmed, color: 'var(--green)' },
              { label: 'Pending', value: stats.pending, color: 'var(--gold)' },
              { label: 'Revenue (Paid)', value: `AED ${stats.revenue.toFixed(0)}`, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-3xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        {plan === 'free' && (
          <div className="rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
            style={{ background: 'var(--green-dark)', border: '1px solid var(--green)' }}>
            <div>
              <div className="font-display text-xl text-white mb-0.5">Upgrade to Starter — AED 99/mo</div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Featured placement · Analytics · 50 slots · Only 8% commission</p>
            </div>
            <Link href="/vendor/settings" className="px-5 py-2 rounded-xl text-sm font-medium text-white flex-shrink-0" style={{ background: 'var(--green)' }}>Upgrade →</Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Manage</h2>
            <div className="space-y-2">
              {DASH_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="flex items-center gap-4 p-4 rounded-2xl card-hover"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                  <span className="text-2xl">{l.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{l.label}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{l.desc}</div>
                  </div>
                  <span style={{ color: 'var(--ink-light)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl" style={{ color: 'var(--black)' }}>Recent Bookings</h2>
              <Link href="/vendor/bookings" className="text-xs" style={{ color: 'var(--red)' }}>View all →</Link>
            </div>
            {loading ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--ink-light)' }}>Loading...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <div className="text-5xl mb-3">📅</div>
                <h3 className="font-display text-xl mb-2" style={{ color: 'var(--black)' }}>No bookings yet</h3>
                <p className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Add your facilities or services to start receiving bookings.</p>
                <Link href="/vendor/facility/add" className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Add a Facility →</Link>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {bookings.map((b, i) => {
                  const sc: Record<string, { bg: string; color: string }> = {
                    pending:   { bg: '#FDF3DC', color: 'var(--gold)' },
                    confirmed: { bg: 'var(--green-light)', color: 'var(--green)' },
                    cancelled: { bg: 'var(--red-light)', color: 'var(--red)' },
                    completed: { bg: 'var(--off-white)', color: 'var(--ink-light)' },
                  }
                  const c = sc[b.status] || sc.pending
                  return (
                    <div key={b.id} className="px-5 py-4 flex flex-wrap items-center gap-4"
                      style={{ borderBottom: i < bookings.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-mono-dm text-xs" style={{ color: 'var(--ink-light)' }}>{b.booking_ref}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ background: c.bg, color: c.color }}>{b.status}</span>
                        </div>
                        <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{b.customer?.full_name || 'Customer'}</div>
                        <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                          {b.facility?.name || b.coach_service?.name || 'Booking'} · {b.booking_date} · {b.start_time?.slice(0,5)}–{b.end_time?.slice(0,5)}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {b.total_aed}</div>
                        {b.status === 'pending' && <Link href="/vendor/bookings" className="text-xs" style={{ color: 'var(--red)' }}>Review →</Link>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
