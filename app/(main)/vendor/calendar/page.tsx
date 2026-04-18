'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const SLOTS = ['Lane 1', 'Lane 2', 'Lane 3', 'Indoor Net A', 'Indoor Net B']
const HOURS = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']

// Demo bookings
const BOOKINGS = [
  { id: '1', slot: 'Lane 1', date: '', time: '07:00', duration: 1, customer: 'Ahmed K.', players: 3, amount: 150, status: 'confirmed', type: 'online' },
  { id: '2', slot: 'Lane 1', date: '', time: '09:00', duration: 1, customer: 'Rohan P.', players: 5, amount: 150, status: 'confirmed', type: 'online' },
  { id: '3', slot: 'Lane 2', date: '', time: '07:00', duration: 2, customer: 'ICC Academy (Batch)', players: 12, amount: 300, status: 'confirmed', type: 'recurring' },
  { id: '4', slot: 'Lane 3', date: '', time: '18:00', duration: 1, customer: 'Walk-in', players: 2, amount: 150, status: 'walkin', type: 'walkin' },
  { id: '5', slot: 'Indoor Net A', date: '', time: '20:00', duration: 1, customer: 'Mohammad Z.', players: 1, amount: 200, status: 'pending', type: 'online' },
  { id: '6', slot: 'Indoor Net B', date: '', time: '19:00', duration: 2, customer: 'Elite Batch', players: 8, amount: 400, status: 'confirmed', type: 'recurring' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: '#009A44', color: 'white', label: 'Confirmed' },
  pending:   { bg: '#C8961E', color: 'white', label: 'Pending' },
  walkin:    { bg: '#1a6fa8', color: 'white', label: 'Walk-in' },
  recurring: { bg: '#6b21a8', color: 'white', label: 'Recurring' },
  blocked:   { bg: '#666', color: 'white', label: 'Blocked' },
}

