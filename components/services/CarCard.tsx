"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { carProps } from '@/utils/props/carProps';
import { FaCar, FaGasPump, FaWheelchair } from 'react-icons/fa';

interface CarParams {
  car: carProps;
  fileName: string;
  authId: string;
  // Accept the openModal function
  openModal: () => void; 
}


const CarCard = ({ car, fileName, authId, openModal }: CarParams) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize local props from the car details received ======
  const { city_mpg, year, make, model, transmission, rentRate, seats} = car; 

  const fname = '/car_img/'+ make +'_'+ model+'.png'
 
  return (
    <>
      <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-gray-100 hover:bg-white hover:shadow-md hover:border-[1px] border-blue-600 rounded-3xl group">
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

        
        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:visible w-full justify-between text-grey'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <FaCar  className="w-full text-[20px] mb-2" />
                    <p className='text-[14px] leading-[17px]'>
                        {transmission === "Manual" ? "Manual" : "Auto"}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <FaWheelchair  className="w-full text-[20px] mb-2" />
                    <p className="text-[14px] leading-[17px]">{seats}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <FaGasPump className="w-full text-[20px] mb-2" />
                    <p className="text-[14px] leading-[17px]">{city_mpg} MPG</p>
                </div>
            </div>
        </div>
        
        <div className='flex-1 w-full h-10 object-contain'>
          <button className='  bg-gradient-to-r from-blue-400 to-primary-blue p-2 rounded-lg text-white w-full px-5 justify-between'
            onClick={openModal}
          >
            <span className='text-30px font-bold text-white'>Book A Car</span> 
          </button>
        </div>
      
      </div>

    </>
    
  );
};

export default CarCard;
