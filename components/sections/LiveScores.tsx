'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ProcessedMatch } from '@/lib/cricapi'
import { getMockScores } from '@/lib/cricapi'

export default function LiveScores() {
  const [scores, setScores] = useState<ProcessedMatch[]>(getMockScores())

  useEffect(() => {
    fetch('/api/scores').then(r => r.json()).then(d => { if (d.data?.length) setScores(d.data) }).catch(() => {})
    const iv = setInterval(() => {
      fetch('/api/scores').then(r => r.json()).then(d => { if (d.data?.length) setScores(d.data) }).catch(() => {})
    }, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section style={{ background: 'var(--green-dark)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Live & Recent
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">Cricket Scores</h2>
          </div>
          <Link href="/scores"
            className="text-sm px-5 py-2.5 rounded-xl transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}>
            All Scores →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scores.slice(0, 3).map(s => (
            <div key={s.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono-dm text-xs tracking-wide uppercase truncate pr-2"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {s.tournament}
                </span>
                {s.isLive ? (
                  <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(239,51,64,0.2)', border: '1px solid rgba(239,51,64,0.35)', color: '#f87171' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
                    LIVE
                  </span>
                ) : (
                  <span className="font-mono-dm text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    RESULT
                  </span>
                )}
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{s.team1}</span>
                  {s.team1Score && (
                    <span className="font-mono-dm text-sm font-medium" style={{ color: 'var(--red-mid)' }}>
                      {s.team1Score}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: s.isLive ? 'white' : 'rgba(255,255,255,0.45)' }}>
                    {s.team2}
                  </span>
                  {s.team2Score && (
                    <span className="font-mono-dm text-sm font-medium"
                      style={{ color: s.isLive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)' }}>
                      {s.team2Score}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
