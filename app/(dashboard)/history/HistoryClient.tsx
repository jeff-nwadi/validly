"use client"

import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ValidationList from '@/components/dashboard/ValidationList'
import Link from 'next/link'
import { deleteValidation } from './actions'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()

  const filteredValidations = initialValidations.filter((val) =>
    val.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const confirmDelete = async () => {
    if (!isDeleting) return;
    
    try {
      await deleteValidation(isDeleting)
      toast.success('Validation deleted successfully')
      router.refresh()
    } catch (error) {
      toast.error('Failed to delete validation')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-[18px] font-semibold text-black">Validation History</h1>
            <p className="text-neutral-500 text-[14px] font-normal">Review all your past SaaS idea validations.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                   placeholder="Search validations by name..."
                   className="pl-10 bg-white border-neutral-200 text-black placeholder:text-neutral-400 h-10 rounded-[6px] focus-visible:ring-black/5"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
          </div>
        </div>

        {/* Validation List */}
        <ValidationList validations={filteredValidations} onDelete={(id) => setIsDeleting(id)} />

        {/* Delete Confirmation */}
        <AlertDialog open={!!isDeleting} onOpenChange={(open) => !open && setIsDeleting(null)}>
          <AlertDialogContent className="bg-white border-neutral-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-black">Delete Validation?</AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-500">
                This action cannot be undone. This will permanently delete the validation report.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white border-neutral-200 text-black hover:bg-neutral-50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 hover:bg-rose-700 text-white border-0">Delete Report</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Floating Action Button */}
        <div className="fixed bottom-10 right-10 z-50">
           <Button asChild size="icon" className="w-14 h-14 rounded-full bg-black hover:bg-neutral-800 shadow-2xl shadow-black/10 border border-neutral-200 group transition-all duration-300">
              <Link href="/validate">
                 <Plus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </Link>
           </Button>
        </div>
      </div>
    </div>
  )
}

