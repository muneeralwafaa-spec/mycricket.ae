'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

export default function AdminVendorsPage() {
  const { user } = useAuth()
  const [vendors, setVendors] = useState<{ id: string; business_name: string; vendor_type: string; emirate: string; is_verified: boolean; is_active: boolean; created_at: string; total_bookings: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetch('/api/admin/vendors').then(r => r.json()).then(d => {
      if (d.data) setVendors(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  const verify = async (id: string, verified: boolean) => {
    await fetch(`/api/admin/vendors`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_verified: verified }) })
    setVendors(prev => prev.map(v => v.id === id ? { ...v, is_verified: verified } : v))
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/admin" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Admin</Link>
          <h1 className="font-display text-5xl text-white mb-2">Vendors</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Approve and manage platform vendors</p>
        </div>
      </div>
      <div className="container-uae py-8">
        {loading ? <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading...</div>
        : vendors.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-5xl mb-3">🏪</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No vendors yet</h3>
            <p className="text-sm" style={{ color: 'var(--ink-light)' }}>Vendors will appear here once they register.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {vendors.map((v, i) => (
              <div key={v.id} className="flex flex-wrap items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < vendors.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{v.business_name}</div>
                    {v.is_verified && <span className="text-xs text-white px-1.5 py-0.5 rounded" style={{ background: 'var(--green)', fontSize: 10 }}>✓</span>}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                    {v.vendor_type} · {v.emirate} · {v.total_bookings} bookings
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: v.is_active ? 'var(--green-light)' : 'var(--red-light)', color: v.is_active ? 'var(--green)' : 'var(--red)' }}>
                  {v.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  {!v.is_verified ? (
                    <button onClick={() => verify(v.id, true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
                      ✓ Verify
                    </button>
                  ) : (
                    <button onClick={() => verify(v.id, false)}
                      className="px-3 py-1.5 rounded-lg text-xs" style={{ border: '1px solid var(--border)', color: 'var(--ink-light)' }}>
                      Unverify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
