'use client'
export const dynamic = 'force-dynamic'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'
import { TOUR_DESTINATIONS, EMIRATES } from '@/lib/utils'

function TourRegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const direction = (searchParams.get('direction') ?? 'outbound') as 'outbound' | 'inbound'
  const defaultDest = searchParams.get('destination') ?? ''

  const [form, setForm] = useState({
    team_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    direction: direction === 'inbound' ? 'uae-inbound' : 'uae-outbound',
    destination_country: defaultDest,
    origin_country: '',
    emirate_preference: 'dubai',
    travel_dates_from: '',
    travel_dates_to: '',
    team_size: 11,
    format_preference: [] as string[],
    matches_wanted: 3,
    accommodation_needed: false,
    logistics_needed: false,
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }))

  const toggleFormat = (fmt: string) => {
    setForm(p => ({
      ...p,
      format_preference: p.format_preference.includes(fmt)
        ? p.format_preference.filter(f => f !== fmt)
        : [...p.format_preference, fmt],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isOutbound = form.direction === 'uae-outbound'
  const inp = "w-full px-4 py-2.5 rounded-lg text-sm outline-none"
  const inpStyle = { border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle size={56} className="mx-auto mb-5" style={{ color: 'var(--green)' }} />
        <h2 className="font-display text-3xl text-white tracking-wide mb-3">Registration Submitted!</h2>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          Our team will review your registration and get in touch within <strong className="text-white/80">48 hours</strong> with matching teams.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => router.push('/tours')}
            className="px-6 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            Back to Tours
          </button>
          <button onClick={() => { setDone(false); setForm(f => ({ ...f, team_name: '' })) }}
            className="px-6 py-2.5 rounded-lg text-sm"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
            Register Another Team
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Direction toggle */}
      <div className="grid grid-cols-2 gap-2 mb-8 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {(['uae-outbound', 'uae-inbound'] as const).map(d => (
          <button key={d} onClick={() => update('direction', d)}
            className="py-3 rounded-lg text-sm font-medium transition-all"
            style={{
              background: form.direction === d ? 'var(--gold)' : 'transparent',
              color: form.direction === d ? 'var(--ink)' : 'rgba(255,255,255,0.5)',
            }}>
            {d === 'uae-outbound' ? '✈️ UAE Team Touring Abroad' : '🛬 Overseas Team Visiting UAE'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team details */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-display text-xl text-white tracking-wide mb-5">Team Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs text-white/40 mb-1.5">Team Name *</label>
              <input value={form.team_name} onChange={e => update('team_name', e.target.value)}
                placeholder="e.g. Dubai Falcons CC" required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Contact Name *</label>
              <input value={form.contact_name} onChange={e => update('contact_name', e.target.value)}
                placeholder="Your full name" required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Email *</label>
              <input type="email" value={form.contact_email} onChange={e => update('contact_email', e.target.value)}
                placeholder="you@example.com" required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Phone / WhatsApp *</label>
              <input value={form.contact_phone} onChange={e => update('contact_phone', e.target.value)}
                placeholder="+971 50 000 0000" required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Team Size *</label>
              <select value={form.team_size} onChange={e => update('team_size', Number(e.target.value))}
                className={inp} style={inpStyle}>
                {[11,12,13,14,15,16,17,18,19,20].map(n => (
                  <option key={n} value={n}>{n} players</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tour details */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-display text-xl text-white tracking-wide mb-5">Tour Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {isOutbound ? (
              <div className="md:col-span-2">
                <label className="block text-xs text-white/40 mb-2">Destination Country *</label>
                <div className="grid grid-cols-4 gap-2">
                  {TOUR_DESTINATIONS.map(d => (
                    <button key={d.code} type="button" onClick={() => update('destination_country', d.code)}
                      className="py-2 px-3 rounded-lg text-xs flex flex-col items-center gap-1 transition-all"
                      style={{
                        border: `1px solid ${form.destination_country === d.code ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                        background: form.destination_country === d.code ? 'rgba(200,150,30,0.15)' : 'transparent',
                        color: form.destination_country === d.code ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                      }}>
                      <span className="text-xl">{d.flag}</span>
                      <span>{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Origin Country *</label>
                  <input value={form.origin_country} onChange={e => update('origin_country', e.target.value)}
                    placeholder="e.g. India" required={!isOutbound} className={inp} style={inpStyle} />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Preferred Emirate</label>
                  <select value={form.emirate_preference} onChange={e => update('emirate_preference', e.target.value)}
                    className={inp} style={inpStyle}>
                    {EMIRATES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-white/40 mb-1.5">Travel From *</label>
              <input type="date" value={form.travel_dates_from} onChange={e => update('travel_dates_from', e.target.value)}
                required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Travel To *</label>
              <input type="date" value={form.travel_dates_to} onChange={e => update('travel_dates_to', e.target.value)}
                required className={inp} style={inpStyle} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Matches Wanted</label>
              <select value={form.matches_wanted} onChange={e => update('matches_wanted', Number(e.target.value))}
                className={inp} style={inpStyle}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} match{n > 1 ? 'es' : ''}</option>)}
              </select>
            </div>
          </div>

          {/* Format preference */}
          <div className="mt-4">
            <label className="block text-xs text-white/40 mb-2">Match Format (select all that apply)</label>
            <div className="flex gap-2 flex-wrap">
              {['T20', 'T10', 'ODI', '50-overs', 'Test'].map(fmt => (
                <button key={fmt} type="button" onClick={() => toggleFormat(fmt)}
                  className="px-4 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: form.format_preference.includes(fmt) ? 'var(--green)' : 'rgba(255,255,255,0.05)',
                    color: form.format_preference.includes(fmt) ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${form.format_preference.includes(fmt) ? 'var(--green)' : 'rgba(255,255,255,0.1)'}`,
                  }}>
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Extra needs */}
          <div className="mt-4 flex flex-wrap gap-4">
            {[
              { key: 'accommodation_needed', label: 'Need accommodation arranged' },
              { key: 'logistics_needed', label: 'Need ground logistics help' },
            ].map(opt => (
              <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox"
                  checked={form[opt.key as keyof typeof form] as boolean}
                  onChange={e => update(opt.key, e.target.checked)}
                  className="w-4 h-4" />
                <span className="text-sm text-white/60">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <label className="block text-xs text-white/40 mb-2">Additional Notes (optional)</label>
          <textarea value={form.notes} onChange={e => update('notes', e.target.value)}
            placeholder="Any other requirements, preferences, or details about your team..."
            rows={4} className={`${inp} resize-none`} style={inpStyle} />
        </div>

        {error && (
          <div className="text-sm px-4 py-3 rounded-xl"
            style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
          {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Tour Registration →'}
        </button>
        <p className="text-center text-xs text-white/30">
          We'll contact you within 48 hours with matching team options.
        </p>
      </form>
    </div>
  )
}

export default function TourRegisterPage() {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      <div className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
            Cricket Tours Connect
          </div>
          <h1 className="font-display text-5xl text-white tracking-wide mb-3">Register Your Team</h1>
          <p className="text-white/50 text-sm">
            Tell us about your team and we'll match you with the right tour partner.
          </p>
        </div>
        <Suspense>
          <TourRegisterForm />
        </Suspense>
      </div>
    </div>
  )
}
