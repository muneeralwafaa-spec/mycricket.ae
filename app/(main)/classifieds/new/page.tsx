import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Post a Free Cricket Ad — MyCricket.ae Classifieds' }

const categories = ['Cricket Bat', 'Batting Gloves', 'Batting Pads', 'Helmet', 'Kit Bag', 'Cricket Ball', 'Jersey/Kit', 'Shoes', 'Stumps & Bails', 'Other Equipment']

export default function NewClassifiedPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--red)' }}>Free Listing</div>
          <h1 className="font-display text-5xl text-white mb-2">Post a Free Ad</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Sell your cricket gear to thousands of buyers across UAE</p>
        </div>
      </div>
      <div className="container-uae py-10 max-w-2xl">
        <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Category *</label>
              <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Item Title *</label>
              <input placeholder="e.g. Gray Nicolls Bat — Grade 1 English Willow"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Price (AED) *</label>
                <input type="number" placeholder="e.g. 250"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Condition *</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }}>
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Used</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Location *</label>
              <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }}>
                {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Description</label>
              <textarea rows={4} placeholder="Describe the item — brand, size, age, any defects..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Your Contact (WhatsApp preferred)</label>
              <input placeholder="+971 50 000 0000"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid var(--border)', background: 'var(--white)', color: 'var(--black)' }} />
            </div>
            <button className="w-full py-3.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              Post Ad — Free
            </button>
            <p className="text-xs text-center" style={{ color: 'var(--ink-light)' }}>
              Free listing · Reaches 10,000+ UAE cricket players · No hidden charges
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
