"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterInput } from '@/lib/validations/auth-schemas'
import { signUp, signIn } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function RegisterContent() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const idea = searchParams.get("idea")
  
  const callbackURL = idea 
    ? `/dashboard?idea=${encodeURIComponent(idea)}` 
    : "/dashboard"
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  const registrationMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL
      })
      if (error) throw new Error(error.message || "Failed to create account")
    },
    onSuccess: () => {
      router.push(callbackURL)
    }
  })

  const onSubmit = (data: RegisterInput) => {
    registrationMutation.mutate(data)
  }

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL
    })
  }

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start validating your ideas in seconds."
    >
      <div className='flex flex-col gap-6 w-full'>
        {/* Toggle Controls */}
        <div className='grid grid-cols-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl mb-4'>
           <button className='bg-primary text-white py-2.5 rounded-lg font-bold text-[14px] shadow-md shadow-primary/20 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none'>
             Register
           </button>
           <button 
             onClick={() => router.push('/login')} 
             className='text-neutral-500 hover:text-primary hover:bg-white transition-all py-2.5 rounded-lg font-medium text-[14px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none'
           >
             Login
           </button>
        </div>


        {/* Social Auth */}
        <button 
          onClick={handleGoogleSignIn}
          className='w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-900 py-3.5 rounded-xl hover:bg-slate-50 hover:border-primary/30 transition-all group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none'
        >
          <GoogleIcon className='w-5 h-5 group-hover:scale-110 transition-transform' />
          <span className='font-medium text-[15px]'>Continue with Google</span>
        </button>


        {/* Divider */}
        <div className='relative flex items-center py-2'>
          <div className='grow border-t border-neutral-100'></div>
          <span className='shrink mx-4 text-neutral-400 text-[11px] font-bold uppercase '>Or continue with email</span>
          <div className='grow border-t border-neutral-100'></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='text-black text-[14px] font-medium'>Full Name</label>
            <input 
              {...register("name")}
              id="name"
              type="text" 
              autoComplete="name"
              placeholder="Alex Johnson" 
              className='bg-white border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-primary'
            />
            {errors.name && <span className='text-destructive text-xs mt-1 font-medium'>{errors.name.message}</span>}

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-black text-[14px] font-medium'>Email address</label>
            <input 
              {...register("email")}
              id="email"
              type="email" 
              autoComplete="email"
              spellCheck={false}
              placeholder="alex@example.com" 
              className='bg-white border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-primary'
            />
            {errors.email && <span className='text-destructive text-xs mt-1 font-medium'>{errors.email.message}</span>}

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-black text-[14px] font-medium'>Password</label>
            <div className='relative'>
              <input 
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"} 
                autoComplete="new-password"
                placeholder="••••••••" 
                className='w-full bg-white border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-primary'
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none'
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
            {errors.password && <span className='text-destructive text-xs mt-1 font-medium'>{errors.password.message}</span>}

            <p id="password-hint" className='text-neutral-400 text-[12px] mt-1'>Must be at least 8 characters.</p>
          </div>

          <div aria-live="polite">
            {registrationMutation.isError && (
              <div className='p-3 bg-destructive/10 border border-destructive/20 text-destructive text-[13px] font-medium rounded-xl flex items-center gap-2'>
                <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                {registrationMutation.error.message}
              </div>
            )}

          </div>

          <button 
            type="submit"
            disabled={registrationMutation.isPending}
            aria-busy={registrationMutation.isPending}
            className='w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed btn-glow'
          >
            {registrationMutation.isPending ? <Loader2 className='w-5 h-5 animate-spin' /> : 'Create Account'}
          </button>

        </form>
      </div>
    </AuthLayout>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading..." subtitle="Please wait while we prepare your registration.">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>

      </AuthLayout>
    }>
      <RegisterContent />
    </Suspense>
  )
}
