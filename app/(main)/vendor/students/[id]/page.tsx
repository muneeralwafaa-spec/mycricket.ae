'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Edit, Calendar, DollarSign, BookOpen, TrendingUp } from 'lucide-react'

// Demo student detail
const DEMO_STUDENT = {
  id: '1', full_name: 'Arjun Sharma', age: 12, gender: 'male',
  skill_level: 'intermediate', parent_name: 'Raj Sharma',
  parent_phone: '+971501234567', parent_whatsapp: '+971501234567',
  parent_email: 'raj.sharma@gmail.com', status: 'active',
  join_date: '2025-09-01', batch: 'U14 Morning Batch',
  batting_style: 'right', bowling_style: 'right-arm-medium',
  nationality: 'Indian', school: 'GEMS Wellington Academy',
  notes: 'Very dedicated student. Shows good improvement in batting. Needs work on footwork.',
  attendance_pct: 87, sessions_this_month: 8, fees_status: 'paid',
}

const RECENT_ATTENDANCE = [
  { date: '2026-04-17', status: 'present' },
  { date: '2026-04-15', status: 'present' },
  { date: '2026-04-13', status: 'absent' },
  { date: '2026-04-10', status: 'present' },
  { date: '2026-04-08', status: 'present' },
  { date: '2026-04-06', status: 'late' },
]

