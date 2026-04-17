'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { EMIRATES } from '@/lib/utils'

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const [form, setForm] = useState({ full_name: '', phone: '', emirate: '' })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      const p = profile as typeof profile & { emirate?: string }
      setForm({ full_name: p.full_name ?? '', phone: p.phone ?? '', emirate: p.emirate ?? '' })
    }
  }, [profile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    const { createClient } = await import('@/lib/supabase-browser')
    const supabase = createClient()
    await supabase.from('profiles').update(form).eq('id', user.id)
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const inp = "w-full px-4 py-2.5 rounded-lg text-sm outline-none"
  const inpStyle = { border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--ink)' }} className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2 text-white/40">My Account</div>
          <h1 className="font-display text-4xl text-white tracking-wide">Profile</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex gap-3 mb-8">
          {[
            { href: '/account/orders', label: 'Orders', active: false },
            { href: '/account/profile', label: 'Profile', active: true },
          ].map(t => (
            <Link key={t.href} href={t.href} className="no-underline px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: t.active ? 'var(--green)' : '#fff', color: t.active ? '#fff' : 'var(--ink)', border: `1px solid ${t.active ? 'var(--green)' : 'var(--border)'}` }}>
              {t.label}
            </Link>
          ))}
        </div>
        <form onSubmit={handleSave} className="rounded-2xl p-6 space-y-5" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl tracking-wide" style={{ color: 'var(--ink)' }}>Personal Details</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl" style={{ background: 'var(--green)', color: '#fff' }}>
              {form.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{form.full_name || 'Your Name'}</div>
              <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{user?.email}</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Full Name</label>
              <input value={form.full_name} onChange={e => setForm(p=>({...p,full_name:e.target.value}))} placeholder="Your full name" className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Email</label>
              <input value={user?.email ?? ''} disabled className={inp} style={{ ...inpStyle, opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Phone / WhatsApp</label>
              <input value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} placeholder="+971 50 000 0000" className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Emirate</label>
              <select value={form.emirate} onChange={e => setForm(p=>({...p,emirate:e.target.value}))} className={inp} style={inpStyle}>
                <option value="">Select emirate</option>
                {EMIRATES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={loading} className="px-8 py-2.5 rounded-lg text-sm font-medium disabled:opacity-60" style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && <span className="text-sm" style={{ color: 'var(--green)' }}>✓ Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
