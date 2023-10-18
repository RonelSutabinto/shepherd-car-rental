//=====================================================================================
// UI source for input filtering: https://headlessui.com/react/combobox================
// https://chat.openai.com/=for handling search param object============================

"use client";

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from "next/navigation";
import FindMade from './FindMade';
import { FaSistrix } from 'react-icons/fa';


const SearchInput = () => {
  const [findMade, setFindMade] = useState('');

  const [searchModel, setSearchModel] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (findMade.trim() === "" && searchModel.trim() === "") {
     alert("Please provide some input");
    }

    console.log(searchModel);
    console.log(findMade);

    updateSearchParams(searchModel.toLowerCase(), findMade.toLowerCase());
  };

  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`ml-1 rounded-fullpx-2 z-10 text-white ${otherClasses}`}>
      <FaSistrix size={20} />
    </button>
  );
  

  const updateSearchParams = (model: string, made: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'made' search parameter based on the 'made' value
    if (made) {
      searchParams.set("made", made);
    } else {
       searchParams.delete("made");
    }

    console.log(made);
    console.log(model);

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='flex pr-4 rounded-full bg-secondary-blue'>
        <div className='flex text-white rounded-full justify-start items-center '>
          <FindMade 
            selected={findMade}
            setSelected={setFindMade}
          />
          
          {/* <SearchButton otherClasses='sm:hidden'/> */}
        </div>

        <div className=' max-sm:w-full flex justify-start   text-white items-center '>
          {/* <FaCar size={20} /> */}
          <input
            type='text'
            name='model'
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            placeholder='Search Model...'
            className='w-full h-[48px] text-white pl-12 p-4 bg-gradient-to-r from-primary-blue  to-blue-400  outline-none cursor-pointer text-sm'
          />
          <SearchButton otherClasses='sm:hidden' />
        </div>
        <SearchButton otherClasses='max-sm:hidden' />

        </div>
    </form>
  )
}

export default SearchInput

