"use client"
import { minimalCarMade } from '@/utils/details';
import { InputGroup, InputLeftElement, Select, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiFillCar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter }  from 'next/navigation';
import CarList from './CarList';
import { carProps } from '@/utils/props/carProps';
import BookModal from '../booking/BookModal';
import CarCard from '../home/CarCard';

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

  // handle event chakra ui drawer component event
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  //Handle modal form event
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Define selectedCar state
  const [selectedCar, setSelectedCar] = useState<carProps | null>(null);

  const openModal = (car: carProps) => {
    // Set the selected car
    setSelectedCar(car); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='mt-4 lg:-mt-20 flex flex-row w-full justify-center items-center'>
        <div className='flex justify-center items-center text-center w-11/12 md:w-fit  rounded-lg drop-shadow-sm my-6 max-w-lg    md:p-4 p-3 bg-white border border-primary-blue to-white opacity-95' >

          <div className='z-10 flex flex-row items-center justify-center w-fit'>
            
            <div className='flex items-center justify-start w-fit'>
              <InputGroup w="36">
                <InputLeftElement>
                  <AiFillCar color='blue.300' size={20} className="text-primary-blue" />
                </InputLeftElement>
                
                <Select 
                  id="selectMade"
                  style={{ paddingLeft: '34px'}}
                  onChange={(e) => setCarMade(e.target.value)}
                >
                  {minimalCarMade.map((item) =>  (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
              </InputGroup>
            </div>

            <div className='flex justify-start items-center w-fit'>

              <input 
                placeholder='Search Model' 
                className=' w-24 md:w-40 bg-white h-10 my-1 border border-gray-200 px-2' 
                type="text" 
                id="inputModel"
                onChange={(e) => setModel(e.target.value)}
              />
          
              <button 
                className="flex justify-center items-center ml-1 py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" 
                onClick={() => handleClick()}
              >
                <BiSearchAlt size={20}  />  
              </button>

            </div>

            
          </div>

        </div>
      </div>  

     
      <CarList isOpen={isOpen} onClose={onClose} make={carMade} model={model} openModal={openModal} /> 

      {isModalOpen && selectedCar && (
        <BookModal isOpen={isModalOpen} onClose={closeModal} title='Book A Car' car={selectedCar} authId = {''}>
          <CarCard isList={false} car = {selectedCar} authId={''}/> 
        </BookModal>
      )} 
    </>
  )
}

export default SearchCar
