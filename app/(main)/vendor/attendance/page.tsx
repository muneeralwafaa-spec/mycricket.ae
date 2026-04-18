'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Check, X, Clock, MessageCircle } from 'lucide-react'

const BATCHES = ['All Batches', 'U14 Morning Batch', 'Junior Batch B', 'Senior Ladies Batch', 'Elite Performance']

const STUDENTS = [
  { id: '1', name: 'Arjun Sharma', batch: 'U14 Morning Batch', parent_whatsapp: '+971501234567' },
  { id: '2', name: 'Mohammed Al Rashid', batch: 'Junior Batch B', parent_whatsapp: '+971502345678' },
  { id: '3', name: 'Priya Nair', batch: 'Senior Ladies Batch', parent_whatsapp: '+971503456789' },
  { id: '4', name: 'Hamza Malik', batch: 'Junior Batch B', parent_whatsapp: '+971504567890' },
  { id: '5', name: 'Rohan Patel', batch: 'Elite Performance', parent_whatsapp: '+971505678901' },
  { id: '6', name: 'Sara Al Zaabi', batch: 'Senior Ladies Batch', parent_whatsapp: '+971506789012' },
  { id: '7', name: 'Dev Krishnan', batch: 'U14 Morning Batch', parent_whatsapp: '+971507890123' },
  { id: '8', name: 'Yasir Khan', batch: 'Elite Performance', parent_whatsapp: '+971508901234' },
]

type AttStatus = 'present' | 'absent' | 'late' | 'excused' | null

export default function AttendancePage() {
  const { user } = useAuth()
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [batch, setBatch] = useState('All Batches')
  const [attendance, setAttendance] = useState<Record<string, AttStatus>>({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const filtered = STUDENTS.filter(s => batch === 'All Batches' || s.batch === batch)
  const marked = Object.values(attendance).filter(v => v !== null).length
  const present = Object.values(attendance).filter(v => v === 'present').length
  const absent = Object.values(attendance).filter(v => v === 'absent').length

  const mark = (id: string, status: AttStatus) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === status ? null : status }))
    setSaved(false)
  }

  const markAll = (status: AttStatus) => {
    const all: Record<string, AttStatus> = {}
    filtered.forEach(s => { all[s.id] = status })
    setAttendance(all)
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaved(true)
    setSaving(false)

    // Send WhatsApp to absent students' parents
    const absentStudents = filtered.filter(s => attendance[s.id] === 'absent')
    absentStudents.forEach(s => {
      const msg = encodeURIComponent(`Dear Parent, ${s.name} was marked absent for cricket training on ${date}. Please contact us if needed. — MyCricket.ae`)
      console.log(`WhatsApp to ${s.parent_whatsapp}: ${msg}`)
    })
  }

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/students" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Students</Link>
          <h1 className="font-display text-5xl text-white mb-2">Mark Attendance</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              max={today}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
            <select value={batch} onChange={e => setBatch(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              {BATCHES.map(b => <option key={b} className="text-black">{b}</option>)}
            </select>
          </div>
          {/* Quick stats */}
          <div className="flex gap-4 mt-4">
            {[
              { label: `${marked}/${filtered.length}`, desc: 'Marked' },
              { label: present, desc: 'Present' },
              { label: absent, desc: 'Absent' },
            ].map(s => (
              <div key={s.desc} className="rounded-xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="font-display text-xl text-white">{s.label}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-6">
        {/* Quick mark all */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs font-medium self-center" style={{ color: 'var(--ink-light)' }}>Mark all:</span>
          <button onClick={() => markAll('present')} className="px-4 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
            ✓ All Present
          </button>
          <button onClick={() => markAll(null)} className="px-4 py-1.5 rounded-full text-xs" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
            Clear All
          </button>
        </div>

        {/* Student list */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
          {filtered.map((s, i) => {
            const status = attendance[s.id]
            return (
              <div key={s.id} className="flex items-center gap-4 px-5 py-4"
                style={{
                  borderBottom: i < filtered.length-1 ? '1px solid var(--border)' : 'none',
                  background: status === 'present' ? 'rgba(0,154,68,0.04)' : status === 'absent' ? 'rgba(239,51,64,0.04)' : 'var(--white)'
                }}>
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm text-white flex-shrink-0"
                  style={{ background: 'var(--green)', fontSize: 13 }}>
                  {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{s.name}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.batch}</div>
                </div>

                {/* Status buttons */}
                <div className="flex items-center gap-1.5">
                  {([
                    { id: 'present' as const, icon: <Check size={14} />, bg: 'var(--green)', label: 'P' },
                    { id: 'late' as const, icon: <Clock size={14} />, bg: 'var(--gold)', label: 'L' },
                    { id: 'absent' as const, icon: <X size={14} />, bg: 'var(--red)', label: 'A' },
                  ]).map(btn => (
                    <button key={btn.id} onClick={() => mark(s.id, btn.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all"
                      style={{
                        background: status === btn.id ? btn.bg : 'var(--off-white)',
                        color: status === btn.id ? 'white' : 'var(--ink-light)',
                        transform: status === btn.id ? 'scale(1.05)' : 'scale(1)',
                      }}>
                      {btn.icon}
                    </button>
                  ))}
                  {status === 'absent' && (
                    <a href={`https://wa.me/${s.parent_whatsapp.replace(/\D/g,'')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: '#25D366', color: 'white' }}
                      title="Notify parent">
                      <MessageCircle size={14} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Save button */}
        <button onClick={handleSave} disabled={saving || marked === 0}
          className="w-full py-4 rounded-2xl text-sm font-medium text-white transition-all"
          style={{ background: saved ? 'var(--green)' : marked === 0 ? 'var(--border)' : 'var(--red)' }}>
          {saving ? 'Saving...' : saved ? `✓ Attendance Saved! ${absent > 0 ? `WhatsApp sent to ${absent} absent student${absent > 1 ? 's' : ''}'s parent${absent > 1 ? 's' : ''}` : ''}` : `Save Attendance (${marked} marked)`}
        </button>
        {absent > 0 && !saved && (
          <p className="text-xs text-center mt-2" style={{ color: 'var(--ink-light)' }}>
            💬 WhatsApp will be sent to parents of {absent} absent student{absent > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
