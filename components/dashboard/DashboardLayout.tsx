"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  CheckCircle, 
  History, 
  Settings, 
  ChevronLeft, 
  Menu,
  LogOut,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from '@/lib/auth-client'

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const navigation: NavItem[] = [
  { title: 'Dashboard', icon: Home, href: '/dashboard' },
  { title: 'History', icon: History, href: '/history' },
  { title: 'Settings', icon: Settings, href: '/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const userInitials = session?.user?.name 
    ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'AM';

  return (
    <div className='flex h-screen bg-white overflow-hidden text-neutral-500'>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out lg:z-0 lg:static lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      )}>
        {/* Sidebar Header */}
        <div className='flex h-16 items-center justify-between border-b border-neutral-200 px-4'>
           {(!isCollapsed || isSidebarOpen) && (
              <div className='flex items-center gap-2 overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300'>
                 <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black'>
                    <CheckCircle className='h-5 w-5 text-white' />
                 </div>
                 <span className='text-[18px] font-semibold text-black  uppercase'>Validly</span>
              </div>
           )}
           <Button
             variant="ghost"
             size="icon"
             onClick={() => {
                if (window.innerWidth < 1024) {
                   setIsSidebarOpen(false);
                } else {
                   setIsCollapsed(!isCollapsed);
                }
             }}
             className={cn(
                'h-8 w-8 transition-transform duration-300',
                isCollapsed && !isSidebarOpen && 'mx-auto rotate-180'
             )}
           >
              <ChevronLeft className='h-4 w-4' />
           </Button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-1 p-3 overflow-y-auto mt-4'>
           {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isDesktopCollapsed = isCollapsed && !isSidebarOpen;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    isDesktopCollapsed && 'justify-center px-0'
                  )}
                >
                  <Icon className={cn(
                     'h-5 w-5 shrink-0',
                     isActive && 'animate-in zoom-in-50 duration-200'
                  )} />
                  {(!isDesktopCollapsed) && (
                    <>
                       <span className='flex-1 text-left truncate'>{item.title}</span>
                       {item.badge && (
                          <span className={cn(
                             'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                             isActive ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
                          )}>
                             {item.badge}
                          </span>
                       )}
                    </>
                  )}
                  {isDesktopCollapsed && item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border border-background">
                       {item.badge}
                    </span>
                  )}
                </Link>
              )
           })}
        </nav>

        {/* Pro Plan Status (Refined for collapsed state) */}
        {!isCollapsed && (
           <div className='px-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300'>
              <div className='p-3 rounded-lg bg-primary/5 border border-primary/10'>
                 <div className='flex items-center gap-2 mb-1'>
                    <Sparkles className='w-3.5 h-3.5 text-primary' />
                    <span className='text-[11px] font-bold text-foreground  uppercase'>Pro Plan</span>
                 </div>
                 <p className='text-[10px] text-muted-foreground leading-snug'>Unlimited validations enabled.</p>
              </div>
           </div>
        )}

        {/* User Card */}
        <div className='border-t border-border p-3'>
            <div className={cn(
               'flex items-center gap-3 rounded-lg bg-neutral-50 p-3 transition-all duration-300 border border-neutral-200',
               isCollapsed && !isSidebarOpen ? 'justify-center p-2' : ''
            )}>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black text-sm font-bold text-white overflow-hidden'>
                 {session?.user?.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                 ) : (
                    userInitials
                 )}
              </div>
              {(!isCollapsed || isSidebarOpen) && (
                 <div className='flex-1 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300'>
                    <p className='truncate text-[14px] font-semibold text-black leading-tight'>{session?.user?.name || 'Alex Mercer'}</p>
                    <p className='truncate text-[12px] text-neutral-500'>{session?.user?.email || 'alex@example.com'}</p>
                 </div>
              )}
              {(!isCollapsed || isSidebarOpen) && (
                 <button 
                   onClick={() => signOut()}
                   className='p-1.5 hover:bg-black/5 rounded-md text-muted-foreground hover:text-foreground transition-colors'
                 >
                    <LogOut className='w-4 h-4' />
                 </button>
              )}
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col overflow-hidden bg-white relative'>
        {/* Mobile Header (Only visible on small screens) */}
        <header className='flex items-center justify-between px-6 py-4 border-b border-border lg:hidden'>
           <div className='flex items-center gap-2'>
              <div className='w-7 h-7 bg-primary rounded-lg flex items-center justify-center font-extrabold text-primary-foreground text-xs'>
                V
              </div>
              <span className='font-bold text-sm header text-foreground  uppercase'>Validly</span>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className='p-2 text-foreground hover:bg-muted rounded-lg'
           >
              <Menu className='w-5 h-5' />
           </button>
        </header>

        {children}
      </main>
    </div>
  )
}
