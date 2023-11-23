"use client"
import { minimalCarMade } from '@/utils/details';
import { InputGroup, InputLeftElement, Select, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiFillCar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter }  from 'next/navigation';
import CarDrawer from './CarDrawer';

const SearchCar = () => {
  // Implement route navigation for Webhooks================= 
  const router = useRouter();
  
  const [carMade, setCarMade] = useState<string>('All Cars');
  const [model, setModel] = useState<string>('');

  const handleSearch = () => {
   
    const searchParams = new URLSearchParams(window.location.search);
    if(carMade==='All Cars'){
      setCarMade('');
    }

    searchParams.set("made", carMade);
    searchParams.set("model", model);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname,{scroll: false});
  };

  // ===============================
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }
  //================================

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='z-10 flex flex-row items-center justify-center w-fit'>
        
        <div className='flex items-center justify-start w-full'>
          <InputGroup>
              <InputLeftElement >
                <AiFillCar size={20} className="text-primary-blue" />
              </InputLeftElement>
              
                <Select 
                  id="selectMade"
                  className='relative h-10 w-32 md:w-40 pl-10 py-2  text-secondary-blue'
                  onChange={(e) => setCarMade(e.target.value)}
                >
                  {minimalCarMade.map((item) =>  (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
            </InputGroup>
        </div>

        <div className='flex justify-start items-center w-full'>

          <input 
            placeholder='Search Model' 
            className=' w-28 md:w-44 bg-white h-10 my-1 border border-gray-200 px-2' 
            type="text" 
            id="inputModel"
            onChange={(e) => setModel(e.target.value)}
          />
       
          <button 
            className="flex justify-center mx-2 py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" 
            onClick={() => handleClick()}
          >
            <BiSearchAlt size={20}  />  
          </button>

        </div>

        
      </div>
      
      <CarDrawer isOpen={isOpen} onClose={onClose} make={carMade} model={model} />
    </div>
  )
}

export default SearchCar
