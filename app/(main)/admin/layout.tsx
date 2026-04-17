'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Building2, Users, ShoppingBag,
  ClipboardList, Plane, Megaphone, Settings, LogOut,
  ChevronRight, Shield
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} />, exact: true },
  { href: '/admin/listings', label: 'Listings', icon: <Building2 size={16} />, badge: '12' },
  { href: '/admin/vendors', label: 'Vendors', icon: <ShoppingBag size={16} />, badge: '5' },
  { href: '/admin/orders', label: 'Orders', icon: <ClipboardList size={16} /> },
  { href: '/admin/tours', label: 'Tours', icon: <Plane size={16} />, badge: '8' },
  { href: '/admin/classifieds', label: 'Classifieds', icon: <ClipboardList size={16} /> },
  { href: '/admin/users', label: 'Users', icon: <Users size={16} /> },
  { href: '/admin/notices', label: 'Notices', icon: <Megaphone size={16} /> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col"
        style={{ background: 'var(--ink)', borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: '100vh' }}>

        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link href="/" className="no-underline">
            <div className="font-display text-base tracking-widest text-white">
              MY<span style={{ color: 'var(--gold)' }}>CRICKET</span>.AE
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield size={10} style={{ color: 'var(--gold)' }} />
              <span className="text-xs text-white/30 font-mono-dm tracking-wider">ADMIN</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline transition-all group"
              style={{
                background: isActive(item.href, item.exact) ? 'rgba(200,150,30,0.15)' : 'transparent',
                color: isActive(item.href, item.exact) ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
              }}>
              <span>{item.icon}</span>
              <span className="text-sm flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-mono-dm"
                  style={{ background: 'rgba(200,150,30,0.2)', color: 'var(--gold)' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-0.5 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline transition-all"
            style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Settings size={16} />
            <span className="text-sm">Settings</span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-display text-xs flex-shrink-0"
              style={{ background: 'var(--green)' }}>
              {profile?.full_name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">
                {profile?.full_name ?? 'Admin'}
              </div>
              <div className="text-xs text-white/30">Administrator</div>
            </div>
            <button onClick={signOut} className="text-white/25 hover:text-white/50 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center px-6 border-b bg-white"
          style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-light)' }}>
            <Link href="/admin" className="no-underline hover:text-[var(--green)] transition-colors">Admin</Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={12} />
                <span style={{ color: 'var(--ink)' }} className="capitalize">
                  {pathname.split('/').pop()?.replace(/-/g, ' ')}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
