'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Plus, Trash2, Calendar, Clock } from 'lucide-react'
export const dynamic = 'force-dynamic'

export default function VendorFacilityDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [facility, setFacility] = useState<{ name: string; type: string; emirate: string; area: string; is_active: boolean } | null>(null)
  const [slots, setSlots] = useState<{ id: string; name: string; price_aed: number; duration_mins: number; open_time: string; close_time: string; is_active: boolean }[]>([])
  const [blockedDates, setBlockedDates] = useState<{ id: string; block_date: string; reason: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [newBlock, setNewBlock] = useState({ date: '', reason: '' })
  const [showAddSlot, setShowAddSlot] = useState(false)
  const [newSlot, setNewSlot] = useState({ name: '', price_aed: 100, duration_mins: 60, open_time: '06:00', close_time: '23:00' })

  useEffect(() => {
    if (!user) return
    Promise.all([
      fetch(`/api/facilities/${params.id}`).then(r => r.json()),
      fetch(`/api/facilities/${params.id}/slots`).then(r => r.json()),
    ]).then(([fData, sData]) => {
      if (fData.data) setFacility(fData.data)
      if (sData.data) setSlots(sData.data)
    }).finally(() => setLoading(false))
  }, [user, params.id])

  if (!user) return <div className="container-uae py-20 text-center"><Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link></div>

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/facility" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← My Facilities</Link>
          <h1 className="font-display text-4xl text-white mb-1">{loading ? '...' : facility?.name || 'Facility'}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{facility?.type} · {facility?.area}, {facility?.emirate}</p>
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slots management */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl" style={{ color: 'var(--black)' }}>Bookable Slots</h2>
              <button onClick={() => setShowAddSlot(!showAddSlot)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--red)' }}>
                <Plus size={12} /> Add Slot
              </button>
            </div>

            {showAddSlot && (
              <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Slot Name</label>
                    <input value={newSlot.name} onChange={e => setNewSlot(s => ({ ...s, name: e.target.value }))}
                      placeholder="e.g. Lane 1" className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Price (AED/hr)</label>
                    <input type="number" value={newSlot.price_aed} onChange={e => setNewSlot(s => ({ ...s, price_aed: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Opens</label>
                    <input type="time" value={newSlot.open_time} onChange={e => setNewSlot(s => ({ ...s, open_time: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--ink-light)' }}>Closes</label>
                    <input type="time" value={newSlot.close_time} onChange={e => setNewSlot(s => ({ ...s, close_time: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'white' }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (newSlot.name) {
                      setSlots(prev => [...prev, { id: Date.now().toString(), ...newSlot, is_active: true }])
                      setNewSlot({ name: '', price_aed: 100, duration_mins: 60, open_time: '06:00', close_time: '23:00' })
                      setShowAddSlot(false)
                    }
                  }} className="flex-1 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--green)' }}>
                    Add Slot
                  </button>
                  <button onClick={() => setShowAddSlot(false)} className="px-4 py-2 rounded-lg text-xs" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Cancel</button>
                </div>
              </div>
            )}

            {slots.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-sm" style={{ color: 'var(--ink-light)' }}>No slots yet. Add your first bookable slot.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {slots.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{s.name}</div>
                      <div className="flex items-center gap-3 text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                        <span className="flex items-center gap-1"><Clock size={10} /> {s.open_time}–{s.close_time}</span>
                        <span>{s.duration_mins}min slots</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {s.price_aed}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.is_active ? 'var(--green-light)' : 'var(--red-light)', color: s.is_active ? 'var(--green)' : 'var(--red)' }}>
                        {s.is_active ? 'Active' : 'Off'}
                      </span>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blocked dates */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Block Dates</h2>
            <p className="text-xs mb-4" style={{ color: 'var(--ink-light)' }}>Block specific dates when facility is unavailable (maintenance, private events etc.)</p>
            <div className="flex gap-2 mb-4">
              <input type="date" value={newBlock.date} onChange={e => setNewBlock(b => ({ ...b, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              <input value={newBlock.reason} onChange={e => setNewBlock(b => ({ ...b, reason: e.target.value }))}
                placeholder="Reason (optional)" className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
              <button onClick={() => {
                if (newBlock.date) {
                  setBlockedDates(prev => [...prev, { id: Date.now().toString(), block_date: newBlock.date, reason: newBlock.reason }])
                  setNewBlock({ date: '', reason: '' })
                }
              }} className="px-3 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--red)' }}>Block</button>
            </div>
            {blockedDates.length === 0 ? (
              <div className="text-center py-8">
                <Calendar size={32} className="mx-auto mb-2" style={{ color: 'var(--border)' }} />
                <p className="text-sm" style={{ color: 'var(--ink-light)' }}>No blocked dates. Your facility is available every day.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {blockedDates.map(b => (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--red-light)', border: '1px solid rgba(239,51,64,0.2)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--red)' }}>
                        {new Date(b.block_date).toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      {b.reason && <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{b.reason}</div>}
                    </div>
                    <button onClick={() => setBlockedDates(prev => prev.filter(d => d.id !== b.id))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--red)', color: 'white' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Bookings', value: '0', icon: '📅' },
            { label: 'This Month', value: 'AED 0', icon: '💰' },
            { label: 'Active Slots', value: slots.filter(s => s.is_active).length, icon: '🎯' },
            { label: 'Blocked Dates', value: blockedDates.length, icon: '🚫' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-2xl mb-0.5" style={{ color: 'var(--black)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
