"use client"

import { useEffect, useState } from "react";
import { FaTasks,FaCheckDouble,FaUserTie,FaUsersSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { HiViewGrid } from "react-icons/hi"
interface Props{
  display:string;
} 
const TopButton = ({display}: Props)  => {
  // Implement route navigation for Webhooks================= 
  const router = useRouter();
  const [screenDisplay,setScreenDisplay]= useState('');
  

  const [bookStatus, setBookStatus] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttons = [
    { name: 'View All', id: 1,bIcon: <HiViewGrid size={20} className="w-full text-[13px] " />  },
    { name: 'Incomplete', id: 2,bIcon: <FaTasks size={20} className="w-full text-[13px]" /> },
    { name: 'Completed', id: 3, bIcon: <FaCheckDouble size={20} className="w-full text-[13px] " /> },
    { name: 'View Profile', id: 4, bIcon: <FaUserTie size={20} className="w-full text-[13px] " /> },
    { name: 'Sign Out', id: 5 , bIcon: <FaUsersSlash size={20} className="w-full text-[13px] " />},
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
    searchParams.delete("pageNumber");

    // Generate the new pathname with the updated search parameters
    // const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    const newPathname = `/book?${searchParams.toString()}`;
    router.push(newPathname);
    
  };

  useEffect(() => {
    setScreenDisplay(display);
  },[screenDisplay]);

  return (
    <div >
      
      {buttons.map((button) => (
        
        screenDisplay !== 'small' ? (
          <button
              key={button.id}
            className={`"   my-2 w-28 h-12 text-[13px] " ${activeButton === button.name ? " text-white scale-102 transition-all rounded-full bg-gradient-to-r from-blue-400 to-primary-blue" : "text-gray-700 bg-white"}`}
            onClick={() => handleButtonClick(button.name)}
          >
              <span>{button.bIcon}</span>
            {button.name}
          </button>
        ): button.name !== 'Sign Out' ? (

          <button
              key={button.id}
              className={`"relative bg-black-100 mx-2 w-fit px-4 py-2 text-[13px] " ${activeButton === button.name ? " text-secondary-orange scale-100 transition-all rounded-lg border border-secondary-orange " : "text-gray-400"}`}
              onClick={() => handleButtonClick(button.name)}
            >
              <span>{button.bIcon}</span>
            {screenDisplay === 'small' ? '': button.name}
          </button>
        ): null
         
      ))}
    </div>
  );
}

export default TopButton