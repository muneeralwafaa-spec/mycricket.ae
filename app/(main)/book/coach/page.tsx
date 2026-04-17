'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

export default function BookCoachPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('All')

  const coaches = [
    { id: '1', name: 'Lalchand Rajput', role: 'UAE National Head Coach', emirate: 'Dubai', rating: 5.0, initials: 'LR', color: '#EF3340', services: [{ id: 's1', name: 'Strategic Consultation', price: 500, duration: 60 }, { id: 's2', name: 'Group Camp (10 players)', price: 2000, duration: 180 }] },
    { id: '2', name: 'CP Rizwan', role: 'Former UAE Captain', emirate: 'Dubai', rating: 4.9, initials: 'CR', color: '#009A44', services: [{ id: 's3', name: '1-on-1 Batting Session', price: 300, duration: 60 }, { id: 's4', name: 'Group Session (4 players)', price: 800, duration: 90 }, { id: 's5', name: '10-Session Package', price: 2500, duration: 60 }] },
    { id: '3', name: 'Gopal Jaspara', role: 'ECB Level 3 Coach', emirate: 'Dubai', rating: 4.8, initials: 'GJ', color: '#1a6fa8', services: [{ id: 's6', name: '1-on-1 Coaching', price: 250, duration: 60 }, { id: 's7', name: 'Group Session (6 players)', price: 600, duration: 90 }] },
    { id: '4', name: 'Raiphi Gomez', role: 'Former IPL Player', emirate: 'Dubai', rating: 4.8, initials: 'RG', color: '#C8961E', services: [{ id: 's8', name: 'Batting Technique Session', price: 300, duration: 60 }, { id: 's9', name: 'Video Analysis Session', price: 400, duration: 90 }] },
    { id: '5', name: 'Shahzad Altaf', role: 'ECB Level 2, 26yrs exp', emirate: 'Dubai / Sharjah', rating: 4.7, initials: 'SA', color: '#009A44', services: [{ id: 's10', name: '1-on-1 Session', price: 200, duration: 60 }, { id: 's11', name: 'Junior Group (8 players)', price: 400, duration: 90 }] },
  ]

  const filtered = filter === 'All' ? coaches : coaches.filter(c => c.emirate.includes(filter))

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Book a Coach</div>
          <h1 className="font-display text-5xl text-white mb-2">Cricket Coaches</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Book 1-on-1, group sessions or packages with UAE's top coaches</p>
        </div>
      </div>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2">
          {['All', 'Dubai', 'Abu Dhabi', 'Sharjah'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(c => (
            <div key={c.id} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display text-xl text-white flex-shrink-0"
                  style={{ background: c.color, fontSize: 18 }}>{c.initials}</div>
                <div className="flex-1">
                  <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{c.name}</h3>
                  <div className="text-xs" style={{ color: 'var(--red)' }}>{c.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>📍 {c.emirate} · ⭐ {c.rating}</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="text-xs font-mono-dm uppercase" style={{ color: 'var(--ink-light)' }}>Available Sessions</div>
                {c.services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>{s.name}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.duration} min</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg" style={{ color: 'var(--green)' }}>AED {s.price}</div>
                      <Link href={`/coaches/${c.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`}
                        className="text-xs" style={{ color: 'var(--red)' }}>Book →</Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Link href={`/coaches/${c.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white text-center"
                  style={{ background: 'var(--red)' }}>
                  Book Session
                </Link>
                <a href={`https://wa.me/971500000000`} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-white" style={{ background: '#25D366' }}>
                  💬
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
