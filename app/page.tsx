
// import CarCard from "@/components/home/CarCard";
// import SearchInput from "@/components/home/SearchInput";
import { CarCard, SearchInput } from "@/components";
import { fetchCars } from "@/utils/actions/car.actions";
import { HomeProps } from "@/utils/props/carProps";
import Image from 'next/image';

export default async function Home({ searchParams }: HomeProps) {
  
  //Use four parameters to fetch the filtered car lists available ===================
  const result = await fetchCars(1, 10, searchParams.made, searchParams.model);

  return (
    <div className='mt-12 padding-x padding-y max-width' id='discover'>
      {/* <Hero onDataReceived={handleDataFromHero} /> */}
      {/* Start of the hero part============================================== */}
      <div className='px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
        
          <div className=' pt-12 my-4 xl:px-8 sm:px-4'>
            <h3 className='text-black-100 2xl:text-[26px] sm:text-[22px] text-[22px]'>
              SPECIAL OFFER
            </h3>
            <h1 className='text-secondary-blue text-[40px] md:text-[60px] font-bold '>
              Best <span className='text-secondary-orange'>Car </span>Rental
            </h1>

            <h2 className='text-[20px] text-gray-500 pr-20 mt-5'>
              Enjoy your vacation with the best car rental service from us.
            </h2>
            

            <div className='mt-6 pt-4 w-full flex-between items-center flex-wrap gap-5'>
              <h4 className='text-2xl font-extrabold'>Rent a car in BC</h4>
              <SearchInput />
            </div>

          </div>

          <div className='flex flex-center my-4 pt-4'>
            <Image 
              src='/hero.png'
              alt='hero'
              width={400}
              height={500}
              className='w-full object-contain align-middle'
            />
          </div>
        </div>
      </div>
      {/* End of the Hero part================================================ */}

      <div className='mt-4  py-4 max-width' id='discover'>
        <div className='flex flex-col mt-4 px-5 items-start justify-start gap-y-2.5 text-black-100'>
          <h4 className=' text-2xl font-extrabold'>Car Catalog</h4>
          <p>Look into cars that interest you.</p>
        </div>
      </div>

      <section className="px-4 max-width">
        {result.cars.length === 0 ? (
          <p className="no-result">No cars found</p>
          ) : (
            // <CarsList cars = {result.cars} />

            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 w-full gap-8 pt-10">
              {result.cars.map((car: any) => (
                <CarCard isList={true} car = {car}/>
              ))}
            </div>

          )}
      </section>
    </div>
  );
}


