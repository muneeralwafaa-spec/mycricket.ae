'use client'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

export default function VendorAcademyPage() {
  const { user } = useAuth()
  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-5xl text-white mb-2">My Programmes</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Academy programmes and student enrolments</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>+ Add Programme</button>
          </div>
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Add Your Academy Programmes</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
            Create monthly or term-based programmes. Students can enrol online and pay through MyCricket.ae.
          </p>
          <button className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Add First Programme</button>
        </div>
      </div>
    </div>
  )
}
