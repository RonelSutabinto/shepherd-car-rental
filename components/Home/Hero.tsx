"use client"

import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-1 max-w-[1440px] mx-auto">
        
      <div className='flex-1 pt-36 padding-x'>
        <h3 className='text-black-100 2xl:text-[26px] sm:text-[22px] text-[22px]'>
          SPECIAL OFFER
        </h3>
        <h1 className='text-secondary-blue 2xl:text-[70px] sm:text-[62px] text-[50px] font-extrabold'>
          Best <span className='text-secondary-orange'>Car </span>Rental
        </h1>
        <p className=' text-black-100 font-light mt-5'>
          Enjoy your vacation with the best car rental service from us.
        </p>

        <button 
          type="button"
          className="flex flex-row relative bg-secondary-blue rounded-full text-white justify-start items-start py-2 px-5 outline-3 m-2 mt-6"
        >
          <span className="flex-1">Contact Us</span>
        </button>
      </div>

      <div className='xl:flex-[1.5] flex justify-center items-center w-full xl:h-screen'>
          <div className='relative xl:w-full w-[80%] xl:h-full h-[390px] z-0'>
              <Image src="/hero.png" alt='hero image' fill className='object-contain'/>
          </div>
      </div> 
     

    </div>
  )
}

export default Hero
