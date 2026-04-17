'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Star } from 'lucide-react'
import { formatAED } from '@/lib/utils'

const product = {
  id: '1', name: 'Gray Nicolls Legend DXM 5 Star',
  brand: 'Gray Nicolls', category: 'Bats', category_slug: 'bats',
  price: 899, compare_price: 1100,
  icon: '🏏', vendor: 'Cricket Store Dubai', vendor_slug: 'cricket-store-dubai',
  rating: 4.8, reviews: 124,
  short_desc: 'Professional grade English Willow bat for serious players. DXM technology for superior ping and power.',
  description: 'The Gray Nicolls Legend DXM 5 Star is crafted from the finest Grade 1 English Willow. DXM (Dynamic eXtra Mass) pressing technology creates an incredibly powerful bat while maintaining superb blade profile and pick-up weight. Ideal for players who demand the best.',
  specs: { 'Willow Grade': 'Grade 1 English', 'Weight': '1.1–1.2 kg', 'Handle': 'Oval', 'Profile': 'Middle to Edge', 'Sweet Spot': 'Mid-High', 'Made in': 'England' },
  sizes: ['SH Short Handle', 'LH Long Handle', 'SH Harrow'],
  in_stock: true, stock_qty: 8,
  features: ['Grade 1 English Willow', 'DXM pressing technology', 'Oval handle', 'Pre-knocked', '6-month warranty'],
}

const reviews = [
  { name: 'Rahul M.', rating: 5, date: '2 weeks ago', comment: 'Incredible bat, fantastic ping. Worth every dirham.' },
  { name: 'James T.', rating: 5, date: '1 month ago', comment: 'Best purchase I have made. Delivery was fast too.' },
  { name: 'Arjun K.', rating: 4, date: '2 months ago', comment: 'Great bat, slightly heavy but powerful.' },
]

export default function ProductPage() {
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [tab, setTab] = useState<'desc' | 'specs' | 'reviews'>('desc')

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--ink-light)' }}>
          <Link href="/shop" className="no-underline hover:text-[var(--green)]">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category_slug}`} className="no-underline hover:text-[var(--green)]">{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">

          {/* Image */}
          <div>
            <div className="rounded-2xl flex items-center justify-center text-8xl mb-4"
              style={{ background: 'var(--green-light)', height: 360 }}>
              {product.icon}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all"
                  style={{ background: 'var(--green-light)', height: 72, border: i===1 ? '2px solid var(--green)' : '1px solid var(--border)' }}>
                  {product.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--ink-light)' }}>
              {product.brand}
            </div>
            <h1 className="font-display text-4xl tracking-wide mb-3" style={{ color: 'var(--ink)', lineHeight: 1.1 }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} fill={s <= Math.round(product.rating) ? 'var(--gold)' : 'none'}
                    stroke="var(--gold)" />
                ))}
              </div>
              <span className="text-sm" style={{ color: 'var(--ink-light)' }}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-light)' }}>
              {product.short_desc}
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl tracking-wide" style={{ color: 'var(--green)' }}>
                {formatAED(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-lg line-through" style={{ color: 'var(--ink-light)' }}>
                  {formatAED(product.compare_price)}
                </span>
              )}
              {product.compare_price && (
                <span className="text-sm px-2 py-0.5 rounded-full font-medium"
                  style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                  Save {formatAED(product.compare_price - product.price)}
                </span>
              )}
            </div>

            {/* Size selector */}
            <div className="mb-5">
              <div className="text-xs font-medium mb-2" style={{ color: 'var(--ink)' }}>Size</div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className="px-4 py-2 rounded-lg text-sm transition-all"
                    style={{
                      border: `1px solid ${selectedSize === s ? 'var(--green)' : 'var(--border)'}`,
                      background: selectedSize === s ? 'var(--green-light)' : '#fff',
                      color: selectedSize === s ? 'var(--green)' : 'var(--ink)',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <button onClick={() => setQty(Math.max(1, qty-1))}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[var(--green-light)]"
                  style={{ color: 'var(--ink)', borderRight: '1px solid var(--border)' }}>−</button>
                <span className="w-10 text-center text-sm font-medium" style={{ color: 'var(--ink)' }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock_qty, qty+1))}
                  className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[var(--green-light)]"
                  style={{ color: 'var(--ink)', borderLeft: '1px solid var(--border)' }}>+</button>
              </div>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--green)', color: '#fff' }}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl transition-all"
                style={{ border: '1px solid var(--border)', background: '#fff', color: 'var(--ink)' }}>
                <Heart size={16} />
              </button>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-5 text-xs" style={{ color: 'var(--green)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
              In stock — {product.stock_qty} units left
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Truck size={14} />, text: 'Free delivery over AED 200' },
                { icon: <Shield size={14} />, text: '6-month warranty' },
                { icon: <RotateCcw size={14} />, text: '7-day easy returns' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--green)' }}>{b.icon}</span>
                  <span className="text-xs leading-tight" style={{ color: 'var(--ink-light)' }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Vendor */}
            <div className="mt-5 flex items-center gap-3 p-3 rounded-xl"
              style={{ border: '1px solid var(--border)', background: '#fff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-base"
                style={{ background: 'var(--green)', color: '#fff' }}>
                CS
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{product.vendor}</div>
                <div className="text-xs" style={{ color: 'var(--ink-light)' }}>Verified vendor · Dubai</div>
              </div>
              <Link href={`/vendor/${product.vendor_slug}`}
                className="text-xs no-underline px-3 py-1.5 rounded-lg"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>
                View Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid var(--border)' }}>
          <div className="flex" style={{ borderBottom: '1px solid var(--border)' }}>
            {(['desc', 'specs', 'reviews'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-6 py-4 text-sm font-medium capitalize transition-all"
                style={{
                  color: tab === t ? 'var(--green)' : 'var(--ink-light)',
                  borderBottom: tab === t ? '2px solid var(--green)' : '2px solid transparent',
                  background: 'transparent',
                }}>
                {t === 'desc' ? 'Description' : t === 'specs' ? 'Specifications' : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === 'desc' && (
              <div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-light)' }}>{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink-light)' }}>
                      <span style={{ color: 'var(--green)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tab === 'specs' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border)' }}>
                    <div className="text-xs font-mono-dm mb-1" style={{ color: 'var(--ink-light)' }}>{k}</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="pb-4" style={{ borderBottom: i < reviews.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                          style={{ background: 'var(--green)', color: '#fff' }}>
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{r.name}</span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} fill={s <= r.rating ? 'var(--gold)' : 'none'} stroke="var(--gold)" />
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--ink-light)' }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
