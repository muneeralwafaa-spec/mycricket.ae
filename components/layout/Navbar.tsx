'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, ChevronDown, LogOut, LayoutDashboard, Package, User, Calendar } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

const navLinks = [
  { href: '/academies',   label: 'Academies' },
  { href: '/facilities',  label: 'Facilities' },
  { href: '/coaches',     label: 'Coaches' },
  { href: '/book/nets',   label: 'Book Nets' },
  { href: '/shop',        label: 'Shop' },
  { href: '/classifieds', label: 'Classifieds' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/news',        label: 'News' },
]

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    const updateCount = () => {
      try {
        const data = localStorage.getItem('mycricket_cart')
        const cart = data ? JSON.parse(data) : []
        setCartCount(cart.reduce((s: number, i: { qty: number }) => s + i.qty, 0))
      } catch { setCartCount(0) }
    }
    updateCount()
    window.addEventListener('cart-updated', updateCount)
    return () => window.removeEventListener('cart-updated', updateCount)
  }, [])

  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const { user, profile, signOut, isVendor } = useAuth()

  return (
    <>
      <div className="h-16" />
      <nav className="fixed top-3 left-0 right-0 z-50"
        style={{ background: 'rgba(26,26,26,0.97)', borderBottom: '1px solid rgba(239,51,64,0.3)' }}>
        <div className="container-uae h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-white flex-shrink-0"
              style={{ background: 'var(--red)', fontSize: 13 }}>MC</div>
            <div className="font-display tracking-widest text-white hidden sm:block" style={{ fontSize: 17 }}>
              MY<span style={{ color: 'var(--red)' }}>CRICKET</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>.AE</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{ color: l.href === '/book/nets' ? 'var(--red)' : 'rgba(255,255,255,0.65)' }}>
                {l.href === '/book/nets' ? '🏏 ' : ''}{l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/shop/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ color: 'rgba(255,255,255,0.6)' }}>
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'var(--red)', fontSize: 9 }}>{cartCount}</span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                  style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-display text-sm text-white"
                    style={{ background: 'var(--green)', fontSize: 13 }}>
                    {(profile?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm max-w-20 truncate">
                    {profile?.full_name?.split(' ')[0] ?? 'Account'}
                  </span>
                  <ChevronDown size={13} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-1 w-52 rounded-xl overflow-hidden py-1 z-50"
                    style={{ background: 'var(--black-mid)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="text-xs font-medium text-white truncate">{profile?.full_name}</div>
                      <div className="text-xs text-white/40 truncate">{user.email}</div>
                    </div>
                    <Link href="/account/bookings" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5">
                      <Calendar size={14} /> My Bookings
                    </Link>
                    <Link href="/account/orders" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5">
                      <Package size={14} /> My Orders
                    </Link>
                    <Link href="/account/profile" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5">
                      <User size={14} /> Profile
                    </Link>
                    {isVendor && (
                      <Link href="/vendor/dashboard" onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5">
                        <LayoutDashboard size={14} /> Vendor Dashboard
                      </Link>
                    )}
                    <div className="border-t border-white/10 mt-1">
                      <button onClick={() => { signOut(); setUserMenu(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/5">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="hidden sm:block px-3 py-1.5 rounded-lg text-sm"
                  style={{ color: 'rgba(255,255,255,0.6)' }}>Sign In</Link>
                <Link href="/register"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium"
                  style={{ background: 'var(--red)', color: 'white' }}>Join Free</Link>
              </>
            )}

            <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/70"
              onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t" style={{ background: 'rgba(20,20,20,0.98)', borderColor: 'rgba(239,51,64,0.2)' }}>
            <div className="container-uae py-3 space-y-0.5">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm transition-colors"
                  style={{ color: l.href === '/book/nets' ? 'var(--red)' : 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 space-y-1">
                <Link href="/account/bookings" onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  📅 My Bookings
                </Link>
                {isVendor && <Link href="/vendor/dashboard" onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  🏪 Vendor Dashboard
                </Link>}
              </div>
              <div className="flex gap-2 pt-2">
                {user ? (
                  <button onClick={() => { signOut(); setOpen(false) }}
                    className="flex-1 py-2.5 rounded-lg text-sm text-center"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>Sign Out</button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 rounded-lg text-sm text-center"
                      style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>Sign In</Link>
                    <Link href="/register" onClick={() => setOpen(false)}
                      className="flex-1 py-2.5 rounded-lg text-sm text-center font-medium"
                      style={{ background: 'var(--red)', color: 'white' }}>Join Free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
