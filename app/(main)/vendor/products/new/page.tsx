'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { Plus, X } from 'lucide-react'
export const dynamic = 'force-dynamic'

const CATEGORIES = ['Bats', 'Pads', 'Gloves', 'Helmets', 'Balls', 'Shoes', 'Jerseys', 'Kits', 'Bags', 'Equipment', 'Other']
const BRANDS = ['Gray Nicolls', 'Kookaburra', 'SG', 'SS Ton', 'Adidas', 'New Balance', 'Shrey', 'GM', 'MRF', 'Custom Print', 'BOLA', 'Other']
const CONDITIONS = ['New', 'Like New', 'Good', 'Used']

export default function AddProductPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', description: '', category: '', brand: '', condition: 'New',
    price: '', compare_price: '', stock_qty: '10',
    sku: '', weight_kg: '',
    specifications: [{ key: '', value: '' }],
    includes: [''],
    images: [] as string[],
    is_active: true,
  })
  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const addSpec = () => set('specifications', [...form.specifications, { key: '', value: '' }])
  const updateSpec = (i: number, k: string, v: string) => set('specifications', form.specifications.map((s, idx) => idx === i ? { ...s, [k]: v } : s))
  const removeSpec = (i: number) => set('specifications', form.specifications.filter((_, idx) => idx !== i))

  const addInclude = () => set('includes', [...form.includes, ''])
  const updateInclude = (i: number, v: string) => set('includes', form.includes.map((s, idx) => idx === i ? v : s))
  const removeInclude = (i: number) => set('includes', form.includes.filter((_, idx) => idx !== i))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/shop/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          compare_price: form.compare_price ? Number(form.compare_price) : null,
          stock_qty: Number(form.stock_qty),
          weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
        }),
      })
      if (res.ok) router.push('/vendor/products')
    } finally { setLoading(false) }
  }

  if (!user) return (
    <div className="container-uae py-20 text-center">
      <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-block" style={{ background: 'var(--red)' }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--black)' }} className="px-4 py-12">
        <div className="container-uae max-w-3xl">
          <Link href="/vendor/products" className="text-xs font-mono-dm mb-4 block" style={{ color: 'rgba(255,255,255,0.4)' }}>← My Products</Link>
          <h1 className="font-display text-4xl text-white mb-2">Add Product</h1>
          {/* Steps */}
          <div className="flex items-center gap-2 mt-4">
            {['Details', 'Pricing', 'Specs'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: step > i+1 ? 'var(--green)' : step === i+1 ? 'var(--red)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step >= i+1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}>{s}</span>
                {i < 2 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-uae py-8 max-w-3xl">
        {/* Step 1: Basic details */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Product Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Product Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="e.g. Gray Nicolls Legend DXM — Grade 1 English Willow"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Category *</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Brand *</label>
                    <select value={form.brand} onChange={e => set('brand', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      <option value="">Select brand</option>
                      {BRANDS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Condition</label>
                    <select value={form.condition} onChange={e => set('condition', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }}>
                      {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>SKU / Product Code</label>
                    <input value={form.sku} onChange={e => set('sku', e.target.value)}
                      placeholder="e.g. GN-LEG-DXM-001"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Description *</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)}
                    rows={4} placeholder="Describe your product — features, suitable for who, grade, size options..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                {/* Image URLs */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Product Image URL</label>
                  <input
                    placeholder="https://... (paste image URL or use Supabase Storage URL)"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }}
                    onChange={e => set('images', [e.target.value])} />
                  <p className="text-xs mt-1" style={{ color: 'var(--ink-light)' }}>
                    Upload images to Supabase Storage (bucket: products) and paste the URL here
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => form.name && form.category && form.brand && setStep(2)}
              disabled={!form.name || !form.category || !form.brand}
              className="w-full py-3.5 rounded-xl text-sm font-medium text-white"
              style={{ background: form.name && form.category && form.brand ? 'var(--red)' : 'var(--border)' }}>
              Next: Pricing & Stock →
            </button>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-5" style={{ color: 'var(--black)' }}>Pricing & Stock</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Selling Price (AED) *</label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                    placeholder="e.g. 899"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Compare At Price (AED)</label>
                  <input type="number" value={form.compare_price} onChange={e => set('compare_price', e.target.value)}
                    placeholder="e.g. 1100 (shows as crossed out)"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Stock Quantity *</label>
                  <input type="number" value={form.stock_qty} onChange={e => set('stock_qty', e.target.value)}
                    placeholder="e.g. 10 (use 999 for unlimited)"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--ink-mid)' }}>Weight (kg)</label>
                  <input type="number" value={form.weight_kg} onChange={e => set('weight_kg', e.target.value)}
                    placeholder="e.g. 1.2"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                </div>
              </div>

              {form.price && form.compare_price && Number(form.compare_price) > Number(form.price) && (
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--green-light)', border: '1px solid var(--border-green)' }}>
                  <div className="text-xs" style={{ color: 'var(--green-dark)' }}>
                    💰 Discount: {Math.round((1 - Number(form.price)/Number(form.compare_price))*100)}% off · Customers save AED {Number(form.compare_price) - Number(form.price)}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full peer" style={{ background: form.is_active ? 'var(--green)' : '#e5e7eb' }}>
                    <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${form.is_active ? 'translate-x-5' : ''}`} />
                  </div>
                </label>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>List product immediately</div>
                  <div className="text-xs" style={{ color: 'var(--ink-light)' }}>Product will be visible to customers on save</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={() => form.price && setStep(3)} disabled={!form.price}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: form.price ? 'var(--red)' : 'var(--border)' }}>
                Next: Specifications →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Specs */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>Specifications</h2>
              <p className="text-xs mb-5" style={{ color: 'var(--ink-light)' }}>Add product specs like Brand, Weight, Grade, Size etc.</p>
              <div className="space-y-3">
                {form.specifications.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s.key} onChange={e => updateSpec(i, 'key', e.target.value)}
                      placeholder="e.g. Weight"
                      className="w-32 px-3 py-2 rounded-xl text-xs outline-none flex-shrink-0"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                    <input value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)}
                      placeholder="e.g. 2.9 lbs"
                      className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                    <button onClick={() => removeSpec(i)} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
                <button onClick={addSpec} className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                  style={{ border: '1px dashed var(--border)', color: 'var(--ink-light)' }}>
                  <Plus size={12} /> Add Specification
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-2xl mb-2" style={{ color: 'var(--black)' }}>What&apos;s in the Box</h2>
              <p className="text-xs mb-4" style={{ color: 'var(--ink-light)' }}>List everything included with the product</p>
              <div className="space-y-2">
                {form.includes.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={item} onChange={e => updateInclude(i, e.target.value)}
                      placeholder="e.g. Cricket bat"
                      className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                      style={{ border: '1px solid var(--border)', color: 'var(--black)' }} />
                    <button onClick={() => removeInclude(i)} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
                <button onClick={addInclude} className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                  style={{ border: '1px dashed var(--border)', color: 'var(--ink-light)' }}>
                  <Plus size={12} /> Add Item
                </button>
              </div>
            </div>

            {/* Review */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-xl mb-3" style={{ color: 'var(--black)' }}>Summary</h3>
              <div className="space-y-1.5 text-sm">
                <div><span style={{ color: 'var(--ink-light)' }}>Name: </span><span style={{ color: 'var(--black)' }}>{form.name}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Category: </span><span style={{ color: 'var(--black)' }}>{form.category}</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Price: </span><span style={{ color: 'var(--green)' }}>AED {form.price}</span>{form.compare_price && <span style={{ color: 'var(--ink-light)' }}> (was AED {form.compare_price})</span>}</div>
                <div><span style={{ color: 'var(--ink-light)' }}>Stock: </span><span style={{ color: 'var(--black)' }}>{form.stock_qty} units</span></div>
                <div><span style={{ color: 'var(--ink-light)' }}>Status: </span><span style={{ color: form.is_active ? 'var(--green)' : 'var(--ink-light)' }}>{form.is_active ? 'Live immediately' : 'Hidden (publish later)'}</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl text-sm" style={{ border: '1px solid var(--border)', color: 'var(--ink)' }}>← Back</button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: 'var(--red)' }}>
                {loading ? 'Publishing...' : '🚀 Publish Product'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
