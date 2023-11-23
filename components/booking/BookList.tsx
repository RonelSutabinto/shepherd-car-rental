"use client";
import { BookHistoryParams, BookListProps } from "@/utils/props/carProps";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";

interface Params{
  bookList: BookListProps[];
  authId: string;
} 
const BookList = ({ bookList,authId }: Params) => {
  const [books,setBooks] = useState([bookList]);
  const [bookData, setBookData] = useState([bookList]);
  
  return (

    <div>
    
    {bookList.length === 0 ? (
      <div className="flex flex-row w-full justify-center items-center m-6">
        <p className="no-result text-[18px] font-extrabold text-secondary-orange">No car books found...</p>
      </div>
      ) : (
        <>
          {bookList.map((book: any) => (
            < BookCard 
              key={book._id}
              idBook={book._id}
              location={book.location}
              pickupDateTime={book.pickupDateTime}
              rateBook={book.rate}
              no_days={book.no_days}
              total_amount={book.total_amount}
              full_name={book.full_name}
              contact_no={book.contact_no}
              carId={book.carId}
              isComplete={book.isComplete}
              idStripe={book.idStripe}
              make={book.make}
              model={book.model}
              transmission={book.transition}
              rentRate={book.rentRate}
              seats={book.seats}
              city_mpg={book.city_mpg}
              sessionId={''} pathName={''}
              year={book.year}     
              imgPath = {`/car_img/${book.make}_${book.model}.png`.toLowerCase().replace(/\s+/g, '_') }    
              authId = {authId}       
            />
          ))}
          
        </>
      )}
    </div>
    
  );
};


export default BookList

