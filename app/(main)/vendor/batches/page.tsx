'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Plus, Users, Clock, Calendar } from 'lucide-react'

const DEMO_BATCHES = [
  { id: '1', name: 'U14 Morning Batch', level: 'intermediate', students: 8, max: 15, days: ['Monday', 'Wednesday', 'Friday'], start_time: '07:00', end_time: '09:00', venue: 'ICC Academy — Net 1-3', monthly_fee: 400, is_active: true },
  { id: '2', name: 'Junior Batch B', level: 'beginner', students: 12, max: 15, days: ['Tuesday', 'Thursday', 'Saturday'], start_time: '16:00', end_time: '18:00', venue: 'ICC Academy — Net 4-6', monthly_fee: 350, is_active: true },
  { id: '3', name: 'Senior Ladies Batch', level: 'intermediate', students: 6, max: 12, days: ['Monday', 'Wednesday'], start_time: '18:00', end_time: '20:00', venue: 'ICC Academy — Indoor', monthly_fee: 400, is_active: true },
  { id: '4', name: 'Elite Performance', level: 'elite', students: 4, max: 8, days: ['Monday', 'Tuesday', 'Thursday', 'Saturday'], start_time: '06:00', end_time: '08:30', venue: 'ICC Academy — Main Oval', monthly_fee: 600, is_active: true },
  { id: '5', name: 'Holiday Camp July', level: 'beginner', students: 0, max: 25, days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], start_time: '08:00', end_time: '12:00', venue: 'ICC Academy', monthly_fee: 1200, is_active: false },
]

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  beginner:     { bg: '#E6F7ED', color: '#009A44' },
  intermediate: { bg: '#FDF3DC', color: '#C8961E' },
  advanced:     { bg: '#FDEAEB', color: '#EF3340' },
  elite:        { bg: '#1a1a2e', color: '#fff' },
}

export default function BatchesPage() {
  const { user } = useAuth()
  const [batches] = useState(DEMO_BATCHES)
  const [showNew, setShowNew] = useState(false)
  const [newBatch, setNewBatch] = useState({ name: '', level: 'beginner', max: 15, monthly_fee: 400, days: [] as string[], start_time: '07:00', end_time: '09:00', venue: '' })

  const totalStudents = batches.filter(b => b.is_active).reduce((s, b) => s + b.students, 0)
  const totalCapacity = batches.filter(b => b.is_active).reduce((s, b) => s + b.max, 0)

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/students" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Students</Link>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <div>
              <h1 className="font-display text-5xl text-white mb-1">Batches</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{batches.filter(b => b.is_active).length} active batches · {totalStudents}/{totalCapacity} students</p>
            </div>
            <button onClick={() => setShowNew(!showNew)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--red)' }}>
              <Plus size={15} /> New Batch
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Batches', value: batches.filter(b => b.is_active).length, color: 'var(--green)' },
              { label: 'Total Students', value: totalStudents, color: 'var(--gold)' },
              { label: 'Capacity Used', value: `${Math.round(totalStudents/totalCapacity*100)}%`, color: 'var(--red)' },
              { label: 'Monthly Revenue', value: `AED ${batches.filter(b => b.is_active).reduce((s, b) => s + b.students * b.monthly_fee, 0).toLocaleString()}`, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8">
        {/* New batch quick form */}
        {showNew && (
          <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--white)', border: '2px solid var(--red)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>New Batch</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Batch Name</label>
                <input value={newBatch.name} onChange={e => setNewBatch(b => ({ ...b, name: e.target.value }))}
                  placeholder="e.g. U14 Morning Batch, Elite Performance"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Level</label>
                <select value={newBatch.level} onChange={e => setNewBatch(b => ({ ...b, level: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Max Students</label>
                <input type="number" value={newBatch.max} onChange={e => setNewBatch(b => ({ ...b, max: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Monthly Fee (AED)</label>
                <input type="number" value={newBatch.monthly_fee} onChange={e => setNewBatch(b => ({ ...b, monthly_fee: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Venue</label>
                <input value={newBatch.venue} onChange={e => setNewBatch(b => ({ ...b, venue: e.target.value }))}
                  placeholder="e.g. ICC Academy — Net 1-3"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--ink-mid)' }}>Training Days</label>
              <div className="flex flex-wrap gap-2">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                  <button key={d} onClick={() => setNewBatch(b => ({ ...b, days: b.days.includes(d) ? b.days.filter(x => x !== d) : [...b.days, d] }))}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{ background: newBatch.days.includes(d) ? 'var(--red)' : 'var(--off-white)', color: newBatch.days.includes(d) ? 'white' : 'var(--black)', border: `1px solid ${newBatch.days.includes(d) ? 'var(--red)' : 'var(--border)'}` }}>
                    {d.slice(0,3)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNew(false)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Cancel</button>
              <button className="flex-1 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Create Batch</button>
            </div>
          </div>
        )}

        {/* Batches list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {batches.map(b => {
            const lc = LEVEL_COLORS[b.level] || LEVEL_COLORS.beginner
            const fillPct = Math.round(b.students / b.max * 100)
            return (
              <div key={b.id} className="rounded-2xl p-5"
                style={{ background: 'var(--white)', border: `1px solid ${b.is_active ? 'var(--border)' : 'rgba(0,0,0,0.1)'}`, opacity: b.is_active ? 1 : 0.6 }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{b.name}</h3>
                      {!b.is_active && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>Inactive</span>}
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium capitalize"
                      style={{ background: lc.bg, color: lc.color }}>{b.level}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl" style={{ color: 'var(--green)' }}>AED {b.monthly_fee}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>/month</div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {b.days.map(d => (
                    <span key={d} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
                      {d.slice(0,3)}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--off-white)', color: 'var(--ink-light)' }}>
                    {b.start_time}–{b.end_time}
                  </span>
                </div>

                <div className="text-xs mb-3 flex items-center gap-1" style={{ color: 'var(--ink-light)' }}>
                  <Calendar size={11} /> {b.venue}
                </div>

                {/* Capacity bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--ink-light)' }}>Students</span>
                    <span style={{ color: fillPct >= 90 ? 'var(--red)' : 'var(--black)' }}>{b.students}/{b.max}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--off-white)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${fillPct}%`, background: fillPct >= 90 ? 'var(--red)' : fillPct >= 70 ? 'var(--gold)' : 'var(--green)' }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href="/vendor/attendance"
                    className="flex-1 py-2 rounded-xl text-xs font-medium text-white text-center"
                    style={{ background: 'var(--green)' }}>
                    📋 Attendance
                  </Link>
                  <Link href="/vendor/fees"
                    className="flex-1 py-2 rounded-xl text-xs font-medium text-white text-center"
                    style={{ background: 'var(--gold)' }}>
                    💰 Fees
                  </Link>
                  <button className="flex-1 py-2 rounded-xl text-xs text-center"
                    style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                    Edit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
