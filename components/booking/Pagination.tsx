"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  totalPage: any;
  pageNumber: number;
  isNext: any;
  path: string;
  bookStatus?: string;
}

function Pagination({ pageNumber, isNext, path,bookStatus,totalPage }: Props) {
  const router = useRouter();
  const [pNumber,setPNumber] = useState(1);
  const [totalP,setTotalP] = useState(1);
  const [nextPageNumber,setNextPageNumber] = useState(1);

  const handleNextPage = () => {
    // let nextPageNumber = pageNumber;
      
    setNextPageNumber(pageNumber + 1);
    setPNumber(nextPageNumber);
    setTotalP(totalPage)
    
    if ((nextPageNumber > 1) &&(nextPageNumber<=totalPage+1)) {
      router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${nextPageNumber}`);
    } else {
      router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${totalPage}`);
    }
      
  };

  const handlePrevPage = () => {
    let nextPageNumber = pageNumber;

    nextPageNumber = Math.max(1, pageNumber - 1);
    setPNumber(nextPageNumber);
    setTotalP(totalPage)

    if (nextPageNumber > 1) {
      router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${nextPageNumber}`);
    }else {
      router.push(`/${path}?bookStatus=${bookStatus}`);
    }
  };


  useEffect(() => {
    console.log("Last page log: ",pNumber,totalP );
    
  }, [pNumber,totalP]);

  return (
    <div className='pagination flex flex-row justify-center items-center mt-6 md:mb-6 mb-0'>
      <button
        onClick={() => handlePrevPage()}
        className=" m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-4 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
      >
        Prev
      </button>
      <p className='text-small-semibold text-light-1'>{pNumber<totalP? pNumber: totalP}</p>
      <button
        onClick={() => handleNextPage()}
        className=" m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-4 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
