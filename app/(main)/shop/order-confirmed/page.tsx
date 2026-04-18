import Link from 'next/link'
export default function OrderConfirmedPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container-uae max-w-lg py-20 text-center">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="font-display text-5xl mb-3" style={{ color: 'var(--black)' }}>Order Confirmed!</h1>
        <p className="text-base mb-2" style={{ color: 'var(--ink-light)' }}>Your order has been placed successfully.</p>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-light)' }}>You'll receive a WhatsApp and email confirmation with your order details and tracking info.</p>
        <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
          <div className="font-display text-xl mb-2" style={{ color: 'var(--green-dark)' }}>What happens next?</div>
          <div className="space-y-2 text-sm text-left" style={{ color: 'var(--green-dark)' }}>
            {['Vendor prepares your order', 'You get WhatsApp + email with tracking', 'Delivery within 2–5 working days UAE-wide', 'Rate your purchase after delivery'].map(s => (
              <div key={s} className="flex items-start gap-2"><span>✓</span><span>{s}</span></div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/account/orders" className="px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>Track My Order</Link>
          <Link href="/shop" className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
