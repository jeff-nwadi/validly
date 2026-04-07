"use client"

import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ValidationList from '@/components/dashboard/ValidationList'
import Link from 'next/link'
import { deleteValidation } from './actions'
import { useRouter } from 'next/navigation'

interface Validation {
  id: string
  ideaTitle: string
  ideaDescription: string
  viabilityScore: number
  verdict: string
  createdAt: Date
}

interface HistoryClientProps {
  initialValidations: Validation[]
}

export default function HistoryClient({ initialValidations }: HistoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filteredValidations = initialValidations.filter((val) =>
    val.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this validation?')) {
       await deleteValidation(id)
       router.refresh()
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-wider text-white header">Validation History</h1>
            <p className="text-[#4A4A4A] text-sm font-medium">Review all your past SaaS idea validations.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
                <Input
                   placeholder="Search validations by name..."
                   className="pl-10 bg-[#0D0D0D] border-[#1F1F1F] text-white placeholder:text-[#4A4A4A] h-10 rounded-[6px] focus-visible:ring-white/10"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>
        </div>

        {/* Validation List */}
        <ValidationList validations={filteredValidations} onDelete={handleDelete} />

        {/* Floating Action Button */}
        <div className="fixed bottom-10 right-10 z-50">
           <Button asChild size="icon" className="w-14 h-14 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] shadow-2xl shadow-[#7C3AED]/20 border border-white/10 group transition-all duration-300">
              <Link href="/validate">
                 <Plus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </Link>
           </Button>
        </div>
      </div>
    </div>
  )
}
