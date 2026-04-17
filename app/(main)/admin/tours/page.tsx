'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Plane, CheckCircle, Link2 } from 'lucide-react'

const outbound = [
  { id: 'T001', team: 'Dubai Falcons CC', dest: 'India', dates: 'Jun 15–25 2026', size: 15, formats: ['T20', 'ODI'], contact: 'Ahmed K.', email: 'ak@falcons.ae', status: 'pending', notes: 'Prefer Mumbai or Pune area.' },
  { id: 'T003', team: 'Sharjah Warriors', dest: 'Pakistan', dates: 'Aug 1–10 2026', size: 14, formats: ['T20'], contact: 'Zain M.', email: 'zm@warriors.ae', status: 'pending', notes: 'Lahore preferred. Need ground assistance.' },
  { id: 'T005', team: 'Abu Dhabi Eagles', dest: 'Sri Lanka', dates: 'Sep 10–18 2026', size: 18, formats: ['T20', 'T10'], contact: 'Priya N.', email: 'pn@eagles.ae', status: 'matched', notes: '' },
]

const inbound = [
  { id: 'T002', team: 'Mumbai Stars CC', origin: 'India', dates: 'Jul 4–14 2026', size: 18, formats: ['T20', 'ODI'], contact: 'Rahul D.', email: 'rd@mumbai.in', status: 'matched', notes: 'Looking for 3 T20 matches. Dubai preferred.' },
  { id: 'T004', team: 'Yorkshire CC', origin: 'England', dates: 'Nov 5–15 2026', size: 16, formats: ['ODI'], contact: 'Tom B.', email: 'tb@yorkshire.co.uk', status: 'confirmed', notes: 'Annual UAE tour. Need hotel recommendations.' },
  { id: 'T006', team: 'Chennai Royals', origin: 'India', dates: 'Dec 1–10 2026', size: 15, formats: ['T20'], contact: 'Suresh K.', email: 'sk@royals.in', status: 'pending', notes: 'Flexible on emirate.' },
]

const statusStyle: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#FAEEDA', color: '#854F0B' },
  matched:   { bg: '#E6F1FB', color: '#185FA5' },
  confirmed: { bg: '#EAF3DE', color: '#3B6D11' },
}

export default function AdminToursPage() {
  const [selected, setSelected] = useState<{ out?: string; inn?: string }>({})

  const matchSelected = () => {
    if (selected.out && selected.inn) {
      alert(`Matched: ${outbound.find(t => t.id === selected.out)?.team} ↔ ${inbound.find(t => t.id === selected.inn)?.team}\n\nIn production, this sends intro emails to both teams.`)
      setSelected({})
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wide" style={{ color: 'var(--ink)' }}>Tours Connect</h1>
        <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
          Match teams manually then send intro email
        </div>
      </div>

      {/* Match CTA */}
      {selected.out && selected.inn && (
        <div className="flex items-center gap-4 p-4 rounded-xl"
          style={{ background: 'var(--green-light)', border: '2px solid var(--green)' }}>
          <div className="flex-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>
            Ready to match: <strong>{outbound.find(t => t.id === selected.out)?.team}</strong>
            {' ↔ '}
            <strong>{inbound.find(t => t.id === selected.inn)?.team}</strong>
          </div>
          <button onClick={matchSelected}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'var(--green)', color: '#fff' }}>
            <Link2 size={14} /> Confirm Match & Send Emails
          </button>
          <button onClick={() => setSelected({})} className="text-xs" style={{ color: 'var(--ink-light)' }}>
            Clear
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Outbound */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plane size={15} style={{ color: 'var(--green)' }} />
            <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--ink)' }}>UAE Teams Going Abroad</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
              {outbound.filter(t => t.status === 'pending').length} unmatched
            </span>
          </div>
          <div className="space-y-3">
            {outbound.map(t => (
              <div key={t.id}
                onClick={() => setSelected(s => ({ ...s, out: s.out === t.id ? undefined : t.id }))}
                className="rounded-xl p-4 cursor-pointer transition-all"
                style={{
                  border: `${selected.out === t.id ? '2px solid var(--green)' : '1px solid var(--border)'}`,
                  background: selected.out === t.id ? 'var(--green-light)' : '#fff',
                }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{t.team}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                      → {t.dest} · {t.dates} · {t.size} players
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full capitalize"
                    style={{ background: statusStyle[t.status].bg, color: statusStyle[t.status].color }}>
                    {t.status}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  {t.formats.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--green-light)', color: 'var(--green)' }}>{f}</span>
                  ))}
                </div>
                {t.notes && <p className="text-xs" style={{ color: 'var(--ink-light)' }}>{t.notes}</p>}
                <div className="text-xs mt-2" style={{ color: 'var(--ink-light)' }}>
                  {t.contact} · {t.email}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inbound */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plane size={15} style={{ color: 'var(--gold)', transform: 'rotate(180deg)' }} />
            <h2 className="font-display text-xl tracking-wide" style={{ color: 'var(--ink)' }}>Overseas Teams Visiting UAE</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#FAEEDA', color: '#854F0B' }}>
              {inbound.filter(t => t.status === 'pending').length} unmatched
            </span>
          </div>
          <div className="space-y-3">
            {inbound.map(t => (
              <div key={t.id}
                onClick={() => setSelected(s => ({ ...s, inn: s.inn === t.id ? undefined : t.id }))}
                className="rounded-xl p-4 cursor-pointer transition-all"
                style={{
                  border: `${selected.inn === t.id ? '2px solid var(--gold)' : '1px solid var(--border)'}`,
                  background: selected.inn === t.id ? '#FAEEDA' : '#fff',
                }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{t.team}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>
                      From {t.origin} · {t.dates} · {t.size} players
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full capitalize"
                    style={{ background: statusStyle[t.status].bg, color: statusStyle[t.status].color }}>
                    {t.status}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  {t.formats.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: '#FAEEDA', color: '#854F0B' }}>{f}</span>
                  ))}
                </div>
                {t.notes && <p className="text-xs" style={{ color: 'var(--ink-light)' }}>{t.notes}</p>}
                <div className="text-xs mt-2" style={{ color: 'var(--ink-light)' }}>
                  {t.contact} · {t.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
