import Link from 'next/link'
export default function BookingConfirmedPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container-uae max-w-lg py-20 text-center">
        <div className="text-7xl mb-6">🏏</div>
        <h1 className="font-display text-5xl mb-3" style={{ color: 'var(--black)' }}>Booking Confirmed!</h1>
        <p className="text-base mb-2" style={{ color: 'var(--ink-light)' }}>Your booking has been submitted successfully.</p>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-light)' }}>You'll receive a WhatsApp and email confirmation shortly. The facility will confirm your booking within 2 hours.</p>
        <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
          <div className="font-display text-xl mb-1" style={{ color: 'var(--green-dark)' }}>What happens next?</div>
          <div className="space-y-2 text-sm text-left" style={{ color: 'var(--green-dark)' }}>
            {['Facility confirms your booking (within 2hrs)', 'You get WhatsApp + email confirmation', 'Show your booking reference on arrival', 'Rate your experience after the session'].map(s => (
              <div key={s} className="flex items-start gap-2"><span>✓</span><span>{s}</span></div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/account/bookings" className="px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>View My Bookings</Link>
          <Link href="/book/nets" className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>Book Another Net</Link>
        </div>
      </div>
    </div>
  )
}
