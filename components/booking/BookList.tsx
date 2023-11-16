"use client";
import { BookHistoryParams, BookListProps } from "@/utils/props/carProps";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";

interface Params{
  bookList: BookListProps[];
  //search_Params: BookHistoryParams;
} 
const BookList = ({ bookList }: Params) => {
  const [books,setBooks] = useState([bookList]);
  const [bookData, setBookData] = useState([bookList]);
  
  return (

    <div>
    
    {bookList.length === 0 ? (
      <p className="no-result">No Cars found</p>
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
            />
          ))}
          
        </>
      )}
    </div>
    
  );
};


export default BookList

