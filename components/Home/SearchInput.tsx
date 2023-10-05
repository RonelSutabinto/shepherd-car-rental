"use client";

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from "next/navigation";
import FindMade from './FindMade';
import { FaSistrix, FaCar } from 'react-icons/fa';


const SearchInput = ({ setMade, setModel }: any) => {
  const [findMade, setFindMade] = useState('');

  const [searchModel, setSearchModel] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (findMade.trim() === "" && searchModel.trim() === "") {
      return alert("Please provide some input");
    }

    setModel(searchModel)
    setMade(findMade)
  };

  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`ml-1 rounded-full z-10 ${otherClasses}`}>
      <FaSistrix size={20} />
    </button>
  );
  

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='flex'>
        <div className=' max-sm:w-full flex justify-start items-center relative'>
          <FindMade 
            selected={findMade}
            setSelected={setFindMade}
          />
          
          {/* <SearchButton otherClasses='sm:hidden'/> */}
        </div>

        <div className=' max-sm:w-full flex justify-start items-center relative'>
          <FaCar size={20} />
          <input
            type='text'
            name='model'
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            placeholder='Search Model...'
            className='w-full h-[48px] pl-12 p-4 bg-light-white-100  outline-none cursor-pointer text-sm'
          />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />

        </div>
    </form>
  )
}

export default SearchInput

