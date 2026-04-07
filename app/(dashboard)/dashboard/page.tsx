import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/db'
import { validations } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import StatCard from '@/components/dashboard/StatCard'
import ValidationList from '@/components/dashboard/ValidationList'
import { 
  BarChart3, 
  Flame, 
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { VercelV0Chat } from '@/components/ui/v0-ai-chat'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) return null;

  // Fetch Validations
  const userValidations = await db.select().from(validations)
    .where(eq(validations.userId, session.user.id))
    .orderBy(desc(validations.createdAt));
  
  const totalValidations = userValidations.length;
  const hotIdeas = userValidations.filter(v => v.verdict === 'hot').length;
  const avgScore = totalValidations > 0 
    ? Math.round(userValidations.reduce((acc, curr) => acc + curr.viabilityScore, 0) / totalValidations) 
    : 0;

  return (
    <div className='flex-1 overflow-y-auto p-4 md:p-8 space-y-10 bg-[#0A0A0A]'>
      {/* Header & Stats Bar */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1F1F1F]'>
        <div className='space-y-1'>
          <h1 className='text-xl md:text-2xl font-bold text-[#F8F8F8] header '>
            Dashboard
          </h1>
          <p className='text-[#4A4A4A] text-[11px] font-bold uppercase '>Intelligence Workspace</p>
        </div>

        {/* Compact Stats Grid */}
        <div className='grid grid-cols-3 gap-4 lg:gap-8'>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#4A4A4A] uppercase  mb-1">Total</span>
              <span className="text-xl font-bold text-white header">{totalValidations}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#4A4A4A] uppercase  mb-1">Hot</span>
              <span className="text-xl font-bold text-emerald-500 header">{hotIdeas}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#4A4A4A] uppercase  mb-1">Avg Score</span>
              <span className="text-xl font-bold text-purple-500 header">{avgScore}</span>
           </div>
        </div>
      </div>

      {/* Primary Action: AI Chat */}
      <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <VercelV0Chat showTitle={true} />
      </div>

      {/* Recent Validations Section */}
      <div className='space-y-6 pt-10 border-t border-[#1F1F1F]'>
        <div className='flex items-center justify-between'>
           <div className='flex items-center gap-2'>
              <h2 className='text-[10px] font-bold text-white/40 uppercase '>Recent Validations</h2>
           </div>
           <Link href='/history' className='text-[10px] font-bold text-[#4A4A4A] hover:text-white transition-colors uppercase  flex items-center gap-1 group'>
              View Archive <span className='group-hover:translate-x-1 transition-transform'>→</span>
           </Link>
        </div>

        <ValidationList validations={userValidations.slice(0, 3)} />
      </div>

      {/* Status Footer */}
      <div className='pt-12 text-center'>
         <p className="text-[10px] text-[#2C2C2C] uppercase  font-bold">
            Validly Intelligence System • Version 1.0.4
         </p>
      </div>
    </div>
  )
}
