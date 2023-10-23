 "use client";

import { FaAngleDoubleRight, FaRegEdit,FaCar, FaGasPump, FaWheelchair } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { BookHistoryParams, booksProps } from "@/utils/props/carProps";
import Image from 'next/image';
import { format } from 'date-fns';
import axios from "axios"
import { MeasureMemoryMode } from "vm";
import { useRouter } from "next/navigation";
import { updateCarBookSessionCheckOut } from "@/utils/actions/carbook.actions";

interface BookProps {
  book: booksProps,
  make: string,
  model: string,
  transmission: string,
  rentRate: number,
  seats: number,
  city_mpg: number,
  idStripe: string,
  searchParams: BookHistoryParams,
  sessionId: string,
  pathName: string
}

 
const BookCard = ({book, make, model, transmission, rentRate, seats, city_mpg, idStripe, searchParams, sessionId, pathName }: BookProps) => {
    // Implement route navigation for Webhooks================= 
    const router = useRouter();
    

    // Initialize for webhook server side props for data rendering
    const { _id, location, pickupDateTime, no_days, total_amount, full_name, contact_no, carId, isComplete } = book; 
    const id_Stripe  = idStripe; 
    const _make = make;
    const _model = model;
    const _transmission = transmission;
    const _rentRate = rentRate;
    const _seats = seats;
    const _city_mpg = city_mpg;
    const _isComplete = isComplete

    // POST request for stripe payment integration
    const handlePayment = async (e: any) => {
      e.preventDefault();
      const { data } = await axios.post('/api/payment',{ 
        priceId: id_Stripe,
        days: no_days,
        bookId: _id
      }, {
        headers: {
          "Content-Type": "app/json",
        },
      });

      pathName = `${window.location.pathname}`;

      // Try to check if some important data was able to rendered properly
      console.log("Book ID: "+_id + " - "+ model + " Session ID: "+ data.id + " Path: "+ pathName);
    
      if(data.id){
        updateCarBookSessionCheckOut(_id, data.id, pathName);
      }

      window.location.assign(data.url);
    };
   
  return (
    
      <div className={` 
        grid grid-cols-1
        md:grid-cols-2 
        p-4 dr 
        border-[1px]
        border-gray-400 
        my-6 
        rounded-lg 
        ${isComplete===true ? "bg-secondary-blue-100b" :"bg-light-white"} `} 
      >
        <div className='px-4 '>
      
          {/* View the car detail */}
         <div className="flex flex-col p-4 pr-4 justify-center items-start text-black-100 bg-secondary-blue-100b border-blue-600 rounded-3xl group">
            <div className="w-full flex justify-between items-start gap-1">
              <h2 className="text-[18px] leading-[22px] font-bold capitalize">
                {_make} {_model} 
              </h2>
            </div>

            <p className='flex mt-2 text-[32px] leading-[38px] font-extrabold'>
              <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
              {_rentRate} 
              <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
            </p>

            <div className='flex w-full'>
              <div className='relative w-full h-24'>
                <Image src="/tmpImage.png" alt='car model' fill priority className='object-contain' />
                 {/* <Image src={carImageUrl(car)} alt='car model' fill priority className='object-contain' />  */}
              </div>
              <div className='flex group-hover:visible w-full justify-between text-grey pl-2'>
                <div className='flex flex-col justify-center items-center gap-2'>
                  <FaCar  className="w-full text-[20px]" />
                  <p className='text-[14px] leading-[17px]'>
                    {_transmission === "Manual" ? "Manual" : "Auto"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <FaWheelchair  className="w-full text-[20px]" />
                  <p className=" text-[14px] leading-[17px]">{_seats}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <FaGasPump className="w-full text-[20px]" />
                  <p className="text-[14px] leading-[17px]">{_city_mpg} MPG</p>
                </div>
              </div>
            </div>
          </div >
          
        </div>

        {/* View booking renter's details */}
        <div className=' w-96 rounded-2xl '>
          <div className="w-full flex justify-between items-start gap-2">
            <h2 className="text-[22px] font-bold capitalize">
              {full_name} 
            </h2>
          </div>

          <div className="">

            <div className=" flex">
              <h2 className="text-[14px] font-bold">Days: 
                <span className="pl-2 text-[13px] font-normal"> 
                  {no_days}
                </span>
              </h2>

              <h2 className="ml-6 text-[14px] font-bold">Pick Up DateTime: 
                <span className="pl-2 text-[13px] font-normal"> 
                  {new Date(pickupDateTime).toISOString()}
                </span>
              </h2>
            </div>

            <h2 className="text-[14px]  font-bold">Location: 
              <span className="pl-2 text-[13px] font-normal"> 
                {parseInt(location) === 1 ? "Courtenay, BC" : 
                parseInt(location) === 2 ? "Comox Valley, BC" : 
                parseInt(location) === 3 ? "Nanaimo, BC" : ""} 
              </span>
            </h2> 
            <h2 className="text-[14px]  font-bold">Contact Number: 
              <span className="pl-2 text-[13px] font-normal"> 
                {contact_no} - {idStripe}
              </span>
            </h2>

            <h2 className="text-[14px] font-bold">Total Amount: 
              <span className="pl-2 text-[16px] font-bold text-secondary-blue"> 
                {`$${total_amount.toFixed(2)}`}
              </span>
            </h2>
          </div>
          <div className=" flex justify-end pt-4" >
           
            { _isComplete ? (
              
                <button 
                  className=" m-2 flex justify-center py-2 h-9 border text-light-white px-2 rounded-lg bg-secondary-blue-200 text-[12px] font-bold" 
                >
                <IoCheckmarkDoneOutline size={20}  />
                Complete
              </button>
              
             ) : ( 
              <>
                <button 
                  className=" m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-2 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
                  onClick={handlePayment}
                >
                  <FaAngleDoubleRight size={20}  />
                  Pay Now
                </button>
                
                <button className=" m-2 flex justify-center py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" >
                <FaRegEdit size={20}  />
                  Update
                </button>
              </>
            ) } 
          </div>
        </div>
      </div>
    
  );
};

export default BookCard



