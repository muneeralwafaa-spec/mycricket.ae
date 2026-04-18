'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Search, Plus, Phone, MessageCircle, Filter } from 'lucide-react'
export const dynamic = 'force-dynamic'

interface Student {
  id: string; full_name: string; age: number; gender: string; skill_level: string
  parent_name: string; parent_phone: string; parent_whatsapp: string
  status: string; join_date: string; batch?: string; phone?: string
  batting_style?: string; nationality?: string
}

const SKILL_COLORS: Record<string, { bg: string; color: string }> = {
  beginner:     { bg: '#E6F7ED', color: '#009A44' },
  intermediate: { bg: '#FDF3DC', color: '#C8961E' },
  advanced:     { bg: '#FDEAEB', color: '#EF3340' },
  elite:        { bg: '#1a1a2e', color: '#fff' },
}

// Demo students
const DEMO_STUDENTS: Student[] = [
  { id: '1', full_name: 'Arjun Sharma', age: 12, gender: 'male', skill_level: 'intermediate', parent_name: 'Raj Sharma', parent_phone: '+971501234567', parent_whatsapp: '+971501234567', status: 'active', join_date: '2025-09-01', batch: 'U14 Morning Batch', batting_style: 'right', nationality: 'Indian' },
  { id: '2', full_name: 'Mohammed Al Rashid', age: 10, gender: 'male', skill_level: 'beginner', parent_name: 'Ahmed Al Rashid', parent_phone: '+971502345678', parent_whatsapp: '+971502345678', status: 'active', join_date: '2025-10-15', batch: 'Junior Batch B', batting_style: 'right', nationality: 'Emirati' },
  { id: '3', full_name: 'Priya Nair', age: 14, gender: 'female', skill_level: 'advanced', parent_name: 'Suresh Nair', parent_phone: '+971503456789', parent_whatsapp: '+971503456789', status: 'active', join_date: '2025-08-01', batch: 'Senior Ladies Batch', batting_style: 'left', nationality: 'Indian' },
  { id: '4', full_name: 'Hamza Malik', age: 9, gender: 'male', skill_level: 'beginner', parent_name: 'Tariq Malik', parent_phone: '+971504567890', parent_whatsapp: '+971504567890', status: 'active', join_date: '2026-01-10', batch: 'Junior Batch B', batting_style: 'right', nationality: 'Pakistani' },
  { id: '5', full_name: 'Rohan Patel', age: 16, gender: 'male', skill_level: 'elite', parent_name: 'Deepak Patel', parent_phone: '+971505678901', parent_whatsapp: '+971505678901', status: 'active', join_date: '2024-03-01', batch: 'Elite Performance', batting_style: 'right', nationality: 'Indian' },
  { id: '6', full_name: 'Sara Al Zaabi', age: 13, gender: 'female', skill_level: 'intermediate', parent_name: 'Khalid Al Zaabi', parent_phone: '+971506789012', parent_whatsapp: '+971506789012', status: 'active', join_date: '2025-11-01', batch: 'Senior Ladies Batch', batting_style: 'right', nationality: 'Emirati' },
  { id: '7', full_name: 'Dev Krishnan', age: 11, gender: 'male', skill_level: 'beginner', parent_name: 'Vijay Krishnan', parent_phone: '+971507890123', parent_whatsapp: '+971507890123', status: 'inactive', join_date: '2025-06-01', batch: 'U14 Morning Batch', batting_style: 'left', nationality: 'Indian' },
  { id: '8', full_name: 'Yasir Khan', age: 15, gender: 'male', skill_level: 'advanced', parent_name: 'Imran Khan', parent_phone: '+971508901234', parent_whatsapp: '+971508901234', status: 'active', join_date: '2025-02-15', batch: 'Elite Performance', batting_style: 'right', nationality: 'Pakistani' },
]

