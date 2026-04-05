import { PenTool, Bot, FileText } from 'lucide-react'
import React from 'react'

const steps = [
  {
    number: "01",
    title: "Submit Idea",
    description: "Type in your raw concept, target audience, and any initial thoughts. The more details, the better.",
    icon: <PenTool className="w-5 h-5 text-[#A855F7]" />,
  },
  {
    number: "02",
    title: "AI Research",
    description: "Our AI agents crawl the web to analyze competitors, market size, and search volume in real-time.",
    icon: <Bot className="w-5 h-5 text-[#A855F7]" />,
  },
  {
    number: "03",
    title: "Get Report",
    description: "Receive a comprehensive viability score, risk analysis, and suggested MVP features instantly.",
    icon: <FileText className="w-5 h-5 text-[#A855F7]" />,
  },
]

export default function Howitworks() {
  return (
    <section className='flex justify-center items-center px-6 md:px-10'>
      <div className='py-16 md:py-24 max-w-7xl w-full'>
        <div className='mb-12 md:mb-16'>
          <h2 className='text-[#F8F8F8] text-3xl md:text-[40px] font-bold header text-center mb-4 tracking-wider leading-tight'>How it works</h2>
          <p className='text-[#9A9A9A] text-[16px] md:text-[18px] font-normal max-w-lg px-4 md:px-0 mx-auto text-center leading-relaxed font-sans'>
            From an idea in your head to a comprehensive business report in three simple steps.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {steps.map((step, index) => (
            <div key={index} className='relative bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 hover:border-[#2C2C2C] transition-all duration-300 group overflow-hidden'>
              {/* Background Step Number */}
              <span className='absolute top-4 right-8 text-[64px] font-bold text-[#1A1A1A] select-none header opacity-50 group-hover:opacity-100 transition-opacity'>
                {step.number}
              </span>
              
              {/* Icon Container */}
              <div className='w-12 h-12 bg-[#1C1333] border border-[#2D1B4D] rounded-xl flex items-center justify-center mb-8'>
                {step.icon}
              </div>
              
              {/* Content */}
              <div className='relative z-10'>
                <h3 className='text-[#F8F8F8] text-[22px] font-semibold header mb-4 tracking-wider'>{step.title}</h3>
                <p className='text-[#9A9A9A] text-[15px] font-normal leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

