import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A] py-16 px-6 md:px-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Branding */}
        <div className="space-y-6">
          <p className='header font-bold tracking-wider text-[24px] text-[#F8F8F8]'>Validly</p>
          <p className="text-[#9A9A9A] text-[15px] max-w-xs leading-relaxed">
            Stop guessing. Use AI to analyze your market, competitors, and viability before writing a single line of code.
          </p>
        </div>

        {/* Product */}
        <div className="space-y-6">
          <h4 className="text-[#F8F8F8] text-[14px] font-bold uppercase tracking-widest header">Product</h4>
          <ul className="space-y-4 text-[#9A9A9A] text-[14px]">
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">How it works</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Wall of Love</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Pricing</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-6">
          <h4 className="text-[#F8F8F8] text-[14px] font-bold uppercase tracking-widest header">Company</h4>
          <ul className="space-y-4 text-[#9A9A9A] text-[14px]">
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Legal/Social */}
        <div className="space-y-6">
          <h4 className="text-[#F8F8F8] text-[14px] font-bold uppercase tracking-widest header">Connect</h4>
          <ul className="space-y-4 text-[#9A9A9A] text-[14px]">
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Twitter (X)</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Instagram</Link></li>
            <li><Link href="#" className="hover:text-[#F8F8F8] transition-colors">Contact Support</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[#9A9A9A] text-[12px]">
          © {new Date().getFullYear()} Validly. All rights reserved.
        </p>
        <div className="flex gap-8 text-[#9A9A9A] text-[12px]">
          <Link href="#" className="hover:text-[#F8F8F8]">Status</Link>
          <Link href="#" className="hover:text-[#F8F8F8]">System Architecture</Link>
          <Link href="#" className="hover:text-[#F8F8F8]">Security</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer