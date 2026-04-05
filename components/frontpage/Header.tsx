"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2C2C2C] px-6 md:px-10">
        <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
          <div>
            <p className='header font-bold tracking-widest text-[20px] text-[#F8F8F8]'>Validly</p>
          </div>

          {/* Desktop Nav */}
          <ul className='hidden lg:flex gap-8 sub-text font-normal text-[12px] text-[#9A9A9A] uppercase tracking-widest'>
            <Link href="#" className='hover:text-[#F8F8F8] transition-colors'>How it works</Link>
            <Link href="#" className='hover:text-[#F8F8F8] transition-colors'>Features</Link>
            <Link href="#" className='hover:text-[#F8F8F8] transition-colors'>Pricing</Link>
            <Link href="#" className='hover:text-[#F8F8F8] transition-colors'>Wall of love</Link>
          </ul>

          {/* Desktop Actions */}
          <div className='hidden lg:flex sub-text font-normal text-[14px] gap-6 items-center uppercase tracking-widest'>
            <Link href="#" className='hover:text-[#F8F8F8] transition-colors'>Login</Link>
            <button className='bg-[#7C3AED] hover:bg-[#6D28D9] text-[#F8F8F8] px-6 py-2.5 rounded-[6px] font-medium transition-all'>
              <Link href="#" >Get started</Link>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-[#F8F8F8] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[65px] bg-[#0A0A0A] z-40 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
            <ul className='flex flex-col items-center gap-8 sub-text font-medium text-[16px] text-[#9A9A9A] uppercase tracking-[0.2em]'>
              <Link href="#" onClick={() => setIsOpen(false)} className='hover:text-[#F8F8F8]'>How it works</Link>
              <Link href="#" onClick={() => setIsOpen(false)} className='hover:text-[#F8F8F8]'>Features</Link>
              <Link href="#" onClick={() => setIsOpen(false)} className='hover:text-[#F8F8F8]'>Pricing</Link>
              <Link href="#" onClick={() => setIsOpen(false)} className='hover:text-[#F8F8F8]'>Wall of love</Link>
            </ul>
            
            <div className="w-full h-px bg-[#1F1F1F] max-w-[200px]" />
            
            <div className='flex flex-col items-center gap-6 w-full max-w-[280px]'>
              <Link href="#" onClick={() => setIsOpen(false)} className='text-[#9A9A9A] uppercase tracking-widest text-[14px]'>Login</Link>
              <button className='w-full bg-[#7C3AED] text-[#F8F8F8] py-4 rounded-[6px] font-semibold text-[16px]'>
                <Link href="#" onClick={() => setIsOpen(false)} >Get started</Link>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
