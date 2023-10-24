"use client"

import { carProps } from '@/utils/props/carProps';
import { Image,Button, Card, CardBody, CardFooter, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaAngleDoubleRight, FaCar, FaGasPump, FaWheelchair } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface CarCardProps {
  car: carProps,
  currentId: string,
  cardStyle: string
}

const UpdateCarCard = ({ car, currentId, cardStyle }: CarCardProps) => {
  const {_id, city_mpg, year, make, model, transmission, rentRate, seats } = car; 
  const router = useRouter();
  
  if(currentId!==_id){
    cardStyle = 'bg-white'
  } 

  const handleSearch = () => {
    // alert("Made: "+ carMade +"\n model:"+ model );

    const searchParams = new URLSearchParams(window.location.search);
    
    searchParams.set("carId", _id);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <div className='bg-gray-100 my-4'>
     
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        className = {cardStyle}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='/tmpImage.png'
          alt='Car Model'
          className='object-contain'
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{make} {model} - {year}</Heading>

            <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
              <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
              {rentRate}
              <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
            </p>

            <div className='flex group-hover:visible w-full justify-between text-grey pl-2 mt-6'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <FaCar  className="w-full text-[20px]" />
              <p className='text-[14px] leading-[17px]'>
                {transmission === "Manual" ? "Manual" : "Auto"}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <FaWheelchair  className="w-full text-[20px]" />
              <p className=" text-[14px] leading-[17px]">{seats}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <FaGasPump className="w-full text-[20px]" />
              <p className="text-[14px] leading-[17px]">{city_mpg} MPG</p>
            </div>
          </div>

          {/* <Text py='2'>
              If you prefer, you can send us an email. Our helpful staff is available to answer any inquiries or address any concerns.
            </Text>  */}
          </CardBody>

          <CardFooter>
           
            <button 
              className=" m-2 flex justify-center py-2 h-9 border bg-secondary-blue px-4 rounded-lg text-white text-[14px] font-bold border-secondary-blue" 
              onClick={handleSearch}
            >
            {/* <FaAngleDoubleRight size={20}  /> */}
            Select
          </button>

            
          </CardFooter>
        </Stack>
      </Card>
    </div>
  )
}

export default UpdateCarCard