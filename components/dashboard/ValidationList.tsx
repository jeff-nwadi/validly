"use client"

import React from 'react'
import { format } from 'date-fns'
import { 
  Calendar, 
  Trash2, 
  Eye, 
  Lightbulb,
  Search,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Validation {
  id: string
  ideaTitle: string
  ideaDescription: string
  viabilityScore: number
  verdict: string
  createdAt: Date
}

interface ValidationListProps {
  validations: Validation[]
  onDelete?: (id: string) => void
}

const verdictEmojis: Record<string, string> = {
  hot: '🔥',
  warm: '⚠️',
  cold: '❄️',
}

const scoreColors: Record<string, string> = {
  hot: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  warm: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  cold: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
}

const dotColors: Record<string, string> = {
  hot: 'bg-emerald-500',
  warm: 'bg-amber-500',
  cold: 'bg-rose-500',
}

export default function ValidationList({ validations, onDelete }: ValidationListProps) {
  if (validations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-[#0A0A0A] border border-[#1F1F1F] rounded-[6px] mt-8">
        <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-[#7C3AED]" />
        </div>
        <h3 className="text-[#F8F8F8] font-bold text-2xl mb-3">No Validations Yet</h3>
        <p className="text-[#4A4A4A] max-w-sm mx-auto mb-8 text-sm leading-relaxed">
          You haven't validated any SaaS ideas yet. Enter your first idea to get an AI-powered viability report.
        </p>
        <Button asChild className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-6 rounded-[6px] font-semibold flex items-center gap-2">
          <Link href="/validate">
             <Plus className="w-4 h-4" />
             New Validation
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      <Card className="bg-[#0D0D0D] border-[#1F1F1F] overflow-hidden rounded-[6px]">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="border-b border-[#1F1F1F] text-[10px] font-bold text-[#4A4A4A] uppercase tracking-widest bg-[#111111]/50">
                 <th className="px-6 py-4">Idea Name</th>
                 <th className="px-6 py-4">Date</th>
                 <th className="px-6 py-4">Viability Score</th>
                 <th className="px-6 py-4">Verdict</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-[#1F1F1F]">
              {validations.map((val) => {
                 const verdictType = val.verdict.toLowerCase() as keyof typeof scoreColors
                 return (
                    <tr key={val.id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-[6px] flex items-center justify-center text-white/40 group-hover:text-white/60 transition-colors">
                                <Lightbulb className="w-4 h-4" />
                             </div>
                             <span className="text-sm font-bold text-[#F8F8F8] tracking-wide">{val.ideaTitle}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-xs text-[#4A4A4A] font-medium">
                             <Calendar className="w-3.5 h-3.5" />
                             <span>{format(new Date(val.createdAt), 'MMM d, yyyy')}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className={cn(
                             "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider",
                             scoreColors[verdictType] || scoreColors.warm
                          )}>
                             <div className={cn("w-1.5 h-1.5 rounded-full", dotColors[verdictType] || dotColors.warm)} />
                             <span>Score: {val.viabilityScore}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-lg">{verdictEmojis[verdictType] || '🤔'}</span>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                             <Button asChild variant="outline" size="sm" className="h-8 rounded-[6px] bg-[#111111] border-[#1F1F1F] text-[#9A9A9A] hover:text-white hover:bg-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-3">
                                <Link href={`/report/${val.id}`}>
                                   <Eye className="w-3.5 h-3.5 mr-2" />
                                   View Report
                                </Link>
                             </Button>
                             <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-[6px] bg-[#111111] border-[#1F1F1F] text-[#4A4A4A] hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all"
                                onClick={() => onDelete?.(val.id)}
                             >
                                <Trash2 className="w-3.5 h-3.5" />
                             </Button>
                          </div>
                       </td>
                    </tr>
                 )
              })}
           </tbody>
        </table>
      </Card>
    </div>
  )
}
