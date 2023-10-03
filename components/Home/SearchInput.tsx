"use client";

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from "next/navigation";
import FindMade from './FindMade';


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
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src={"/magnifying-glass.svg"}
        alt={"magnifying glass"}
        width={40}
        height={40}
        className='object-contain'
      />
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
          <Image
            src='/model-icon.png'
            width={25}
            height={25}
            className='absolute w-[20px] h-[20px] ml-4'
            alt='car model'
          />
          <input
            type='text'
            name='model'
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            placeholder='Search Model...'
            className='w-full h-[48px] pl-12 p-4 bg-light-white-100 rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm'
          />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />

        </div>
    </form>
  )
}

export default SearchInput

