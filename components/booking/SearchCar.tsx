"use client"
import { minimalCarMade } from '@/utils/details';
import { FormControl, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiFillCar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter }  from 'next/navigation';

const SearchCar = () => {
  // Implement route navigation for Webhooks================= 
  const router = useRouter();
  
  const [carMade, setCarMade] = useState<string>('All Cars');
  const [model, setModel] = useState<string>('');


  const handleSearch = () => {
    // alert("Made: "+ carMade +"\n model:"+ model );

    const searchParams = new URLSearchParams(window.location.search);
    if(carMade==='All Cars'){
      setCarMade('');
    }

    searchParams.set("made", carMade);
    searchParams.set("model", model);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname,{scroll: false});
    
  };

  return (
    <>
      <div className='flex flex-row items-center justify-start w-fit'>
        
        <div className='flex items-center justify-start w-full'>
          {/* <AiFillCar size={28} className='relative ml-4 mr-2 padding-2 text-[20px] text-secondary-blue' /> */}
         
         <div>
          <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiFillCar size={20} className="text-primary-blue" />
              </InputLeftElement>
              
                <Select 
                  id="selectMade"
                  className='h-10 w-40 pl-10 py-2  text-secondary-blue'
                  onChange={(e) => setCarMade(e.target.value)}
                  
                >
                  {minimalCarMade.map((item) =>  (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
            </InputGroup>
         </div>
          
        </div>

        <div className='flex justify-start items-center w-full'>

          <input 
            placeholder='Search Model' 
            className=' w-40 bg-white h-10 my-1 border border-gray-200 px-2' 
            type="text" 
            id="inputModel"
            onChange={(e) => setModel(e.target.value)}
          />
       
          <button 
            className="flex justify-center mx-2 py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" 
            onClick={handleSearch}
          >
            <BiSearchAlt size={20}  />  
          </button>

        </div>

        
      </div>
    </>
  )
}

export default SearchCar
