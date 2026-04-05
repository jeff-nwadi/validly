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
    <section id="how-it-works" className='flex justify-center items-center px-6 md:px-10'>
      <div className='py-16 md:py-24 max-w-7xl w-full'>
        <div className='mb-12 md:mb-16'>
          <h2 className='text-[#F8F8F8] text-3xl md:text-[40px] font-bold header text-center mb-4 tracking-wider leading-tight'>How it works</h2>
          <p className='text-[#9A9A9A] text-[16px] md:text-[18px] font-normal w-md px-4 md:px-0 mx-auto text-center leading-relaxed font-sans'>
            From an idea in your head to a comprehensive business report in three simple steps.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 py-12'>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col space-y-6 md:px-12 first:md:pl-0 last:md:pr-0 border-[#1F1F1F] md:border-r last:border-none'>
              {/* Step Number */}
              <span className='text-[48px] font-bold text-[#2C2C2C] select-none sub-text leading-none'>
                {step.number}
              </span>
              
              {/* Content */}
              <div className='flex flex-col space-y-4'>
                <div className='text-[#7C3AED]'>
                  {step.icon}
                </div>
                <h3 className='text-[#F8F8F8] text-[22px] font-semibold header tracking-wider'>{step.title}</h3>
                <p className='text-[#9A9A9A] text-[15px] font-normal leading-relaxed max-w-[320px]'>
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

