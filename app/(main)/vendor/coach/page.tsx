'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

export default function VendorCoachPage() {
  const { user } = useAuth()
  const [services] = useState<{ id: string; name: string; price_aed: number; duration_mins: number; max_players: number; is_active: boolean }[]>([])

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-5xl text-white mb-2">My Services</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Coaching sessions, packages and group programmes</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>+ Add Service</button>
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        {services.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">👤</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Add Your Coaching Services</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
              Create bookable services — 1-on-1 sessions, group coaching, packages, camps. Players can book directly through MyCricket.ae.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 max-w-lg mx-auto">
              {[
                { icon: '🎯', name: '1-on-1 Session', ex: '1hr · AED 250' },
                { icon: '👥', name: 'Group Session', ex: '90min · AED 600' },
                { icon: '📦', name: '10-Session Package', ex: 'AED 2,000' },
              ].map(s => (
                <div key={s.name} className="rounded-xl p-4 text-center" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--black)' }}>{s.name}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.ex}</div>
                </div>
              ))}
            </div>
            <button className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Add Your First Service</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
