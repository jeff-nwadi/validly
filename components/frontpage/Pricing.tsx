import React from 'react'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

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

  return (
    <section className='flex justify-center items-center px-6 md:px-10 py-24'>
      <div className='max-w-7xl w-full'>
        <div className='mb-16 text-center'>
          <h2 className='text-[#F8F8F8] text-4xl md:text-[48px] font-bold header mb-4 tracking-wider'>Simple, transparent pricing</h2>
          <p className='text-[#9A9A9A] text-[18px] font-normal max-w-lg mx-auto leading-relaxed'>
            Validate one idea for free, or upgrade for unlimited power.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative bg-[#111111] border border-[#1F1F1F] rounded-[6px] p-8 transition-all duration-300 hover:border-[#2C2C2C] ${
                tier.featured ? 'border-[#7C3AED] shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)] lg:scale-105 z-10' : ''
              }`}
            >
              {tier.featured && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest header'>
                  Most Popular
                </div>
              )}

              <div className='mb-8'>
                <h3 className='text-[#F8F8F8] text-[24px] font-bold header mb-2 tracking-wider'>{tier.name}</h3>
                <p className='text-[#9A9A9A] text-[14px] font-normal'>{tier.description}</p>
              </div>

              <div className='mb-8 flex items-baseline gap-1'>
                <span className='text-[#F8F8F8] text-[40px] font-bold header'>${tier.price}</span>
                <span className='text-[#9A9A9A] text-[16px]'>{tier.period}</span>
              </div>

              <button className={`w-full py-3 rounded-[6px] font-semibold mb-8 transition-all duration-300 ${
                tier.buttonVariant === 'solid' 
                  ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_0_15px_rgba(124,58,237,0.4)]' 
                  : 'bg-transparent border border-[#2C2C2C] text-[#F8F8F8] hover:border-[#F8F8F8]'
              }`}>
                {tier.buttonText}
              </button>

              <ul className='space-y-4'>
                {tier.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-3'>
                    {feature.included ? (
                      <Check className='w-4 h-4 text-[#7C3AED]' />
                    ) : (
                      <X className='w-4 h-4 text-[#9A9A9A]' />
                    )}
                    <span className={`text-[14px] ${feature.included ? 'text-[#F8F8F8]' : 'text-[#9A9A9A]'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
