'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
export const dynamic = 'force-dynamic'

const PLANS = [
  { id: 'free', name: 'Free', price: 0, commission: '10%', features: ['5 slots/products', 'Basic listing', 'Email support'], color: 'var(--ink-light)' },
  { id: 'starter', name: 'Starter', price: 99, commission: '8%', features: ['50 slots/products', 'Featured badge', 'Analytics dashboard', 'Priority listing'], color: 'var(--green)', popular: true },
  { id: 'pro', name: 'Pro', price: 299, commission: '5%', features: ['Unlimited slots/products', 'Top placement', 'WhatsApp alerts', 'Google Calendar sync', 'Dedicated support'], color: 'var(--gold)' },
]

export default function VendorSettingsPage() {
  const { user } = useAuth()
  const [vendor, setVendor] = useState<{ id: string; business_name: string; vendor_type: string; phone: string; whatsapp: string; email: string; emirate: string; area: string; address: string; bank_name: string; bank_iban: string; bank_account_name: string; subscription?: { plan_name: string }[] } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ phone: '', whatsapp: '', email: '', area: '', address: '', bank_name: '', bank_iban: '', bank_account_name: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    if (!user) return
    fetch('/api/vendor/profile').then(r => r.json()).then(d => {
      if (d.data) {
        setVendor(d.data)
        setForm({ phone: d.data.phone||'', whatsapp: d.data.whatsapp||'', email: d.data.email||'', area: d.data.area||'', address: d.data.address||'', bank_name: d.data.bank_name||'', bank_iban: d.data.bank_iban||'', bank_account_name: d.data.bank_account_name||'' })
      }
    })
  }, [user])

  const save = async () => {
    setSaving(true)
    await fetch('/api/vendor/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  const currentPlan = vendor?.subscription?.[0]?.plan_name || 'free'

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <h1 className="font-display text-5xl text-white">Settings</h1>
        </div>
      </div>
      <div className="container-uae py-8 max-w-3xl space-y-6">

        {/* Profile */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'phone', label: 'Phone', placeholder: '+971 50 000 0000' },
              { key: 'whatsapp', label: 'WhatsApp', placeholder: '+971 50 000 0000' },
              { key: 'email', label: 'Email', placeholder: 'your@email.com' },
              { key: 'area', label: 'Area', placeholder: 'e.g. Dubai Sports City' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>{f.label}</label>
                <input value={(form as Record<string, string>)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Address</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="Full address" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
          </div>
        </div>

        {/* Bank details */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <h2 className="font-display text-2xl mb-1" style={{ color: 'var(--black)' }}>Bank Details</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--ink-light)' }}>Required for weekly auto-payouts. Your earnings (minus commission) are transferred every Monday.</p>
          <div className="space-y-4">
            {[
              { key: 'bank_name', label: 'Bank Name', placeholder: 'e.g. Emirates NBD, ADCB, FAB' },
              { key: 'bank_account_name', label: 'Account Name', placeholder: 'Name as on bank account' },
              { key: 'bank_iban', label: 'IBAN', placeholder: 'AE000000000000000000000' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>{f.label}</label>
                <input value={(form as Record<string, string>)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={save} disabled={saving} className="w-full py-3.5 rounded-xl text-sm font-medium text-white" style={{ background: saved ? 'var(--green)' : 'var(--red)' }}>
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>

        {/* Plans */}
        <div id="upgrade">
          <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--black)' }}>Subscription Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map(p => (
              <div key={p.id} className="rounded-2xl p-5"
                style={{ background: currentPlan === p.id ? 'var(--black)' : 'var(--white)', border: currentPlan === p.id ? `2px solid ${p.color}` : '1px solid var(--border)' }}>
                {(p as { popular?: boolean }).popular && <div className="text-xs font-medium text-white px-2.5 py-0.5 rounded-full inline-block mb-2" style={{ background: 'var(--green)' }}>Most Popular</div>}
                <div className="font-display text-2xl mb-0.5" style={{ color: currentPlan === p.id ? 'white' : 'var(--black)' }}>{p.name}</div>
                <div className="font-display text-3xl mb-1" style={{ color: p.color }}>
                  {p.price === 0 ? 'Free' : `AED ${p.price}/mo`}
                </div>
                <div className="text-xs mb-3" style={{ color: currentPlan === p.id ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>{p.commission} commission</div>
                <div className="space-y-1.5 mb-4">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs" style={{ color: currentPlan === p.id ? 'rgba(255,255,255,0.7)' : 'var(--ink-mid)' }}>
                      <span style={{ color: p.color }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                {currentPlan === p.id ? (
                  <div className="text-xs text-center py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>Current Plan</div>
                ) : (
                  <Link href="/contact" className="block text-center py-2 rounded-xl text-xs font-medium text-white" style={{ background: p.color }}>
                    {p.price > 0 ? 'Upgrade' : 'Downgrade'}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
