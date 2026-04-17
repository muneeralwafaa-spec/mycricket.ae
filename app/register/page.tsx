'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

type AccountType = 'user' | 'vendor'

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>('user')
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', password: '', confirm_password: '',
    shop_name: '', shop_emirate: 'Dubai', shop_desc: '',
  })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm_password) { setError('Passwords do not match'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError(null)
    const { error } = await signUp(form.email, form.password, form.full_name, form.phone)
    if (error) { setError(error); setLoading(false); return }
    router.push('/verify-email')
  }

  const inp = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--gold)]"

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-center mb-6">
          <h1 className="font-display text-4xl tracking-wide text-white mb-2">Create Account</h1>
          <p className="text-sm text-white/50">Join the UAE cricket community</p>
        </div>

        {/* Account type selector */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {(['user', 'vendor'] as AccountType[]).map(t => (
            <button key={t} onClick={() => setAccountType(t)}
              className="py-2.5 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: accountType === t ? 'var(--gold)' : 'transparent',
                color: accountType === t ? 'var(--ink)' : 'rgba(255,255,255,0.5)',
              }}>
              {t === 'user' ? '🏏 Fan / Player' : '🛒 Vendor / Shop'}
            </button>
          ))}
        </div>

        {/* Google */}
        <button onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium mb-5 transition-all hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}>
          <span className="text-lg">G</span>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="text-xs text-white/30">or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1 — personal details */}
          {step === 1 && (
            <>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={form.full_name} onChange={e => update('full_name', e.target.value)}
                  placeholder="Full name" required className={inp} style={{ paddingLeft: 40 }} />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                  placeholder="Email address" required className={inp} style={{ paddingLeft: 40 }} />
              </div>
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                  placeholder="Phone / WhatsApp (+971...)" className={inp} style={{ paddingLeft: 40 }} />
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)}
                  placeholder="Password (min 8 chars)" required className={inp} style={{ paddingLeft: 40, paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={form.confirm_password} onChange={e => update('confirm_password', e.target.value)}
                  placeholder="Confirm password" required className={inp} style={{ paddingLeft: 40 }} />
              </div>

              {accountType === 'vendor' ? (
                <button type="button" onClick={() => { if (!form.full_name || !form.email || !form.password) { setError('Please fill all fields'); return } setError(null); setStep(2) }}
                  className="w-full py-3.5 rounded-xl text-sm font-medium"
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                  Next: Shop Details →
                </button>
              ) : null}
            </>
          )}

          {/* Step 2 — vendor shop details */}
          {step === 2 && accountType === 'vendor' && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setStep(1)} className="text-xs text-white/40 hover:text-white/70">
                  ← Back
                </button>
                <span className="text-sm text-white/70 font-medium">Shop Details</span>
              </div>
              <input value={form.shop_name} onChange={e => update('shop_name', e.target.value)}
                placeholder="Shop / business name *" required className={inp} />
              <select value={form.shop_emirate} onChange={e => update('shop_emirate', e.target.value)}
                className={inp} style={{ appearance: 'none' }}>
                {['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'].map(e=>(
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <textarea value={form.shop_desc} onChange={e => update('shop_desc', e.target.value)}
                placeholder="Brief description of your shop / products" rows={3}
                className={inp} style={{ resize: 'none' }} />
              <div className="text-xs text-white/30 px-1">
                Your vendor account will be reviewed within 24 hours before going live.
              </div>
            </>
          )}

          {error && (
            <div className="text-xs px-4 py-3 rounded-xl" style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
              {error}
            </div>
          )}

          {(accountType === 'user' || step === 2) && (
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition-all disabled:opacity-60"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          )}
        </form>
      </div>

      <p className="text-center text-sm text-white/40 mt-5">
        Already have an account?{' '}
        <Link href="/login" className="no-underline text-[var(--gold)] hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
