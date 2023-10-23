"use client"

import { useState } from "react";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaTasks,FaAngleDoubleRight,FaCheckDouble,FaUserTie,FaUsersSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TopButton = ()  => {
  // Implement route navigation for Webhooks================= 
  const router = useRouter();
  

  const [bookStatus, setBookStatus] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttons = [
    { name: 'View All', id: 1,bIcon: <FaAngleDoubleRight className="w-full text-[13px] " />  },
    { name: 'Incomplete', id: 2,bIcon: <FaTasks className="w-full text-[13px] mb-1" /> },
    { name: 'Completed', id: 3, bIcon: <FaCheckDouble className="w-full text-[13px] " /> },
    { name: 'View Profile', id: 4, bIcon: <FaUserTie className="w-full text-[13px] " /> },
    { name: 'Sign Out', id: 5 , bIcon: <FaUsersSlash className="w-full text-[13px] " />},
  ];

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setBookStatus(buttonName);

    updateSearchParams(buttonName.toLowerCase());
  
  };

  const updateSearchParams = ( bookstatus: string) => {

    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    const search_bbok = bookstatus === 'view all' ? 'viewall' : 
                        bookstatus === 'incomplete' ? bookstatus :
                        bookstatus === 'completed' ? bookstatus : null;

    if(search_bbok !== null) {
      searchParams.set("bookStatus", search_bbok);
      
    } else {
      searchParams.delete("bookStatus");
    }

    searchParams.delete("checkout");
    searchParams.delete("bookId");


    // Generate the new pathname with the updated search parameters
    // const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    const newPathname = `/book?${searchParams.toString()}`;
    router.push(newPathname);
    
  };

  return (
    <div >
      {buttons.map((button) => (
          <button
              key={button.id}
            className={`" bg-secondary-blue-100 my-2 w-32 h-12 mb-2 text-[13px] " ${activeButton === button.name ? " text-secondary-blue scale-102 transition-all rounded-full bg-white " : "text-light-white bg-gray-100"}`}
            onClick={() => handleButtonClick(button.name)}
          >
              <span>{button.bIcon}</span>
            {button.name}
          </button>
          
      ))}
    </div>
  );
}

export default TopButton