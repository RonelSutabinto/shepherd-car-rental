import SearchCar from '@/components/services/SearchCar'
import Hero from '@/components/services/Hero'
import React from 'react'
import Image from 'next/image'
import { FaMapLocationDot } from 'react-icons/fa6'
import { AiFillCar } from 'react-icons/ai'
import { FaSwatchbook } from 'react-icons/fa6'
import CarouselCarLIst from '../../components/services/CarouselCarLIst'
import { fetchTopCars } from '@/utils/actions/car.actions'

export default async function Page() {

  const result = await fetchTopCars();
  
  return (
    <>
      <div className=' mt-12 padding-y max-width' id='servicespage'>
        <Hero />

        <div className='mt-4 lg:-mt-20 flex flex-row w-full justify-center items-center'>
          <div className='flex justify-center items-center text-center w-11/12 md:w-fit  rounded-lg drop-shadow-sm my-6 max-w-lg    md:p-4 p-3 bg-white border border-primary-blue to-white opacity-95' >
            <SearchCar />
          </div>
        </div>  
        
        
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:mt-14'>

          <div className='flex justify-center lg:justify-start items-center w-full'>
            {/* Source car images link: https://www.edmunds.com=========== */}
            <Image 
              src='/car_img/cartmp_b.png'
              alt='hero'
              width={400}
              height={500}
              className='relative w-fit lg:w-full z-10 object-contain scale-100 lg:scale-75'
            />
          </div>

          <div className='flex justify-center md:justify-start items-center flex-col w-full m-4 md:m-6 mt-10 lg:mt-0'>

            <div className='flex flex-row w-full justify-center lg:justify-start'>
              <h2 className='text-[30px] md:text-[35px] lg:text-[40px] font-black mb-2 text-start'>
                How it works?
              </h2>
            </div>
            

            <div className='flex flex-col justify-start items-center md:ml-14 lg:ml-0 md:items-start  md:w-full'>

              <div className='flex flex-row justify-start items-start w-full my-2 md:mx-0 mx-2 md:pr-0 pr-6'>
                <div className='text-secondary-blue-200 bg-blue-50 md:m-4 p-4 rounded-lg drop-shadow-md w-fit'>
                  <FaMapLocationDot className="text-[22px] md:text-[28px] lg:text-[32px]" />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] md:text-[25px] font-extrabold'>
                    Location Selection
                  </h1>
                  <h2 className='text-md md:text-xl ml-4 md:mr-32'>
                    Open our user-friendly website to begin your car rental trip and choose the closest pickup point to the Shephered Car Rental branch location.
                  </h2>
                </div>
              </div>

              <div className='flex flex-row justify-start items-start w-full my-2  md:mx-0 mx-2 md:pr-0 pr-6'>
                <div className='text-secondary-blue-200 bg-blue-50 md:m-4 p-4 rounded-lg drop-shadow-md w-fit'>
                  <AiFillCar className="text-[22px] md:text-[28px] lg:text-[32px]" />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] md:text-[25px] font-extrabold'>
                    Choosing a Car
                  </h1>
                  <h2 className='text-md md:text-xl ml-4 md:mr-32'>
                    Explore our wide range of vehicles tailored to your needs. We have choices for everyone, whether you want a small car for exploring the city, an SUV for family trips, or a luxury car for a touch of class. And choose the date that suits your schedule, and select the pickup time that is convenient for you.
                  </h2>
                </div>
              </div>

              <div className='flex flex-row justify-start items-start w-full my-2 md:mx-0 mx-2 md:pr-0 pr-6'>
                <div className='text-secondary-blue-200 bg-blue-50 md:m-4 p-4 rounded-lg drop-shadow-md w-fit'>
                  <FaSwatchbook className="text-[22px] md:text-[28px] lg:text-[32px]" />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] md:text-[25px] font-extrabold'>
                    Complete your Car Booking
                  </h1>
                  <h2 className='text-md md:text-xl ml-4 md:mr-32'>
                    Provide your name, contact information, and payment details securely within our web app. And click the pay button under the booking page to complete your booking and receive instant confirmation via email or app notification.
                  </h2>
                </div>
              </div>

            </div>
          </div>
        </div>

        
        <div className='flex flex-col justify-start items-center w-full mt-14 lg:mt-20'>
          <h2 className='text-[30px] md:text-[35px] font-black text-secondary-blue text-center mb-2 mx-2 md:mx-0'>
            Most Popular Car Rental Offers
          </h2>
          <h2 className=' text-center text-[18px] md:text-[20px] m-6 md:w-5/6 lg:w-2/4'>
            For trips over the weekend, from Friday to Sunday, we offer lower rates. A great choice for short trips and activities.
          </h2>
        </div>

        <CarouselCarLIst topCars={result.topCars} />

      </div>
    </>
  )
}



