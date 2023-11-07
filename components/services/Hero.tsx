import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div >
      <div className='bg-car-bg bg-repeat-round z-0 object-contain'>
        <div className='grid grid-cols-5 mx-16  '>

          <div className='ml-16 mt-24 col-span-2 w-full'>
            <div className='flex flex-col'>
              
              
              <div className='flex w-full items-center justify-center md:justify-start'>
                <h1 className=' text-gray-700 text-[32px] md:text-[38px] lg:text-[45px] font-bold '>
                  Simple And Quick Car Rental Service!
                </h1>
              </div>

              <div className='mt-10 flex w-full items-center justify-center md:justify-start'>
                <h1 className='px-4  md:px-0 md:text-[18px] text-[16px] text-gray-500'>
                Rent a car from us today and drive all throughout Canada's <span className=' font-extrabold text-secondary-blue-100'>British Columbia</span> province. A travel with no mileage restrictions.
                </h1>
              </div>

            </div>
          </div>

          <div className='col-span-3 flex justify-start w-full items-start scale-90'>
            <Image 
              src='/car_img/cartmp.png'
              alt='hero'
              width={400}
              height={500}
              className='relative w-full z-10 object-contain scale-75'
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero
