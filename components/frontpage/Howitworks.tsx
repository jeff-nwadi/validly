import { PenTool } from 'lucide-react'
import React from 'react'

export default function Howitworks() {
  return (
    <section className='flex justify-center items-center'>
        <div className='py-34'>
           <div className=''>
                <p className='text-[#F8F8F8] text-[32px] font-semibold header text-center mb-4 tracking-wide'>How it works</p>
                <p className='text-[#9A9A9A] text-[16px] font-normal w-[60%] mx-auto text-center mb-10'>Stop guessing. Use AI to analyze your market, competitors, and viability before writing a single line of code.</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex'>
                        <PenTool/>
                        <p>01</p> 
                    </div>
                    <h2>Submit Idea</h2>
                    <p>Type in your raw concept, target audience, and any initial thoughts. The more details, the better.</p>
                </div>
                
            </div> 
        </div>
    </section>
  )
}
