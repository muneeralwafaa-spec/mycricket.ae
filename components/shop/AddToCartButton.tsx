'use client'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/lib/cart'

interface Props {
  product: { id: string; name: string; price: number; vendor: string; vendor_id: string; category: string }
}

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false)

  const handle = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, vendor: product.vendor, vendor_id: product.vendor_id, category: product.category })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <button onClick={handle}
      className="w-full py-4 rounded-2xl text-base font-medium text-white transition-all"
      style={{ background: added ? 'var(--green)' : 'var(--red)', transform: added ? 'scale(0.98)' : 'scale(1)' }}>
      <ShoppingCart size={16} className="inline mr-2" />
      {added ? '✓ Added to Cart! View Cart →' : `Add to Cart — AED ${product.price}`}
    </button>
  )
}
