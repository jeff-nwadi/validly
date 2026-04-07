import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Lightbulb, ArrowLeft } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className='min-h-screen bg-white flex font-sans'>
      {/* Left Column - Insight Visual (Hidden on mobile) */}
      <div className='hidden lg:flex lg:w-1/2 relative flex-col p-16 overflow-hidden border-r border-neutral-100'>
        {/* Background Image */}
        <div className='absolute inset-0 z-0'>
          <Image 
            src="/auth-visual.png"
            alt="AI SaaS Validation Visual"
            fill
            className='object-cover opacity-60'
            priority
          />
          <div className='absolute inset-0 bg-linear-to-t from-white via-transparent to-white/80' />
        </div>
        
        {/* Branding */}
        <Link href="/" className='relative z-10 flex items-center gap-3'>
          <div className='w-10 h-10 bg-black rounded-[10px] flex items-center justify-center'>
            <Lightbulb className='w-6 h-6 text-white' />
          </div>
          <span className='font-bold text-2xl text-black'>Validly</span>
        </Link>

        {/* Insight Caption */}
        <div className='mt-auto relative z-10'>
          <p className='text-black text-[20px] font-bold mb-2'>Analyze. Validate. Succeed.</p>
          <p className='text-neutral-500 text-[15px] max-w-[340px]'>Let AI do the heavy lifting of market research and competitor analysis so you can focus on building.</p>
        </div>
      </div>

      {/* Right Column - Auth Forms */}
      <div className='w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 relative overflow-y-auto'>
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className='flex items-center gap-2 text-neutral-400 hover:text-black transition-colors mb-12 md:mb-16 text-[14px]'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to home
        </Link>

        <div className='max-w-[420px] w-full mx-auto flex flex-col'>
          <h1 className='text-black text-[32px] md:text-[40px] font-bold mb-3 '>{title}</h1>
          <p className='text-neutral-500 text-[16px] mb-10'>{subtitle}</p>
          
          {children}
        </div>

        {/* Footer Legal */}
        <p className='mt-auto pt-16 text-center text-neutral-400 text-[13px] leading-relaxed max-w-[320px] mx-auto'>
          By clicking continue, you agree to our <Link href="#" className='text-black hover:underline font-medium'>Terms of Service</Link> and <Link href="#" className='text-black hover:underline font-medium'>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
