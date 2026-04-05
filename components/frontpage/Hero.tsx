
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className='flex justify-center items-center'>
        <div className='py-34'>
            <h1 className='flex flex-col leading-[1.1] header font-bold text-[64px] tracking-wider text-center'>
               <span> Validate Your SaaS </span> 
               <span className=''>Idea in <span className='text-[#7C3AED]'>30 Seconds</span></span>
            </h1>
            <p className='font-normal text-[16px] text-[#9A9A9A] text-center mt-5 w-[60%] mx-auto'>Stop guessing. Use AI to analyze your market, competitors, and viability before writing a single line of code.</p>
            <div className='flex justify-center items-center mt-8'>
                <div className='flex items-center gap-18 border-2 border-[#2C2C2C] rounded-[6px] p-3'>
                    <span className='text-[#9A9A9A]  font-normal'>
                        <h2 className='text-[12px] uppercase font-medium'>your idea</h2>
                        <p className='text-[16px] text-[#F8F8F8]'>A CRM for local bakeries to manage custom cake orders...</p>
                    </span>
                    <button className='bg-[#7C3AED] text-[#F8F8F8] px-5 py-3 rounded-[6px]'>
                        <Link href="#" className='flex items-center gap-2' >
                            Validate my idea
                            <ArrowRight /> 
                        </Link>
                    </button>
                </div>    
            </div>
            <div className='border-t border-[#2C2C2C] mt-24'>
                <div className='flex justify-between items-center text-center mt-10'>
                    <div>
                        <p className='text-[#F8F8F8] text-[32px] uppercase font-semibold'>1000+</p>  
                        <p className='text-[#9A9A9A] text-[16px] font-normal'>ideas validated</p>
                    </div>
                    <div>
                        <p className='text-[#F8F8F8] text-[32px] uppercase font-semibold'>500+</p>  
                        <p className='text-[#9A9A9A] text-[16px] font-normal'>startups launched</p>
                    </div>
                    <div>
                        <p className='text-[#F8F8F8] text-[32px] uppercase font-semibold'>98%</p>  
                        <p className='text-[#9A9A9A] text-[16px] font-normal'>success rate</p>
                    </div>
                </div>
               
            </div>
        </div>
    </section>
  )
}

export default Hero