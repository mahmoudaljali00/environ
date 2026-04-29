'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Wrench, FolderOpen, FileText, Users, ShoppingCart,
  BarChart2, Settings, LogOut, Menu, X, ChevronRight, Package,
  UsersRound, Building2, MessageSquareQuote, Mail, TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/theme-toggle'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Team', href: '/admin/team', icon: UsersRound },
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Stats', href: '/admin/stats', icon: TrendingUp },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  // { label: 'Users', href: '/admin/users', icon: Users },
  // { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  // { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex-shrink-0 flex flex-col transition-all duration-300 border-r border-border/50',
          sidebarOpen ? 'w-60' : 'w-16',
          'glass sticky top-0 h-screen overflow-y-auto'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center h-16 px-4 border-b border-border/50 gap-3', !sidebarOpen && 'justify-center')}>
          {sidebarOpen ? (
            <Image src="/logo.svg" alt="ENVIRON" width={110} height={36} className="h-8 w-auto brightness-[2] saturate-150" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">E</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
                  !sidebarOpen && 'justify-center px-2'
                )}
                title={!sidebarOpen ? label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{label}</span>}
                {sidebarOpen && active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className={cn('p-3 border-t border-border/50', !sidebarOpen && 'flex justify-center')}>
          <button className={cn(
            'flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1.5 rounded-lg hover:bg-destructive/10 w-full',
            !sidebarOpen && 'justify-center w-auto'
          )}>
            <LogOut className="w-4 h-4" />
            {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 glass sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary/60 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@environ-sd.com</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
