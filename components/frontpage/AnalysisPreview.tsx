import { TrendingUp, AlertTriangle, Zap, Users, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

export default function AnalysisPreview() {
  return (
    <section id="features" className='flex justify-center items-center px-1 md:px-10 bg-white border-y border-neutral-100'>
      <div className='py-16 md:py-24 max-w-7xl w-full'>
        <div className='mb-12 md:mb-16'>
          <h2 className='text-black text-[18px] font-semibold text-center mb-4 leading-tight uppercase'>Data-driven decisions</h2>
          <p className='text-neutral-500 text-[14px] font-normal w-md mx-auto text-center leading-relaxed'>
            Stop relying on gut feeling. Get a comprehensive breakdown of why your idea will or won't work.
          </p>
        </div>

        {/* Main Analysis Card */}
        <div className='relative p-6 md:p-14 overflow-hidden'>
          
          {/* Header Section */}
          <div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-10 md:mb-12'>
            <div>
              <p className='text-neutral-400 text-[10px] font-bold uppercase mb-2 md:mb-3'>Analysis Complete</p>
              <h3 className='text-black text-[18px] font-semibold leading-tight'>CRM for Local Bakeries</h3>
            </div>
            
            <div className='flex items-center gap-6 w-full md:w-auto justify-between md:justify-end'>
              <div className='flex flex-col items-start md:items-end gap-2'>
                <p className='text-neutral-400 text-[10px] font-bold uppercase'>Viability Score</p>
                <div className='bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-semibold border border-green-200 flex items-center gap-1.5'>
                  Hot <span className='text-[10px]'>🔥</span>
                </div>
              </div>
              
              {/* Circular Score */}
              <div className='relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0'>
                <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
                  <circle 
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#F4F4F5' strokeWidth='8' 
                  />
                  <circle 
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#10B981' strokeWidth='8' 
                    strokeDasharray='264' 
                    strokeDashoffset='40' 
                    strokeLinecap='round'
                  />
                </svg>
                <span className='absolute text-black text-[24px] font-semibold'>85</span>
              </div>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            
            {/* Left Column (3/5 width on lg) */}
            <div className='lg:col-span-3 space-y-6'>
              
              {/* Top Competitors */}
              <div className='bg-white border border-neutral-200 rounded-[8px] p-5 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-black'>
                    <Users className='w-4 h-4' />
                  </div>
                  <h4 className='text-black text-[16px] font-medium'>Top Competitors</h4>
                </div>
                
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-[6px] gap-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-blue-100 rounded-[6px] flex items-center justify-center text-blue-600 font-bold'>B</div>
                      <span className='text-black font-medium text-[14px]'>BakeManage</span>
                    </div>
                    <span className='text-neutral-500 text-[10px] uppercase px-3 py-1 bg-white rounded-[6px] border border-neutral-200'>Direct Comp</span>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-[6px] gap-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-pink-100 rounded-[6px] flex items-center justify-center text-pink-600 font-bold'>S</div>
                      <span className='text-black font-medium text-[14px]'>Square for Retail</span>
                    </div>
                    <span className='text-neutral-500 text-[10px] uppercase px-3 py-1 bg-white rounded-[6px] border border-neutral-200'>Indirect Comp</span>
                  </div>
                </div>
              </div>

              {/* Suggested MVP Features */}
              <div className='bg-white border border-neutral-200 rounded-[8px] p-5 shadow-sm'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-black'>
                    <Zap className='w-4 h-4' />
                  </div>
                  <h4 className='text-black text-[16px] font-medium'>Suggested MVP Features</h4>
                </div>
                
                <div className='flex flex-wrap gap-2 md:gap-3'>
                  {[
                    "Order Tracking Pipeline",
                    "Ingredient Inventory",
                    "Automated Invoicing",
                    "Customer Database"
                  ].map((feature, i) => (
                    <div key={i} className='px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-600 text-[14px] hover:text-black hover:border-black transition-colors'>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (2/5 width on lg) */}
            <div className='lg:col-span-2 flex flex-col space-y-4 md:space-y-6'>
              
              {/* Biggest Risks */}
              <div className='bg-red-50 border border-red-100 rounded-[8px] p-5 shadow-sm'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-red-500'>
                    <AlertTriangle className='w-4 h-4' />
                  </div>
                  <h4 className='text-red-600 text-[16px] font-medium'>Biggest Risks</h4>
                </div>
                
                <ul className='space-y-3 md:space-y-4'>
                  {[
                    "Low tech adoption rate in traditional bakeries.",
                    "High churn rate for seasonal businesses.",
                    "Strong entrenchment of existing POS solutions."
                  ].map((risk, i) => (
                    <li key={i} className='flex gap-2 md:gap-3 text-red-700/80 text-[14px] leading-relaxed'>
                      <span className='w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0' />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Size */}
              <div className='bg-green-50 border border-green-100 rounded-[8px] p-5 grow flex flex-col shadow-sm'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-green-600'>
                    <TrendingUp className='w-4 h-4' />
                  </div>
                  <h4 className='text-green-600 text-[16px] font-medium'>Market Size</h4>
                </div>
                
                <div className='grow flex flex-col justify-center'>
                  <p className='text-black text-[36px] font-semibold leading-none mb-1 md:mb-2'>$2.4B</p>
                  <p className='text-neutral-500 text-[10px] font-bold uppercase'>Estimated SAM in US & Europe</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
