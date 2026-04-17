'use client'
import { useAuth } from '@/components/auth/AuthProvider'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default function VendorOrdersPage() {
  const { user } = useAuth()
  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to view orders</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <h1 className="font-display text-4xl text-white">Vendor Orders</h1>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <div className="text-5xl mb-4">📦</div>
          <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>No Orders Yet</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--ink-light)' }}>Orders will appear here once customers start buying your products.</p>
          <Link href="/vendor/products/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Add Products →</Link>
        </div>
      </div>
    </div>
  )
}
