'use client'

import HeroValidationForm from './HeroValidationForm'
import { Globe, Target, Rocket, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const trustMarkers = [
    { icon: Globe, label: "Market Intelligence", href: "#how-it-works" },
    { icon: Target, label: "Viability Scoring", href: "#how-it-works" },
    { icon: Rocket, label: "MVP Roadmap", href: "#how-it-works" },
  ]

  return (
    <section className='relative flex justify-center items-center px-6 md:px-24 bg-white text-black overflow-hidden'>
        {/* Premium Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neutral-100/50 blur-[120px]" />
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-neutral-50/80 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>

        <motion.div 
            className='relative py-20 md:py-34 w-full z-10'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    AI-Powered Validation
                </span>
            </motion.div>

            <motion.h1 
                variants={itemVariants}
                className='flex flex-col text-[32px] md:text-[48px] lg:text-[64px] font-bold text-black text-center leading-[1.1] tracking-tighter text-balance'
            >
               <span> Validate Your SaaS Idea </span> 
               <span className=''>in <span className='relative inline-block'>
                   30 Seconds
                   <svg className="absolute -bottom-2 left-0 w-full h-2 text-neutral-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                   </svg>
               </span></span>
            </motion.h1>

            <motion.p 
                variants={itemVariants}
                className='text-[16px] md:text-[18px] font-normal text-neutral-500 text-center mt-6 max-w-2xl mx-auto leading-relaxed text-pretty'
            >
                Stop guessing. Leverage real-time market data and advanced AI to verify your product viability before investing months in development.
            </motion.p>

            <motion.div variants={itemVariants} className='flex justify-center items-center mt-12'>
                <HeroValidationForm />
            </motion.div>

            <motion.div variants={itemVariants} className='mt-20'>
                <div className='border-t border-neutral-100 w-[40%] mx-auto mb-16' />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-4xl mx-auto'>
                    {trustMarkers.map((marker, idx) => (
                        <Link 
                            key={idx} 
                            href={marker.href}
                            className='group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl transition-all duration-300 hover:bg-neutral-50 hover:shadow-sm'
                        >
                            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center group-hover:border-black/10 group-hover:bg-white transition-all">
                                <marker.icon className='w-5 h-5 text-black group-hover:scale-110 transition-transform' aria-hidden="true" />
                            </div>
                            <p className='text-black text-[13px] font-bold uppercase tracking-tight group-hover:text-black transition-colors'>{marker.label}</p>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center mt-12">
                <Link 
                    href="#how-it-works"
                    className="flex items-center gap-2 text-neutral-400 hover:text-black transition-colors text-[14px] font-medium group"
                >
                    Learn how our validation engine works 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </motion.div>
    </section>
  )
}

export default Hero