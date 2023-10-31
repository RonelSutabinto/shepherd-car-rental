
import Pagination from '@/components/Pagination';
import CarCard from '../components/home/CarCard';
import SearchInput from '../components/home/SearchInput';
import { fetchCars } from '@/utils/actions/car.actions';
import Car from '@/utils/models/Car';
import { CarPagesControllerProps, HomeProps } from '@/utils/props/carProps';
import Image from 'next/image';

export default async function Home({ searchParams }: HomeProps) {
  
  //Use four parameters to fetch the filtered car lists available ===================
  const result = await fetchCars(searchParams.pageNumber ? searchParams.pageNumber: 1, 8, searchParams.made, searchParams.model);

  searchParams.pageNumber = 1;

  return (
    <div className=' mt-24 lg:mt-32 padding-y max-width' id='homepage'>
      {/* <Hero onDataReceived={handleDataFromHero} /> */}
      {/* Start of the hero part============================================== */}
      <div className=' lg:mx-28 md:mx-10 mx-4'>
        <div className='grid grid-cols-1 md:grid-cols-2'>

          <div className='flex flex-col'>
            <div className='flex w-full items-center justify-center md:justify-start'>
              <h1 className='text-black-100 2xl:text-[26px] sm:text-[22px] text-[20px]'>
                SPECIAL OFFER
              </h1>
            </div>
            
            <div className='flex w-full items-center justify-center md:justify-start'>
              <h1 className='text-secondary-blue text-[38px] md:text-[45px] lg:text-[60px] font-bold '>
                Best <span className='text-secondary-orange'>Car </span>Rental
              </h1>
            </div>

            <div className='flex w-full lg:w-3/5 items-center justify-center md:justify-start'>
              <h1 className='px-4  md:px-0 md:text-[20px] text-[18px] text-gray-500'>
                Enjoy your vacation with the best car rental service from us.
              </h1>
            </div>

            <div className='z-10 mt-6 pt-4 w-full lg:w-4/5 flex-between items-center flex-wrap gap-5'>
              <h4 className=' text-[18px] md:text-[20px] text-black-100 font-extrabold'>Rent a car in BC</h4>
              <SearchInput />
            </div>

          </div>

          <div className='flex justify-center items-center mt-8 md:mt-0 lg:scale-90 scale-100'>
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

     
      <div className='flex flex-col items-start justify-start lg:mx-24 md:mx-10 mx-4 text-black-100'>

        <div className='mt-10 lg:mt-6'>
          <h1 className='text-[18px] md:text-[20px] font-bold'>Car Catalog</h1>
        </div>
        <div className='mt-4 max-w-xl'>
          <p className='md:text-[18px] text-[14px]'>If you prefer to call or send us an email, our helpful staff is available to answer any inquiries or address any concerns.</p>
        </div>
      </div>
      

      <section className="px-4 lg:mx-20 md:mx-10 mx-0 mt-10 lg:mt-6 ">
        {result.cars.length === 0 ? (
          <p className="no-result">No cars found</p>
          ) : (
           
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-full gap-4 md:gap-6">
              {result.cars.map((car: any) => (
                <CarCard key={car._id} isList={true} car = {car}/>
              ))}
            </div>

          )}

          <Pagination
            path='/'
            pageNumber={searchParams?.pageNumber ? searchParams.pageNumber : 1}
            isNext={result.isNext}
            made={searchParams.made ? searchParams.made : ''}
            model={searchParams.model ? searchParams.model : ''}
            totalPage={result.totalPages}
          />
          
      </section>
    </div>
  );
}


