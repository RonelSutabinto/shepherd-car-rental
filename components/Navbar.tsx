import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <header className="w-full absolute z-10 mt-4">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 shadow-sm border-b-[1px]">
          <Link href="/" className="flex justify-center items-center">
            <Image 
              src="/logo.png"
              alt="Car Rental Logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link> 

          <div className='flex items-center justify-between gap-6'>
            <div className='flex'>
              <h2 className='hover:bg-secondary-light p-2 px-3 rounded-full hover:text-black-100 cursor-pointer'>
                Home
              </h2>
              <h2 className='hover:bg-secondary-light p-2 px-3 rounded-full hover:text-black-100 cursor-pointer'>
                Booking
              </h2>
              <h2 className='hover:bg-secondary-light p-2 px-3 rounded-full hover:text-black-100 cursor-pointer'>
                Services
              </h2>
              <h2 className='hover:bg-secondary-light p-2 px-3 rounded-full hover:text-black-100 cursor-pointer'>
                Contact Us
              </h2>
            </div> 

            <h2 className='bg-secondary-blue p-2 px-6 rounded-full text-white cursor-pointer'>
              Sign In
            </h2>
          </div>
         
          
        </nav>
    </header>

  )
}

export default Navbar
