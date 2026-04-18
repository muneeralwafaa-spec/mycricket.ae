'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { MessageCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const FEE_DATA = [
  { id: '1', student: 'Arjun Sharma', batch: 'U14 Morning Batch', parent: 'Raj Sharma', whatsapp: '+971501234567', phone: '+971501234567', fee: 400, status: 'paid', paid_date: '2 Apr 2026', method: 'Bank Transfer' },
  { id: '2', student: 'Mohammed Al Rashid', batch: 'Junior Batch B', parent: 'Ahmed Al Rashid', whatsapp: '+971502345678', phone: '+971502345678', fee: 350, status: 'paid', paid_date: '5 Apr 2026', method: 'Cash' },
  { id: '3', student: 'Priya Nair', batch: 'Senior Ladies Batch', parent: 'Suresh Nair', whatsapp: '+971503456789', phone: '+971503456789', fee: 400, status: 'overdue', paid_date: null, method: null },
  { id: '4', student: 'Hamza Malik', batch: 'Junior Batch B', parent: 'Tariq Malik', whatsapp: '+971504567890', phone: '+971504567890', fee: 350, status: 'pending', paid_date: null, method: null },
  { id: '5', student: 'Rohan Patel', batch: 'Elite Performance', parent: 'Deepak Patel', whatsapp: '+971505678901', phone: '+971505678901', fee: 600, status: 'paid', paid_date: '1 Apr 2026', method: 'Online' },
  { id: '6', student: 'Sara Al Zaabi', batch: 'Senior Ladies Batch', parent: 'Khalid Al Zaabi', whatsapp: '+971506789012', phone: '+971506789012', fee: 400, status: 'pending', paid_date: null, method: null },
  { id: '7', student: 'Dev Krishnan', batch: 'U14 Morning Batch', parent: 'Vijay Krishnan', whatsapp: '+971507890123', phone: '+971507890123', fee: 400, status: 'overdue', paid_date: null, method: null },
  { id: '8', student: 'Yasir Khan', batch: 'Elite Performance', parent: 'Imran Khan', whatsapp: '+971508901234', phone: '+971508901234', fee: 600, status: 'paid', paid_date: '3 Apr 2026', method: 'Cash' },
]

const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Card', 'Online']

export default function FeesPage() {
  const { user } = useAuth()
  const [month, setMonth] = useState('April')
  const [year, setYear] = useState('2026')
  const [filter, setFilter] = useState('all')
  const [fees, setFees] = useState(FEE_DATA)
  const [recording, setRecording] = useState<{ id: string; method: string } | null>(null)

  const filtered = fees.filter(f => filter === 'all' || f.status === filter)
  const totalCollected = fees.filter(f => f.status === 'paid').reduce((s, f) => s + f.fee, 0)
  const totalPending = fees.filter(f => f.status !== 'paid').reduce((s, f) => s + f.fee, 0)
  const totalStudents = fees.length
  const paidCount = fees.filter(f => f.status === 'paid').length

  const recordPayment = (id: string, method: string) => {
    setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'paid', paid_date: new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' }), method } : f))
    setRecording(null)
  }

  const sendReminder = (f: typeof FEE_DATA[0]) => {
    const msg = encodeURIComponent(`Dear ${f.parent}, this is a friendly reminder that ${f.student}'s cricket training fee of AED ${f.fee} for ${month} ${year} is due. Please contact us to arrange payment. Thank you! — MyCricket.ae`)
    window.open(`https://wa.me/${f.whatsapp.replace(/\D/g,'')}?text=${msg}`, '_blank')
  }

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/students" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Students</Link>
          <h1 className="font-display text-5xl text-white mb-2">Fee Collection</h1>
          <div className="flex gap-3 mt-4">
            <select value={month} onChange={e => setMonth(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              {MONTHS.map(m => <option key={m} className="text-black">{m}</option>)}
            </select>
            <select value={year} onChange={e => setYear(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              {['2025','2026'].map(y => <option key={y} className="text-black">{y}</option>)}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Collected', value: `AED ${totalCollected}`, color: 'var(--green)' },
              { label: 'Pending', value: `AED ${totalPending}`, color: 'var(--red)' },
              { label: 'Paid', value: `${paidCount}/${totalStudents}`, color: 'var(--green)' },
              { label: 'Collection Rate', value: `${Math.round(paidCount/totalStudents*100)}%`, color: paidCount/totalStudents >= 0.8 ? 'var(--green)' : 'var(--gold)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-display text-2xl mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2 flex-wrap items-center">
          {['all', 'paid', 'pending', 'overdue'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f} ({f === 'all' ? fees.length : fees.filter(x => x.status === f).length})
            </button>
          ))}
          {fees.filter(f => f.status !== 'paid').length > 0 && (
            <button onClick={() => fees.filter(f => f.status !== 'paid').forEach(f => sendReminder(f))}
              className="ml-auto px-4 py-1.5 rounded-full text-xs font-medium text-white"
              style={{ background: '#25D366' }}>
              💬 Send All Reminders ({fees.filter(f => f.status !== 'paid').length})
            </button>
          )}
        </div>
      </div>

      <div className="container-uae py-6">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {filtered.map((f, i) => (
            <div key={f.id} className="px-5 py-4"
              style={{ borderBottom: i < filtered.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm text-white flex-shrink-0"
                  style={{ background: f.status === 'paid' ? 'var(--green)' : f.status === 'overdue' ? 'var(--red)' : 'var(--gold)', fontSize: 13 }}>
                  {f.student.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{f.student}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{f.batch} · Parent: {f.parent}</div>
                  {f.status === 'paid' && (
                    <div className="text-xs mt-0.5" style={{ color: 'var(--green)' }}>
                      ✓ Paid {f.paid_date} via {f.method}
                    </div>
                  )}
                </div>

                <div className="font-display text-xl flex-shrink-0" style={{ color: 'var(--black)' }}>AED {f.fee}</div>

                <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize flex-shrink-0"
                  style={{
                    background: f.status === 'paid' ? 'var(--green-light)' : f.status === 'overdue' ? 'var(--red-light)' : '#FDF3DC',
                    color: f.status === 'paid' ? 'var(--green)' : f.status === 'overdue' ? 'var(--red)' : 'var(--gold)'
                  }}>
                  {f.status === 'paid' ? <span className="flex items-center gap-1"><CheckCircle size={10} /> Paid</span> : <span className="flex items-center gap-1"><AlertCircle size={10} /> {f.status}</span>}
                </span>

                {f.status !== 'paid' && (
                  <div className="flex gap-2 flex-shrink-0">
                    {recording?.id === f.id ? (
                      <div className="flex gap-1.5 flex-wrap">
                        {PAYMENT_METHODS.map(m => (
                          <button key={m} onClick={() => recordPayment(f.id, m)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                            style={{ background: 'var(--green)' }}>
                            {m}
                          </button>
                        ))}
                        <button onClick={() => setRecording(null)} className="px-3 py-1.5 rounded-lg text-xs" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => setRecording({ id: f.id, method: 'cash' })}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                          style={{ background: 'var(--green)' }}>
                          ✓ Record Payment
                        </button>
                        <button onClick={() => sendReminder(f)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background: '#25D366', color: 'white' }} title="Send WhatsApp reminder">
                          <MessageCircle size={13} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
