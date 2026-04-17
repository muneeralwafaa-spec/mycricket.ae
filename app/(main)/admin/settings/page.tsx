import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Admin Settings — MyCricket.ae' }
export default function AdminSettingsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', padding: '2rem' }}>
      <h1 className="font-display text-4xl mb-6" style={{ color: 'var(--black)' }}>Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        {['Site Settings', 'Email Configuration', 'Payment Settings', 'SEO Settings'].map(s => (
          <div key={s} className="rounded-2xl p-5" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h3 className="font-medium mb-1" style={{ color: 'var(--black)' }}>{s}</h3>
            <p className="text-xs" style={{ color: 'var(--ink-light)' }}>Configure {s.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
