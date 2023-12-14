"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  totalPage: number;
  pageNumber: number;
  isNext: boolean;
  path: string;
  bookStatus?: string;
}

function Pagination({ pageNumber, isNext, path, bookStatus, totalPage }: Props) {
  const router = useRouter();
  const [pNumber, setPNumber] = useState(pageNumber);
  const [totalP, setTotalP] = useState(totalPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  //Handle next button event
  const handleNextPage = () => {
    const nextPageNumber = Math.min(pNumber + 1, totalP);
    setPNumber(nextPageNumber);
    updateVisibleNumbers(nextPageNumber);
    router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${nextPageNumber}`, { scroll: false });
  };

  //handle prev button event
  const handlePrevPage = () => {
    const prevPageNumber = Math.max(1, pNumber - 1);
    setPNumber(prevPageNumber);
    updateVisibleNumbers(prevPageNumber);
    router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${prevPageNumber}`, { scroll: false });
  };

  useEffect(() => {
    setTotalP(totalPage);
    updateVisibleNumbers(pageNumber);
  }, [totalPage, pageNumber]);

  //Handle pagination list event
  const handlePageChange = (page: number) => {
    setPNumber(page);
    updateVisibleNumbers(page);
    router.push(`/${path}?bookStatus=${bookStatus}&pageNumber=${page}`, { scroll: false });
  };

  //Limit the pagination list display to 3
  const updateVisibleNumbers = (currentPage: number) => {
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalP, startPage + maxVisiblePages - 1);

    if (totalP - endPage < Math.floor(maxVisiblePages / 2)) {
      startPage = Math.max(1, totalP - maxVisiblePages + 1);
    }

    const visible = [];
    for (let i = startPage; i <= endPage; i++) {
      visible.push(i);
    }
    setVisiblePages(visible);
  };

  return (
    <div className='pagination flex flex-row justify-center items-center mt-6 md:mb-6 mb-0'>
      <button
        onClick={handlePrevPage}
        className="m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-4 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
      >
        Prev
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`hover:bg-secondary-orange hover:text-white rounded-md border border-secondary-orange px-2 mx-1 text-secondary-orange text-small-semibold text-light-1 ${pNumber === page ? 'bg-secondary-orange text-white font-bold' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
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
