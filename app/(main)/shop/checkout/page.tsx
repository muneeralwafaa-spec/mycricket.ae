'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Shield, Lock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { formatAED } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const orderItems = [
  { name: 'Gray Nicolls Legend DXM 5 Star', variant: 'SH', price: 899, qty: 1, icon: '🏏' },
  { name: 'Custom Team Jersey Set (11 pcs)', variant: 'M', price: 950, qty: 1, icon: '🎽' },
]
const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
const shipping = 0
const total = subtotal + shipping

type PaymentMethod = 'telr' | 'cod' | 'bank'

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telr')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '',
    line1: '', line2: '', city: '', emirate: 'Dubai', notes: '',
  })
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handlePlaceOrder = async () => {
    setProcessing(true)
    setError(null)
    try {
      // 1. Create order
      const orderRes = await fetch('/api/shop/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems.map(i => ({
            product_id: 'mock-id',
            quantity: i.qty,
          })),
          shipping_address: {
            full_name: form.full_name,
            phone: form.phone,
            email: form.email,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            emirate: form.emirate,
            country: 'UAE',
          },
          customer_name: form.full_name,
          customer_email: form.email,
          customer_phone: form.phone,
          payment_method: paymentMethod,
          notes: form.notes,
        }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error ?? 'Failed to create order')

      const orderId = orderData.data?.id

      if (paymentMethod === 'telr') {
        // 2. Initiate Telr payment
        const payRes = await fetch('/api/payments/telr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        })
        const payData = await payRes.json()
        if (!payRes.ok) throw new Error(payData.error ?? 'Payment initiation failed')
        // 3. Redirect to Telr hosted payment page
        window.location.href = payData.payment_url
      } else {
        // COD or bank — go straight to confirmed
        router.push(`/shop/order-confirmed?order_id=${orderId}`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setProcessing(false)
    }
  }

  const inp = {
    className: "w-full px-4 py-2.5 rounded-lg text-sm outline-none",
    style: { border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' } as React.CSSProperties,
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }} className="px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl tracking-wide" style={{ color: 'var(--ink)' }}>Checkout</h1>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-light)' }}>
            <Lock size={12} /> Secured by Telr
          </div>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-3 mb-8">
          {(['shipping', 'payment'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button onClick={() => s === 'shipping' && setStep(s)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: step === s ? 'var(--green)' : '#fff',
                  color: step === s ? '#fff' : 'var(--ink-light)',
                  border: `1px solid ${step === s ? 'var(--green)' : 'var(--border)'}`,
                }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{ background: step === s ? 'rgba(255,255,255,0.2)' : 'var(--green-light)', color: step === s ? '#fff' : 'var(--green)' }}>
                  {i + 1}
                </span>
                {s === 'shipping' ? 'Delivery' : 'Payment'}
              </button>
              {i < 1 && <span style={{ color: 'var(--ink-light)' }}>›</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            {/* Shipping step */}
            {step === 'shipping' && (
              <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <h2 className="font-display text-2xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>Delivery Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Full Name *</label>
                    <input value={form.full_name} onChange={e => update('full_name', e.target.value)} placeholder="Your full name" required {...inp} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" required {...inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Phone / WhatsApp *</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+971 50 000 0000" required {...inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Address *</label>
                    <input value={form.line1} onChange={e => update('line1', e.target.value)} placeholder="Building, street, area" required {...inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Apartment / Floor (optional)</label>
                    <input value={form.line2} onChange={e => update('line2', e.target.value)} placeholder="Floor, apartment, landmark" {...inp} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>City *</label>
                    <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Dubai" required {...inp} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Emirate *</label>
                    <select value={form.emirate} onChange={e => update('emirate', e.target.value)} {...inp}>
                      {['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'].map(e=>(
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>Order Notes (optional)</label>
                    <textarea value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Any special instructions..." rows={3}
                      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                      style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
                  </div>
                </div>
                <button onClick={() => {
                  if (!form.full_name || !form.email || !form.phone || !form.line1) return
                  setStep('payment')
                }} className="mt-6 w-full py-3.5 rounded-xl text-sm font-medium"
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Payment step */}
            {step === 'payment' && (
              <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <h2 className="font-display text-2xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>Payment Method</h2>

                <div className="space-y-3 mb-6">
                  {([
                    { id: 'telr' as const, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, AMEX — Secured by Telr', icon: '💳', recommended: true },
                    { id: 'cod' as const, label: 'Cash on Delivery', sub: 'Pay when your order arrives in UAE', icon: '💵', recommended: false },
                    { id: 'bank' as const, label: 'Bank Transfer', sub: 'UAE local bank — we confirm within 24 hours', icon: '🏦', recommended: false },
                  ]).map(m => (
                    <label key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        border: `${paymentMethod === m.id ? '2px solid var(--green)' : '1px solid var(--border)'}`,
                        background: paymentMethod === m.id ? 'var(--green-light)' : 'var(--cream)',
                      }}>
                      <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} />
                      <span className="text-2xl">{m.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{m.label}</span>
                          {m.recommended && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green)', color: '#fff' }}>
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{m.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'telr' && (
                  <div className="flex items-center gap-2 text-xs p-3 rounded-lg mb-6"
                    style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
                    <Shield size={14} style={{ color: 'var(--green)' }} />
                    <span style={{ color: 'var(--ink-light)' }}>
                      You'll be redirected to Telr's secure payment page. Your card details are never stored on our servers.
                    </span>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>Bank Transfer Details</div>
                    <div className="space-y-1 text-xs" style={{ color: 'var(--ink-light)' }}>
                      <div>Bank: Emirates NBD</div>
                      <div>Account Name: MyCricket.ae FZE</div>
                      <div>IBAN: AE07 0260 0010 0000 0000 001</div>
                      <div>Reference: Use your order number</div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-xs px-4 py-3 rounded-xl mb-4"
                    style={{ background: '#FCEBEB', border: '1px solid #F7C1C1', color: '#A32D2D' }}>
                    {error}
                  </div>
                )}

                <button onClick={handlePlaceOrder} disabled={processing}
                  className="w-full py-4 rounded-xl text-sm font-medium transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                  {processing ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                  ) : (
                    `${paymentMethod === 'telr' ? 'Pay Now' : 'Place Order'} — ${formatAED(total)}`
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="rounded-2xl p-5 h-fit" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <h3 className="font-display text-xl tracking-wide mb-4" style={{ color: 'var(--ink)' }}>Your Order</h3>
            <div className="space-y-3 mb-4">
              {orderItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'var(--green-light)' }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium leading-snug" style={{ color: 'var(--ink)' }}>{item.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{item.variant} · x{item.qty}</div>
                  </div>
                  <div className="text-sm font-medium flex-shrink-0" style={{ color: 'var(--ink)' }}>
                    {formatAED(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--ink-light)' }}>Subtotal</span>
                <span style={{ color: 'var(--ink)' }}>{formatAED(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--ink-light)' }}>Shipping</span>
                <span style={{ color: 'var(--green)' }}>Free 🎉</span>
              </div>
              <div className="flex justify-between items-baseline pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="font-medium" style={{ color: 'var(--ink)' }}>Total</span>
                <span className="font-display text-2xl tracking-wide" style={{ color: 'var(--green)' }}>
                  {formatAED(total)}
                </span>
              </div>
            </div>
            <Link href="/shop/cart" className="block text-center mt-4 text-xs no-underline" style={{ color: 'var(--ink-light)' }}>
              ← Edit cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
