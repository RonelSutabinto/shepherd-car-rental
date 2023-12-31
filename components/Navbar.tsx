"use client"

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import {
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

const navbarStyles = css`
  z-index: 1000; 
`;

const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  
  const handleMenuClick = (href: string) => {
    setActiveLink(href);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('Active link changed:', activeLink);
    setIsPageRefreshed(!window.performance.navigation.type);
    
    //handling reload page event
    if (!isPageRefreshed) {
      setActiveLink(window.location.pathname);
    } 

    // Clean up the state to reset on page loading
    return () => {
      setIsPageRefreshed(false);
    };
    
  }, [])

  return (
    <div>
    <nav className="bg-gray-100 text-primary-blue px-0 fixed z-40 w-full drop-shadow-sm top-0 ">
        
        <div className=" relative container mx-auto flex  flex-col md:flex-row text-center items-center justify-between w-full ">

          <div className=' flex flex-row justify-between items-center  lg:w-full md:w-fit w-full lg:mx-auto'>
            <div className="text-xl font-bold">
              <Link href="/" className="flex justify-start items-center" scroll={false}>
                <Image
                  src="/logo.png"
                  alt="Car Rental Logo"
                  width={100}
                  height={95}
                  className="object-contain"
                />
              </Link>
            </div>
            
            {/* set small screen mode for popup icon navbar menu */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-primary-blue focus:outline-none">
                <svg
                  className="w-6 h-6 mr-4 text-black-100"
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
          </div>
          
          {/* set big screen mode for navbar menu */}
          <div
            className={`w-full justify-end md:flex flex-col text-center items-center md:flex-row md:space-x-2 ${isOpen ? 'flex' : 'hidden'} lg:flex`}
          >
            <div
              className={`
                nav-btn__style 
                ${
                  activeLink === '/' ? 'bg-secondary-light text-dark-100 text[20px] font-bold scale-105 transition-all' : 'hover:bg-secondary-light hover:text-dark-100 text[18px]'
                }`
              }
            >
              <h1 onClick={() => handleMenuClick('/')}>
                <Link href="/">Home</Link>
              </h1>
            </div>
            
            <div
              className={`
                nav-btn__style 
                ${ activeLink === '/book'
                  ? 'bg-secondary-light text-dark-100 text[20px] font-bold scale-105 transition-all'
                  : 'hover:bg-secondary-light hover:text-dark-100 text[18px]'
                }
              `}
            >
              <h1 onClick={() => handleMenuClick('/book')}>
                <Link href="/book">Booking</Link>
              </h1>
            </div>
            
            <div
              className={`
                nav-btn__style 
                ${ activeLink === '/services'
                  ? 'bg-secondary-light text-dark-100 text[20px] font-bold scale-105 transition-all'
                  : 'hover:bg-secondary-light hover:text-dark-100 text[18px]'
                }
              `}
            >
              <h1 onClick={() => handleMenuClick('/services')}>
                <Link href="/services">Services</Link>
              </h1>
            </div>
            
            {/* <div
              className={`
                nav-btn__style 
                ${ activeLink === '/contact'
                  ? 'bg-secondary-light text-dark-100 text[20px] font-bold scale-105 transition-all'
                  : 'hover:bg-secondary-light hover:text-dark-100 text[18px]'
                }
              `}
            >
              <h1 onClick={() => handleMenuClick('/contact')} >
                <Link href="/contact">Contact Us</Link>
              </h1>  
            </div>*/}

            <a className='w-4'></a>
            <SignedIn>
              <a className=' text-center mt-6'> </a>
              <UserButton afterSignOutUrl="/" />
              <a className=' text-center mb-6'> </a>
            </SignedIn>
          
            <SignedOut>
              <Link className="text-center w-full md:w-fit md:rounded-full my-2 bg-primary-blue p-2 px-6  text-white cursor-pointer hover:scale-105 transition-all" href="/dashboard">
                Sign In
              </Link>
            </SignedOut>
           
          </div>
        </div>
      </nav>
      </div>
  );
};

export default Navbar;

