import { Metadata } from 'next'
import Link from 'next/link'
import { PRODUCT_CATEGORIES, CRICKET_BRANDS, EMIRATES } from '@/lib/utils'

export const metadata: Metadata = { title: 'Add Product — Vendor Dashboard' }

export default function NewProductPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--ink)' }} className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
            <Link href="/vendor/dashboard" className="no-underline text-white/40 hover:text-white/70">Dashboard</Link>
            <span>/</span>
            <Link href="/vendor/products" className="no-underline text-white/40 hover:text-white/70">Products</Link>
            <span>/</span>
            <span className="text-white/70">New Product</span>
          </div>
          <h1 className="font-display text-4xl text-white tracking-wide">Add New Product</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">

          {/* Basic info */}
          <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>
              Product Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Product Name *
                </label>
                <input placeholder="e.g. Gray Nicolls Legend DXM — Grade 1 English Willow"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                    Category *
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
                    <option value="">Select category</option>
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                    Brand *
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }}>
                    <option value="">Select brand</option>
                    {CRICKET_BRANDS.map(b => <option key={b}>{b}</option>)}
                    <option value="other">Other / Custom</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Short Description (shown in listings)
                </label>
                <input placeholder="One-line summary of the product"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Full Description *
                </label>
                <textarea rows={5} placeholder="Detailed product description, features, specifications..."
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl tracking-wide mb-6" style={{ color: 'var(--ink)' }}>
              Pricing & Stock
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Price (AED) *
                </label>
                <input type="number" placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Compare Price (AED)
                </label>
                <input type="number" placeholder="Original / MRP"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Stock Quantity *
                </label>
                <input type="number" placeholder="0"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  SKU (optional)
                </label>
                <input placeholder="e.g. GN-LEG-SH-001"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Weight (grams, optional)
                </label>
                <input type="number" placeholder="e.g. 1150"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>Customisable (jerseys/printing)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl tracking-wide mb-2" style={{ color: 'var(--ink)' }}>
              Variants (optional)
            </h2>
            <p className="text-xs mb-5" style={{ color: 'var(--ink-light)' }}>
              Add size, colour, or other options. Each variant can have its own price and stock.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Option Name (e.g. Size)
                </label>
                <input placeholder="Size" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-light)' }}>
                  Option Values (comma separated)
                </label>
                <input placeholder="SH, LH, Harrow, Youth" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--cream)', color: 'var(--ink)' }} />
              </div>
            </div>
            <button className="text-sm px-4 py-2 rounded-lg transition-all"
              style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: 'var(--cream)' }}>
              + Add Another Option
            </button>
          </div>

          {/* Images */}
          <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <h2 className="font-display text-2xl tracking-wide mb-2" style={{ color: 'var(--ink)' }}>
              Product Images
            </h2>
            <p className="text-xs mb-5" style={{ color: 'var(--ink-light)' }}>
              Upload up to 8 images. First image is the main listing image.
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-[var(--green)] p-4"
                  style={{ border: '2px dashed var(--border)', background: 'var(--cream)', aspectRatio: '1' }}>
                  <span className="text-2xl">📷</span>
                  <span className="text-xs" style={{ color: 'var(--ink-light)' }}>{i === 1 ? 'Main' : `Image ${i}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button className="px-8 py-3.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}>
              Publish Product
            </button>
            <button className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ border: '1px solid var(--border)', color: 'var(--ink)', background: '#fff' }}>
              Save as Draft
            </button>
            <Link href="/vendor/products" className="text-sm no-underline" style={{ color: 'var(--ink-light)' }}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
