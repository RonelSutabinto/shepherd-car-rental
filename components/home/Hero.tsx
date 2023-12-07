"use client"

import Image from 'next/image';
import { useState } from 'react';

interface HeroProps {
  onDataReceived: (data1: string, data2: string) => void;
}

const Hero = ({ onDataReceived }: HeroProps) => {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search state
  const [made, setMade] = useState("");
  const [model, setModel] = useState("");

  const data1 = made;
  const data2 = model;
  // Call the function passed from the main page with the event data
  onDataReceived(data1, data2);

  return (
    <>
    <div className='px-10'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        
      <div className=' pt-12 my-4 xl:px-8 sm:px-4'>
        <h3 className='text-black-100 2xl:text-[26px] sm:text-[22px] text-[22px]'>
          SPECIAL OFFER
        </h3>
        <h1 className='text-secondary-blue text-[40px] md:text-[60px] font-bold '>
          Best <span className='text-secondary-orange'>Car </span>Rental
        </h1>

        <h2 className='text-[20px] text-gray-500 pr-20 mt-5'>
          Enjoy your vacation with the best car rental service from us.
        </h2>
        

        <div className='mt-6 pt-4 w-full flex-between items-center flex-wrap gap-5'>
          <h4 className='text-2xl font-extrabold'>Rent a car in BC</h4>
          {/* <SearchInput setMade={setMade} setModel={setModel}/> */}
        </div>

      </div>

      <div className='flex flex-center my-4 pt-4'>
        <Image 
          src='/hero.png'
          alt='hero'
          width={400}
          height={500}
          className='w-full object-contain align-middle'
        />
      </div>
    </div>
    </div>
    </>
   
  )
}

export default Hero
