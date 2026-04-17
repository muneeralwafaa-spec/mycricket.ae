import Link from 'next/link'
export default function OrderConfirmedPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }} className="flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
          style={{ background: 'var(--green-light)' }}>✓</div>
        <h1 className="font-display text-4xl tracking-wide mb-3" style={{ color: 'var(--ink)' }}>Order Confirmed!</h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--ink-light)' }}>
          Your order <strong style={{ color: 'var(--green)' }}>MCK-20260416-4821</strong> has been placed successfully.
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-light)' }}>
          You'll receive a confirmation on WhatsApp and email shortly.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/account/orders" className="block py-3 rounded-xl text-sm font-medium no-underline"
            style={{ background: 'var(--green)', color: '#fff' }}>Track My Order</Link>
          <Link href="/shop" className="block py-3 rounded-xl text-sm font-medium no-underline"
            style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
