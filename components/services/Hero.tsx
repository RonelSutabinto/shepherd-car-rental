
import Image from 'next/image';
const Hero = () => {

  return (
    <div className='z-0  mt-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 mx-6 md:mx-12 lg:mx-16'>

        <div className=' z-5 lg:-mr-0 md:ml-6 lg:ml-16 md:col-span-1 w-full mt-6 md:mt-4 lg:mt-20'>
          <div className='flex flex-col'>

            <div className='flex w-full items-center justify-center md:justify-start'>
              <h1 className='text-black-100 text-[32px] text-center md:text-start lg:text-[45px] font-extrabold'>
                Simple And Quick Car Rental Service! 
              </h1>
            </div>

            <div className='-md:pr-8 mt-6 flex w-full items-center justify-center md:justify-start'>
              <h1 className='px-4 md:px-0  lg:text-[20px] text-[18px] text-gray-500'>
                Rent a car from us today and drive all throughout Canada's British Columbia province. We are ensuring the best customer experience.
              </h1>
            </div>

          </div>
        </div>

        <div className='md:col-span-1 flex justify-center md:justify-start w-full items-start -mt-8 lg:pr-8'>
          <Image 
            src='/car_img/hero_services.png'
            alt='hero'
            width={400}
            height={500}
            className='relative w-full z-0 object-contain scale-110 lg:scale-100'
          />
        </div>

      </div>
    </div>
  )
}

export default Hero
