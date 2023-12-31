
import Form from '@/components/booking/Form'
import SearchCar from '@/components/booking/SearchCar'
import UpdateCarCard from '@/components/booking/UpdateCarCard';
import { fetchCars, fetchCarsById } from '@/utils/actions/car.actions';
import { fetchBookById } from '@/utils/actions/carbook.actions';
import { UpdateBookCarParams } from '@/utils/props/carProps';
import dynamic from 'next/dynamic';
import React from 'react'



export default async function Page({searchParams}: UpdateBookCarParams)  {
    
  //Use four parameters to fetch the filtered car lists available ===================
  const result = await fetchCars(1, 10, searchParams.made, searchParams.model);
  
  const resultCar = await fetchCarsById(searchParams.carId);

  const resultBook = await fetchBookById(searchParams.bookId)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen mt-36'>
      <h1 className=' text-center text-[35px] font-extrabold text-secondary-blue w-full max-w-3xl'>
        Update Booking
        <span className='text-secondary-orange ml-2'>
        Details
        </span>
      </h1>

      <Form car={resultCar.car} book={resultBook.book}/>
      
      <div className='flex w-fit mx-10 px-10 rounded-sm drop-shadow-sm my-6 max-w-lg p-5 bg-white border border-gray-200' >
        <SearchCar />
      </div> 

      <div className=" bg-white p-4 w-3xl md:flex md:flex-col md:h-screen">
        <div className='max-h-3xl overflow-y-auto border p-4'>
          <div className='bg-white  w-full'>
            
            {result.cars.length === 0 ? (
            <p className="no-result">No cars found</p>
            ) : (
              
              result.cars.map((car) => (
                <UpdateCarCard car = {car}  currentId ={searchParams.carId} cardStyle={'bg-secondary-blue-100b'}/>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


