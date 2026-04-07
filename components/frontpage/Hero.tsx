
import Link from 'next/link'
import { ArrowRight, Globe, Target, Rocket } from 'lucide-react'

const Hero = () => {
  return (
    <section className='flex justify-center items-center px-6 md:px-24 bg-white text-black'>
        <div className='py-20 md:py-34 w-full'>
            <h1 className='flex flex-col text-[18px] font-semibold text-black text-center'>
               <span> Validate Your SaaS Idea </span> 
               <span className=''>in <span className='text-black underline'>30 Seconds</span></span>
            </h1>
            <p className='text-[14px] font-normal text-neutral-500 text-center mt-5 max-w-xl mx-auto'>Stop guessing. Use AI to analyze your market, competitors, and viability before writing a single line of code.</p>
            <div className='flex justify-center items-center mt-10'>
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8 border border-neutral-200 rounded-[8px] p-4 md:p-3 w-full md:w-auto bg-white shadow-sm'>
                    <span className='text-neutral-500 font-normal w-full md:w-auto text-center md:text-left'>
                        <h2 className='text-[10px] uppercase font-bold text-neutral-400'>your idea</h2>
                        <p className='text-[14px] text-black'>A CRM for local bakeries to manage custom cake orders...</p>
                    </span>
                    <button className='bg-black text-white px-5 py-3 rounded-[6px] w-full md:w-auto hover:bg-neutral-800 transition-colors'>
                        <Link href="/dashboard" className='flex items-center justify-center gap-2' >
                            Validate my idea
                            <ArrowRight className='w-4 h-4' /> 
                        </Link>
                    </button>
                </div>    
            </div>
            <div className='mt-12 py-12'>
                <div className='border-t border-neutral-100 w-[60%] mx-auto mb-16' />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 px-28'>
                    <div className='flex flex-col items-center text-center space-y-3'>
                        <Globe className='w-5 h-5 text-black' />
                        <p className='text-black text-[12px] font-bold uppercase '>Market Intelligence</p>
                    </div>
                    <div className='flex flex-col items-center text-center space-y-3'>
                        <Target className='w-5 h-5 text-black' />
                        <p className='text-black text-[12px] font-bold uppercase '>Viability Scoring</p>
                    </div>
                    <div className='flex flex-col items-center text-center space-y-3'>
                        <Rocket className='w-5 h-5 text-black' />
                        <p className='text-black text-[12px] font-bold uppercase '>MVP Roadmap</p>
                    </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Hero