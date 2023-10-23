import Form from '@/components/booking/Form'
import SearchCar from '@/components/booking/SearchCar'
import React from 'react'
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdOutlineSaveAlt } from 'react-icons/md'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mt-32'>
      <h1 className='flex justify-center px-10 text-[35px] font-bold text-secondary-blue-100 w-full max-w-3xl'>
        Update the book 
        <span className='text-secondary-orange'>
          car.
        </span>
      </h1>

      <div className='flex justify-end w-full mt-14 px-10 max-w-3xl'>

      <button className=" m-2 flex justify-center py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" >
                <MdOutlineSaveAlt size={20}  />
                  Save
                </button>
      <button 
                  className=" m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-2 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
                  
                >
                  <FaAngleDoubleRight size={20}  />
                  Back
                </button>
                
                

      </div>

      <div 
        className='w-full mx-10 px-10 my-2 mb-4 max-w-3xl'
      >
        <Form />
      </div>

      <div 
        className='flex w-full mx-10 px-10 rounded-sm drop-shadow-md my-6 max-w-lg p-5 bg-gray-100'
      >
        <SearchCar />
      </div> 

    </div>
  )
}

export default page
