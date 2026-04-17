'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'

const VENDOR_TYPES = [
  { id: 'facility', icon: '🏟️', title: 'Nets / Ground / Facility', desc: 'Indoor nets, outdoor grounds, cricket centres. Charge per hour or session.' },
  { id: 'coach',    icon: '👤', title: 'Cricket Coach', desc: 'Individual sessions, group coaching, camps. Set your own schedule and rates.' },
  { id: 'academy',  icon: '🎓', title: 'Cricket Academy', desc: 'Monthly programmes, term enrolments, multi-coach setups.' },
  { id: 'shop',     icon: '🛒', title: 'Cricket Shop', desc: 'Sell cricket gear, equipment, jerseys. Multi-vendor marketplace.' },
  { id: 'umpire',   icon: '⚖️', title: 'Umpire / Scorer', desc: 'List your availability for match officiating.' },
  { id: 'tour',     icon: '✈️', title: 'Tours Organiser', desc: 'Organise cricket tours within UAE or internationally.' },
]

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']

export default function VendorOnboardingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    vendor_type: '',
    business_name: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    emirate: 'Dubai',
    area: '',
    address: '',
    website: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/vendor/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/vendor/dashboard')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <p className="mb-4" style={{ color: 'var(--ink-light)' }}>Please sign in to register as a vendor</p>
      <a href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</a>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae max-w-3xl">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>
            Join MyCricket.ae
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">List Your Business</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Reach thousands of UAE cricket players. Free to start — upgrade anytime.
          </p>
          {/* Steps */}
          <div className="flex items-center gap-3 mt-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: step >= s ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                  {s}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step >= s ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
                  {s === 1 ? 'Type' : s === 2 ? 'Details' : 'Review'}
                </span>
                {s < 3 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-10 max-w-3xl">
        {/* Step 1: Choose type */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl mb-2" style={{ color: 'var(--black)' }}>What are you listing?</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Choose your vendor type to get started</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {VENDOR_TYPES.map(t => (
                <button key={t.id} onClick={() => set('vendor_type', t.id)}
                  className="rounded-2xl p-5 text-left transition-all"
                  style={{
                    background: form.vendor_type === t.id ? 'var(--black)' : 'var(--white)',
                    border: form.vendor_type === t.id ? '2px solid var(--red)' : '1px solid var(--border)',
                  }}>
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="font-display text-lg mb-1" style={{ color: form.vendor_type === t.id ? 'white' : 'var(--black)' }}>
                    {t.title}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: form.vendor_type === t.id ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
            <button onClick={() => form.vendor_type && setStep(2)} disabled={!form.vendor_type}
              className="w-full py-3.5 rounded-xl text-sm font-medium text-white transition-all"
              style={{ background: form.vendor_type ? 'var(--red)' : 'var(--border)', cursor: form.vendor_type ? 'pointer' : 'not-allowed' }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Business details */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl mb-2" style={{ color: 'var(--black)' }}>Your Business Details</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>This will appear on your public listing</p>
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Business / Listing Name *</label>
                  <input value={form.business_name} onChange={e => set('business_name', e.target.value)}
                    placeholder="e.g. ICC Cricket Academy, Coach Rajan, Dubai Cricket Nets"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Description *</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)}
                    rows={4} placeholder="Tell players what you offer, your experience, facilities..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Emirate *</label>
                    <select value={form.emirate} onChange={e => set('emirate', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
                      {EMIRATES.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Area</label>
                    <input value={form.area} onChange={e => set('area', e.target.value)}
                      placeholder="e.g. Dubai Sports City"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Full Address</label>
                  <input value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="Street address, building name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Phone *</label>
                    <input value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>WhatsApp</label>
                    <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Email</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Website</label>
                    <input value={form.website} onChange={e => set('website', e.target.value)}
                      placeholder="https://yoursite.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl text-sm"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={() => form.business_name && form.phone && setStep(3)}
                disabled={!form.business_name || !form.phone}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: form.business_name && form.phone ? 'var(--red)' : 'var(--border)' }}>
                Review Listing →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl mb-2" style={{ color: 'var(--black)' }}>Review Your Listing</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Confirm everything looks right before publishing</p>
            <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
              <div className="p-5" style={{ background: 'var(--white)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: 'var(--green-light)' }}>
                    {VENDOR_TYPES.find(t => t.id === form.vendor_type)?.icon}
                  </div>
                  <div>
                    <div className="font-display text-2xl" style={{ color: 'var(--black)' }}>{form.business_name}</div>
                    <div className="text-sm" style={{ color: 'var(--red)' }}>{VENDOR_TYPES.find(t => t.id === form.vendor_type)?.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{form.area}, {form.emirate}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{form.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><span style={{ color: 'var(--ink-light)' }}>Phone: </span><span style={{ color: 'var(--black)' }}>{form.phone}</span></div>
                  {form.whatsapp && <div><span style={{ color: 'var(--ink-light)' }}>WhatsApp: </span><span style={{ color: 'var(--black)' }}>{form.whatsapp}</span></div>}
                  {form.email && <div><span style={{ color: 'var(--ink-light)' }}>Email: </span><span style={{ color: 'var(--black)' }}>{form.email}</span></div>}
                </div>
              </div>
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'var(--green-light)', borderTop: '1px solid var(--border-green)' }}>
                <span style={{ color: 'var(--green)' }}>✓</span>
                <span className="text-xs" style={{ color: 'var(--green-dark)' }}>Free plan — you can upgrade to Starter (AED 99/mo) or Pro (AED 299/mo) anytime</span>
              </div>
            </div>
            {error && <p className="text-sm mb-4 px-4 py-3 rounded-xl" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>{error}</p>}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl text-sm"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--red)' }}>
                {loading ? 'Publishing...' : '🚀 Publish My Listing — Free'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
