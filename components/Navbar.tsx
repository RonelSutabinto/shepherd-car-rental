"use client"

import Link from 'next/link';
import Image from 'next/image'
import React, { useState } from 'react';
import { css } from '@emotion/react';

const navbarStyles = css` z-index: 1000; /* or any value higher than the other components */`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='navbar' > 
      <nav className="bg-gray-100 text-primary-blue p-2 fixed w-full top-0">
      <div className="container mx-auto flex items-center justify-between">
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
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div className={`md:flex flex-col md:flex-row md:space-x-4 ${isOpen ? 'flex' : 'hidden'}`}>
          <h1  className="hover:bg-secondary-light rounded-full hover:text-dark-100 p-2 px-3 cursor-pointer">
            <Link href="/">Home</Link>
          </h1>
          <h1 className="hover:bg-secondary-light rounded-full hover:text-dark-100 p-2 px-3 cursor-pointer">
            <Link href="/book">Booking</Link>
          </h1>
          <a href="/Services" className="hover:bg-secondary-light rounded-full hover:text-dark-100 p-2 px-3 cursor-pointer">
            Services
          </a>
          <a href="/Contact" className="hover:bg-secondary-light rounded-full hover:text-dark-100 p-2 px-3 cursor-pointer0">
            Contact
          </a>

          <span className='py-2 text-white'>|</span>      
          <h2 className=' bg-primary-blue p-2 px-6 rounded-full text-white cursor-pointer hover:scale-105 transition-all'>
             Sign In
           </h2>
        </div>

      </div>
    </nav>
    </div>
    </>
    
  );
};

export default Navbar;
