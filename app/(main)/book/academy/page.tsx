import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Enrol in Cricket Academy UAE — MyCricket.ae' }

export default function BookAcademyPage() {
  const programmes = [
    { academy: 'ICC Cricket Academy', programme: 'ADIB Warriors Youth (Age 7–12)', price: 400, period: 'month', sessions: '3x/week', desc: 'Elite youth development with ICC-certified coaches. Hawk-Eye technology, turf pitches.', emirate: 'Dubai', slug: 'icc-cricket-academy' },
    { academy: 'ICC Cricket Academy', programme: 'Adult Recreational (18+)', price: 350, period: 'month', sessions: '2x/week', desc: 'Structured adult cricket programme for all skill levels.', emirate: 'Dubai', slug: 'icc-cricket-academy' },
    { academy: 'Abu Dhabi Cricket', programme: 'Cricket Cubs (Age 4–6)', price: 250, period: 'month', sessions: '2x/week', desc: 'Fun introduction to cricket for young children at Zayed Cricket Stadium.', emirate: 'Abu Dhabi', slug: 'abu-dhabi-cricket-adib-warriors' },
    { academy: 'Abu Dhabi Cricket', programme: 'Junior Warriors (Age 7–14)', price: 380, period: 'month', sessions: '3x/week', desc: 'Structured youth development pathway leading to senior cricket.', emirate: 'Abu Dhabi', slug: 'abu-dhabi-cricket-adib-warriors' },
    { academy: 'Young Talents Cricket', programme: 'Junior Development (Age 7–16)', price: 280, period: 'month', sessions: '2x/week', desc: 'Est. 1998. Tournament-focused development with tours to UK & India.', emirate: 'Dubai/Sharjah', slug: 'young-talents-cricket-academy' },
    { academy: 'Danube Cricket Academy', programme: 'All-Levels Programme', price: 350, period: 'month', sessions: '2x/week', desc: 'Climate-controlled nets with video analytics. Former IPL coach.', emirate: 'Dubai', slug: 'danube-cricket-academy' },
    { academy: 'Maxtalent Cricket', programme: 'Boys & Girls (Age 6–18)', price: 300, period: 'month', sessions: '2x/week (Fri & Sat)', desc: 'CA Level II & ACC Level I coaches. Co-ed programme.', emirate: 'Dubai', slug: 'maxtalent-cricket-academy' },
    { academy: 'Rajasthan Royals UAE', programme: 'IPL Academy Programme', price: 420, period: 'month', sessions: '3x/week', desc: 'Official Rajasthan Royals academy. IPL-methodology coaching.', emirate: 'Dubai', slug: 'rajasthan-royals-academy-uae' },
  ]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Enrol Now</div>
          <h1 className="font-display text-5xl text-white mb-2">Cricket Academy Programmes</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Monthly programmes across UAE's top cricket academies</p>
        </div>
      </div>
      <div className="container-uae py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {programmes.map((p, i) => (
            <div key={i} className="rounded-2xl p-5 card-hover" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-mono-dm uppercase mb-1" style={{ color: 'var(--red)' }}>{p.academy}</div>
              <h3 className="text-base font-medium mb-1" style={{ color: 'var(--black)' }}>{p.programme}</h3>
              <div className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>📍 {p.emirate} · {p.sessions}</div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{p.desc}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {p.price}</span>
                  <span className="text-xs ml-1" style={{ color: 'var(--ink-light)' }}>/{p.period}</span>
                </div>
                <Link href={`/academies/${p.slug}`} className="px-5 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--red)' }}>
                  Enrol Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