export default function CalendarPage() {
  const { user } = useAuth()
  const [view, setView] = useState<'day' | 'week'>('day')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [showWalkin, setShowWalkin] = useState(false)
  const [walkin, setWalkin] = useState({ slot: 'Lane 1', time: '07:00', duration: 1, customer: '', phone: '', players: 1, amount: 150 })

  const prevDay = () => {
    const d = new Date(date); d.setDate(d.getDate() - 1)
    setDate(d.toISOString().split('T')[0])
  }
  const nextDay = () => {
    const d = new Date(date); d.setDate(d.getDate() + 1)
    setDate(d.toISOString().split('T')[0])
  }

  const totalRevenue = BOOKINGS.reduce((s, b) => s + b.amount, 0)
  const confirmed = BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'walkin').length
  const pending = BOOKINGS.filter(b => b.status === 'pending').length

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-10">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h1 className="font-display text-4xl text-white">Booking Calendar</h1>
            <div className="flex gap-2">
              <button onClick={() => setView('day')} className="px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: view === 'day' ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>Day</button>
              <button onClick={() => setView('week')} className="px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: view === 'week' ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>Week</button>
              <button onClick={() => setShowWalkin(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white"
                style={{ background: 'var(--green)' }}>
                <Plus size={13} /> Walk-in
              </button>
            </div>
          </div>

          {/* Date nav */}
          <div className="flex items-center gap-3 mb-5">
            <button onClick={prevDay} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <ChevronLeft size={16} />
            </button>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none font-medium"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
            <button onClick={nextDay} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <ChevronRight size={16} />
            </button>
            <div className="text-sm text-white ml-2">
              {new Date(date).toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          {/* Today stats */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Today's Revenue", value: `AED ${totalRevenue}`, color: 'var(--green)' },
              { label: 'Confirmed', value: confirmed, color: 'var(--green)' },
              { label: 'Pending', value: pending, color: 'var(--gold)' },
              { label: 'Total Bookings', value: BOOKINGS.length, color: 'var(--red)' },
            ].map(s => (
              <div key={s.label} className="rounded-xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="font-display text-xl" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Walk-in modal */}
      {showWalkin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: 'var(--white)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Add Walk-in Booking</h2>
            <div className="space-y-3">
              {[
                { label: 'Customer Name', key: 'customer', placeholder: 'Customer name', type: 'text' },
                { label: 'Phone', key: 'phone', placeholder: '+971 50 000 0000', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>{f.label}</label>
                  <input value={(walkin as Record<string, string | number>)[f.key] as string} onChange={e => setWalkin(w => ({ ...w, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} type={f.type}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Slot</label>
                  <select value={walkin.slot} onChange={e => setWalkin(w => ({ ...w, slot: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                    {SLOTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Time</label>
                  <select value={walkin.time} onChange={e => setWalkin(w => ({ ...w, time: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                    {HOURS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Duration (hrs)</label>
                  <select value={walkin.duration} onChange={e => setWalkin(w => ({ ...w, duration: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                    {[1,2,3].map(d => <option key={d} value={d}>{d} hr{d > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Players</label>
                  <input type="number" min={1} max={11} value={walkin.players} onChange={e => setWalkin(w => ({ ...w, players: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--ink-mid)' }}>Amount (AED)</label>
                <input type="number" value={walkin.amount} onChange={e => setWalkin(w => ({ ...w, amount: Number(e.target.value) }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowWalkin(false)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Cancel</button>
              <button onClick={() => setShowWalkin(false)} className="flex-1 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--green)' }}>
                ✓ Add Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="container-uae py-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {Object.entries(STATUS_COLORS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded" style={{ background: val.bg }} />
              <span style={{ color: 'var(--ink-mid)' }}>{val.label}</span>
            </div>
          ))}
        </div>

        {/* Slot × Time grid */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {/* Header */}
          <div className="grid" style={{ gridTemplateColumns: '80px repeat(5, 1fr)', background: 'var(--black)' }}>
            <div className="p-3 text-xs font-mono-dm" style={{ color: 'rgba(255,255,255,0.4)' }}>Time</div>
            {SLOTS.map(s => (
              <div key={s} className="p-3 text-xs font-medium text-center text-white border-l" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>{s}</div>
            ))}
          </div>

          {/* Time rows */}
          {HOURS.slice(0, 12).map((h, hi) => (
            <div key={h} className="grid" style={{ gridTemplateColumns: '80px repeat(5, 1fr)', borderBottom: '1px solid var(--border)' }}>
              <div className="p-2 text-xs font-mono-dm flex items-center" style={{ color: 'var(--ink-light)', background: 'var(--off-white)' }}>{h}</div>
              {SLOTS.map(slot => {
                const booking = BOOKINGS.find(b => b.slot === slot && b.time === h)
                const sc = booking ? STATUS_COLORS[booking.status] : null
                return (
                  <div key={slot} className="p-1 border-l min-h-12 relative" style={{ borderColor: 'var(--border)', background: 'var(--white)' }}>
                    {booking && sc && (
                      <div className="rounded-lg p-1.5 h-full"
                        style={{ background: sc.bg, cursor: 'pointer' }}>
                        <div className="text-xs font-medium leading-tight" style={{ color: sc.color, fontSize: 10 }}>
                          {booking.customer}
                        </div>
                        <div className="text-xs" style={{ color: sc.color, opacity: 0.8, fontSize: 9 }}>
                          {booking.players}p · AED {booking.amount}
                        </div>
                      </div>
                    )}
                    {!booking && (
                      <button onClick={() => { setWalkin(w => ({ ...w, slot, time: h })); setShowWalkin(true) }}
                        className="absolute inset-0 w-full opacity-0 hover:opacity-100 flex items-center justify-center rounded-lg transition-all"
                        style={{ background: 'rgba(0,154,68,0.1)' }}>
                        <Plus size={14} style={{ color: 'var(--green)' }} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Today's bookings list */}
        <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: 'var(--black)' }}>Today&apos;s Bookings</h2>
        <div className="space-y-3">
          {BOOKINGS.map(b => {
            const sc = STATUS_COLORS[b.status]
            return (
              <div key={b.id} className="rounded-2xl p-4 flex flex-wrap items-center gap-4"
                style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: sc.bg }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{b.customer}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>
                    {b.slot} · {b.time} · {b.duration}hr · {b.players} players
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {b.amount}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
