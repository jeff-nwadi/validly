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

const scoreColors:Record<string, string> = {
  hot: 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20',
  warm: 'text-[var(--warning)] bg-[var(--warning)]/10 border-[var(--warning)]/20',
  cold: 'text-destructive bg-destructive/10 border-destructive/20',
}


const dotColors: Record<string, string> = {
  hot: 'bg-[var(--success)]',
  warm: 'bg-[var(--warning)]',
  cold: 'bg-destructive',
}


export default function ValidationList({ validations, onDelete }: ValidationListProps) {
  if (validations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-neutral-200 rounded-lg mt-8">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">

          <Search className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-black font-semibold text-[18px] mb-3">No Validations Yet</h3>
        <p className="text-neutral-500 max-w-sm mx-auto mb-8 text-[14px] font-normal leading-relaxed">
          You haven't validated any SaaS ideas yet. Enter your first idea to get an AI-powered viability report.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-bold flex items-center gap-2">
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
      {/* Desktop Table View */}
      <Card className="hidden md:block bg-white border-neutral-200 overflow-hidden rounded-lg">

        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                 <th className="px-6 py-4">Idea Name</th>

                 <th className="px-6 py-4">Date</th>
                 <th className="px-6 py-4">Viability Score</th>
                 <th className="px-6 py-4">Verdict</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-neutral-100">
              {validations.map((val) => {
                 const verdictType = val.verdict.toLowerCase() as keyof typeof scoreColors
                 return (
                     <tr key={val.id} className="group hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-4">
                              <div className="w-9 h-9 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                 <Lightbulb className="w-4 h-4" />
                              </div>
                              <span className="text-[14px] font-semibold text-slate-900">{val.ideaTitle}</span>
                           </div>
                        </td>

                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{format(new Date(val.createdAt), 'MMM d, yyyy')}</span>
                           </div>
                        </td>

                       <td className="px-6 py-5">
                          <div className={cn(
                             "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase ",
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
                              <Button asChild variant="outline" size="sm" className="h-8 rounded-md bg-white border-neutral-200 text-neutral-500 hover:text-black hover:bg-neutral-50 text-[10px] font-bold uppercase px-3">
                                 <Link href={`/report/${val.id}`}>
                                    <Eye className="w-3.5 h-3.5 mr-2" />
                                    View Report
                                 </Link>
                              </Button>
                              <Button 
                                 variant="outline" 
                                 size="icon" 
                                 className="h-8 w-8 rounded-md bg-white border-neutral-200 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all"
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

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
         {validations.map((val) => {
            const verdictType = val.verdict.toLowerCase() as keyof typeof scoreColors
            return (
               <Card key={val.id} className="bg-white border-neutral-200 overflow-hidden rounded-lg p-5 space-y-4">

                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 border border-primary/10 rounded-md flex items-center justify-center text-primary">
                           <Lightbulb className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                           <h3 className="text-[14px] font-semibold text-slate-900 line-clamp-1 tracking-tight">{val.ideaTitle}</h3>
                           <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(val.createdAt), 'MMM d, yyyy')}</span>
                           </div>
                        </div>
                     </div>
                     <span className="text-xl">{verdictEmojis[verdictType] || '🤔'}</span>
                  </div>


                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                     <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase",
                        scoreColors[verdictType] || scoreColors.warm
                     )}>
                        <div className={cn("w-1 h-1 rounded-full", dotColors[verdictType] || dotColors.warm)} />
                        <span>Score: {val.viabilityScore}</span>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="h-9 rounded-md bg-white border-slate-200 text-slate-500 hover:text-primary text-[10px] font-bold uppercase px-4">
                           <Link href={`/report/${val.id}`}>
                              <Eye className="w-3.5 h-3.5 mr-2" />
                              View
                           </Link>
                        </Button>
                        <Button 
                           variant="outline" 
                           size="icon" 
                           className="h-9 w-9 rounded-md bg-white border-slate-200 text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-all font-bold"
                           onClick={() => onDelete?.(val.id)}
                        >
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>

                  </div>
               </Card>
            )
         })}
      </div>
    </div>
  )

}
