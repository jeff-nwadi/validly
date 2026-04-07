"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-neutral-200 px-6 md:px-10">
        <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
          <div>
            <p className='font-bold text-[20px] text-black'>Validly</p>
          </div>

          {/* Desktop Nav */}
          <ul className='hidden lg:flex gap-8 font-normal text-[12px] text-neutral-500 uppercase'>
            <Link href="#how-it-works" className='hover:text-black transition-colors'>How it works</Link>
            <Link href="#features" className='hover:text-black transition-colors'>Features</Link>
            <Link href="#pricing" className='hover:text-black transition-colors'>Pricing</Link>
          </ul>

          <div className='hidden lg:flex font-normal text-[14px] gap-6 items-center uppercase'>
            <Link href="/login" className='text-neutral-500 hover:text-black transition-colors'>Login</Link>
            <button className='bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-[6px] font-medium transition-all'>
              <Link href="/register" >Get started</Link>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-black p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-40 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
            <ul className='flex flex-col items-center gap-8 font-medium text-[16px] text-neutral-400 uppercase'>
              <Link href="#how-it-works" onClick={() => setIsOpen(false)} className='hover:text-black'>How it works</Link>
              <Link href="#features" onClick={() => setIsOpen(false)} className='hover:text-black'>Features</Link>
              <Link href="#pricing" onClick={() => setIsOpen(false)} className='hover:text-black'>Pricing</Link>
              <Link href="#" onClick={() => setIsOpen(false)} className='hover:text-black'>Wall of love</Link>
            </ul>
            
            <div className="w-full h-px bg-neutral-100 max-w-[200px]" />
            
            <div className='flex flex-col items-center gap-6 w-full max-w-[280px]'>
              <Link href="/login" onClick={() => setIsOpen(false)} className='text-neutral-400 uppercase text-[14px] hover:text-black'>Login</Link>
              <button className='w-full bg-black text-white py-4 rounded-[6px] font-semibold text-[16px]'>
                <Link href="/register" onClick={() => setIsOpen(false)} >Get started</Link>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
