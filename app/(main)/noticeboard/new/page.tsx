import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Post a Notice — MyCricket.ae' }
export default function NewNoticePage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Community</div>
          <h1 className="font-display text-5xl text-white mb-2">Post a Notice</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Announce tryouts, jobs, events or club news to the UAE cricket community</p>
        </div>
      </div>
      <div className="container-uae py-10 max-w-2xl">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Notice Type *</label>
              <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }}>
                <option>Player Tryout</option>
                <option>Tournament Registration</option>
                <option>Coaching Job</option>
                <option>Club Announcement</option>
                <option>Urgent — Umpires/Scorers Needed</option>
                <option>Academy New Batch</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Title *</label>
              <input placeholder="e.g. Dubai Lions CC — Player Tryouts Open for Season 2026"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Organisation / Club *</label>
                <input placeholder="e.g. Dubai Lions CC"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Location *</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }}>
                  {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'All UAE'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Details *</label>
              <textarea rows={5} placeholder="Full details of the notice — requirements, dates, contact info..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Contact (WhatsApp / Email)</label>
              <input placeholder="+971 50 000 0000 or email@club.ae"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <button className="w-full py-3.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              Post Notice — Free
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
