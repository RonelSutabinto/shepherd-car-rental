"use client";

import Image from 'next/image';
import { FaCar, FaGasPump, FaWheelchair } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { booksProps, topCarParams } from '@/utils/props/carProps';
import BookModal from '../booking/BookModal';

const CarCard = ({ topCar, fileName }: topCarParams) => {
  // Initialize local props from the car details received ======
  const { city_mpg, year, make, model, transmission, rentRate, seats, totalCarBooks} = topCar; 

  //Book modal component react hook settings====================
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fname = '/car_img/'+ make +'_'+ model+'.png'
 
  return (
    <>
    <div className=' flex justify-end w-full items-center'>
      <span className='py-2 font-extrabold text-white bg-secondary-blue-100 px-4  rounded-full border border-secondary-blue'>
        {totalCarBooks}
      </span>
    </div>
    
    <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-gray-100 hover:bg-white hover:shadow-md hover:border-[1px] border-blue-600 rounded-3xl group -mt-4">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[18px] leading-[22px] font-bold capitalize">
          {make} {model}-{year}  
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
         <span className='text-secondary-blue-100'>$</span>
        {rentRate} 
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>
    
      
      <div className='relative w-full h-36 my-3 object-contain '>
        {/* Source car images link: https://www.edmunds.com=========== */}
        <Image src={fileName.toLowerCase().replace(/\s+/g, '_')} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='flex-1 w-full h-10 object-contain'>
        <button className='  bg-gradient-to-r from-blue-400 to-primary-blue p-2 rounded-lg text-white w-full px-5 justify-between'
          onClick={onOpen}
        >
          <span className='text-30px font-bold text-white'>Book A Car</span> 
        </button>
      </div>
     
      
    </div>

    <BookModal isOpen={isOpen} onClose={onClose} car={topCar} />
    </>

    
  );
};

export default CarCard;
