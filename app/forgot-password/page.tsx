'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await resetPassword(email)
    if (error) { setError(error); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  const inp = "w-full px-4 py-3 rounded-xl text-sm outline-none bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--gold)]"

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(200,150,30,0.15)' }}>
                <Mail size={24} style={{ color: 'var(--gold)' }} />
              </div>
              <h1 className="font-display text-3xl tracking-wide text-white mb-2">Reset Password</h1>
              <p className="text-sm text-white/50">
                Enter your email and we'll send a reset link.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address" required className={inp} style={{ paddingLeft: 40 }} />
              </div>
              {error && (
                <div className="text-xs px-4 py-3 rounded-xl" style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-medium disabled:opacity-60"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
              style={{ background: 'rgba(26,122,74,0.2)' }}>✓</div>
            <h2 className="font-display text-2xl text-white tracking-wide mb-2">Check Your Email</h2>
            <p className="text-sm text-white/50 mb-6">
              We sent a password reset link to <strong className="text-white/80">{email}</strong>
            </p>
            <Link href="/login" className="text-sm no-underline" style={{ color: 'var(--gold)' }}>
              Back to sign in →
            </Link>
          </div>
        )}
      </div>
      {!sent && (
        <p className="text-center text-sm text-white/40 mt-5">
          <Link href="/login" className="no-underline text-white/50 hover:text-white/70">← Back to sign in</Link>
        </p>
      )}
    </div>
  )
}
