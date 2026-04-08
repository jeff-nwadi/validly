"use client"

import { TrendingUp, AlertTriangle, Zap, Users, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function AnalysisPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      }
    },
  }

  return (
    <section id="features" className='relative flex justify-center items-center px-1 md:px-10 overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-neutral-50/50 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <motion.div 
        className='relative py-16 md:py-24 max-w-7xl w-full z-10'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className='mb-12 md:mb-16'>
          <motion.h2 variants={itemVariants} className='text-black text-[18px] md:text-[24px] font-semibold text-center mb-4 leading-tight tracking-widest'>Data-driven decisions</motion.h2>
          <motion.p variants={itemVariants} className='text-neutral-500 text-[14px] md:text-[16px] font-normal max-w-md mx-auto text-center leading-relaxed text-balance'>
            Stop relying on gut feeling. Get a comprehensive breakdown of why your idea will or won't work.
          </motion.p>
        </div>

        {/* Main Analysis Card */}
        <motion.div variants={itemVariants} className='relative p-6 md:p-14 overflow-hidden bg-white/50 backdrop-blur-sm'>
          
          {/* Header Section */}
          <div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-10 md:mb-12'>
            <div>
              <p className='text-neutral-400 text-[10px] font-bold uppercase mb-2 md:mb-3 tracking-widest'>Analysis Complete</p>
              <h3 className='text-black text-[24px] font-bold leading-tight tracking-tight'>CRM for Local Bakeries</h3>
            </div>
            
            <div className='flex items-center gap-6 w-full md:w-auto justify-between md:justify-end'>
              <div className='flex flex-col items-start md:items-end gap-2'>
                <p className='text-neutral-400 text-[10px] font-bold uppercase tracking-widest'>Viability Score</p>
                <div className='bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-semibold border border-green-200 flex items-center gap-1.5'>
                  Hot <span className='text-[10px]'>🔥</span>
                </div>
              </div>
              
              {/* Circular Score */}
              <div className='relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0'>
                <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100 font-bold'>
                  <circle 
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#F4F4F5' strokeWidth='8' 
                  />
                  <motion.circle 
                    initial={{ strokeDashoffset: 264 }}
                    whileInView={{ strokeDashoffset: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#000000' strokeWidth='8' 
                    strokeDasharray='264' 
                    strokeLinecap='round'
                  />
                </svg>
                <span className='absolute text-black text-[24px] font-bold tracking-tighter'>85</span>
              </div>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            
            {/* Left Column (3/5 width on lg) */}
            <div className='lg:col-span-3 space-y-6'>
              
              {/* Top Competitors */}
              <div className='bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm group hover:border-black/5 transition-all'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-black w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center border border-neutral-100'>
                    <Users className='w-4 h-4' aria-hidden="true" />
                  </div>
                  <h4 className='text-black text-[16px] font-bold tracking-tight'>Top Competitors</h4>
                </div>
                
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 border border-neutral-100 rounded-xl gap-4 hover:bg-white hover:border-neutral-200 transition-all cursor-default'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold'>B</div>
                      <span className='text-black font-semibold text-[15px] tracking-tight'>BakeManage</span>
                    </div>
                    <span className='text-neutral-500 text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white rounded-lg border border-neutral-100'>Direct Comp</span>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 border border-neutral-100 rounded-xl gap-4 hover:bg-white hover:border-neutral-200 transition-all cursor-default'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold'>S</div>
                      <span className='text-black font-semibold text-[15px] tracking-tight'>Square for Retail</span>
                    </div>
                    <span className='text-neutral-500 text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white rounded-lg border border-neutral-100'>Indirect Comp</span>
                  </div>
                </div>
              </div>

              {/* Suggested MVP Features */}
              <div className='bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm group hover:border-black/5 transition-all'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-black w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center border border-neutral-100'>
                    <Zap className='w-4 h-4' aria-hidden="true" />
                  </div>
                  <h4 className='text-black text-[16px] font-bold tracking-tight'>Suggested MVP Features</h4>
                </div>
                
                <div className='flex flex-wrap gap-2 md:gap-3'>
                  {[
                    "Order Tracking Pipeline",
                    "Ingredient Inventory",
                    "Automated Invoicing",
                    "Customer Database"
                  ].map((feature, i) => (
                    <div key={i} className='px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-600 text-[14px] font-medium hover:text-black hover:border-black/20 hover:bg-white transition-all cursor-default'>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (2/5 width on lg) */}
            <div className='lg:col-span-2 flex flex-col space-y-4 md:space-y-6'>
              
              {/* Biggest Risks */}
              <div className='bg-red-50/50 border border-red-100 rounded-2xl p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-red-500 w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-red-100'>
                    <AlertTriangle className='w-4 h-4' aria-hidden="true" />
                  </div>
                  <h4 className='text-red-600 text-[16px] font-bold tracking-tight'>Biggest Risks</h4>
                </div>
                
                <ul className='space-y-3 md:space-y-4'>
                  {[
                    "Low tech adoption rate in traditional bakeries.",
                    "High churn rate for seasonal businesses.",
                    "Strong entrenchment of existing POS solutions."
                  ].map((risk, i) => (
                    <li key={i} className='flex gap-2 md:gap-3 text-red-700/80 text-[14px] leading-relaxed font-medium'>
                      <span className='w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0' />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Size */}
              <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6 grow flex flex-col shadow-lg shadow-black/5'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-white/40 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10'>
                    <TrendingUp className='w-4 h-4' aria-hidden="true" />
                  </div>
                  <h4 className='text-white/60 text-[16px] font-bold tracking-tight'>Market Size</h4>
                </div>
                
                <div className='grow flex flex-col justify-center'>
                  <p className='text-white text-[48px] font-bold tracking-tighter leading-none mb-1 md:mb-2'>$2.4B</p>
                  <p className='text-white/40 text-[10px] font-bold uppercase tracking-widest'>Estimated SAM in US & Europe</p>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
