'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Plus, Check, X } from 'lucide-react'

const DEMO_PACKAGES = [
  { id: '1', student: 'Arjun Sharma', phone: '+971501234567', package: '10-Session Batting Package', total: 10, used: 6, price: 2500, purchased: '1 Mar 2026', expiry: '31 May 2026', status: 'active' },
  { id: '2', student: 'Rohan Patel', phone: '+971505678901', package: '20-Session Elite Package', total: 20, used: 14, price: 4000, purchased: '1 Feb 2026', expiry: '31 Jul 2026', status: 'active' },
  { id: '3', student: 'Yasir Khan', phone: '+971508901234', package: '5-Session Trial Package', total: 5, used: 5, price: 1000, purchased: '1 Apr 2026', expiry: '30 Apr 2026', status: 'completed' },
  { id: '4', student: 'Mohammed Al Rashid', phone: '+971502345678', package: '10-Session Beginners Package', total: 10, used: 2, price: 1800, purchased: '10 Apr 2026', expiry: '10 Jul 2026', status: 'active' },
]

export default function PackagesPage() {
  const { user } = useAuth()
  const [packages, setPackages] = useState(DEMO_PACKAGES)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ student: '', phone: '', package: '', total: 10, price: 2500 })
  const [markingSession, setMarkingSession] = useState<string | null>(null)

  const markSession = (id: string) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, used: Math.min(p.used + 1, p.total), status: p.used + 1 >= p.total ? 'completed' : 'active' } : p))
    setMarkingSession(null)
  }

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <div>
              <h1 className="font-display text-5xl text-white mb-1">Session Packages</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Track pre-paid coaching packages</p>
            </div>
            <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              <Plus size={15} /> New Package
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Active Packages', value: packages.filter(p => p.status === 'active').length, color: 'var(--green)' },
              { label: 'Sessions Used Today', value: 3, color: 'var(--gold)' },
              { label: 'Sessions Remaining', value: packages.filter(p => p.status === 'active').reduce((s, p) => s + (p.total - p.used), 0), color: 'var(--red)' },
              { label: 'Revenue This Month', value: `AED ${packages.reduce((s, p) => s + p.price, 0).toLocaleString()}`, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New package modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: 'var(--white)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>New Package</h2>
            <div className="space-y-3">
              {[
                { k: 'student', l: 'Student Name', p: 'Student name' },
                { k: 'phone', l: 'WhatsApp', p: '+971 50 000 0000' },
                { k: 'package', l: 'Package Name', p: 'e.g. 10-Session Batting Package' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>{f.l}</label>
                  <input value={(form as Record<string, string | number>)[f.k] as string} onChange={e => setForm(prev => ({ ...prev, [f.k]: e.target.value }))}
                    placeholder={f.p} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Sessions</label>
                  <input type="number" value={form.total} onChange={e => setForm(prev => ({ ...prev, total: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Price (AED)</label>
                  <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNew(false)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Cancel</button>
              <button onClick={() => {
                if (form.student && form.phone) {
                  setPackages(prev => [...prev, { id: Date.now().toString(), student: form.student, phone: form.phone, package: form.package, total: form.total, used: 0, price: form.price, purchased: new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' }), expiry: '', status: 'active' }])
                  setShowNew(false)
                }
              }} className="flex-1 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
                Create Package
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container-uae py-8">
        <div className="space-y-4">
          {packages.map(p => {
            const remaining = p.total - p.used
            const pct = Math.round(p.used / p.total * 100)
            return (
              <div key={p.id} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: `1px solid ${p.status === 'active' ? 'var(--border)' : 'rgba(0,0,0,0.08)'}`, opacity: p.status === 'completed' ? 0.7 : 1 }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{p.student}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: p.status === 'active' ? 'var(--green-light)' : 'var(--off-white)', color: p.status === 'active' ? 'var(--green)' : 'var(--ink-light)' }}>
                        {p.status}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{p.package}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>Purchased: {p.purchased} · Expires: {p.expiry}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl" style={{ color: remaining === 0 ? 'var(--ink-light)' : remaining <= 2 ? 'var(--red)' : 'var(--green)' }}>
                      {remaining} sessions left
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{p.used}/{p.total} used · AED {p.price}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--off-white)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--ink-light)' : pct >= 80 ? 'var(--red)' : 'var(--green)' }} />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span style={{ color: 'var(--ink-light)' }}>0</span>
                    <span style={{ color: 'var(--ink-light)' }}>{p.total} sessions</span>
                  </div>
                </div>

                {p.status === 'active' && (
                  markingSession === p.id ? (
                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
                      <span className="text-sm" style={{ color: 'var(--green-dark)' }}>Mark session #{p.used + 1} as used?</span>
                      <button onClick={() => markSession(p.id)} className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
                        <Check size={12} /> Confirm
                      </button>
                      <button onClick={() => setMarkingSession(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setMarkingSession(p.id)} className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
                        ✓ Mark Session Used
                      </button>
                      <a href={`https://wa.me/${p.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl text-xs font-medium text-white" style={{ background: '#25D366' }}>
                        💬
                      </a>
                    </div>
                  )
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
