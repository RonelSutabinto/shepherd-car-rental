
//=============================================================================================
//Resource: UI source code for input filtering: Resource: https://headlessui.com/react/combobox
//=============================================================================================

"use client";

import { Combobox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { MadeProps } from 
 '@/types';
 import { FaListUl } from 'react-icons/fa';

 import { carMade } from '@/utils/details';
 
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
      <div className="relative mt-0">
          <Combobox.Button className="absolute inset-y-0 left-4 flex items-center pr-2">
            <FaListUl
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </Combobox.Button>
        
          {/* When the input changes, the search query is updated */}
          <Combobox.Input
            className='w-full h-[44px] md:h-[54px] pl-12  rounded-l-full bg-gradient-to-r from-blue-400 to-primary-blue outline-none cursor-pointer text-sm'
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
            // After the transition of component, reset the search query
            afterLeave={() => setQuery("")} 
          >
            <Combobox.Options  
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'
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
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
