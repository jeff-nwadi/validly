"use client"

import React from 'react'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Pricing = () => {
  const tiers = [
    {
      name: "Free",
      description: "Perfect for your first idea.",
      price: "0",
      period: "/mo",
      buttonText: "Get Started",
      buttonVariant: "outline",
      features: [
        { name: "1 Validation / month", included: true },
        { name: "Basic Viability Score", included: true },
        { name: "Top 3 Competitors", included: true },
        { name: "No PDF Exports", included: false },
      ]
    },
    {
      name: "Pro",
      description: "For serial entrepreneurs.",
      price: "9",
      period: "/mo",
      buttonText: "Upgrade to Pro",
      buttonVariant: "solid",
      featured: true,
      features: [
        { name: "Unlimited Validations", included: true },
        { name: "Advanced Viability Score", included: true },
        { name: "Deep Competitor Analysis (10+)", included: true },
        { name: "PDF Exports & Sharing", included: true },
      ]
    }
  ]

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
    <section id="pricing" className='relative flex justify-center items-center px-6 md:px-10 py-24 bg-slate-50/50 text-black overflow-hidden'>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1),transparent_70%)]" />

        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <motion.div 
        className='relative max-w-7xl w-full z-10'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className='mb-16 text-center'>
          <motion.h2 variants={itemVariants} className='text-primary text-[18px] font-bold mb-4 tracking-[0.2em]'>Simple, Transparent Pricing</motion.h2>
          <motion.p variants={itemVariants} className='text-slate-500 text-[14px] md:text-[16px] font-normal leading-relaxed max-w-md mx-auto text-balance'>

            Validate one idea for free, or upgrade for unlimited power.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {tiers.map((tier, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`relative bg-white border border-slate-100 rounded-[32px] p-10 transition-all duration-500 ${
                tier.featured ? 'border-primary/20 ring-1 ring-primary/10 lg:scale-105 z-10' : 'hover:border-primary/10'
              }`}

            >

              {tier.featured && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest'>

                  Most Popular
                </div>
              )}



              <div className='mb-8'>
                <h3 className='text-slate-900 text-[20px] font-bold tracking-tight mb-2'>{tier.name}</h3>
                <p className='text-slate-500 text-[14px] font-medium'>{tier.description}</p>
              </div>


              <div className='mb-8 flex items-baseline gap-1'>
                <span className='text-slate-900 text-[42px] font-bold tracking-tighter'>${tier.price}</span>
                <span className='text-slate-400 text-[16px] font-medium'>{tier.period}</span>
              </div>


              <Link href="/register" className="block w-full mb-8">
                <button className={`w-full py-4 rounded-2xl text-[14px] font-bold transition-all duration-300 ${
                  tier.buttonVariant === 'solid' 
                    ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-white border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98]'

                }`}>
                  {tier.buttonText}
                </button>
              </Link>


              <ul className='space-y-4'>
                {tier.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-3'>
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                      feature.included ? "bg-primary/10" : "bg-slate-50"
                    )}>
                      {feature.included ? (
                        <Check className='w-3 h-3 text-primary' />
                      ) : (
                        <X className='w-3 h-3 text-slate-300' />
                      )}
                    </div>

                    <span className={`text-[14px] font-medium ${feature.included ? 'text-slate-900' : 'text-slate-400'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Pricing


