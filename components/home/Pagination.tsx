"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  totalPage: number;
  pageNumber: number;
  isNext: boolean;
  path: string;
  made?: string;
  model?: string;
}

function Pagination({ pageNumber, path, made, model, totalPage }: Props) {
  const router = useRouter();
  const [pNumber, setPNumber] = useState(1);
  const [totalP, setTotalP] = useState(1);

  const handleNextPage = () => {
    let nextPageNumber = pageNumber + 1;

    if (nextPageNumber <= totalPage) {
      setPNumber(nextPageNumber);
      router.push(`/${path}?made=${made}&model=${model}&pageNumber=${nextPageNumber}`, { scroll: false });
    } else {
      setPNumber(totalPage);
      router.push(`/${path}?made=${made}&model=${model}&pageNumber=${totalPage}`, { scroll: false });
    }
  };

  const handlePrevPage = () => {
    let nextPageNumber = Math.max(1, pageNumber - 1);
    setPNumber(nextPageNumber);
    router.push(`/${path}?made=${made}&model=${model}&pageNumber=${nextPageNumber}`, { scroll: false });
  };

  useEffect(() => {
    setTotalP(totalPage);
  }, [totalPage]);

  const handlePageChange = (page: number) => {
    setPNumber(page);
    router.push(`/${path}?made=${made}&model=${model}&pageNumber=${page}`, { scroll: false });
  };

  return (
    <div className='pagination flex flex-row justify-center items-center mt-6 md:mb-6 mb-0'>
      <button
        onClick={handlePrevPage}
        className="m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-4 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
      >
        Prev
      </button>
      
      {[...Array(totalP)].map((_, index) => {
        const currentPage = index + 1;
        return (
          <button
            key={currentPage}
            className={`hover:bg-secondary-orange hover:text-white rounded-md  border border-secondary-orange  px-2 mx-1 text-secondary-orange text-small-semibold text-light-1 ${pNumber === currentPage ? 'bg-secondary-orange text-white font-bold' : ''}`}
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </button>
        );
      })}
      
      <button
        onClick={handleNextPage}
        className="m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-4 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
