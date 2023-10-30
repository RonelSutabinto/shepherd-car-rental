
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [activeLink, setActiveLink] = useState('/');
  
  const handleMenuClick = (href: string) => {
    setActiveLink(href);
  };
  
  useEffect(() => {
    console.log('Active link changed:', activeLink);
  }, [activeLink])
  
  return (
    <>
    <div className='flex justify-center items-center mt-10 px-4 '>
      <h1
        className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
          activeLink === '/' ? 'border-secondary-blue text-dark-100' : 'hover:border-secondary-blue hover:text-dark-100 transition-all '
        }`}
        onClick={() => handleMenuClick('/')}
      >
        <Link href="/">Home</Link>
      </h1>
      <h1
        className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
          activeLink === '/book'
            ? 'border-secondary-blue text-dark-100'
            : 'hover:border-secondary-blue hover:text-dark-100 transition-all'
        }`}
        onClick={() => handleMenuClick('/book')}
      >
        <Link href="/book">Booking</Link>
      </h1>
      <h1
        className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
          activeLink === '/services'
            ? 'border-secondary-blue text-dark-100'
            : 'hover:border-secondary-blue hover:text-dark-100 transition-all'
        }`}
        onClick={() => handleMenuClick('/services')}
      >
        <Link href="/services">Services</Link>
      </h1>
      <h1
        className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
          activeLink === '/contact'
            ? 'border-secondary-blue text-dark-100'
            : 'hover:border-secondary-blue hover:text-dark-100 transition-all'
        }`}
        onClick={() => handleMenuClick('/contact')}
      >
        <Link href="/contact">ContactUs</Link>
      </h1>

        
    </div>
    <div className=' flex justify-center items-center mt-6'>
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="Car Rental Logo"
          width={100}
          height={95}
          className="object-contain"
        />
      </Link>
    </div>
    <div className='flex flex-col justify-center items-center mb-20 mt-4'>
      <h1 className='m-4 text-base text-gray-700'>
        Ronel shepherdtech 2023 &copy;
      </h1>
      <h1 className=' mx-10 mb-4 text-base text-secondary-blue-100'>
        Project DGL-204 (2023 - fall semester) 
      </h1>
    </div>
    
    </>
  )
}

export default Footer
