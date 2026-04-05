
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className='flex justify-center items-center px-6 md:px-10'>
        <div className='py-20 md:py-34 w-full'>
            <h1 className='flex flex-col leading-[1.2] header font-bold text-3xl md:text-[64px] tracking-wider text-center'>
               <span> Validate Your SaaS </span> 
               <span className=''>Idea in <span className='text-[#7C3AED]'>30 Seconds</span></span>
            </h1>
            <p className='font-normal text-[15px] md:text-[16px] text-[#9A9A9A] text-center mt-5 max-w-2xl lg:w-[40%] mx-auto'>Stop guessing. Use AI to analyze your market, competitors, and viability before writing a single line of code.</p>
            <div className='flex justify-center items-center mt-10'>
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-18 border-2 border-[#2C2C2C] rounded-[8px] p-4 md:p-3 w-full md:w-auto'>
                    <span className='text-[#9A9A9A] font-normal w-full md:w-auto text-center md:text-left'>
                        <h2 className='text-[11px] md:text-[12px] uppercase font-medium'>your idea</h2>
                        <p className='text-[15px] md:text-[16px] text-[#F8F8F8]'>A CRM for local bakeries to manage custom cake orders...</p>
                    </span>
                    <button className='bg-[#7C3AED] text-[#F8F8F8] px-5 py-3 rounded-[6px] w-full md:w-auto'>
                        <Link href="#" className='flex items-center justify-center gap-2' >
                            Validate my idea
                            <ArrowRight className='w-4 h-4' /> 
                        </Link>
                    </button>
                </div>    
            </div>
            <div className='border-t border-[#2C2C2C] mt-24 px-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:justify-between items-center text-center mt-12'>
                    <div>
                        <p className='text-[#F8F8F8] text-[28px] md:text-[32px] uppercase font-semibold'>1000+</p>  
                        <p className='text-[#9A9A9A] text-[15px] md:text-[16px] font-normal'>ideas validated</p>
                    </div>
                    <div>
                        <p className='text-[#F8F8F8] text-[28px] md:text-[32px] uppercase font-semibold'>500+</p>  
                        <p className='text-[#9A9A9A] text-[15px] md:text-[16px] font-normal'>startups launched</p>
                    </div>
                    <div>
                        <p className='text-[#F8F8F8] text-[28px] md:text-[32px] uppercase font-semibold'>98%</p>  
                        <p className='text-[#9A9A9A] text-[15px] md:text-[16px] font-normal'>success rate</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero