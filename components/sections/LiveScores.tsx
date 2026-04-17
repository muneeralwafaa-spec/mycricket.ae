'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ProcessedMatch } from '@/lib/cricapi'
import { getMockScores } from '@/lib/cricapi'

export default function LiveScores() {
  const [scores, setScores] = useState<ProcessedMatch[]>(getMockScores())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/scores')
      .then(r => r.json())
      .then(d => { if (d.data?.length) setScores(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))

    // Refresh every 60 seconds
    const interval = setInterval(() => {
      fetch('/api/scores')
        .then(r => r.json())
        .then(d => { if (d.data?.length) setScores(d.data) })
        .catch(() => {})
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4" style={{ background: 'var(--green-dark)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-2 text-white/40">Live & Recent</div>
            <h2 className="font-display text-5xl tracking-wide text-white">Cricket Scores</h2>
          </div>
          <div className="flex items-center gap-3">
            {loading && (
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
                Updating...
              </div>
            )}
            <Link href="/scores" className="text-sm no-underline px-5 py-2.5 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              All Scores →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {scores.slice(0, 3).map(s => (
            <div key={s.id} className="rounded-xl p-5 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono-dm text-xs tracking-wide uppercase text-white/40 truncate pr-2">
                  {s.tournament}
                </span>
                {s.isLive ? (
                  <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="font-mono-dm text-xs text-white/30 flex-shrink-0">RESULT</span>
                )}
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{s.team1}</span>
                  {s.team1Score && (
                    <span className="font-mono-dm text-sm font-medium" style={{ color: 'var(--gold)' }}>
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
                      style={{ color: s.isLive ? 'var(--gold)' : 'rgba(255,255,255,0.35)' }}>
                      {s.team2Score}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-white/40 truncate">{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
