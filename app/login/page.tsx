'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn, signInWithGoogle } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    if (error) { setError(error); setLoading(false); return }
    router.push(redirect)
  }

  const inp = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[var(--gold)] focus:bg-white/8"

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl tracking-wide text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-white/50">Sign in to your MyCricket.ae account</p>
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
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email address" required
              className={inp} style={{ paddingLeft: 40 }} />
          </div>

          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Password" required
              className={inp} style={{ paddingLeft: 40, paddingRight: 44 }} />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs no-underline text-white/40 hover:text-[var(--gold)] transition-colors">
              Forgot password?
            </Link>
          </div>

          {error && (
            <div className="text-xs px-4 py-3 rounded-xl" style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-medium transition-all disabled:opacity-60"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-white/40 mt-5">
        Don't have an account?{' '}
        <Link href="/list-business" className="no-underline text-[var(--gold)] hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
