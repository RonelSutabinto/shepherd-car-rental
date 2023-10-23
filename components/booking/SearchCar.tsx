import { FormControl, Select } from '@chakra-ui/react';
import React from 'react'
import { AiFillCar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

const SearchCar = () => {
  return (
    <>
      <div className='flex items-center justify-center '>
        
        <div className='flex items-center justify-center min-w-lg'>
          <AiFillCar size={28} className='ml-4 mr-2 padding-2 text-[20px] text-secondary-blue' />
          <FormControl  >
              <Select 
                size='sm' 
                placeholder="Select Car"
                id="selectMade"
                className='h-14 pl-5 py-2 text-secondary-blue'
              >
                <option value="All Cars">All Cars</option>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                <option value="Kia">Kia</option>
              </Select>
            </FormControl>
        </div>

        </div>
          <input placeholder='Search Model' className='px-5 bg-gray-100' type="text" />
        <div>
        <div>
        <button className=" m-2 flex justify-center py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" >
                <BiSearchAlt size={20}  />
                 
                </button>
        </div>

        
      </div>
    </>
  )
}

export default SearchCar
