import React from 'react'
import Link from 'next/link'
import { Lightbulb } from 'lucide-react'

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
)

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)


const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 md:px-10 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Branding & Description */}
        <div className="max-w-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white fill-white" />
            </div>
            <p className='font-bold text-[18px] md:text-[30px] text-black tracking-tighter'>Validly</p>
          </div>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Validate your SaaS ideas instantly with AI-powered market and competitor analysis.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[14px]">
          <div className="space-y-6">
            <h4 className="text-black font-bold uppercase">Product</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link href="#features" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-bold uppercase">Company</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-bold uppercase">Legal</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link href="#" className="hover:text-black transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-24 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-neutral-400 text-[14px] font-sans">
          © {new Date().getFullYear()} Validly Inc. All rights reserved.
        </p>
        <div className="flex gap-6 text-neutral-400">
          <Link href="#" className="hover:text-black transition-all" aria-label="Twitter">
            <TwitterXIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-black transition-all" aria-label="Github">
            <GithubIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer