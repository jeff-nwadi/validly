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
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  const registrationMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/dashboard"
      })
      if (error) throw new Error(error.message || "Failed to create account")
    },
    onSuccess: () => {
      router.push("/dashboard")
    }
  })

  const onSubmit = (data: RegisterInput) => {
    registrationMutation.mutate(data)
  }

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    })
  }

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start validating your ideas in seconds."
    >
      <div className='flex flex-col gap-6 w-full'>
        {/* Toggle Controls */}
        <div className='grid grid-cols-2 p-1.5 bg-neutral-100 border border-neutral-200 rounded-[12px] mb-4'>
           <button className='bg-white border border-neutral-200 text-black py-2.5 rounded-[8px] font-semibold text-[14px] shadow-sm'>
             Register
           </button>
           <button 
             onClick={() => router.push('/login')} 
             className='text-neutral-500 hover:text-black transition-colors py-2.5 rounded-[8px] font-medium text-[14px]'
           >
             Login
           </button>
        </div>

        {/* Social Auth */}
        <button 
          onClick={handleGoogleSignIn}
          className='w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 text-black py-3.5 rounded-[12px] hover:bg-neutral-50 transition-all group'
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
            <label className='text-black text-[14px] font-medium'>Full Name</label>
            <input 
              {...register("name")}
              type="text" 
              placeholder="Alex Johnson" 
              className='bg-white border border-neutral-200 text-black p-4 rounded-[12px] focus:outline-none focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-neutral-400'
            />
            {errors.name && <span className='text-rose-500 text-xs'>{errors.name.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-black text-[14px] font-medium'>Email address</label>
            <input 
              {...register("email")}
              type="email" 
              placeholder="alex@example.com" 
              className='bg-white border border-neutral-200 text-black p-4 rounded-[12px] focus:outline-none focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-neutral-400'
            />
            {errors.email && <span className='text-rose-500 text-xs'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-black text-[14px] font-medium'>Password</label>
            <div className='relative'>
              <input 
                {...register("password")}
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className='w-full bg-white border border-neutral-200 text-black p-4 rounded-[12px] focus:outline-none focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-neutral-400'
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
            {errors.password && <span className='text-rose-500 text-xs'>{errors.password.message}</span>}
            <p className='text-neutral-400 text-[12px] mt-1'>Must be at least 8 characters.</p>
          </div>

          {registrationMutation.isError && (
            <div className='p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-[12px]'>
              {registrationMutation.error.message}
            </div>
          )}

          <button 
            type="submit"
            disabled={registrationMutation.isPending}
            className='w-full bg-black hover:bg-neutral-800 text-white py-4 rounded-[12px] font-bold text-[16px] shadow-lg shadow-black/5 transition-all flex items-center justify-center gap-2'
          >
            {registrationMutation.isPending ? <Loader2 className='w-5 h-5 animate-spin' /> : 'Create Account'}
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
