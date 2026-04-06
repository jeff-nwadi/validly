import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/db'
import { validations } from '@/db/schema'
import { desc, eq, avg, count } from 'drizzle-orm'
import StatCard from '@/components/dashboard/StatCard'
import ValidationList from '@/components/dashboard/ValidationList'
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  Plus,
  Zap,
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) return null;

  // Fetch Stats
  const userValidations = await db.select().from(validations).where(eq(validations.userId, session.user.id)).orderBy(desc(validations.createdAt));
  
  const totalValidations = userValidations.length;
  const hotIdeas = userValidations.filter(v => v.verdict === 'hot').length;
  const avgScore = totalValidations > 0 
    ? Math.round(userValidations.reduce((acc, curr) => acc + curr.viabilityScore, 0) / totalValidations) 
    : 0;

  return (
    <div className='flex-1 overflow-y-auto p-6 lg:p-8 space-y-12 bg-[#0A0A0A]'>
      {/* Header */}
      <div className='flex items-center justify-between pb-4 border-b border-[#1F1F1F]'>
        <div className='space-y-1'>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-[#F8F8F8] header tracking-wider'>
            Welcome back, {session.user.name.split(' ')[0]} 👋
          </h1>
          <p className='text-[#4A4A4A] text-[13px] font-bold uppercase tracking-widest'>Intelligence Dashboard</p>
        </div>
        <Link 
          href='/validate' 
          className='hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white rounded-[6px] font-semibold transition-all shadow-xl text-sm'
        >
          <Plus className='w-4 h-4 mr-0.5' />
          Validate Idea
        </Link>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatCard 
          label="Total Validations" 
          value={totalValidations} 
          icon={Activity} 
          trend="Lifetime"
        />
        <StatCard 
          label="Hot Ideas" 
          value={hotIdeas} 
          icon={Flame} 
          description="High Viability"
        />
        <StatCard 
          label="Market Score" 
          value={avgScore} 
          icon={TrendingUp} 
          description="Average"
          trend="Overall"
        />
      </div>

      {/* Recent Validations Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
           <div className='flex items-center gap-2'>
              <h2 className='text-xs font-bold text-white/40 uppercase tracking-widest'>Recent Validations</h2>
           </div>
           <Link href='/history' className='text-[10px] font-bold text-[#4A4A4A] hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-1 group'>
              View Archive <span className='group-hover:translate-x-1 transition-transform'>→</span>
           </Link>
        </div>

        <ValidationList validations={userValidations.slice(0, 5)} />
      </div>

      {/* Simplified Pro Details (Not an upsell, just context) */}
      <div className='pt-12'>
         <div className='p-8 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] relative'>
            <div className='max-w-xl'>
               <h3 className='text-white font-bold text-sm header tracking-widest uppercase mb-4'>Professional Access</h3>
               <p className='text-[#4A4A4A] leading-relaxed text-sm'>
                   You are currently on the Pro trial. Full access to market gap mapping, competitor analysis pipelines, and raw JSON data exports are enabled for your account.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}
