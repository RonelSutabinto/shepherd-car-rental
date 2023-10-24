
import BookCard from '@/components/booking/BookCard';
import SideButton from '@/components/booking/TopButton';
import TopButton from '@/components/booking/TopButton';
import { fetchCarBooks, updateCarBookCheckOut } from '@/utils/actions/carbook.actions';
import { BookHistoryParams } from '@/utils/props/carProps';

export default async function Page({searchParams}: BookHistoryParams) {

  //Fetch the filtered book a car records by its status ===================
  const result = await fetchCarBooks(searchParams.bookStatus, "1", "20");

  if(searchParams.checkout && searchParams.checkout==='success'){
    updateCarBookCheckOut(searchParams.checkout, searchParams.bookId,'/book');
  }

  return (
  <>
    <div className=' padding-x padding-y max-width'>
      <div className=' mt-28 flex justify-center'>
        
      <div className='fixed z-50 top-28 flex justify-center rounded-lg bg-secondary-blue w-4/5'>
        <div className='my-2'>
          <TopButton />
        </div>
      </div>

      <div className='flex '></div>
        <div>
          <div className='flex justify-center mt-56 sm:mt-44 md:mt-32 lg:mt-24 mb-4'>
            <h1 className=' text-secondary-blue text-[28px] font-bold ' >Booking <span className='text-secondary-orange'>History </span>Records </h1>            
          </div>
          
          <div className='flex justify-center '>

            <div className='pt-8  p-2 rounded-l-2xl ' >
                <h1 className=' text-[20px] font-bold text-black-100'>
                  Please click the <span className='text-secondary-orange'>pay now button</span> to complete your car reservation. 
                </h1>
                <h1 className='justify-center max-w-lg text-[14px] text-black-100'>
                  We can accommodate your needs, whether you need a dependable vehicle for a business trip, are organizing a road trip, or simply want the comfort of having a car of your choice.
                </h1>
          
            </div>

            <div className=' p-2 rounded-r-2xl'>
              <img
                className=" flex mx-5  w-40 h-40 object-contain align-middle "
                alt=""
                src="/tmpImage.png"
              />
            </div>
            
          </div>
            
          <div className=" bg-white p-4 w-full md:flex md:flex-col md:h-screen">
            <div className='max-h-fit overflow-y-auto border p-4'>
              <div className='bg-white md:w-full w-full'>
                {result?.mergedCarbooks.length === 0 ? (
                <p className="no-result">No book cars found</p>
                ) : (
                  <div>
                    {result?.mergedCarbooks.map((book: any) => (
                      < BookCard 
                        book={book} 
                        idStripe = {book.idStripe}
                        make = {book.make}
                        model = {book.model}
                        transmission = {book.transition}
                        rentRate = {book.rentRate}
                        seats = {book.seats}
                        city_mpg = {book.city_mpg}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            {/* <img src="..." /> */}
            <strong></strong>
          </div>
          {/* <!-- ... --> */}
        </div>
      </div>
      
    </div>
  </>

  );
}