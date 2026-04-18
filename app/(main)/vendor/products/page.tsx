'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
export const dynamic = 'force-dynamic'

interface Product {
  id: string; name: string; price: number; category: string
  stock_qty: number; is_active: boolean; images: string[]
  created_at: string
}

export default function VendorProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!user) return
    fetch('/api/shop/products?vendor=true').then(r => r.json()).then(d => {
      if (d.data) setProducts(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  // Demo products if no Supabase data
  const demoProducts: Product[] = [
    { id: '1', name: 'Gray Nicolls Legend DXM Bat', price: 899, category: 'Bats', stock_qty: 5, is_active: true, images: ['https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=100&q=60'], created_at: new Date().toISOString() },
    { id: '2', name: 'Custom Club Jersey (Min 5)', price: 350, category: 'Jerseys', stock_qty: 999, is_active: true, images: ['https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=100&q=60'], created_at: new Date().toISOString() },
    { id: '3', name: 'SG Test Balls × 6', price: 280, category: 'Balls', stock_qty: 12, is_active: false, images: ['https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&q=60'], created_at: new Date().toISOString() },
  ]

  const display = (products.length > 0 ? products : demoProducts)
    .filter(p => filter === 'all' ? true : filter === 'active' ? p.is_active : !p.is_active)

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae">
          <Link href="/vendor/dashboard" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-5xl text-white mb-2">My Products</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {display.length} products · {display.filter(p => p.is_active).length} active
              </p>
            </div>
            <Link href="/vendor/products/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              <Plus size={15} /> Add Product
            </Link>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }} className="sticky top-16 z-30">
        <div className="container-uae py-3 flex gap-2">
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={{ background: filter === f ? 'var(--red)' : 'var(--cream)', color: filter === f ? 'white' : 'var(--black)', border: `1px solid ${filter === f ? 'var(--red)' : 'var(--border)'}` }}>
              {f} ({(f === 'all' ? display : display.filter(p => f === 'active' ? p.is_active : !p.is_active)).length})
            </button>
          ))}
        </div>
      </div>

      <div className="container-uae py-8">
        {loading ? (
          <div className="text-center py-20" style={{ color: 'var(--ink-light)' }}>Loading products...</div>
        ) : display.length === 0 ? (
          <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="font-display text-3xl mb-3" style={{ color: 'var(--black)' }}>No products yet</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--ink-light)' }}>
              Add cricket gear to your shop. Products appear in the marketplace and customers can order directly.
            </p>
            <Link href="/vendor/products/new" className="inline-block px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--red)' }}>
              Add Your First Product
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Products', value: display.length },
                { label: 'Active', value: display.filter(p => p.is_active).length },
                { label: 'Low Stock (< 5)', value: display.filter(p => p.stock_qty < 5 && p.stock_qty > 0).length },
                { label: 'Out of Stock', value: display.filter(p => p.stock_qty === 0).length },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="font-display text-3xl mb-0.5" style={{ color: 'var(--red)' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Product list */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-mono-dm uppercase"
                style={{ background: 'var(--off-white)', color: 'var(--ink-light)', borderBottom: '1px solid var(--border)' }}>
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Stock</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              {display.map((p, i) => (
                <div key={p.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
                  style={{ borderBottom: i < display.length-1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={p.images[0] || 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=100&q=60'} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: 'var(--black)' }}>{p.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--ink-light)' }}>{p.category}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-display text-lg" style={{ color: 'var(--green)' }}>
                    AED {p.price}
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-medium" style={{ color: p.stock_qty < 5 ? 'var(--red)' : 'var(--black)' }}>
                      {p.stock_qty === 999 ? '∞' : p.stock_qty}
                    </span>
                    {p.stock_qty < 5 && p.stock_qty > 0 && <div className="text-xs" style={{ color: 'var(--red)' }}>Low stock</div>}
                    {p.stock_qty === 0 && <div className="text-xs" style={{ color: 'var(--red)' }}>Out of stock</div>}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: p.is_active ? 'var(--green-light)' : 'var(--red-light)', color: p.is_active ? 'var(--green)' : 'var(--red)' }}>
                      {p.is_active ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--off-white)', color: 'var(--ink-mid)' }} title="Toggle visibility">
                      {p.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--off-white)', color: 'var(--ink-mid)' }} title="Edit product">
                      <Edit size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--red-light)', color: 'var(--red)' }} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
