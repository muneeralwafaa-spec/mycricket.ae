'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

const SAMPLE_CART = [
  { id: 'gn-legend-dxm', name: 'Gray Nicolls Legend DXM', vendor: 'Cricket Store Dubai', price: 899, qty: 1, image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=200&q=70' },
  { id: 'kookaburra-helmet-pro500', name: 'Kookaburra Pro 500 Helmet (Medium)', vendor: 'Sports World UAE', price: 450, qty: 1, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&q=70' },
]

export default function CartPage() {
  const [items, setItems] = useState(SAMPLE_CART)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const applyPromo = () => { if (promo.toUpperCase() === 'CRICKET10') setPromoApplied(true) }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const delivery = subtotal >= 200 ? 0 : 25
  const total = subtotal - discount + delivery

  // Group by vendor
  const vendors = [...new Set(items.map(i => i.vendor))]

  if (items.length === 0) return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <h1 className="font-display text-5xl text-white mb-2">Your Cart</h1>
        </div>
      </div>
      <div className="container-uae py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Browse our cricket gear marketplace</p>
        <Link href="/shop" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
          Continue Shopping →
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <h1 className="font-display text-5xl text-white mb-1">Your Cart</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{items.length} item{items.length !== 1 ? 's' : ''} from {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {vendors.map(vendor => (
              <div key={vendor} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--red)' }}>🏪 {vendor}</span>
                  <span className="text-xs" style={{ color: 'var(--green)' }}>✓ Verified</span>
                </div>
                {items.filter(i => i.vendor === vendor).map(item => (
                  <div key={item.id} className="flex items-start gap-4 p-5" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                      <span style={{ fontSize: 32 }}>🏏</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/product/${item.id}`} className="text-sm font-medium line-clamp-2 hover:underline" style={{ color: 'var(--black)' }}>
                        {item.name}
                      </Link>
                      <div className="font-display text-xl mt-1" style={{ color: 'var(--green)' }}>AED {item.price}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium" style={{ color: 'var(--black)' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => remove(item.id)} className="flex items-center gap-1 text-xs" style={{ color: 'var(--red)' }}>
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-xl" style={{ color: 'var(--black)' }}>AED {item.price * item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <Link href="/shop" className="flex items-center gap-2 text-sm" style={{ color: 'var(--red)' }}>
              <ShoppingBag size={14} /> Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div>
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: 'var(--white)', border: '2px solid var(--red)' }}>
              <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--black)' }}>Order Summary</h2>

              {/* Promo code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())}
                    placeholder="Promo code (try CRICKET10)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  <button onClick={applyPromo}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-white"
                    style={{ background: 'var(--green)' }}>
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-xs mt-1" style={{ color: 'var(--green)' }}>✓ CRICKET10 applied — 10% off!</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--ink-light)' }}>Subtotal ({items.reduce((s,i) => s + i.qty, 0)} items)</span>
                  <span style={{ color: 'var(--black)' }}>AED {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--green)' }}>Discount (CRICKET10)</span>
                    <span style={{ color: 'var(--green)' }}>−AED {discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--ink-light)' }}>Delivery</span>
                  <span style={{ color: delivery === 0 ? 'var(--green)' : 'var(--black)' }}>
                    {delivery === 0 ? 'FREE' : `AED ${delivery}`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs" style={{ color: 'var(--ink-light)' }}>
                    Add AED {200 - subtotal} more for free delivery
                  </p>
                )}
              </div>

              <div className="flex justify-between text-base font-medium py-3 mb-4"
                style={{ borderTop: '2px solid var(--border)' }}>
                <span style={{ color: 'var(--black)' }}>Total</span>
                <span className="font-display text-2xl" style={{ color: 'var(--green)' }}>AED {total}</span>
              </div>

              <Link href="/shop/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-medium text-white"
                style={{ background: 'var(--red)' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--ink-light)' }}>
                🔒 Secure checkout via Telr (UAE) or Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
