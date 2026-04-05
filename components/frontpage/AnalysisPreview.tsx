import { TrendingUp, AlertTriangle, Zap, Users, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

export default function AnalysisPreview() {
  return (
    <section className='flex justify-center items-center px-6 md:px-10 bg-[#111111]'>
      <div className='py-16 md:py-24 max-w-7xl w-full'>
        <div className='mb-12 md:mb-16'>
          <h2 className='text-[#F8F8F8] text-3xl md:text-[40px] font-bold header text-center mb-4 tracking-wider leading-tight'>Data-driven decisions</h2>
          <p className='text-[#9A9A9A] text-[16px] md:text-[18px] font-normal max-w-2xl mx-auto text-center leading-relaxed'>
            Stop relying on gut feeling. Get a comprehensive breakdown of why your idea will or won't work.
          </p>
        </div>

        {/* Main Analysis Card */}
        <div className='relative p-6 md:p-14 overflow-hidden'>
          
          {/* Header Section */}
          <div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-10 md:mb-12'>
            <div>
              <p className='text-[#9A9A9A] text-[11px] md:text-[12px] font-medium uppercase tracking-wide mb-2 md:mb-3'>Analysis Complete</p>
              <h3 className='text-[#F8F8F8] text-[28px] md:text-[40px] font-bold header tracking-wider leading-tight'>CRM for Local Bakeries</h3>
            </div>
            
            <div className='flex items-center gap-6 w-full md:w-auto justify-between md:justify-end'>
              <div className='flex flex-col items-start md:items-end gap-2'>
                <p className='text-[#9A9A9A] text-[11px] md:text-[12px] font-medium uppercase tracking-wide'>Viability Score</p>
                <div className='bg-[#101914] text-[#10B981] px-3 py-1 rounded-full text-[11px] md:text-[12px] font-semibold border border-[#064E3B] flex items-center gap-1.5'>
                  Hot <span className='text-[10px]'>🔥</span>
                </div>
              </div>
              
              {/* Circular Score */}
              <div className='relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0'>
                <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
                  <circle 
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#1F1F1F' strokeWidth='8' 
                  />
                  <circle 
                    cx='50' cy='50' r='42' 
                    fill='none' stroke='#10B981' strokeWidth='8' 
                    strokeDasharray='264' 
                    strokeDashoffset='40' 
                    strokeLinecap='round'
                  />
                </svg>
                <span className='absolute text-[#F8F8F8] text-[24px] md:text-[28px] font-bold header'>85</span>
              </div>
            </div>
          </div>

          {/* Analysis Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            
            {/* Left Column (3/5 width on lg) */}
            <div className='lg:col-span-3 space-y-6'>
              
              {/* Top Competitors */}
              <div className='bg-[#111111]/50 border border-[#1F1F1F] rounded-[6px] p-5'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-[#A855F7]'>
                    <Users className='w-4 h-4' />
                  </div>
                  <h4 className='text-[#F8F8F8] text-[16px] font-semibold header tracking-wider'>Top Competitors</h4>
                </div>
                
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[6px] gap-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-[#3B82F6] rounded-[6px] flex items-center justify-center text-white font-bold'>B</div>
                      <span className='text-[#F8F8F8] font-medium'>BakeManage</span>
                    </div>
                    <span className='text-[#9A9A9A] text-[10px] md:text-[12px] uppercase tracking-wide px-3 py-1 bg-[#1A1A1A] rounded-[6px] border border-[#2C2C2C]'>Direct Comp</span>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[6px] gap-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 bg-[#EC4899] rounded-[6px] flex items-center justify-center text-white font-bold'>S</div>
                      <span className='text-[#F8F8F8] font-medium'>Square for Retail</span>
                    </div>
                    <span className='text-[#9A9A9A] text-[10px] md:text-[12px] uppercase tracking-wide px-3 py-1 bg-[#1A1A1A] rounded-[6px] border border-[#2C2C2C]'>Indirect Comp</span>
                  </div>
                </div>
              </div>

              {/* Suggested MVP Features */}
              <div className='bg-[#111111]/50 border border-[#1F1F1F] rounded-[6px] p-5'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-[#A855F7]'>
                    <Zap className='w-4 h-4' />
                  </div>
                  <h4 className='text-[#F8F8F8] text-[16px] font-semibold header tracking-wider'>Suggested MVP Features</h4>
                </div>
                
                <div className='flex flex-wrap gap-2 md:gap-3'>
                  {[
                    "Order Tracking Pipeline",
                    "Ingredient Inventory",
                    "Automated Invoicing",
                    "Customer Database"
                  ].map((feature, i) => (
                    <div key={i} className='px-3 py-1.5 md:px-4 md:py-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-full text-[#9A9A9A] text-[12px] md:text-[14px] hover:text-[#F8F8F8] hover:border-[#A855F7] transition-colors'>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (2/5 width on lg) */}
            <div className='lg:col-span-2 flex flex-col space-y-4 md:space-y-6'>
              
              {/* Biggest Risks */}
              <div className='bg-[#191111] border border-[#521C1C]/50 rounded-[6px] p-5'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-[#EF4444]'>
                    <AlertTriangle className='w-4 h-4' />
                  </div>
                  <h4 className='text-[#F87171] text-[16px] font-semibold header tracking-wider'>Biggest Risks</h4>
                </div>
                
                <ul className='space-y-3 md:space-y-4'>
                  {[
                    "Low tech adoption rate in traditional bakeries.",
                    "High churn rate for seasonal businesses.",
                    "Strong entrenchment of existing POS solutions."
                  ].map((risk, i) => (
                    <li key={i} className='flex gap-2 md:gap-3 text-[#F87171]/80 text-[13px] md:text-[14px] leading-snug md:leading-relaxed'>
                      <span className='w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#EF4444] mt-1.5 md:mt-2 shrink-0' />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Size */}
              <div className='bg-[#111917] border border-[#10B981]/20 rounded-[6px] p-5 grow flex flex-col'>
                <div className='flex items-center gap-3 mb-4 md:mb-6'>
                  <div className='text-[#10B981]'>
                    <TrendingUp className='w-4 h-4' />
                  </div>
                  <h4 className='text-[#10B981] text-[16px] font-semibold header tracking-wider'>Market Size</h4>
                </div>
                
                <div className='grow flex flex-col justify-center'>
                  <p className='text-[#F8F8F8] text-[36px] md:text-[48px] font-bold header leading-none mb-1 md:mb-2'>$2.4B</p>
                  <p className='text-[#9A9A9A] text-[11px] md:text-[12px] uppercase tracking-wider'>Estimated SAM in US & Europe</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
