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
import { PendingValidationTrigger } from '@/components/dashboard/PendingValidationTrigger'
import { Suspense } from 'react'

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
    <div className='flex-1 overflow-y-auto p-4 md:p-8 space-y-10 bg-white'>
      <Suspense fallback={null}>
        <PendingValidationTrigger />
      </Suspense>
      {/* Header & Stats Bar */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100'>
        <div className='space-y-1'>
          <h1 className='text-[18px] font-semibold text-black'>
            Dashboard
          </h1>
          <p className='text-neutral-400 text-[10px] font-bold'>Intelligence Workspace</p>
        </div>
      </div>

      {/* Primary Action: AI Chat */}
      <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <VercelV0Chat showTitle={true} />
      </div>

      {/* Status Footer */}
      <div className='pt-12 pb-4 text-center'>
         <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest text-balance">
            Validly Intelligence System • Version 1.0.4
         </p>
      </div>
    </div>
  )
}
