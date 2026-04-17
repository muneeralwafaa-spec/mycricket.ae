import Link from 'next/link'
export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="text-5xl mb-5">📧</div>
        <h1 className="font-display text-3xl tracking-wide text-white mb-3">Check Your Email</h1>
        <p className="text-sm text-white/50 leading-relaxed mb-6">
          We've sent you a confirmation link. Click it to activate your account and you're in!
        </p>
        <div className="text-xs text-white/30 mb-6">
          Didn't get it? Check your spam folder or{' '}
          <Link href="/list-business" className="no-underline" style={{ color: 'var(--gold)' }}>try again</Link>.
        </div>
        <Link href="/login" className="inline-block px-8 py-3 rounded-xl text-sm font-medium no-underline"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
