import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: string
}

export default function StatCard({ label, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <div className='p-6 rounded-[6px] bg-[#111111] border border-[#1F1F1F] transition-all duration-300 group'>
       <div className='flex items-center justify-between mb-6'>
           <div className='p-2 bg-white/5 border border-white/10 rounded-[6px] transition-all duration-300 group-hover:bg-white/10'>
               <Icon className='w-4 h-4 text-white/60' />
           </div>
           {trend && (
             <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0A0A0A] text-[#4A4A4A] border border-[#1F1F1F] uppercase '>
                {trend}
             </span>
           )}
       </div>
       
       <div>
         <p className='text-[#4A4A4A] text-xs font-bold uppercase  mb-1'>{label}</p>
         <div className='flex items-baseline gap-2'>
            <h4 className='text-3xl font-bold text-[#F8F8F8] header  shrink-0'>{value}</h4>
            {description && <span className='text-[10px] text-[#4A4A4A] uppercase  font-medium truncate'>{description}</span>}
         </div>
       </div>
    </div>
  )
}