export default function StudentsPage() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')

  useEffect(() => {
    if (!user) return
    // Try Supabase, fall back to demo
    fetch('/api/vendor/students').then(r => r.json()).then(d => {
      setStudents(d.data?.length > 0 ? d.data : DEMO_STUDENTS)
    }).catch(() => setStudents(DEMO_STUDENTS)).finally(() => setLoading(false))
  }, [user])

  const filtered = students.filter(s => {
    if (filter !== 'all' && s.status !== filter) return false
    if (levelFilter !== 'all' && s.skill_level !== levelFilter) return false
    if (search && !s.full_name.toLowerCase().includes(search.toLowerCase()) &&
        !s.parent_name?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const active = students.filter(s => s.status === 'active').length

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-5xl text-white mb-1">Students</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {active} active · {students.length} total
              </p>
            </div>
            <Link href="/vendor/students/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ background: 'var(--red)' }}>
              <Plus size={15} /> Add Student
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Active', value: students.filter(s => s.status === 'active').length, color: 'var(--green)' },
              { label: 'Beginners', value: students.filter(s => s.skill_level === 'beginner').length, color: 'var(--gold)' },
              { label: 'Advanced+', value: students.filter(s => ['advanced','elite'].includes(s.skill_level)).length, color: 'var(--red)' },
              { label: 'This Month', value: students.filter(s => s.join_date >= new Date(new Date().setDate(1)).toISOString().split('T')[0]).length, color: 'var(--green)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-3xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-xs"
            style={{ border: '1px solid var(--border)' }}>
            <Search size={14} style={{ color: 'var(--ink-light)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search students or parents..."
              className="flex-1 text-xs outline-none bg-transparent" style={{ color: 'var(--black)' }} />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['all', 'active', 'inactive'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
                style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
                {f}
              </button>
            ))}
          </div>
          <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
            className="px-3 py-1.5 rounded-full text-xs outline-none"
            style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="elite">Elite</option>
          </select>
          <Link href="/vendor/attendance" className="ml-auto px-4 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
            📋 Mark Attendance
          </Link>
        </div>
      </div>

      <div className="container-uae py-6">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">👨‍🎓</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>No students yet</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
              Add your students to manage their enrolments, attendance, fees and progress all in one place.
            </p>
            <Link href="/vendor/students/new" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              Add First Student
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(s => {
              const sc = SKILL_COLORS[s.skill_level] || SKILL_COLORS.beginner
              return (
                <div key={s.id} className="rounded-2xl p-4 flex flex-wrap items-center gap-4"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg text-white flex-shrink-0"
                    style={{ background: s.gender === 'female' ? '#e91e8c' : 'var(--green)', fontSize: 18 }}>
                    {s.full_name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <Link href={`/vendor/students/${s.id}`} className="text-sm font-medium hover:underline" style={{ color: 'var(--black)' }}>
                        {s.full_name}
                      </Link>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                        style={{ background: sc.bg, color: sc.color }}>{s.skill_level}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                        style={{ background: s.status === 'active' ? 'var(--green-light)' : 'var(--red-light)', color: s.status === 'active' ? 'var(--green)' : 'var(--red)' }}>
                        {s.status}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                      Age {s.age} · {s.nationality} · {s.batting_style}-hand · {s.batch || 'No batch'}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                      Parent: {s.parent_name} · {s.parent_phone}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a href={`https://wa.me/${s.parent_whatsapp?.replace(/\D/g,'')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: '#25D366', color: 'white' }} title="WhatsApp Parent">
                      <MessageCircle size={15} />
                    </a>
                    <a href={`tel:${s.parent_phone}`}
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }} title="Call Parent">
                      <Phone size={15} />
                    </a>
                    <Link href={`/vendor/students/${s.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-medium"
                      style={{ background: 'var(--off-white)', color: 'var(--black)', border: '1px solid var(--border)' }}>
                      View →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Quick actions bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { href: '/vendor/attendance', icon: '📋', label: 'Mark Attendance', color: 'var(--green)' },
            { href: '/vendor/fees', icon: '💰', label: 'Fee Collection', color: 'var(--gold)' },
            { href: '/vendor/batches', icon: '👥', label: 'Manage Batches', color: 'var(--red)' },
            { href: '/vendor/students/new', icon: '➕', label: 'Add Student', color: 'var(--black)' },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className="rounded-2xl p-4 text-center card-hover"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{a.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
