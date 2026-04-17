'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

interface Facility {
  id: string; name: string; type: string; emirate: string; area: string; description: string
  vendor: { business_name: string; phone: string; whatsapp: string; rating: number; is_verified: boolean }
  slots: { id: string; name: string; price_aed: number; duration_mins: number; open_time: string; close_time: string }[]
}

const TIMES = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']

export default function BookNetsPage() {
  const { user } = useAuth()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Facility | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; name: string; price_aed: number; duration_mins: number } | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [players, setPlayers] = useState(1)
  const [booking, setBooking] = useState(false)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
    fetch('/api/facilities?type=nets').then(r => r.json()).then(d => {
      if (d.data) setFacilities(d.data)
    }).finally(() => setLoading(false))
  }, [])

  // Demo facilities if no Supabase data
  const demoFacilities: Facility[] = [
    { id: '1', name: 'ICC Cricket Academy — Lane 1', type: 'nets', emirate: 'Dubai', area: 'Dubai Sports City', description: '2 floodlit ovals, 36 practice pitches. Hawk-Eye technology. Home of UAE national team.', vendor: { business_name: 'ICC Cricket Academy', phone: '+971 54 305 7133', whatsapp: '+971543057133', rating: 4.9, is_verified: true }, slots: [{ id: 's1', name: 'Lane 1', price_aed: 150, duration_mins: 60, open_time: '06:00', close_time: '23:00' }, { id: 's2', name: 'Lane 2', price_aed: 150, duration_mins: 60, open_time: '06:00', close_time: '23:00' }, { id: 's3', name: 'Indoor Net A', price_aed: 200, duration_mins: 60, open_time: '07:00', close_time: '22:00' }] },
    { id: '2', name: 'Abu Dhabi Cricket — Practice Nets', type: 'nets', emirate: 'Abu Dhabi', area: 'Zayed Cricket Stadium', description: 'World-class nets at Zayed Cricket Stadium. Professional standard surfaces.', vendor: { business_name: 'Abu Dhabi Cricket', phone: '+971 2 558 8228', whatsapp: '+97125588228', rating: 4.8, is_verified: true }, slots: [{ id: 's4', name: 'Net Bay 1', price_aed: 120, duration_mins: 60, open_time: '07:00', close_time: '22:00' }, { id: 's5', name: 'Net Bay 2', price_aed: 120, duration_mins: 60, open_time: '07:00', close_time: '22:00' }] },
    { id: '3', name: 'Sharjah Cricket Stadium Nets', type: 'nets', emirate: 'Sharjah', area: 'Sharjah Cricket Stadium', description: 'Practice at the iconic Sharjah Cricket Stadium. Turf and matting nets.', vendor: { business_name: 'Sharjah Cricket Association', phone: '', whatsapp: '', rating: 4.6, is_verified: true }, slots: [{ id: 's6', name: 'Turf Net', price_aed: 100, duration_mins: 60, open_time: '07:00', close_time: '21:00' }, { id: 's7', name: 'Matting Net', price_aed: 80, duration_mins: 60, open_time: '07:00', close_time: '21:00' }] },
    { id: '4', name: 'G Force Cricket Nets', type: 'nets', emirate: 'Dubai', area: 'Dubai Sports City', description: 'Indoor nets at G Force Cricket Academy. Climate controlled.', vendor: { business_name: 'G Force Cricket Academy', phone: '+971 55 226 5549', whatsapp: '+97155226549', rating: 4.8, is_verified: true }, slots: [{ id: 's8', name: 'Indoor Net 1', price_aed: 130, duration_mins: 60, open_time: '07:00', close_time: '22:00' }] },
  ]

  const displayFacilities = facilities.length > 0 ? facilities : demoFacilities
  const filtered = filter === 'All' ? displayFacilities : displayFacilities.filter(f => f.emirate === filter)

  const calcEndTime = (start: string, mins: number) => {
    const [h, m] = start.split(':').map(Number)
    const end = new Date(0, 0, 0, h, m + mins)
    return `${String(end.getHours()).padStart(2,'0')}:${String(end.getMinutes()).padStart(2,'0')}`
  }

  const handleBook = async () => {
    if (!user) { window.location.href = '/login'; return }
    if (!selected || !selectedSlot || !date || !time) return
    setBooking(true)
    try {
      const endTime = calcEndTime(time, selectedSlot.duration_mins)
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendor_id: selected.id,
          booking_type: 'facility',
          facility_id: selected.id,
          slot_id: selectedSlot.id,
          booking_date: date,
          start_time: `${time}:00`,
          end_time: `${endTime}:00`,
          duration_mins: selectedSlot.duration_mins,
          num_players: players,
          total_aed: selectedSlot.price_aed,
          payment_method: 'telr'
        })
      })
      if (res.ok) window.location.href = '/book/confirmed'
    } finally { setBooking(false) }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Book Now</div>
          <h1 className="font-display text-5xl text-white mb-2">Cricket Nets & Grounds</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Book cricket nets across Dubai, Abu Dhabi, Sharjah and all UAE</p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2 flex-wrap">
          {['All', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Facility list */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? <div className="text-center py-10" style={{ color: 'var(--ink-light)' }}>Loading facilities...</div>
            : filtered.map(f => (
              <div key={f.id} onClick={() => { setSelected(f); setSelectedSlot(null) }}
                className="rounded-2xl p-5 cursor-pointer transition-all"
                style={{ background: 'var(--white)', border: selected?.id === f.id ? '2px solid var(--red)' : '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{f.name}</h3>
                      {f.vendor.is_verified && <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ background: 'var(--green)', fontSize: 9 }}>✓</span>}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>📍 {f.area}, {f.emirate} · ⭐ {f.vendor.rating}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-xl" style={{ color: 'var(--green)' }}>
                      from AED {Math.min(...f.slots.map(s => s.price_aed))}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>per hour</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>{f.description}</p>

                {/* Slots */}
                <div className="flex flex-wrap gap-2">
                  {f.slots.map(s => (
                    <button key={s.id}
                      onClick={e => { e.stopPropagation(); setSelected(f); setSelectedSlot(s) }}
                      className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
                      style={{
                        background: selectedSlot?.id === s.id ? 'var(--red)' : 'var(--off-white)',
                        color: selectedSlot?.id === s.id ? 'white' : 'var(--black)',
                        border: `1px solid ${selectedSlot?.id === s.id ? 'var(--red)' : 'var(--border)'}`,
                      }}>
                      {s.name} — AED {s.price_aed}/hr
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking panel */}
          <div>
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: 'var(--white)', border: '2px solid var(--red)' }}>
              <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Book a Net</h3>
              {!selected ? (
                <p className="text-sm text-center py-6" style={{ color: 'var(--ink-light)' }}>← Select a facility to book</p>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--off-white)' }}>
                    <div className="text-xs font-mono-dm uppercase mb-0.5" style={{ color: 'var(--ink-light)' }}>Selected</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{selected.name}</div>
                    {selectedSlot && <div className="text-xs mt-0.5" style={{ color: 'var(--green)' }}>{selectedSlot.name} — AED {selectedSlot.price_aed}/hr</div>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Start Time</label>
                    <select value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="">Select time</option>
                      {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Players</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setPlayers(Math.max(1, players-1))} className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--off-white)', color: 'var(--black)' }}>−</button>
                      <span className="font-display text-2xl" style={{ color: 'var(--black)' }}>{players}</span>
                      <button onClick={() => setPlayers(Math.min(11, players+1))} className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--off-white)', color: 'var(--black)' }}>+</button>
                    </div>
                  </div>

                  {selectedSlot && date && time && (
                    <div className="rounded-xl p-4" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--green-dark)' }}>Booking summary</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium" style={{ color: 'var(--green-dark)' }}>
                        <span>{date} · {time}–{calcEndTime(time, selectedSlot.duration_mins)}</span>
                        <span>AED {selectedSlot.price_aed}</span>
                      </div>
                    </div>
                  )}

                  <button onClick={handleBook} disabled={!selectedSlot || !date || !time || booking}
                    className="w-full py-3.5 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: selectedSlot && date && time ? 'var(--red)' : 'var(--border)', cursor: selectedSlot && date && time ? 'pointer' : 'not-allowed' }}>
                    {booking ? 'Booking...' : user ? '🏏 Book Now' : '🔐 Sign In to Book'}
                  </button>
                  {selected.vendor.whatsapp && (
                    <a href={`https://wa.me/${selected.vendor.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      className="block text-center py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: '#25D366' }}>
                      💬 WhatsApp to Book
                    </a>
                  )}
                  <p className="text-xs text-center" style={{ color: 'var(--ink-light)' }}>Free cancellation up to 24hrs before</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
