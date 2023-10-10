"use client"

import { CarCard } from '@/components';
import DataList from '@/components/DataList';
import Form from '@/components/home/Form';
import Hero from '@/components/home/Hero'
import SearchInput from '@/components/home/SearchInput'
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search state
  const [made, setMade] = useState("");
  const [model, setModel] = useState("");
  const [data, setData] = useState([]);

  // ========================================
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/cars/get');
      setData(response.data);
    } catch (error: any) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error loading data</div>;
  }
  //=========================================

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
            <div>
              <DataList data={data}  />
             
            </div>
       </section>     

      
    </main>
  )
}

/*
import CarsList from "@/components/car_crud/CarsList";

export default function Home() {
  return (
    <div className="gap-6 px-6 pb-6 mx-12 mb-12">
      <CarsList />
    </div>
  );
}

*/