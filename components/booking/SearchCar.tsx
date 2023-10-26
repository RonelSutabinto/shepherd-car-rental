"use client"
import { minimalCarMade } from '@/utils/details';
import { FormControl, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiFillCar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter }  from 'next/navigation';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { revalidatePath } from "next/cache";

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

    //revalidatePath(`${window.location.pathname}?${searchParams.toString()}`)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <>
      <div className='flex items-center justify-center mx-6 '>
        
        <div className='flex items-center justify-center min-w-lg'>
          <AiFillCar size={28} className='ml-4 mr-2 padding-2 text-[20px] text-secondary-blue' />
          <FormControl  >
              <Select 
                id="selectMade"
                className='h-14 pl-5 py-2  text-secondary-blue'
                onChange={(e) => setCarMade(e.target.value)}
              >
                {minimalCarMade.map((item) =>  (
                  <option key={item} value={item}>{item}</option>
                ))}
              </Select>
            </FormControl>
        </div>

        </div>
          <input 
            placeholder='Search Model' 
            className='bg-gray-100' 
            type="text" 
            id="inputModel"
            onChange={(e) => setModel(e.target.value)}
          />
        <div>
        <div>
          <button 
            className=" m-2 flex justify-center py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" 
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
