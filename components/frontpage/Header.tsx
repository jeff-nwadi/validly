"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-10">
      <div className={cn(
        "mx-auto max-w-7xl rounded-2xl transition-all duration-500 border border-transparent",
        scrolled ? "bg-white/70 backdrop-blur-xl border-neutral-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3 px-6" : "bg-transparent py-4 px-0"
      )}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Lightbulb className="w-5 h-5 text-white fill-white" aria-hidden="true" />
            </div>
            <p className='font-bold text-[22px] md:text-[26px] text-black tracking-tighter'>Validly</p>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden lg:flex items-center gap-10 font-medium text-[14px] text-neutral-500'>
            <Link href="#how-it-works" className='hover:text-black transition-colors tracking-tight'>How it works</Link>
            <Link href="#features" className='hover:text-black transition-colors tracking-tight'>Features</Link>
            <Link href="#pricing" className='hover:text-black transition-colors tracking-tight'>Pricing</Link>
          </nav>

          <div className='hidden lg:flex font-bold text-[13px] gap-8 items-center uppercase tracking-widest'>
            <Link href="/login" className='text-neutral-400 hover:text-black transition-colors'>Login</Link>
            <Link href="/register" >
                <button className='bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-black/5 active:scale-95'>
                    Get started
                </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-black p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-0 bg-white z-[60] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white fill-white" />
                </div>
                <p className='font-bold text-[22px] text-black tracking-tighter'>Validly</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-neutral-100">
                <X className="w-6 h-6 text-black" />
              </button>
           </div>
          <nav className="flex flex-col items-center justify-center gap-12 p-10 pt-20">
            <ul className='flex flex-col items-center gap-10 font-bold text-[18px] text-neutral-300 uppercase tracking-tighter'>
              <Link href="#how-it-works" onClick={() => setIsOpen(false)} className='hover:text-black transition-colors'>How it works</Link>
              <Link href="#features" onClick={() => setIsOpen(false)} className='hover:text-black transition-colors'>Features</Link>
              <Link href="#pricing" onClick={() => setIsOpen(false)} className='hover:text-black transition-colors'>Pricing</Link>
            </ul>
            
            <div className='flex flex-col items-center gap-6 w-full max-w-[320px] pt-10'>
              <Link href="/login" onClick={() => setIsOpen(false)} className='text-neutral-400 font-bold uppercase tracking-widest text-[14px] hover:text-black'>Login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="w-full">
                <button className='w-full bg-black text-white py-5 rounded-2xl font-bold text-[18px] shadow-xl shadow-black/10'>
                    Get started
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
