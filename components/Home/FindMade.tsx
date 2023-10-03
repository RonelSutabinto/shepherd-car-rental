
"use client";

import { Combobox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { MadeProps } from 
 '@/properties';

 import { carMade } from '@/details';
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
    <div className='flex-1 max-sm:w-full flex justify-start items-center'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='flex relative w-full'>
            <Combobox.Button className="absolute top-[14px]">
            <Image
              src='/honda-car.png'
              width={20}
              height={20}
              className='ml-4'
              alt='car logo'
            />
            </Combobox.Button>
            
            <Combobox.Input
            className='w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white-200 outline-none cursor-pointer text-sm'
            displayValue={(car_made: string) => car_made}
            onChange={(e) => setQuery(e.target.value)} // When the input changes, the search query is updated
            placeholder='Honda...'
            />

          <Transition
            as={Fragment} // Group more components without adding a new DOM node 
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // After the transition of component, reset the search query
          >
            <Combobox.Options
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
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
                      `relative  cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
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
