'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'

const FACILITY_TYPES = [
  { id: 'nets', label: '🎯 Cricket Nets', desc: 'Indoor or outdoor net lanes' },
  { id: 'ground', label: '🏟️ Cricket Ground', desc: 'Full-size or practice ground' },
  { id: 'indoor', label: '🏢 Indoor Centre', desc: 'Indoor cricket facility' },
  { id: 'academy', label: '🎓 Academy Facility', desc: 'Academy training complex' },
  { id: 'multi', label: '🏗️ Multi-sport', desc: 'Multiple facility types' },
]

const AMENITIES = ['Parking', 'Changing Rooms', 'Showers', 'Floodlights', 'Bowling Machine', 'Video Analysis', 'Gym', 'Canteen', 'First Aid', 'WiFi']

export default function AddFacilityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', type: '', description: '', emirate: 'Dubai', area: '', address: '',
    amenities: [] as string[], rules: '', min_booking_hrs: 1, max_booking_hrs: 4,
    advance_booking_days: 30, cancellation_hrs: 24,
  })
  const [slots, setSlots] = useState([{ name: 'Lane 1', price_aed: 100, duration_mins: 60, open_time: '06:00', close_time: '23:00' }])

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const toggleAmenity = (a: string) => set('amenities', form.amenities.includes(a) ? form.amenities.filter(x => x !== a) : [...form.amenities, a])

  const addSlot = () => setSlots(prev => [...prev, { name: `Lane ${prev.length + 1}`, price_aed: 100, duration_mins: 60, open_time: '06:00', close_time: '23:00' }])
  const updateSlot = (i: number, k: string, v: unknown) => setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, [k]: v } : s))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slots }),
      })
      if (res.ok) router.push('/vendor/facility')
    } finally { setLoading(false) }
  }

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae max-w-3xl">
          <Link href="/vendor/facility" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← My Facilities</Link>
          <h1 className="font-display text-4xl text-white mb-2">Add Facility</h1>
          <div className="flex items-center gap-2 mt-4">
            {[1,2,3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: step >= s ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>{s}</div>
                <span className="text-xs hidden sm:block" style={{ color: step >= s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>{s===1?'Details':s===2?'Slots':'Confirm'}</span>
                {s < 3 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-uae py-8 max-w-3xl">
        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Facility Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {FACILITY_TYPES.map(t => (
                  <button key={t.id} onClick={() => set('type', t.id)}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{ background: form.type === t.id ? 'var(--black)' : 'var(--off-white)', border: form.type === t.id ? '2px solid var(--red)' : '1px solid var(--border)' }}>
                    <div className="text-sm font-medium" style={{ color: form.type === t.id ? 'white' : 'var(--black)' }}>{t.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: form.type === t.id ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>{t.desc}</div>
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Facility Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. ICC Academy Lane 1, Sharjah Cricket Nets"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Description</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
                    placeholder="Describe your facility — surface type, condition, special features..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Emirate</label>
                    <select value={form.emirate} onChange={e => set('emirate', e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      {['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'].map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Area</label>
                    <input value={form.area} onChange={e => set('area', e.target.value)} placeholder="e.g. Dubai Sports City" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Full Address</label>
                  <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="Building name, street, area" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--ink-mid)' }}>Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map(a => (
                      <button key={a} onClick={() => toggleAmenity(a)}
                        className="px-3 py-1.5 rounded-full text-xs transition-all"
                        style={{ background: form.amenities.includes(a) ? 'var(--green)' : 'var(--off-white)', color: form.amenities.includes(a) ? 'white' : 'var(--ink-mid)', border: `1px solid ${form.amenities.includes(a) ? 'var(--green)' : 'var(--border)'}` }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => form.name && form.type && setStep(2)} disabled={!form.name || !form.type}
              className="w-full py-3.5 rounded-xl text-sm font-medium text-white" style={{ background: form.name && form.type ? 'var(--red)' : 'var(--border)' }}>
              Next: Add Slots →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl" style={{ color: 'var(--black)' }}>Bookable Slots</h2>
                <button onClick={addSlot} className="px-4 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--red)' }}>+ Add Slot</button>
              </div>
              <p className="text-xs mb-5" style={{ color: 'var(--ink-light)' }}>Each slot is a bookable unit — e.g. "Lane 1", "Main Ground", "Indoor Net A"</p>
              <div className="space-y-4">
                {slots.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                    <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Slot Name</label>
                        <input value={s.name} onChange={e => updateSlot(i, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Price (AED/hr)</label>
                        <input type="number" value={s.price_aed} onChange={e => updateSlot(i, 'price_aed', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Duration (min)</label>
                        <select value={s.duration_mins} onChange={e => updateSlot(i, 'duration_mins', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }}>
                          {[30,60,90,120].map(d => <option key={d} value={d}>{d} min</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Opens</label>
                        <input type="time" value={s.open_time} onChange={e => updateSlot(i, 'open_time', e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Closes</label>
                        <input type="time" value={s.close_time} onChange={e => updateSlot(i, 'close_time', e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                      </div>
                    </div>
                    {slots.length > 1 && (
                      <button onClick={() => setSlots(prev => prev.filter((_, idx) => idx !== i))} className="mt-2 text-xs" style={{ color: 'var(--red)' }}>Remove slot</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Review & Publish →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="rounded-2xl p-6 mb-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Review</h2>
              <div className="space-y-3">
                <div><span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>Name</span><div className="text-sm font-medium mt-0.5" style={{ color: 'var(--black)' }}>{form.name}</div></div>
                <div><span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>Type</span><div className="text-sm font-medium mt-0.5 capitalize" style={{ color: 'var(--black)' }}>{form.type}</div></div>
                <div><span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>Location</span><div className="text-sm font-medium mt-0.5" style={{ color: 'var(--black)' }}>{form.area}, {form.emirate}</div></div>
                <div><span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>Slots ({slots.length})</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {slots.map((s, i) => <span key={i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{s.name} — AED {s.price_aed}/hr</span>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
                {loading ? 'Publishing...' : '🚀 Publish Facility'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
