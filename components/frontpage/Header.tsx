import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="flex justify-between items-center py-10 px-10">
        <div>
            <p className='header font-bold tracking-widest text-[23px]'>Validly</p>
        </div>
        <ul className='flex gap-5'>
            <Link href="#" >How it works</Link>
            <Link href="#" >Features</Link>
            <Link href="#" >Pricing</Link>
            <Link href="#" >Wall of love</Link>
        </ul>
        <div>
            <Link href="#" >Login</Link>
            <Link href="#" >Sign Up</Link>
        </div>
    </header>
  )
}