const PROGRESS_NOTES = [
  { date: '2026-04-15', category: 'Batting', notes: 'Excellent cover drive today. Square cut needs work.', rating: 4 },
  { date: '2026-04-10', category: 'Fitness', notes: 'Improved agility. Suggest more cardio.', rating: 3 },
  { date: '2026-04-06', category: 'Bowling', notes: 'Good length bowling. Work on yorkers.', rating: 4 },
]

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'fees' | 'progress'>('overview')
  const s = DEMO_STUDENT

  const statusColors: Record<string, { bg: string; color: string }> = {
    present: { bg: '#E6F7ED', color: '#009A44' },
    absent: { bg: '#FDEAEB', color: '#EF3340' },
    late: { bg: '#FDF3DC', color: '#C8961E' },
    excused: { bg: '#F5F5F5', color: '#666' },
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/students" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Students</Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display text-2xl text-white flex-shrink-0"
                style={{ background: 'var(--green)', fontSize: 20 }}>
                {s.full_name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div>
                <h1 className="font-display text-4xl text-white mb-1">{s.full_name}</h1>
                <div className="flex items-center gap-2 flex-wrap text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span>Age {s.age}</span><span>·</span>
                  <span className="capitalize">{s.skill_level}</span><span>·</span>
                  <span>{s.batch}</span><span>·</span>
                  <span className="capitalize" style={{ color: 'var(--green)' }}>{s.status}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`https://wa.me/${s.parent_whatsapp.replace(/\D/g,'')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: '#25D366' }}>
                <MessageCircle size={14} /> WhatsApp Parent
              </a>
              <a href={`tel:${s.parent_phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--green)' }}>
                <Phone size={14} /> Call
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Attendance', value: `${s.attendance_pct}%`, color: s.attendance_pct >= 75 ? 'var(--green)' : 'var(--red)' },
              { label: 'Sessions This Month', value: s.sessions_this_month, color: 'var(--gold)' },
              { label: 'Fees Status', value: s.fees_status === 'paid' ? '✓ Paid' : '⚠ Due', color: s.fees_status === 'paid' ? 'var(--green)' : 'var(--red)' },
              { label: 'Member Since', value: new Date(s.join_date).toLocaleDateString('en-AE', { month: 'short', year: 'numeric' }), color: 'var(--gold)' },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae flex gap-1 py-2">
          {([
            { id: 'overview', icon: '👤', label: 'Overview' },
            { id: 'attendance', icon: '📋', label: 'Attendance' },
            { id: 'fees', icon: '💰', label: 'Fees' },
            { id: 'progress', icon: '📈', label: 'Progress' },
          ] as { id: typeof activeTab; icon: string; label: string }[]).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: activeTab === t.id ? 'var(--red)' : 'transparent', color: activeTab === t.id ? 'white' : 'var(--ink-mid)' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Student Details</h2>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', value: s.full_name },
                  { label: 'Date of Birth', value: s.join_date },
                  { label: 'Nationality', value: s.nationality },
                  { label: 'School', value: s.school },
                  { label: 'Batting Style', value: `${s.batting_style}-hand` },
                  { label: 'Bowling Style', value: s.bowling_style?.replace(/-/g, ' ') || 'N/A' },
                  { label: 'Current Batch', value: s.batch },
                ].map(d => (
                  <div key={d.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>{d.label}</span>
                    <span className="text-sm capitalize" style={{ color: 'var(--black)' }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Parent / Guardian</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Name', value: s.parent_name },
                    { label: 'Phone', value: s.parent_phone },
                    { label: 'Email', value: s.parent_email },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>{d.label}</span>
                      <span className="text-sm" style={{ color: 'var(--black)' }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {s.notes && (
                <div className="rounded-2xl p-4" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                  <div className="text-xs font-mono-dm uppercase mb-2" style={{ color: 'var(--ink-light)' }}>Notes</div>
                  <p className="text-sm" style={{ color: 'var(--ink)' }}>{s.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Attendance tab */}
        {activeTab === 'attendance' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-3xl" style={{ color: 'var(--black)' }}>Attendance Record</h2>
              <Link href="/vendor/attendance"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--green)' }}>
                📋 Mark Today
              </Link>
            </div>
            <div className="rounded-2xl p-5 mb-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'Overall', value: `${s.attendance_pct}%`, color: 'var(--green)' },
                  { label: 'Present', value: `${Math.round(RECENT_ATTENDANCE.filter(a => a.status === 'present').length / RECENT_ATTENDANCE.length * 100)}%`, color: 'var(--green)' },
                  { label: 'Absent', value: `${RECENT_ATTENDANCE.filter(a => a.status === 'absent').length}`, color: 'var(--red)' },
                  { label: 'Late', value: `${RECENT_ATTENDANCE.filter(a => a.status === 'late').length}`, color: 'var(--gold)' },
                ].map(stat => (
                  <div key={stat.label} className="rounded-xl p-3 text-center min-w-20" style={{ background: 'var(--off-white)' }}>
                    <div className="font-display text-2xl mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {RECENT_ATTENDANCE.map((a, i) => {
                const sc = statusColors[a.status] || statusColors.present
                return (
                  <div key={a.date} className="flex items-center justify-between px-5 py-3"
                    style={{ borderBottom: i < RECENT_ATTENDANCE.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                    <span className="text-sm" style={{ color: 'var(--black)' }}>
                      {new Date(a.date).toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full font-medium capitalize"
                      style={{ background: sc.bg, color: sc.color }}>{a.status}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Fees tab */}
        {activeTab === 'fees' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-3xl" style={{ color: 'var(--black)' }}>Fee Payments</h2>
              <Link href="/vendor/fees"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--green)' }}>
                + Record Payment
              </Link>
            </div>
            <div className="rounded-2xl p-5 mb-5" style={{ background: s.fees_status === 'paid' ? 'var(--green-light)' : 'var(--red-light)', border: `1px solid ${s.fees_status === 'paid' ? 'var(--border-green)' : 'rgba(239,51,64,0.2)'}` }}>
              <div className="font-display text-2xl mb-1" style={{ color: s.fees_status === 'paid' ? 'var(--green-dark)' : 'var(--red)' }}>
                {s.fees_status === 'paid' ? '✓ April 2026 — Paid' : '⚠ April 2026 — Due'}
              </div>
              <p className="text-sm" style={{ color: s.fees_status === 'paid' ? 'var(--green-dark)' : 'var(--red)' }}>
                Monthly fee: AED 400 · {s.fees_status === 'paid' ? 'Paid on 2 Apr 2026' : 'Due on 1 Apr 2026'}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {[
                { month: 'April 2026', amount: 400, status: 'paid', date: '2 Apr 2026', method: 'Bank Transfer' },
                { month: 'March 2026', amount: 400, status: 'paid', date: '1 Mar 2026', method: 'Cash' },
                { month: 'February 2026', amount: 400, status: 'paid', date: '3 Feb 2026', method: 'Cash' },
                { month: 'January 2026', amount: 400, status: 'paid', date: '5 Jan 2026', method: 'Cash' },
              ].map((p, i) => (
                <div key={p.month} className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{p.month}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{p.date} · {p.method}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {p.amount}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>Paid</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress tab */}
        {activeTab === 'progress' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-3xl" style={{ color: 'var(--black)' }}>Progress Notes</h2>
              <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--green)' }}>
                + Add Note
              </button>
            </div>
            <div className="space-y-4">
              {PROGRESS_NOTES.map((note, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{note.category}</span>
                      <div className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>
                        {new Date(note.date).toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} style={{ color: star <= note.rating ? 'var(--gold)' : 'var(--border)', fontSize: 16 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--ink)' }}>{note.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
