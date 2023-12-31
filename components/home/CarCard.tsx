"use client";

import Image from 'next/image';
import { FaCar, FaGasPump, FaWheelchair } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { carProps } from '@/utils/props/carProps';
import BookModal from '../booking/BookModal';

interface CarCardProps {
  isList: boolean;
  car: carProps;
  authId: string;
}

const CarCard = ({isList, car, authId }: CarCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Initialize local props from the car details received ======
  const { city_mpg, year, make, model, transmission, rentRate, seats } = car; 
  const [fileName, setFileName] = useState('/model-icon.png');

  //Book modal component react hook settings====================
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fname = '/car_img/'+ make +'_'+ model+'.png'
    setFileName(fname.toLowerCase().replace(/\s+/g, '_'))
    
  }, [fileName]);
  
  return (
    <div>
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
          
        <div className='relative w-full h-36 my-3 object-contain'>
          {/* Source car images link: https://www.edmunds.com=========== */}
          <Image src={fileName} alt='car model' fill priority className='object-contain' />
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

        {isList ? ( 
          <div className='flex-1 mt-4 w-full h-10 object-contain'>
          <button className='  bg-gradient-to-r from-blue-400 to-primary-blue p-2 rounded-lg text-white w-full px-5 justify-between'
            onClick={openModal}
          >
            <span className='text-30px font-bold text-white'>Book A Car</span> 
          </button>
        </div>
        ): (<div></div>)}
        
      </div>

      <BookModal isOpen={isModalOpen} onClose={closeModal} title='Book A Car' car={car} authId = {authId}>
        <CarCard isList={false} car = {car} authId={authId}/> 
      </BookModal>
    </div>
  );
};

export default CarCard;
