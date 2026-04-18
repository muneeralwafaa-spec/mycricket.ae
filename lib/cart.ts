// Cart utility — persists to localStorage

export interface CartItem {
  id: string
  name: string
  price: number
  vendor: string
  vendor_id: string
  category: string
  qty: number
}

const CART_KEY = 'mycricket_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function addToCart(item: Omit<CartItem, 'qty'>): CartItem[] {
  const cart = getCart()
  const existing = cart.find(c => c.id === item.id)
  let updated: CartItem[]
  if (existing) {
    updated = cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
  } else {
    updated = [...cart, { ...item, qty: 1 }]
  }
  localStorage.setItem(CART_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('cart-updated'))
  return updated
}

export function updateQty(id: string, qty: number): CartItem[] {
  const cart = getCart()
  const updated = qty <= 0
    ? cart.filter(c => c.id !== id)
    : cart.map(c => c.id === id ? { ...c, qty } : c)
  localStorage.setItem(CART_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('cart-updated'))
  return updated
}

export function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter(c => c.id !== id)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
  return cart
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
  window.dispatchEvent(new Event('cart-updated'))
}

export function getCartCount(): number {
  return getCart().reduce((s, c) => s + c.qty, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((s, c) => s + c.price * c.qty, 0)
}
