"use client"

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Divider } from '@chakra-ui/react';

const navbarStyles = css`
  z-index: 1000; 
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  
  const handleMenuClick = (href: string) => {
    setActiveLink(href);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('Active link changed:', activeLink);
  }, [activeLink])

  return (
    <>
      <nav className="bg-gray-100 text-primary-blue p-2 fixed z-50 w-full drop-shadow-sm top-0">
        
        <div className=" relative container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">
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

          {/* set small screen mode for navbar menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-primary-blue focus:outline-none">
              <svg
                className="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* set big screen mode for navbar menu */}
          <div
            className={`md:flex flex-col md:flex-row md:space-x-4 ${isOpen ? 'flex' : 'hidden'} lg:flex`}
          >
            <h1
              className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
                activeLink === '/' ? 'bg-secondary-light text-dark-100' : 'hover:bg-secondary-light hover:text-dark-100 transition-all '
              }`}
              onClick={() => handleMenuClick('/')}
            >
              <Link href="/">Home</Link>
            </h1>
            <h1
              className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
                activeLink === '/book'
                  ? 'bg-secondary-light text-dark-100'
                  : 'hover:bg-secondary-light hover:text-dark-100 transition-all'
              }`}
              onClick={() => handleMenuClick('/book')}
            >
              <Link href="/book">Booking</Link>
            </h1>
            <h1
              className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
                activeLink === '/services'
                  ? 'bg-secondary-light text-dark-100'
                  : 'hover:bg-secondary-light hover:text-dark-100 transition-all'
              }`}
              onClick={() => handleMenuClick('/services')}
            >
              <Link href="/services">Services</Link>
            </h1>
            <h1
              className={`my-1 rounded-full p-2 px-3 cursor-pointer ${
                activeLink === '/contact'
                  ? 'bg-secondary-light text-dark-100'
                  : 'hover:bg-secondary-light hover:text-dark-100 transition-all'
              }`}
              onClick={() => handleMenuClick('/contact')}
            >
              <Link href="/contact">Contact Us</Link>
            </h1>

            
            <Divider className='text-black-100 mx-1' orientation='vertical' />
            <h2 className="my-1 bg-primary-blue p-2 px-6 rounded-full text-white cursor-pointer hover:scale-105 transition-all">
              Sign In
            </h2>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
function assignLink(href: string) {
  throw new Error('Function not implemented.');
}

