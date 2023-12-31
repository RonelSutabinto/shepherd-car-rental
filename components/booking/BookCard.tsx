"use client";

import { FaAngleDoubleRight, FaRegEdit,FaCar, FaGasPump, FaWheelchair } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { BiMap } from "react-icons/bi";

import Image from 'next/image';
import { format } from 'date-fns';
import axios from "axios"
import { useRouter } from "next/navigation";
import { updateCarBookSessionCheckOut } from "@/utils/actions/carbook.actions";
import { useEffect, useState } from "react";
import { auth, clerkClient } from "@clerk/nextjs";

interface BookProps {
  idBook: string;
  location: string; 
  pickupDateTime: string; 
  rateBook: number;
  no_days: number; 
  total_amount: number; 
  full_name: string;
  contact_no: string; 
  carId: string;
  isComplete: boolean;
  userID?: string;
  card_number?: string;
  checkoutId?: string;
  expiry?: string;//end of book collection
  make: string;
  model: string;
  transmission: string;
  rentRate: number;
  seats: number;
  city_mpg: number;
  idStripe: string;
  year: number;
  sessionId: string;
  pathName: string;
  imgPath: string;
  authId: string;
}


const BookCard = ({
  idBook,
  location,
  pickupDateTime,
  rateBook,
  no_days,
  total_amount,
  full_name,
  contact_no,
  userID,
  carId,
  isComplete,
  make,
  model,
  transmission,
  rentRate,
  seats,
  city_mpg,
  idStripe,
  year,
  imgPath,
  authId
}: BookProps) => {

  // Extracted domain logic into a separate function
  const getDomain = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      return 'http://' + url.hostname + ':' + url.port + '/book';
    }
    return '';
  };

  // Destructured props directly to avoid unnecessary variables
  const domain = getDomain();
  const router = useRouter();

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const { data } = await axios.post('/api/payment', {
        priceId: idStripe,
        days: no_days,
        bookId: idBook,
        pathname: domain
      }, {
        headers: {
          "Content-Type": "app/json",
        },
      });

      if (data.id) {
        updateCarBookSessionCheckOut(idBook, data.id, '/book');
      }

      window.location.assign(data.url);
    }
  };

  const handleUpdate = () => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("bookId", idBook);
    searchParams.set("carId", carId);

    searchParams.delete("made");
    searchParams.delete("model");
    searchParams.delete("bookStatus");

    const newPathname = `/book/update?${searchParams.toString()}`;
    router.push(newPathname,{scroll: false});
  };

  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className={`rounded-xl w-full mx-4 md:mx-0 md:w-5/6 lg:w-3/5 ${isComplete === true ? "bg-white" : "bg-light-white"}`}>
        
        <div className="relative flex justify-center items-center w-full h-12 md:h-14 bg-gradient-to-r from-blue-400 to-primary-blue rounded-t-xl">
          <h1 className="text-[22px] md:text-[24px] font-bold text-white"> {make} {model} - {year}</h1>
        </div>

        {/* View car details */}
        <div className="sm:px-1 md:px-4 lg:px-10 relative border border-black-100 grid grid-cols-1 md:grid-cols-5 items-center justify-center w-full rounded-b-xl">
          <div className="md:col-span-2 w-full">
            <div className="relative flex flex-col justify-start">
              <div className="ml-4 py-2 w-fit text-white bg-slate-600 text-[18] font-bold mt-4 px-4">
                <p className='flex text-secondary-orange mt-2 text-[32px] leading-[32px] font-extrabold'>
                  <span className="text-[18px] mr-2 text-white">Rental Rate: </span>
                  ${rentRate}
                  <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                </p>
              </div>
              <div className='relative h-24 mt-2'>
                <Image src={imgPath} alt='car model' fill priority className='object-contain' />
              </div>

              <div className="flex justify-center p-2">
                <div className='flex flex-col justify-center items-center gap-2 mx-2'>
                  <FaCar className="w-full text-[20px] text-gray-500" />
                  <p className='text-[14px] leading-[17px]'>
                    {transmission === "Manual" ? "Manual" : "Auto"}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 mx-2">
                  <FaWheelchair className="w-full text-[20px] text-gray-500" />
                  <p className=" text-[14px] leading-[17px]">{seats}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 mx-2">
                  <FaGasPump className="w-full text-[20px] text-gray-500" />
                  <p className="text-[14px] leading-[17px]">{city_mpg} MPG</p>
                </div>
              </div>
            </div>
          </div>

          {/* View booked details */}
          <div className="md:col-span-3 w-full md:ml-10 mx-4">
            <div className="relative flex flex-col">
              <h2 className="text-[14px] text-gray-500">
                <span className="text-[28px] font-extrabold text-secondary-blue">
                  {`$${total_amount.toFixed(2)}`}
                  <span className="text-[14px] text-gray-500 mx-2">Total Amount</span>
                </span>
              </h2>
              <h2 className="text-[14px] font-extrabold text-gray-500 mr-2 ">
                No. of Days:
                <span className="ml-2"> {no_days} </span>
              </h2>
              <h2 className="text-[14px] font-extrabold text-gray-500 mr-2">
                Pick Up DateTime:
                <span className="ml-2"> {format(new Date(pickupDateTime), "yyyy-MM-dd'T'HH:mm")} </span>
              </h2>
              <h2 className="text-[14px] font-extrabold text-gray-500 mr-2">
                Location:
                <span className="ml-2">
                  {parseInt(location) === 1 ? "Courtenay, BC" :
                    parseInt(location) === 2 ? "Comox Valley, BC" :
                      parseInt(location) === 3 ? "Nanaimo, BC" : ""}
                </span>
              </h2>
              <h2 className="text-[14px] font-extrabold text-gray-500 mr-2">
                Booked By:
                <span className="ml-2">
                  {full_name}
                </span>
              </h2>
              <h2 className="text-[14px] font-extrabold text-gray-500 mr-2">
                Contact Number:
                <span className="ml-2">
                  {contact_no}
                </span>
              </h2>
              <div className="flex justify-start py-4 ">
                {isComplete ? (
                  <>
                    <button
                      className="flex justify-center items-center py-2 h-10  bg-secondary-blue-200 text-white px-4 rounded-l-md hover:bg-secondary-blue-200 hover:text-white transition duration-300 text-[12px] font-bold"
                    >
                      <IoCheckmarkDoneOutline size={20} />
                      Complete
                    </button>
                    <button
                      className="flex justify-center items-center py-2 h-10  bg-secondary-blue text-white px-4 rounded-r-md hover:bg-secondary-blue-200 hover:text-white transition duration-300 text-[12px]"
                    >
                      <BiMap size={20} />
                      View Map
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex justify-center items-center py-2 h-10  bg-secondary-orange text-white px-4 rounded-l-md hover:bg-secondary-light hover:text-white transition duration-300 text-[12px] font-bold"
                      onClick={handlePayment}
                    >
                      <FaAngleDoubleRight size={20} />
                      Pay Now
                    </button>
                    <button
                      className="flex justify-center items-center py-2 h-10  bg-secondary-blue text-white px-4 rounded-r-md hover:bg-secondary-blue-200 hover:text-white transition duration-300 text-[12px]"
                      onClick={handleUpdate}
                    >
                      <FaRegEdit size={20} />
                      Update
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

     </div> 
    </div>

  );
};

export default BookCard;