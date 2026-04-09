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
    <div className='p-6 rounded-lg bg-white border border-neutral-200 transition-all duration-300 group'>

       <div className='flex items-center justify-between mb-6'>
           <div className='p-2 bg-primary/5 border border-primary/10 rounded-md transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/20'>
               <Icon className='w-4 h-4 text-primary' />
           </div>
           {trend && (
             <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 uppercase '>
                {trend}
             </span>
           )}
       </div>
       
       <div>
         <p className='text-neutral-400 text-[10px] font-bold uppercase mb-1'>{label}</p>
         <div className='flex items-baseline gap-2'>
            <h4 className='text-[18px] font-semibold text-black shrink-0'>{value}</h4>
            {description && <span className='text-[10px] text-neutral-400 uppercase font-medium truncate'>{description}</span>}
         </div>
       </div>
    </div>
  )
}
