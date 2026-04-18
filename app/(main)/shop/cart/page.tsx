'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { getCart, updateQty, removeFromCart, getCartTotal, CartItem } from '@/lib/cart'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setItems(getCart())
    const handler = () => setItems(getCart())
    window.addEventListener('cart-updated', handler)
    return () => window.removeEventListener('cart-updated', handler)
  }, [])

  const handleQty = (id: string, qty: number) => { updateQty(id, qty); setItems(getCart()) }
  const handleRemove = (id: string) => { removeFromCart(id); setItems(getCart()) }
  const applyPromo = () => { if (promo.toUpperCase() === 'CRICKET10') setPromoApplied(true) }

  const subtotal = getCartTotal()
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const delivery = subtotal >= 200 ? 0 : 25
  const total = subtotal - discount + delivery
  const vendors = [...new Set(items.map(i => i.vendor))]

  if (!mounted) return null

  if (items.length === 0) return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-16">
        <div className="container-uae">
          <h1 className="font-display text-5xl text-white">Your Cart</h1>
        </div>
      </div>
      <div className="container-uae py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-light)' }}>Browse our cricket gear marketplace and add items to your cart</p>
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
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''} from {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container-uae py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {vendors.map(vendor => (
              <div key={vendor} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-5 py-3 flex items-center gap-2"
                  style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--red)' }}>🏪 {vendor}</span>
                  <span className="text-xs" style={{ color: 'var(--green)' }}>✓ Verified</span>
                </div>
                {items.filter(i => i.vendor === vendor).map((item, idx, arr) => (
                  <div key={item.id} className="flex items-start gap-4 p-5"
                    style={{ background: 'var(--white)', borderBottom: idx < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    {/* Emoji thumbnail */}
                    <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', fontSize: 32 }}>
                      {item.category === 'Bats' ? '🏏' : item.category === 'Helmets' ? '⛑️' : item.category === 'Balls' ? '🔴' : item.category === 'Gloves' ? '🥊' : item.category === 'Jerseys' ? '🎽' : item.category === 'Shoes' ? '👟' : item.category === 'Equipment' ? '⚙️' : item.category === 'Kits' ? '🎒' : '🏏'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/product/${item.id}`}
                        className="text-sm font-medium line-clamp-2 hover:underline block mb-1"
                        style={{ color: 'var(--black)' }}>
                        {item.name}
                      </Link>
                      <div className="text-xs mb-2" style={{ color: 'var(--ink-light)' }}>{item.category}</div>
                      <div className="font-display text-xl mb-2" style={{ color: 'var(--green)' }}>AED {item.price}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <button onClick={() => handleQty(item.id, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium" style={{ color: 'var(--black)' }}>{item.qty}</span>
                          <button onClick={() => handleQty(item.id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => handleRemove(item.id)}
                          className="flex items-center gap-1 text-xs" style={{ color: 'var(--red)' }}>
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-xl" style={{ color: 'var(--black)' }}>
                        AED {item.price * item.qty}
                      </div>
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

              {/* Promo */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input value={promo} onChange={e => setPromo(e.target.value.toUpperCase())}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  <button onClick={applyPromo}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-white"
                    style={{ background: promoApplied ? 'var(--green)' : 'var(--ink)' }}>
                    {promoApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {promoApplied && <p className="text-xs mt-1" style={{ color: 'var(--green)' }}>✓ CRICKET10 applied — 10% off!</p>}
                {!promoApplied && <p className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>Try: CRICKET10</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--ink-light)' }}>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
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
                {delivery > 0 && subtotal > 0 && (
                  <p className="text-xs p-2 rounded-lg" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>
                    Add AED {200 - subtotal} more for free delivery!
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
                🔒 Secure checkout via Telr or Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
