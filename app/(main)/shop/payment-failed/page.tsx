'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircle } from 'lucide-react'

const REASONS: Record<string, string> = {
  declined: 'Your payment was declined by the bank. Please try a different card.',
  verify_failed: 'We could not verify your payment. Please contact us if money was deducted.',
  missing_params: 'Something went wrong with the payment redirect.',
  default: 'Your payment could not be processed.',
}

function PaymentFailedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') ?? 'default'
  const orderId = searchParams.get('order_id')
  const message = REASONS[reason] ?? REASONS.default

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }} className="flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#FCEBEB' }}>
          <XCircle size={40} style={{ color: '#A32D2D' }} />
        </div>
        <h1 className="font-display text-4xl tracking-wide mb-3" style={{ color: 'var(--ink)' }}>Payment Failed</h1>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-light)' }}>
          {message}
        </p>
        {orderId && (
          <p className="text-xs mb-6" style={{ color: 'var(--ink-light)' }}>
            Order reference: <strong style={{ color: 'var(--ink)' }}>{orderId}</strong>
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Link href="/shop/checkout"
            className="block py-3 rounded-xl text-sm font-medium no-underline"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
            Try Again
          </Link>
          <Link href="/shop/cart"
            className="block py-3 rounded-xl text-sm font-medium no-underline"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
            Back to Cart
          </Link>
        </div>
        <p className="text-xs mt-6" style={{ color: 'var(--ink-light)' }}>
          Need help?{' '}
          <a href="mailto:support@mycricket.ae" className="no-underline" style={{ color: 'var(--green)' }}>
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return <Suspense><PaymentFailedContent /></Suspense>
}
