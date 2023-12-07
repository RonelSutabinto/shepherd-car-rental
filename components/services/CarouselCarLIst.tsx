"use client"
import { CarouselCarListProps } from '@/utils/props/carProps';
import React, { useEffect, useState } from 'react'
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md'
import CarCard from './CarCard';
import { useUser } from '@clerk/nextjs';


const CarouselCarList = ({ topCars }: CarouselCarListProps) => {
  const { user } = useUser();
  const [authId, setAuthId] = useState<string>('');
  
  const [startIndex, setStartIndex] = useState(0);

  const visibleTopCars = topCars.slice(startIndex, startIndex + 3);

  const nextBtn = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 > topCars.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevBtn = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0 ? topCars.length - 3 : prevIndex - 1
    );
  };

  useEffect(() => {
   
    if(user){
      setAuthId(user.id);
    }
    
  }, []);

  return (
    <>
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-300 transform md:mx-6 lg:mx-0 mx-2 ">
          {visibleTopCars.map((car, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-2/4 lg:w-1/3 p-2 lg:mx-0 md:mx-2 flex-shrink-0 justify-center items-center text-center"
            >
              <CarCard topCar={car} fileName={'/car_img/' + car.make + '_' + car.model + '.png'}  authId={authId} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={prevBtn}
          className="bg-secondary-blue-100 hover:bg-secondary-blue text-white font-semibold py-2 px-4 rounded"
        >
          <MdSkipPrevious size={24} />
        </button>
        <button
          onClick={nextBtn}
          className="bg-secondary-blue-100 hover:bg-secondary-blue text-white font-semibold py-2 px-4 rounded"
        >
          <MdSkipNext size={24} />
        </button>
      </div>
    </div>
    </>
  );
};

export default CarouselCarList;
