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
    <section id="pricing" className='flex justify-center items-center px-6 md:px-10 py-24 bg-white text-black'>
      <div className='max-w-7xl w-full'>
        <div className='mb-16 text-center'>
          <h2 className='text-black text-[18px] font-semibold mb-4 uppercase'>Simple, Transparent Pricing</h2>
          <p className='text-neutral-500 text-[14px] font-normal leading-relaxed max-w-md mx-auto'>
            Validate one idea for free, or upgrade for unlimited power.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative bg-white border border-neutral-200 rounded-lg p-8 transition-all duration-300 shadow-sm ${
                tier.featured ? 'border-black ring-1 ring-black/5 lg:scale-105 z-10' : ''
              }`}
            >
              {tier.featured && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase'>
                  Most Popular
                </div>
              )}

              <div className='mb-8'>
                <h3 className='text-black text-[16px] font-medium mb-2'>{tier.name}</h3>
                <p className='text-neutral-500 text-[14px] font-normal'>{tier.description}</p>
              </div>

              <div className='mb-8 flex items-baseline gap-1'>
                <span className='text-black text-[18px] font-semibold'>${tier.price}</span>
                <span className='text-neutral-400 text-[14px]'>{tier.period}</span>
              </div>

              <button className={`w-full py-3 rounded-md text-[14px] font-semibold mb-8 transition-all duration-300 ${
                tier.buttonVariant === 'solid' 
                  ? 'bg-black text-white hover:bg-neutral-800' 
                  : 'bg-white border border-neutral-200 text-black hover:bg-neutral-50'
              }`}>
                <Link href="/register">{tier.buttonText}</Link>
              </button>

              <ul className='space-y-4'>
                {tier.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-3'>
                    {feature.included ? (
                      <Check className='w-4 h-4 text-black' />
                    ) : (
                      <X className='w-4 h-4 text-neutral-300' />
                    )}
                    <span className={`text-[14px] ${feature.included ? 'text-black' : 'text-neutral-400'}`}>
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
