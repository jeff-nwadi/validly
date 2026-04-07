import { PenTool, Bot, FileText } from 'lucide-react'
import React from 'react'

const steps = [
  {
    number: "01",
    title: "Submit Idea",
    description: "Type in your raw concept, target audience, and any initial thoughts. The more details, the better.",
    icon: <PenTool className="w-5 h-5 text-black" />,
  },
  {
    number: "02",
    title: "AI Research",
    description: "Our AI agents crawl the web to analyze competitors, market size, and search volume in real-time.",
    icon: <Bot className="w-5 h-5 text-black" />,
  },
  {
    number: "03",
    title: "Get Report",
    description: "Receive a comprehensive viability score, risk analysis, and suggested MVP features instantly.",
    icon: <FileText className="w-5 h-5 text-black" />,
  },
]

export default function Howitworks() {
  return (
    <section id="how-it-works" className='flex justify-center items-center px-6 md:px-10 py-14 bg-white text-black'>
      <div className='py-16 md:py-24 max-w-7xl w-full'>
        <div className='mb-12 md:mb-16'>
          <h2 className='text-black text-[18px] font-semibold text-center mb-4 leading-tight uppercase'>How it works</h2>
          <p className='text-neutral-500 text-[14px] font-normal max-w-md mx-auto text-center leading-relaxed'>
            From an idea in your head to a comprehensive business report in three simple steps.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 py-12'>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col space-y-6 md:px-12 first:md:pl-0 last:md:pr-0 border-neutral-100 md:border-r last:border-none'>
              {/* Step Number */}
              <span className='text-[48px] header font-bold text-neutral-300 select-none leading-none'>
                {step.number}
              </span>
              
              {/* Content */}
              <div className='flex flex-col space-y-4'>
                <div className='text-black'>
                  {step.icon}
                </div>
                <h3 className='text-black text-[16px] font-medium'>{step.title}</h3>
                <p className='text-neutral-500 text-[14px] font-normal leading-relaxed max-w-[320px]'>
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

