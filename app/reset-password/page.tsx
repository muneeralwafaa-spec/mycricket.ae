'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { createClient } = await import('@/lib/supabase-browser')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
    setTimeout(() => router.push('/login'), 2500)
  }

  const inp = "w-full px-4 py-3 rounded-xl text-sm outline-none bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--gold)]"

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {!done ? (
          <>
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl tracking-wide text-white mb-2">New Password</h1>
              <p className="text-sm text-white/50">Choose a strong password for your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="New password" required className={inp} style={{ paddingLeft: 40, paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="Confirm new password" required className={inp} style={{ paddingLeft: 40 }} />
              </div>
              {error && (
                <div className="text-xs px-4 py-3 rounded-xl" style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-medium disabled:opacity-60"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
              style={{ background: 'rgba(26,122,74,0.2)' }}>✓</div>
            <h2 className="font-display text-2xl text-white tracking-wide mb-2">Password Updated!</h2>
            <p className="text-sm text-white/50">Redirecting you to sign in...</p>
          </div>
        )}
      </div>
    </div>
  )
}
