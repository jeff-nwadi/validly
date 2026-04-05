"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth logic
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to continue validating your ideas."
      
    >
      <div className='flex flex-col gap-6 w-full'>
        {/* Toggle Controls */}
        <div className='grid grid-cols-2 p-1.5 bg-[#111111] border border-[#1F1F1F] rounded-[6px] mb-4'>
           <button 
             onClick={() => window.location.href = '/register'} 
             className='text-[#9A9A9A] hover:text-[#F8F8F8] transition-colors py-2.5 rounded-[8px] sub-text font-medium text-[14px]'
           >
             Register
           </button>
           <button className='bg-[#0A0A0A] border border-[#1F1F1F] text-[#F8F8F8] py-2.5 rounded-[8px] sub-text font-semibold text-[14px]'>
             Login
           </button>
        </div>

        {/* Social Auth */}
        <button className='w-full flex items-center justify-center gap-3 bg-[#111111] border border-[#1F1F1F] text-[#F8F8F8] py-3.5 rounded-[12px] hover:bg-[#1A1A1A] transition-all group'>
          <GoogleIcon className='w-5 h-5 group-hover:scale-110 transition-transform' />
          <span className='font-medium text-[15px]'>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className='relative flex items-center py-2'>
          <div className='grow border-t border-[#1F1F1F]'></div>
          <span className='shrink mx-4 text-[#9A9A9A] text-[11px] font-bold uppercase tracking-widest'>Or sign in with email</span>
          <div className='grow border-t border-[#1F1F1F]'></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-[#F8F8F8] text-[14px] font-medium'>Email address</label>
            <input 
              type="email" 
              placeholder="alex@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#0A0A0A] border border-[#1F1F1F] text-[#F8F8F8] p-4 rounded-[12px] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all placeholder:text-[#4A4A4A]'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <label className='text-[#F8F8F8] text-[14px] font-medium'>Password</label>
              <Link href="#" className='text-[#7C3AED] text-[12px] hover:underline'>Forgot password?</Link>
            </div>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-[#0A0A0A] border border-[#1F1F1F] text-[#F8F8F8] p-4 rounded-[12px] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-all placeholder:text-[#4A4A4A]'
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4A4A] hover:text-[#9A9A9A] transition-colors'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className='w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-4 rounded-[12px] font-bold text-[16px] shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2'
          >
            {isLoading ? <Loader2 className='w-5 h-5 animate-spin' /> : 'Sign In'}
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
