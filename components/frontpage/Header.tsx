import Link from 'next/link'


export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6 md:px-10 border-b border-[#2C2C2C]">
        <div>
            <p className='header font-bold tracking-tight text-[20px] text-[#F8F8F8]'>Validly</p>
        </div>
        <ul className='hidden md:flex gap-5 sub-text font-normal text-[12px] text-[#9A9A9A] uppercase'>
            <Link href="#" className='hover:text-[#F8F8F8]'>How it works</Link>
            <Link href="#" className='hover:text-[#F8F8F8]'>Features</Link>
            <Link href="#" className='hover:text-[#F8F8F8]'>Pricing</Link>
            <Link href="#" className='hover:text-[#F8F8F8]'>Wall of love</Link>
        </ul>
        <div className='sub-text font-normal text-[12px] flex gap-5 items-center uppercase'>
            <Link href="#" className='hidden md:block'>Login</Link>
            <button className='bg-[#7C3AED] text-[#F8F8F8] px-5 py-2 rounded-[6px]'>
                <Link href="#" >Get started</Link>
            </button>
        </div>
    </header>
  )
}
