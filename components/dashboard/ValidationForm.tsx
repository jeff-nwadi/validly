"use client"

import React, { useState, useTransition } from 'react'
import { ArrowUp, Users, Building2, Loader2 } from 'lucide-react'
import { validateIdea } from '@/lib/actions/validate-idea'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function ValidationForm() {
  const [ideaDescription, setIdeaDescription] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const [industry, setIndustry] = useState('')
  const [showTargetInput, setShowTargetInput] = useState(false)
  const [showIndustryInput, setShowIndustryInput] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ideaDescription || isPending) return

    startTransition(async () => {
      const result = await validateIdea({
        ideaDescription,
        targetMarket: targetMarket || undefined,
        industry: industry || undefined
      })

      if (result.success && result.id) {
        router.push(`/report/${result.id}`)
      } else {
        alert(result.error || "Something went wrong.")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-4xl mx-auto space-y-8'>
      <div className='relative'>
        <div className='bg-[#0F0F0F] border border-[#1F1F1F] rounded-[6px] px-10 py-8 transition-all duration-500'>
          <textarea
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder="Describe your SaaS idea here... E.g., A web application that helps dog walkers schedule appointments, track routes via GPS, and handle payments automatically."
            className='w-full h-32 bg-transparent text-[#F8F8F8] placeholder-[#4A4A4A] border-none outline-none resize-none text-[17px] leading-relaxed font-medium'
            disabled={isPending}
          />

          {/* Inline Inputs for Target Market and Industry */}
          <div className='space-y-4 mb-2'>
            {showTargetInput && (
               <input 
                 type="text"
                 placeholder="Target Market (e.g. Small business owners, Dog walkers)"
                 className='w-full bg-[#1A1A1A] border border-[#2C2C2C] rounded-[6px] px-5 py-3 text-sm text-[#F8F8F8] outline-none transition-all'
                 value={targetMarket}
                 onChange={(e) => setTargetMarket(e.target.value)}
                 autoFocus
               />
            )}
            {showIndustryInput && (
               <input 
                 type="text"
                 placeholder="Industry (e.g. Pet Care, Logistics, FinTech)"
                 className='w-full bg-[#1A1A1A] border border-[#2C2C2C] rounded-[6px] px-5 py-3 text-sm text-[#F8F8F8] outline-none transition-all'
                 value={industry}
                 onChange={(e) => setIndustry(e.target.value)}
                 autoFocus
               />
            )}
          </div>

          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-8'>
              <button 
                type="button"
                onClick={() => setShowTargetInput(!showTargetInput)}
                className={cn(
                    'flex items-center gap-2 text-[13px] font-bold transition-all uppercase tracking-wider',
                    showTargetInput ? 'text-white' : 'text-[#4A4A4A] hover:text-[#9A9A9A]'
                )}
              >
                <Users className='w-4 h-4' />
                {showTargetInput ? 'Target Market Added' : 'Add Target Market'}
              </button>
              <button 
                type="button"
                onClick={() => setShowIndustryInput(!showIndustryInput)}
                className={cn(
                    'flex items-center gap-2 text-[13px] font-bold transition-all uppercase tracking-wider',
                    showIndustryInput ? 'text-white' : 'text-[#4A4A4A] hover:text-[#9A9A9A]'
                )}
              >
                <Building2 className='w-4 h-4' />
                {showIndustryInput ? 'Industry Added' : 'Add Industry'}
              </button>
            </div>

            <button 
              type="submit"
              disabled={!ideaDescription || isPending}
              className='w-12 h-12 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-[#1F1F1F] disabled:text-[#4A4A4A] active:scale-95 text-white rounded-full flex items-center justify-center shadow-xl shadow-purple-900/40 transition-all group/btn shrink-0'
            >
              {isPending ? <Loader2 className='w-6 h-6 animate-spin' /> : <ArrowUp className='w-6 h-6' />}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
