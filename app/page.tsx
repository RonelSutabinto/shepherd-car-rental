"use client"

import { CarCard } from '@/components';
import Hero from '@/components/home/Hero'
import SearchInput from '@/components/home/SearchInput'
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search state
  const [made, setMade] = useState("");
  const [model, setModel] = useState("");

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-4 padding-x padding-y max-width' id='discover'>
        <div className='flex flex-col items-start justify-start gap-y-2.5 text-black-100'>
          <h4 className='text-2xl font-extrabold'>Rent a car in BC</h4>
          <p>Look into cars that interest you.</p>
        </div>


        <div className='mt-4 w-full flex-between items-center flex-wrap gap-5'>
          <SearchInput setMade={setMade} setModel={setModel}/>

          <div className='flex justify-start flex-wrap items-center gap-2'>
            <p>Car Type</p>
          </div>
        </div>
      </div>

      <section>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
       </section>     

      
    </main>
  )
}
