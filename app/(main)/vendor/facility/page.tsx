'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function VendorFacilityPage() {
  const { user } = useAuth()
  const [facilities, setFacilities] = useState<{ id: string; name: string; type: string; emirate: string; is_active: boolean; rating: number; slots?: { id: string; name: string; price_aed: number }[] }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetch('/api/facilities').then(r => r.json()).then(d => {
      if (d.data) setFacilities(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-5xl text-white mb-2">My Facilities</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Manage nets, grounds, slots and availability</p>
            </div>
            <Link href="/vendor/facility/add" className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>+ Add Facility</Link>
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        {loading ? <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading...</div>
        : facilities.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>No facilities yet</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
              Add your cricket nets, grounds or indoor centres. Set your prices and availability and start accepting bookings.
            </p>
            <Link href="/vendor/facility/add" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Add Your First Facility</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {facilities.map(f => (
              <div key={f.id} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{f.name}</h3>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{f.type} · {f.emirate}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: f.is_active ? 'var(--green-light)' : 'var(--red-light)', color: f.is_active ? 'var(--green)' : 'var(--red)' }}>
                    {f.is_active ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-mono-dm uppercase mb-2" style={{ color: 'var(--ink-light)' }}>Slots</div>
                  {f.slots && f.slots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {f.slots.map(s => (
                        <span key={s.id} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                          {s.name} — AED {s.price_aed}/hr
                        </span>
                      ))}
                    </div>
                  ) : <p className="text-xs" style={{ color: 'var(--ink-light)' }}>No slots added yet</p>}
                </div>
                <div className="flex gap-2">
                  <Link href={`/vendor/facility/${f.id}`} className="flex-1 py-2 rounded-xl text-xs font-medium text-white text-center" style={{ background: 'var(--red)' }}>Manage Slots</Link>
                  <Link href={`/vendor/bookings?facility=${f.id}`} className="flex-1 py-2 rounded-xl text-xs text-center" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>View Bookings</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
