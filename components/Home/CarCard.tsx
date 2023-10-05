"use client";

import {useState} from 'react'
import Image from 'next/image';

import { CarProps } from '@/types';
import { carImageUrl } from '@/services';
import Link from 'next/link';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, rentRate, seats } = car;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl group">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
          {make} {model} model
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {rentRate} 0.00
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={carImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"} Manual
            </p>
          </div>
          <div className="flex group-hover:invisible w-full justify-between text-grey">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="text-[14px] leading-[17px]">{seats}5</p>
          </div>
          <div className="flex group-hover:invisible w-full justify-between text-grey">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="text-[14px] leading-[17px]">{city_mpg}15 MPG</p>
          </div>
        </div>

        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <Link href="/bookcar">Book Now</Link>
        </div>
      </div>

    </div>
  );
};

export default CarCard;
