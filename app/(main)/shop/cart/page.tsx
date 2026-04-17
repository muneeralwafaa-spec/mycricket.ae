'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, Tag, Truck } from 'lucide-react'
import { formatAED, UAE_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

const initialItems = [
  { id: '1', name: 'Gray Nicolls Legend DXM 5 Star', brand: 'Gray Nicolls', variant: 'SH Short Handle', price: 899, qty: 1, icon: '🏏', vendor: 'Cricket Store Dubai' },
  { id: '2', name: 'Custom Team Jersey Set (11 pcs)', brand: 'Custom Print', variant: 'Medium / Your Design', price: 950, qty: 1, icon: '🎽', vendor: 'UAE Cricket Kits' },
  { id: '3', name: 'SG Test Match Red Ball (6pk)', brand: 'SG', variant: null, price: 280, qty: 2, icon: '⚾', vendor: 'Cricket Store Dubai' },
]

export default function CartPage() {
  const [items, setItems] = useState(initialItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : UAE_SHIPPING_FEE
  const total = subtotal - discount + shipping

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }} className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={24} style={{ color: 'var(--green)' }} />
          <h1 className="font-display text-4xl tracking-wide" style={{ color: 'var(--ink)' }}>
            Your Cart
          </h1>
          <span className="text-sm px-2.5 py-1 rounded-full font-mono-dm"
            style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
            {items.reduce((s,i)=>s+i.qty,0)} items
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--ink)' }}>Your cart is empty</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Browse our cricket shop and add some gear!</p>
            <Link href="/shop" className="inline-block px-8 py-3 rounded-lg text-sm font-medium no-underline"
              style={{ background: 'var(--green)', color: '#fff' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="rounded-xl p-4 flex gap-4"
                  style={{ background: '#fff', border: '1px solid var(--border)' }}>
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: 'var(--green-light)' }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono-dm mb-0.5" style={{ color: 'var(--ink-light)' }}>{item.brand}</div>
                    <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--ink)' }}>{item.name}</div>
                    {item.variant && (
                      <div className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>{item.variant}</div>
                    )}
                    <div className="text-xs" style={{ color: 'var(--ink-light)' }}>Sold by: {item.vendor}</div>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="font-display text-xl tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(item.price * item.qty)}
                    </span>
                    <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                      <button onClick={() => updateQty(item.id, item.qty-1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--green-light)]"
                        style={{ color: 'var(--ink)', borderRight: '1px solid var(--border)' }}>−</button>
                      <span className="w-8 text-center text-sm" style={{ color: 'var(--ink)' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty+1)}
                        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--green-light)]"
                        style={{ color: 'var(--ink)', borderLeft: '1px solid var(--border)' }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs flex items-center gap-1 transition-colors hover:text-red-500"
                      style={{ color: 'var(--ink-light)' }}>
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo code */}
              <div className="rounded-xl p-4 flex gap-3" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <Tag size={16} className="mt-2.5 flex-shrink-0" style={{ color: 'var(--ink-light)' }} />
                <input value={promoCode} onChange={e => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 bg-transparent outline-none text-sm py-2" style={{ color: 'var(--ink)' }} />
                <button onClick={() => setPromoApplied(promoCode.toLowerCase() === 'cricket10')}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--border)' }}>
                  Apply
                </button>
              </div>
              {promoApplied && (
                <div className="text-xs px-4 py-2 rounded-lg" style={{ background: '#EAF3DE', color: '#3B6D11' }}>
                  ✓ Promo code applied — 10% discount!
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <h2 className="font-display text-2xl tracking-wide mb-5" style={{ color: 'var(--ink)' }}>
                  Order Summary
                </h2>
                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Subtotal', val: formatAED(subtotal) },
                    ...(discount > 0 ? [{ label: 'Discount (10%)', val: `–${formatAED(discount)}` }] : []),
                    { label: 'Shipping', val: shipping === 0 ? 'Free 🎉' : formatAED(shipping) },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-sm">
                      <span style={{ color: 'var(--ink-light)' }}>{r.label}</span>
                      <span style={{ color: r.label === 'Discount (10%)' ? '#3B6D11' : 'var(--ink)' }}>{r.val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-baseline pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="font-medium" style={{ color: 'var(--ink)' }}>Total</span>
                    <span className="font-display text-2xl tracking-wide" style={{ color: 'var(--green)' }}>
                      {formatAED(total)}
                    </span>
                  </div>
                </div>
                <Link href="/shop/checkout"
                  className="block text-center py-3 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-90"
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
                  Proceed to Checkout →
                </Link>
                <Link href="/shop" className="block text-center mt-3 text-xs no-underline"
                  style={{ color: 'var(--ink-light)' }}>
                  ← Continue Shopping
                </Link>
              </div>

              {/* Shipping info */}
              {shipping > 0 && (
                <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
                  <Truck size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-light)' }}>
                    Add <strong style={{ color: 'var(--green)' }}>{formatAED(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more to get free delivery!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
