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
    <div className=' mt-12 padding-y max-width' id='servicespage'>
      <Hero />

      <div className='-mt-20 flex flex-row w-full justify-center items-center'>
        <div className='flex justify-center items-center w-fit mx-10 px-10 rounded-lg drop-shadow-sm my-6 max-w-lg p-5 bg-white border border-primary-blue to-white opacity-95' >
          <SearchCar />
        </div>
      </div>
      
      
      <div className='grid grid-cols-2 mt-14'>

        <div className='flex justify-start w-full items-start'>
          {/* Source car images link: https://www.edmunds.com=========== */}
          <Image 
            src='/car_img/cartmp_b.png'
            alt='hero'
            width={400}
            height={500}
            className='relative w-full z-10 object-contain scale-75 '
          />
        </div>

        <div className='flext justify-start items-center w-full m-6'>
          <h2 className=' text-[35px] font-black mb-2'>
            How it work?
          </h2>

          <div className='flex flex-col justify-start items-center w-full'>
              <div className='flex flex-row justify-start items-start w-full my-2'>
                <div className=' text-secondary-blue-200 bg-blue-50 m-4 p-4 rounded-lg  drop-shadow-md w-fit'>
                  <FaMapLocationDot size={35} />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] font-extrabold'>
                    Location Selection
                  </h1>
                  <h2 className='text-[15px] ml-4 mr-32'>
                    Open our user-friendly website to begin your car rental trip and choose the closest pickup point to the Shephered Car Rental branch location.
                  </h2>
                </div>
              </div>

              <div className='flex flex-row justify-start items-start w-full my-2'>
                <div className=' text-secondary-blue-200 bg-blue-50 m-4 p-4 rounded-lg  drop-shadow-md w-fit'>
                  <AiFillCar size={35} />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] font-extrabold'>
                    Choosing a Car
                  </h1>
                  <h2 className='text-[15px] ml-4 mr-32'>
                    Explore our wide range of vehicles tailored to your needs. We have choices for everyone, whether you want a small car for exploring the city, an SUV for family trips, or a luxury car for a touch of class. And choose the date that suits your schedule, and select the pickup time that is convenient for you.
                  </h2>
                </div>
              </div>

              <div className='flex flex-row justify-start items-start w-full my-2'>
                <div className=' text-secondary-blue-200 bg-blue-50 m-4 p-4 rounded-lg  drop-shadow-md w-fit'>
                  <FaSwatchbook size={35} />
                </div>
                <div>
                  <h1 className='m-4 text-[20px] font-extrabold'>
                    Complete your Car Booking
                  </h1>
                  <h2 className='text-[15px] ml-4 mr-32'>
                    Provide your name, contact information, and payment details securely within our web app. And click the pay button under the booking page to complete your booking and receive instant confirmation via email or app notification.
                  </h2>
                </div>
              </div>

          </div>
        </div>

      </div>

      <div className='flex flex-col justify-start items-center w-full mt-20'>
        <h2 className=' text-[35px] font-black text-secondary-blue mb-2'>
          Most Popular Car Rental Offers
        </h2>
        <h2 className=' text-center text-[20px] m-6 w-2/4'>
          For trips over the weekend, from Friday to Sunday, we offer lower rates. A great choice for short trips and activities.
        </h2>
      </div>

      <CarouselCarLIst topCars={result.topCars} />

    </div>

  )
}



