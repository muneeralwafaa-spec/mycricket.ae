import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Cricket Jobs UAE 2026 | Coaching Vacancies — MyCricket.ae' }

const jobs = [
  { title: 'Head Cricket Coach', org: 'Abu Dhabi Cricket Club', location: 'Abu Dhabi', type: 'Full-time', salary: 'AED 8,000–12,000/mo', posted: '12 Apr 2026', desc: 'Seeking experienced Head Coach for Abu Dhabi Cricket Club. Minimum ICC Level 2 certification required. Competitive package includes accommodation.', requirements: ['ICC Level 2+', '5+ years coaching exp', 'UAE experience preferred'], urgent: false },
  { title: 'Youth Cricket Coach (U12–U18)', org: 'ICC Cricket Academy Dubai', location: 'Dubai Sports City', type: 'Full-time', salary: 'AED 6,000–9,000/mo', posted: '8 Apr 2026', desc: 'ICC Academy seeking passionate youth coaches for their popular ADIB Warriors programme. All ages from U12 to U18.', requirements: ['ICC Level 1+', 'Youth coaching exp', 'DBS/Police clearance'], urgent: true },
  { title: 'Cricket Coach — Females Programme', org: 'Emirates Cricket Board', location: 'Dubai', type: 'Part-time', salary: 'AED 150–200/hr', posted: '5 Apr 2026', desc: 'ECB expanding their women\'s cricket programme. Female coaches strongly encouraged to apply. Flexible hours.', requirements: ['ICC Level 1+', 'Female candidates preferred', 'Flexible schedule'], urgent: false },
  { title: 'Academy Cricket Coach', org: 'Young Talents Cricket Academy', location: 'Al Qusais, Dubai', type: 'Full-time', salary: 'AED 5,000–7,000/mo', posted: '1 Apr 2026', desc: 'Young Talents Cricket Academy (est. 1998) seeks dedicated coaches for their growing programmes at multiple Dubai/Sharjah venues.', requirements: ['ICC Level 1+', 'Batting or bowling specialist', 'Dubai residency preferred'], urgent: false },
  { title: 'ECB Certified Umpire', org: 'Emirates Cricket Board', location: 'All UAE', type: 'Freelance', salary: 'AED 200–400/match', posted: '20 Mar 2026', desc: 'ECB is always looking for qualified umpires for domestic leagues (D50, D20, D10). Flexible commitment with match fees per appointment.', requirements: ['ECB Umpire certification', 'Cricket knowledge', 'Own transport'], urgent: false },
  { title: 'Cricket Scorer / Stats Analyst', org: 'MyCricket.ae', location: 'Remote / Dubai', type: 'Part-time', salary: 'AED 2,000–4,000/mo', posted: '15 Apr 2026', desc: 'MyCricket.ae is looking for cricket-passionate individuals to score matches and maintain statistics for the platform.', requirements: ['CricClubs experience', 'Cricket knowledge', 'Attention to detail'], urgent: false },
]

export default function JobsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Careers</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Cricket Jobs UAE</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Coaching vacancies, umpire positions and cricket industry jobs across the UAE</p>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="flex justify-end mb-6">
          <Link href="/noticeboard/new" className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
            + Post a Job
          </Link>
        </div>
        <div className="space-y-4 mb-10">
          {jobs.map((j, i) => (
            <div key={i} className="rounded-2xl p-5 md:p-6"
              style={{ background: 'var(--white)', border: j.urgent ? '2px solid var(--red)' : '1px solid var(--border)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {j.urgent && <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: 'var(--red)' }}>Urgent</span>}
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: j.type === 'Full-time' ? 'var(--green-light)' : 'var(--red-light)', color: j.type === 'Full-time' ? 'var(--green)' : 'var(--red)' }}>{j.type}</span>
                    <span className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>{j.posted}</span>
                  </div>
                  <h3 className="text-base font-medium" style={{ color: 'var(--black)' }}>{j.title}</h3>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--red)' }}>{j.org} · 📍 {j.location}</div>
                </div>
                <div className="font-display text-xl" style={{ color: 'var(--green)' }}>{j.salary}</div>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-light)' }}>{j.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {j.requirements.map(r => (
                  <span key={r} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--off-white)', color: 'var(--ink-mid)', border: '1px solid var(--border)' }}>{r}</span>
                ))}
              </div>
              <Link href="/contact" className="inline-block px-4 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--red)' }}>
                Apply via Contact Form →
              </Link>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--black)' }}>
          <h3 className="font-display text-2xl text-white mb-2">Hiring Cricket Staff?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Post coaching vacancies, umpire positions or any cricket industry job for free.</p>
          <Link href="/noticeboard/new" className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
            Post a Job — Free
          </Link>
        </div>
      </div>
    </div>
  )
}
