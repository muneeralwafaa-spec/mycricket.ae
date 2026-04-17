'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, LayoutDashboard, Package } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

const navLinks = [
  { href: '/academies', label: 'Facilities' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/shop', label: 'Shop' },
  { href: '/classifieds', label: 'Classifieds' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/tours', label: 'Tours' },
  { href: '/news', label: 'News' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, signOut, isVendor } = useAuth()

  return (
    <nav style={{ background: 'rgba(13,31,15,0.96)', borderBottom: '1px solid rgba(200,150,30,0.2)' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div style={{ background: 'var(--gold)', borderRadius: 6 }}
            className="w-9 h-9 flex items-center justify-center font-display text-lg text-[var(--ink)] tracking-wide">
            MC
          </div>
          <span className="font-display text-xl tracking-widest text-white">
            MY<span style={{ color: 'var(--gold)' }}>CRICKET</span>.AE
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline tracking-wide">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart */}
          <Link href="/shop/cart" className="relative w-9 h-9 flex items-center justify-center rounded-lg no-underline transition-colors hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ShoppingCart size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: 9 }}>
              2
            </span>
          </Link>

          {user ? (
            /* Logged-in user menu */
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.8)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-display text-sm"
                  style={{ background: 'var(--green)' }}>
                  {(profile?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm max-w-24 truncate">
                  {profile?.full_name?.split(' ')[0] ?? 'Account'}
                </span>
                <ChevronDown size={13} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden py-1 z-50"
                  style={{ background: 'var(--ink-mid)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="px-4 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-xs font-medium text-white truncate">{profile?.full_name}</div>
                    <div className="text-xs text-white/40 truncate">{user.email}</div>
                  </div>
                  {isVendor && (
                    <Link href="/vendor/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 no-underline transition-colors">
                      <LayoutDashboard size={14} /> Vendor Dashboard
                    </Link>
                  )}
                  <Link href="/account/orders" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 no-underline transition-colors">
                    <Package size={14} /> My Orders
                  </Link>
                  <Link href="/account/profile" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 no-underline transition-colors">
                    <User size={14} /> Profile
                  </Link>
                  <button onClick={() => { signOut(); setUserMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest */
            <>
              <Link href="/login"
                className="text-sm text-white/60 hover:text-white no-underline transition-colors px-3 py-1.5">
                Sign In
              </Link>
              <Link href="/list-business"
                style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                className="text-sm font-medium px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity no-underline">
                Join Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(13,31,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          className="md:hidden px-4 pb-4">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm text-white/60 border-b border-white/5 no-underline">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {user ? (
              <button onClick={() => { signOut(); setOpen(false) }}
                className="flex-1 py-2.5 text-center text-sm no-underline rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm no-underline rounded-lg"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
                  Sign In
                </Link>
                <Link href="/list-business" onClick={() => setOpen(false)}
                  style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                  className="flex-1 py-2.5 text-center text-sm font-medium rounded-lg no-underline">
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
