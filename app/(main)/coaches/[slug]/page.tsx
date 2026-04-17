import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const coaches: Record<string, {
  name: string; role: string; bio: string; cert: string; exp: number
  emirate: string; rate: string; phone?: string; website?: string
  specs: string[]; nationality: string; color: string; initials: string
  achievements: string[]; social?: string
}> = {
  'lalchand-rajput': {
    name: 'Lalchand Rajput', role: 'Head Coach — UAE National Team',
    bio: 'Former India Test opener who played 2 Tests in 1987. After his playing career, Rajput became one of the most successful coaches in associate cricket. He coached Zimbabwe national team before taking on the UAE role in 2023. Under his guidance, UAE qualified for the T20 World Cup 2026.',
    cert: 'Former India International', exp: 25, emirate: 'Dubai', rate: 'National Team',
    specs: ['Batting', 'Team Management', 'Strategy'], nationality: '🇮🇳 Indian',
    color: '#EF3340', initials: 'LR',
    achievements: ['UAE T20 WC 2026 qualification', 'Former India Test player', 'Coached Zimbabwe national team', 'Mumbai Indians IPL connection'],
  },
  'cp-rizwan': {
    name: 'CP Rizwan', role: 'Former UAE Captain · Founder Set Go Academy',
    bio: 'CP Rizwan is a former UAE T20I captain who represented UAE at the T20 World Cup. After retiring from international cricket, he founded Set Go Cricket Academy in Dubai, bringing his international experience to coaching the next generation of UAE cricketers.',
    cert: 'Former UAE National Captain', exp: 15, emirate: 'Dubai', rate: 'AED 300/hr',
    website: 'https://setgocricketacademy.com',
    specs: ['Batting', 'All Ages', 'Leadership'], nationality: '🇦🇪 UAE',
    color: '#009A44', initials: 'CR',
    achievements: ['UAE T20 World Cup player', 'Former UAE T20I Captain', 'Founded Set Go Cricket Academy', 'Coached alongside Pollard & other legends'],
  },
  'gopal-jaspara': {
    name: 'Gopal Jaspara', role: 'Head Coach — G Force Cricket Academy',
    bio: 'Head coach at G Force Cricket Academy since its founding in 2001. ECB Level 3 certified coach and former first-class cricketer. Associated with legendary coach Ramakant Achrekar — the man who coached Sachin Tendulkar.',
    cert: 'ECB Level 3', exp: 20, emirate: 'Dubai', rate: 'AED 250/hr',
    specs: ['Batting', 'Fielding', 'All Levels'], nationality: '🇮🇳 Indian',
    color: '#1a6fa8', initials: 'GJ',
    achievements: ['ECB Level 3 Certification', 'Former first-class cricketer', 'G Force Academy founder coach', 'Association with Ramakant Achrekar'],
  },
  'raiphi-gomez': {
    name: 'Raiphi Vincent Gomez', role: 'Head Coach — Danube Cricket Academy',
    bio: 'Former Kerala Ranji Trophy captain and IPL player. Raiphi Gomez founded the Danube Cricket Academy in Dubai in 2022, bringing top-level coaching with climate-controlled nets, video analytics, and strength & conditioning zones.',
    cert: 'Former IPL Player · Ranji Trophy Captain', exp: 18, emirate: 'Dubai', rate: 'AED 300/hr',
    specs: ['Batting', 'Conditioning', 'Video Analysis'], nationality: '🇮🇳 Indian',
    color: '#C8961E', initials: 'RG',
    achievements: ['Kerala Ranji Trophy Captain', 'IPL player experience', 'Founded Danube Cricket Academy 2022', 'Video analytics specialist'],
  },
  'shahzad-altaf': {
    name: 'Shahzad Altaf', role: 'Founder & Director — Young Talents Academy',
    bio: 'Founded Young Talents Cricket Academy in 1998, making it one of UAE\'s oldest cricket academies. With over 26 years of experience developing UAE cricket talent, Shahzad organises the Gulf Cup and international tours to the UK and India.',
    cert: 'ECB Level 2', exp: 26, emirate: 'Dubai / Sharjah', rate: 'AED 200/hr',
    specs: ['All-round', 'Youth Development', 'Tournament Organiser'], nationality: '🇵🇰 Pakistani',
    color: '#009A44', initials: 'SA',
    achievements: ['Founded Young Talents 1998', '26+ years coaching UAE cricket', 'Gulf Cup organiser', 'International tours: UK & India'],
  },
  'indika-batuwitaarachchi': {
    name: 'Indika Batuwitaarachchi', role: 'Head Coach — Bespartan Academy',
    bio: 'Former UAE international cricketer with extensive first-class experience in Sri Lanka. Indika has deep knowledge of UAE cricket conditions and the specific challenges facing UAE cricketers at the international level.',
    cert: 'Former UAE International · Sri Lanka First-class', exp: 14, emirate: 'Dubai', rate: 'AED 220/hr',
    specs: ['Batting', 'Spin Bowling', 'Technique'], nationality: '🇱🇰 Sri Lankan',
    color: '#EF3340', initials: 'IB',
    achievements: ['Former UAE international', 'Sri Lanka first-class experience', 'UAE conditions specialist', 'Bespartan Academy head coach'],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = coaches[slug]
  if (!c) return { title: 'Coach Not Found — MyCricket.ae' }
  return { title: `${c.name} — Cricket Coach UAE | MyCricket.ae`, description: c.bio.slice(0, 160) }
}

export default async function CoachDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = coaches[slug]
  if (!c) return notFound()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <Link href="/coaches" className="text-xs font-mono-dm mb-6 block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ← Back to Coaches
          </Link>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display text-3xl text-white flex-shrink-0"
              style={{ background: c.color, fontSize: 24 }}>{c.initials}</div>
            <div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--red)' }}>{c.nationality} · {c.emirate}</div>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-1">{c.name}</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-uae py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--black)' }}>About</h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--ink-light)', lineHeight: 1.8 }}>{c.bio}</p>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--black)' }}>Key Achievements</h2>
            <div className="space-y-2 mb-8">
              {c.achievements.map(a => (
                <div key={a} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--green)' }}>✓</span>
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-xl mb-4" style={{ color: 'var(--black)' }}>Coaching Details</h3>
              {[
                { label: 'Certification', value: c.cert },
                { label: 'Experience', value: `${c.exp}+ years` },
                { label: 'Location', value: c.emirate },
                { label: 'Rate', value: c.rate },
                { label: 'Specialties', value: c.specs.join(', ') },
              ].map(d => (
                <div key={d.label} className="flex flex-col mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-mono-dm uppercase tracking-wide mb-0.5" style={{ color: 'var(--ink-light)' }}>{d.label}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--black)' }}>{d.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {c.website && (
                <a href={c.website} target="_blank" rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-sm font-medium text-white text-center" style={{ background: 'var(--red)' }}>
                  Visit Academy Website ↗
                </a>
              )}
              <Link href="/contact" className="block w-full py-3 rounded-xl text-sm font-medium text-center"
                style={{ border: '1px solid var(--border)', color: 'var(--black)', background: 'var(--white)' }}>
                Enquire About Coaching
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
