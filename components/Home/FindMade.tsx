
//===============================================================================
// UI source for input filtering: Resource: https://headlessui.com/react/combobox
//===============================================================================

"use client";

import { Combobox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { MadeProps } from 
 '@/types';
 import { FaListUl } from 'react-icons/fa';

 import { carMade } from '@/utils/details';
import Image from 'next/image';

const FindMade = ({selected, setSelected}: MadeProps) => {

  const [query, setQuery] = useState("");

  const filteredMade =
    query === ""
      ? carMade
      : carMade.filter((item) =>
          item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className=' flex max-sm:w-full justify-start items-center'>
      <Combobox value={selected} onChange={setSelected}>
        <div className=' flex items-center  w-full'>
          <Combobox.Button className=" top-[14px] pl-4 text-white">
          <FaListUl size={20}  />   
          </Combobox.Button>
          
          {/* When the input changes, the search query is updated */}
          <Combobox.Input
            className=' autocomplete-none w-full h-[48px] bg-gradient-to-r from-blue-400 to-primary-blue text-white pl-4 p-4 rounded-l-full max-sm:rounded-l-full bg-light-white outline-none cursor-pointer text-sm font-bold'
            displayValue={(car_made: string) => car_made}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Car Made'
          />

          {/* Group more components without adding a new DOM node  */}
          <Transition
            as={Fragment} 
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // After the transition of component, reset the search query
          >
            <Combobox.Options  
              className='absolute mt-36 max-w-xs max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static
            >
              {filteredMade.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='cursor-default select-none py-2 pl-10 pr-4'
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredMade.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative mb-6 min-h-fit  cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary-blue text-white" : "text-gray-900 font-bold"
                      }`
                    }
                    value={item}
                  > 
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* If the option is selected, a dark blue background color will be displayed */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-primary-blue"}`}
                          ></span>
                        ) : null}
                      </>
                    )}

                    
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>

        </div>
      </Combobox>
    </div>
  )
}

export default FindMade
