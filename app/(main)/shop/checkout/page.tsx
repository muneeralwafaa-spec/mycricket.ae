'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CreditCard, Smartphone, Truck } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [payMethod, setPayMethod] = useState<'telr' | 'stripe' | 'cod'>('telr')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', emirate: 'Dubai', notes: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleOrder = async () => {
    setLoading(true)
    // Simulate order placement
    await new Promise(r => setTimeout(r, 1500))
    router.push('/shop/order-confirmed')
  }

  const cartTotal = 1349 // From cart
  const delivery = cartTotal >= 200 ? 0 : 25
  const total = cartTotal + delivery

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/shop/cart" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Back to Cart</Link>
          <h1 className="font-display text-5xl text-white mb-2">Checkout</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Secure checkout — SSL encrypted</p>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {/* Delivery details */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Delivery Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your full name', span: 2 },
                  { key: 'phone', label: 'Phone / WhatsApp', placeholder: '+971 50 000 0000', span: 1 },
                  { key: 'email', label: 'Email', placeholder: 'your@email.com', span: 1 },
                  { key: 'address', label: 'Delivery Address', placeholder: 'Building, street, area', span: 2 },
                ].map(f => (
                  <div key={f.key} className={f.span === 2 ? 'col-span-2' : ''}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>{f.label}</label>
                    <input value={(form as Record<string, string>)[f.key]} onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Emirate</label>
                  <select value={form.emirate} onChange={e => set('emirate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                    {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Order Notes</label>
                  <input value={form.notes} onChange={e => set('notes', e.target.value)}
                    placeholder="Any special instructions"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'telr' as const, icon: <CreditCard size={18} />, label: 'Pay by Card (Telr)', desc: 'Visa, Mastercard, UAE cards · Secure payment gateway' },
                  { id: 'stripe' as const, icon: <CreditCard size={18} />, label: 'Pay by Card (Stripe)', desc: 'International cards · Amex accepted' },
                  { id: 'cod' as const, icon: <Truck size={18} />, label: 'Cash on Delivery', desc: 'Pay when your order arrives · Dubai & Abu Dhabi only' },
                ].map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all"
                    style={{ background: payMethod === m.id ? 'var(--black)' : 'var(--off-white)', border: payMethod === m.id ? '2px solid var(--red)' : '1px solid var(--border)' }}>
                    <div className="mt-0.5" style={{ color: payMethod === m.id ? 'var(--red)' : 'var(--ink-light)' }}>{m.icon}</div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: payMethod === m.id ? 'white' : 'var(--black)' }}>{m.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: payMethod === m.id ? 'rgba(255,255,255,0.5)' : 'var(--ink-light)' }}>{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: 'var(--white)', border: '2px solid var(--red)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--ink-light)' }}>Subtotal</span>
                  <span style={{ color: 'var(--black)' }}>AED {cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--ink-light)' }}>Delivery</span>
                  <span style={{ color: delivery === 0 ? 'var(--green)' : 'var(--black)' }}>{delivery === 0 ? 'FREE' : `AED ${delivery}`}</span>
                </div>
              </div>
              <div className="flex justify-between text-base font-medium py-3 mb-4"
                style={{ borderTop: '2px solid var(--border)' }}>
                <span style={{ color: 'var(--black)' }}>Total</span>
                <span className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {total}</span>
              </div>
              <button onClick={handleOrder} disabled={loading || !form.name || !form.phone || !form.address}
                className="w-full py-4 rounded-2xl text-sm font-medium text-white transition-all"
                style={{ background: form.name && form.phone && form.address ? 'var(--red)' : 'var(--border)' }}>
                {loading ? 'Placing Order...' : payMethod === 'cod' ? '📦 Place Order (COD)' : `💳 Pay AED ${total}`}
              </button>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--ink-light)' }}>🔒 SSL encrypted · Safe checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
