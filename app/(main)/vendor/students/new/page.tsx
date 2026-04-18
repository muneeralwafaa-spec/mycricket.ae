'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']

export default function NewStudentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    full_name: '', dob: '', gender: '', nationality: '', phone: '', email: '',
    parent_name: '', parent_phone: '', parent_email: '', parent_whatsapp: '',
    school: '', skill_level: 'beginner', batting_style: 'right', bowling_style: '',
    notes: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/vendor/students', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/vendor/students')
    } finally { setLoading(false) }
  }

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae max-w-2xl">
          <Link href="/vendor/students" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Students</Link>
          <h1 className="font-display text-4xl text-white mb-4">Add New Student</h1>
          <div className="flex items-center gap-2">
            {['Student Info', 'Parent Details', 'Cricket Profile'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: step > i+1 ? 'var(--green)' : step === i+1 ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step >= i+1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>{s}</span>
                {i < 2 && <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8 max-w-2xl">
        {/* Step 1: Student info */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Student Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Full Name *</label>
                  <input value={form.full_name} onChange={e => set('full_name', e.target.value)}
                    placeholder="Student's full name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Date of Birth *</label>
                    <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Gender</label>
                    <select value={form.gender} onChange={e => set('gender', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Nationality</label>
                    <input value={form.nationality} onChange={e => set('nationality', e.target.value)}
                      placeholder="e.g. Indian, Pakistani, Emirati"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>School</label>
                    <input value={form.school} onChange={e => set('school', e.target.value)}
                      placeholder="School name"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Student Phone (if applicable)</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+971 50 000 0000"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>
            <button onClick={() => form.full_name && form.dob && setStep(2)}
              disabled={!form.full_name || !form.dob}
              className="w-full py-3.5 rounded-xl text-sm font-medium text-white"
              style={{ background: form.full_name && form.dob ? 'var(--red)' : 'var(--border)' }}>
              Next: Parent Details →
            </button>
          </div>
        )}

        {/* Step 2: Parent details */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Parent / Guardian Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Parent/Guardian Name *</label>
                  <input value={form.parent_name} onChange={e => set('parent_name', e.target.value)}
                    placeholder="Father / Mother / Guardian name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Phone *</label>
                    <input value={form.parent_phone} onChange={e => set('parent_phone', e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>WhatsApp</label>
                    <input value={form.parent_whatsapp} onChange={e => set('parent_whatsapp', e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Email</label>
                  <input value={form.parent_email} onChange={e => set('parent_email', e.target.value)}
                    placeholder="parent@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={() => form.parent_name && form.parent_phone && setStep(3)}
                disabled={!form.parent_name || !form.parent_phone}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: form.parent_name && form.parent_phone ? 'var(--red)' : 'var(--border)' }}>
                Next: Cricket Profile →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Cricket profile */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Cricket Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--ink-mid)' }}>Skill Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['beginner', 'intermediate', 'advanced', 'elite'].map(l => (
                      <button key={l} onClick={() => set('skill_level', l)}
                        className="py-2.5 rounded-xl text-sm font-medium capitalize transition-all"
                        style={{ background: form.skill_level === l ? 'var(--red)' : 'var(--off-white)', color: form.skill_level === l ? 'white' : 'var(--black)', border: `1px solid ${form.skill_level === l ? 'var(--red)' : 'var(--border)'}` }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Batting Style</label>
                    <select value={form.batting_style} onChange={e => set('batting_style', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="right">Right Hand</option>
                      <option value="left">Left Hand</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Bowling Style</label>
                    <select value={form.bowling_style} onChange={e => set('bowling_style', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="">Not a bowler</option>
                      <option value="right-arm-fast">Right Arm Fast</option>
                      <option value="right-arm-medium">Right Arm Medium</option>
                      <option value="right-arm-offspin">Right Arm Off Spin</option>
                      <option value="right-arm-legspin">Right Arm Leg Spin</option>
                      <option value="left-arm-fast">Left Arm Fast</option>
                      <option value="left-arm-spin">Left Arm Spin</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Notes</label>
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    rows={3} placeholder="Any special notes about the student..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <div className="font-display text-lg mb-3" style={{ color: 'var(--black)' }}>Summary</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span style={{ color: 'var(--ink-light)' }}>Name: </span><span style={{ color: 'var(--black)' }}>{form.full_name}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>DOB: </span><span style={{ color: 'var(--black)' }}>{form.dob}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Parent: </span><span style={{ color: 'var(--black)' }}>{form.parent_name}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Phone: </span><span style={{ color: 'var(--black)' }}>{form.parent_phone}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Level: </span><span className="capitalize" style={{ color: 'var(--red)' }}>{form.skill_level}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Batting: </span><span className="capitalize" style={{ color: 'var(--black)' }}>{form.batting_style} hand</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--red)' }}>
                {loading ? 'Adding Student...' : '✓ Add Student'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
