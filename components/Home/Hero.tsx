"use client"

import Image from 'next/image';
import { SearchInput } from '..';
import { useState } from 'react';

const Hero = () => {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search state
  const [made, setMade] = useState("");
  const [model, setModel] = useState("");


  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-1 max-w-[1440px] mx-auto">
        
      <div className='flex pt-36 padding-x'>
        <div>
        <h3 className='text-black-100 2xl:text-[26px] sm:text-[22px] text-[22px]'>
          SPECIAL OFFER
        </h3>
        <h1 className='text-secondary-blue 2xl:text-[70px] sm:text-[62px] text-[50px] font-extrabold'>
          Best <span className='text-secondary-orange'>Car </span>Rental
        </h1>
        <p className=' text-black-100 font-light mt-5'>
          Enjoy your vacation with the best car rental service from us.
        </p>


        <div className='py-6'>
          <div className='flex flex-col items-start justify-start px-6 text-black-100'>
            <h4 className='text-2xl text-secondary-blue font-extrabold'>Rent a car in BC</h4>
            <p>Look into cars that interest you.</p>
          </div>

          
          <div className=' rounded-md py-6 px-6 drop-shadow bg-secondary-light-100'>
            <div className='w-[70%]'>
            <SearchInput setMade={setMade} setModel={setModel}/>
            </div>
            
          </div>
        
        </div>
        </div>
        

        <div className='flex'>
        <Image src="/hero.png" alt='hero image' fill className='object-contain'/>
        </div>
        
      </div>

      
      {/* <div className='xl:flex-[1.5] flex justify-center items-center w-full xl:h-screen'>
          <div className='relative xl:w-full w-[80%] xl:h-full h-[390px] z-0'>
              <Image src="/hero.png" alt='hero image' fill className='object-contain'/>
          </div>
      </div>  */}
     

    </div>
  )
}

export default Hero
