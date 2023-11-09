
import BookCard from '@/components/booking/BookCard';
import Pagination from '@/components/booking/Pagination';
import TopButton from '@/components/booking/TopButton';
import { fetchCarBooks, updateCarBookCheckOut } from '@/utils/actions/carbook.actions';
import { BookHistoryParams } from '@/utils/props/carProps';
import Link from 'next/link';

export default async function Page({searchParams}: BookHistoryParams) {

  //Fetch the filtered book a car records by its status ===================
  const result = await fetchCarBooks(searchParams.bookStatus, searchParams.pageNumber ? searchParams.pageNumber: 1, 5);

  if(searchParams.checkout && searchParams.checkout==='success'){
    updateCarBookCheckOut(searchParams.checkout, searchParams.bookId,'/book');
  }

  return (
  <>
    <div className='padding-y max-width' id='bookpage'>
      <div className='mt-28 md:mt-36 flex justify-center'>
        
        <div className='flex justify-center items-center fixed z-40 top-32'>
          <div className='hidden md:block'>
            <div className='rounded-lg bg-white w-fit border border-gray-300 px-10 drop-shadow-md'>
              <div className='my-1 px-6'>
                <TopButton display={'medium'}/>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='flex justify-center items-center w-full mt-0 md:mt-24 mb-4'>
            <h1 className='px-2 text-secondary-blue text-[28px] md:text-[45px] font-extrabold' >Booking <span className='text-secondary-orange'>History </span>Records </h1>            
          </div>
          
          <div className='flex justify-center items-center w-full '>
            <div className=" px-4 md:px-0 grid md:grid-cols-5 md:w-5/6 lg:w-3/5 items-center justify-end gap-4 md:gap-6">

              <div className='md:col-span-3' >
                <div className='flex justify-start items-center w-full'>
                  <h1 className='text-[18px] md:text-[22px] font-bold text-gray-700'>
                    Please click the <span className='text-secondary-orange'>pay now button</span> to complete your car reservation. 
                  </h1>
                </div>
                
                <div className='flex w-full justify-center '>
                <h1 className='text-[16px] text-gray-700'>
                  We can accommodate your needs, whether you need a dependable vehicle for a business trip, are organizing a road trip, or simply want the comfort of having a car of your choice.
                </h1>
                </div>
                
              </div>

              <div className='flex flex-center md:col-span-2 mr-32 w-full p-2'>
                <img
                  className="mx-5 scale-100 object-contain align-middle "
                  alt=""
                  src="/template_a.png"
                />
              </div>

            </div>
          </div>
            
          <div>
           
                {result?.mergedCarbooks.length === 0 ? (
                <p className="no-result">No book cars found</p>
                ) : (
                  <div>
                    {result?.mergedCarbooks.map((book: any) => (
                      < BookCard 
                        key={book._id}
                        book={book}
                        idStripe={book.idStripe}
                        make={book.make}
                        model={book.model}
                        transmission={book.transition}
                        rentRate={book.rentRate}
                        seats={book.seats}
                        city_mpg={book.city_mpg} 
                        sessionId={''} pathName={''}  
                        year={book.year}                   
                      />
                    ))}
                  </div>
                )}
              
         
          </div>

          <Pagination
            path='book'
            pageNumber={searchParams?.pageNumber ? searchParams.pageNumber : 1}
            isNext ={result?.isNext}
            bookStatus={searchParams.bookStatus ? searchParams.bookStatus : 'view all'}
            totalPage={result?.totalPages}
          />
        </div>
      </div>
      
      {/* Fixed top update page button */}
      <div className="fixed bottom-0 left-0 w-full opacity-75 bg-black-100 p-4 flex justify-around">
        
        <div className='block md:hidden'>
          
          <TopButton display={'small'}/>
          
        </div>

      </div>
    {/* </div> */}
      
    </div>
    
      
  </>

  );
}