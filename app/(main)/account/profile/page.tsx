'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { User, Phone, Mail, MapPin, Camera } from 'lucide-react'
export const dynamic = 'force-dynamic'

export default function AccountProfilePage() {
  const { user, profile } = useAuth()
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', emirate: 'Dubai', bio: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    if (profile) {
      setForm({ full_name: profile.full_name || '', phone: profile.phone || '', email: profile.email || user?.email || '', emirate: 'Dubai', bio: '' })
    }
  }, [profile, user])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaved(true); setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to view your profile</p>
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>My Account</div>
          <h1 className="font-display text-5xl text-white mb-2">My Profile</h1>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { href: '/account/bookings', label: '📅 My Bookings' },
              { href: '/account/orders', label: '📦 My Orders' },
              { href: '/account/profile', label: '👤 Profile', active: true },
            ].map(t => (
              <Link key={t.href} href={t.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ background: (t as { active?: boolean }).active ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8 max-w-2xl">
        {/* Avatar */}
        <div className="rounded-2xl p-6 mb-5 flex items-center gap-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-display text-3xl text-white"
              style={{ background: 'var(--green)', fontSize: 26 }}>
              {(profile?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'var(--red)', color: 'white' }}>
              <Camera size={13} />
            </button>
          </div>
          <div>
            <div className="font-display text-2xl" style={{ color: 'var(--black)' }}>{profile?.full_name || 'Cricket Player'}</div>
            <div className="text-sm mt-0.5" style={{ color: 'var(--ink-light)' }}>{user?.email}</div>
            <span className="text-xs px-2.5 py-0.5 rounded-full mt-1 inline-block capitalize"
              style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
              {profile?.role || 'player'}
            </span>
          </div>
        </div>

        {/* Profile form */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ink-mid)' }}>
                <User size={12} /> Full Name
              </label>
              <input value={form.full_name} onChange={e => set('full_name', e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ink-mid)' }}>
                  <Phone size={12} /> Phone / WhatsApp
                </label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+971 50 000 0000"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ink-mid)' }}>
                  <MapPin size={12} /> Emirate
                </label>
                <select value={form.emirate} onChange={e => set('emirate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                  {['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--ink-mid)' }}>
                <Mail size={12} /> Email
              </label>
              <input value={form.email} disabled
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', color: 'var(--ink-light)', background: 'var(--off-white)' }} />
              <p className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>Email cannot be changed</p>
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full py-3.5 rounded-xl text-sm font-medium text-white"
          style={{ background: saved ? 'var(--green)' : 'var(--red)' }}>
          {saving ? 'Saving...' : saved ? '✓ Profile Saved!' : 'Save Profile'}
        </button>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { href: '/book/nets', icon: '🏟️', label: 'Book Nets' },
            { href: '/book/coach', icon: '👤', label: 'Book Coach' },
            { href: '/vendor/onboarding', icon: '🏪', label: 'Become Vendor' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="rounded-2xl p-4 text-center card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="text-2xl mb-1">{l.icon}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--black)' }}>{l.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
