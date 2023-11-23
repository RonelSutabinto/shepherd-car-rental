import BookCard from '@/components/booking/BookCard';
import BookList from '@/components/booking/BookList';
import Pagination from '@/components/booking/Pagination';
import TopButton from "@/components/booking/TopButton";
import { fetchCarBooks, updateCarBookCheckOut } from '@/utils/actions/carbook.actions';
import { BookHistoryParams } from '@/utils/props/carProps';
import { auth, clerkClient } from '@clerk/nextjs';

export default async function Page({searchParams}: BookHistoryParams) {

  const { userId } = auth();
  let isAuthLoad = false;

  if (userId !== null) {
    const user = await clerkClient.users.getUser(userId);
    
    searchParams.authId = user.id;
    isAuthLoad = true
  } else {
    // Get console log if incase where userId is null for checking
    console.log("User ID is null. Unable to fetch user data.");
  }

  //Fetch the filtered book a car records by its status ===================
  const result = await fetchCarBooks(searchParams.bookStatus, searchParams.pageNumber ? searchParams.pageNumber: 1, 5, isAuthLoad, searchParams.authId);


  if(searchParams.checkout && searchParams.checkout==='success'){
    updateCarBookCheckOut(searchParams.checkout, searchParams.bookId,'/book');
  }

  return (
  <div>
    <div className='padding-y max-width' id='bookpage'>
      <div className='mt-28 md:mt-36 flex justify-start md:justify-center'>
        
        
        <div className='flex justify-start md:justify-center items-center fixed z-40 top-28 md:top-32'>
          <div className='hidden md:block'>
              <div className='rounded-lg bg-white w-fit border border-gray-300 px-10 drop-shadow-md'>
                <div className='my-1 px-6'>
                  <TopButton />
                </div>
              </div>
          </div>

          <div className='block md:hidden'>
            <div className='mx-4 rounded-lg bg-white w-fit border border-gray-300 p-2 drop-shadow-md'>
              <TopButton />
            </div>
          </div>
        </div>

        <div>
          <div className='flex justify-center items-center w-full -mt-4 md:mt-24 mb-4'>
            <h1 className='px-6 md:px-2 text-center text-secondary-blue text-[30px] md:text-[45px] font-extrabold' >Booking <span className='text-secondary-orange'>History </span>Records </h1>            
          </div>
          
          <div className='flex justify-center items-center w-full '>
            <div className=" px-4 md:px-0 grid md:grid-cols-5 md:w-5/6 lg:w-3/5 items-center justify-end gap-4 md:gap-6">

              <div className='md:col-span-3' >
                <div className='flex justify-start items-center w-full'>
                  <h1 className='text-[20px] md:text-[22px] font-bold text-gray-700'>
                    Please click the <span className='text-secondary-orange'>pay now button</span> to complete your car reservation. 
                  </h1>
                </div>
                
                <div className='flex w-full justify-center '>
                <h1 className='ext-[12px] md:text-[16px] text-gray-700'>
                  We can accommodate your needs, whether you need a dependable vehicle for a business trip, are organizing a road trip, or simply want the comfort of having a car of your choice.
                </h1>
                </div>
                
              </div>

              <div className='flex flex-center md:col-span-2 mr-28 w-full p-2'>
                <img
                  className="scale-110 md:scale-125 object-contain align-middle "
                  alt=""
                  src="/carBook.png"
                />
              </div>

            </div>
          </div>
            
          <div>
            <BookList 
              bookList={result?.mergedCarbooks ? result.mergedCarbooks : []} 
              authId = {searchParams.authId}
            />
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
    </div>  
  </div>

  );
}