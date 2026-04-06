"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  CreditCard,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Sparkles
} from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'New Validation', href: '/validate', icon: PlusCircle },
  { name: 'History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <div className='flex h-screen bg-[#0A0A0A] overflow-hidden text-[#9A9A9A]'>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 border-r border-[#1F1F1F] bg-[#0A0A0A] flex flex-col shrink-0 transition-transform duration-300 ease-in-out lg:z-0 lg:static lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Sidebar Header */}
        <div className='flex items-center justify-between p-6 lg:pb-4'>
           <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-white/5 border border-white/10 rounded-[6px] flex items-center justify-center font-bold text-white'>
                V
              </div>
              <span className='font-bold text-lg header text-[#F8F8F8] tracking-widest uppercase'>Validly</span>
           </div>
           {/* Mobile Close Button */}
           <button 
             onClick={() => setIsSidebarOpen(false)}
             className='p-2 text-[#4A4A4A] hover:bg-[#111111] rounded-[6px] lg:hidden'
           >
             <X className='w-4 h-4' />
           </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 space-y-1 overflow-y-auto mt-8'>
           {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-[6px] transition-all duration-200 group',
                    isActive 
                      ? 'bg-white/5 text-white border-l border-white/40' 
                      : 'text-[#9A9A9A] hover:bg-[#111111] hover:text-[#F8F8F8]'
                  )}
                >
                  <item.icon className={cn(
                    'w-4 h-4',
                    isActive ? 'text-white' : 'text-[#4A4A4A] group-hover:text-[#9A9A9A]'
                  )} />
                  <span className='text-sm tracking-wide'>{item.name}</span>
                </Link>
              )
           })}
        </nav>

        {/* Profile Card / Plan Status */}
        <div className='p-4 border-t border-[#1F1F1F] mt-auto'>
           {/* Plan Badge (Refined) */}
           <div className='mb-4 p-4 rounded-[6px] bg-[#111111] border border-[#1F1F1F] shadow-sm'>
              <div className='flex items-center gap-3 mb-2'>
                 <Sparkles className='w-4 h-4 text-white/40' />
                 <span className='text-[12px] font-bold text-white tracking-wide uppercase'>Pro Plan Active</span>
              </div>
              <p className='text-[11px] text-[#4A4A4A] mb-3 leading-relaxed'>Unlimited validations enabled.</p>
              <Link href='/settings/billing' className='text-[10px] font-bold text-white/60 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest'>
                 Billing Support →
              </Link>
           </div>

           {/* User Info */}
           <div className='flex items-center justify-between gap-3 px-2 py-1'>
              <div className='flex items-center gap-3 min-w-0'>
                <div className='w-9 h-9 rounded-[6px] bg-[#111111] border border-[#1F1F1F] flex items-center justify-center overflow-hidden shrink-0'>
                   {session?.user?.image ? (
                     <img src={session.user.image} alt={session.user.name} />
                   ) : (
                     <UserIcon className='w-4 h-4 text-[#4A4A4A]' />
                   )}
                </div>
                <div className='flex flex-col min-w-0'>
                   <p className='text-xs font-bold text-[#F8F8F8] truncate'>{session?.user?.name || 'Alex Mercer'}</p>
                </div>
              </div>
              <button 
                onClick={() => signOut()}
                className='p-2 hover:bg-white/5 rounded-[6px] text-[#4A4A4A] hover:text-white transition-colors'
              >
                <LogOut className='w-4 h-4' />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col overflow-hidden bg-[#0A0A0A]'>
        {/* Mobile Header (Only visible on small screens) */}
        <header className='flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] lg:hidden'>
           <div className='flex items-center gap-2'>
              <div className='w-7 h-7 bg-white/5 border border-white/10 rounded-[6px] flex items-center justify-center font-extrabold text-white text-xs'>
                V
              </div>
              <span className='font-bold text-sm header text-[#F8F8F8] tracking-widest uppercase'>Validly</span>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className='p-2 text-[#F8F8F8] hover:bg-[#111111] rounded-[6px]'
           >
              <Menu className='w-5 h-5' />
           </button>
        </header>

        {children}
      </main>
    </div>
  )
}
