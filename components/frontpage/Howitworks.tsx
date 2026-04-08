"use client"

import { PenTool, Bot, FileText } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: "01",
    title: "Submit Idea",
    description: "Type in your raw concept, target audience, and any initial thoughts. The more details, the better.",
    icon: <PenTool className="w-5 h-5 text-black" aria-hidden="true" />,
  },
  {
    number: "02",
    title: "AI Research",
    description: "Our AI agents crawl the web to analyze competitors, market size, and search volume in real-time.",
    icon: <Bot className="w-5 h-5 text-black" aria-hidden="true" />,
  },
  {
    number: "03",
    title: "Get Report",
    description: "Receive a comprehensive viability score, risk analysis, and suggested MVP features instantly.",
    icon: <FileText className="w-5 h-5 text-black" aria-hidden="true" />,
  },
]

export default function Howitworks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="how-it-works" className='relative flex justify-center items-center px-6 md:px-10 py-14 bg-white text-black overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-[20%] w-[40%] h-[40%] rounded-full bg-neutral-50 blur-[120px]" />
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
          <motion.h2 variants={itemVariants} className='text-black text-[18px] font-semibold text-center mb-4 leading-tight uppercase tracking-widest'>How it works</motion.h2>
          <motion.p variants={itemVariants} className='text-neutral-500 text-[16px] font-normal max-w-md mx-auto text-center leading-relaxed text-balance'>
            From an idea in your head to a comprehensive business report in three simple steps.
          </motion.p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 py-12'>
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className='flex flex-col space-y-6 md:px-12 first:md:pl-0 last:md:pr-0 border-neutral-100 md:border-r last:border-none group'
            >
              {/* Step Number */}
              <span className='text-[56px] font-bold text-neutral-100 select-none leading-none tracking-tighter group-hover:text-neutral-200 transition-colors duration-500'>
                {step.number}
              </span>
              
              {/* Content */}
              <div className='flex flex-col space-y-4'>
                <div className='text-black w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100 group-hover:border-black/10 transition-all'>
                  {step.icon}
                </div>
                <h3 className='text-black text-[17px] font-semibold tracking-tight'>{step.title}</h3>
                <p className='text-neutral-500 text-[14px] font-normal leading-relaxed max-w-[320px] text-pretty'>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

