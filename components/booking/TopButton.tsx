"use client"
import { useState } from "react";
import { FaTasks, FaCheckDouble, FaUserTie, FaUsersSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { HiViewGrid } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi"
import { fetchCarBooks } from "@/utils/actions/carbook.actions";

interface Props {
  display: string;
}

const TopButton = () => {
  const router = useRouter();
  const [screenDisplay, setScreenDisplay] = useState('');
  const [bookStatus, setBookStatus] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const buttons = [
    { name: 'View All', id: 1, bIcon: <HiViewGrid size={20} className="w-full text-[13px]" /> },
    { name: 'Incomplete', id: 2, bIcon: <FaTasks size={20} className="w-full text-[13px]" /> },
    { name: 'Completed', id: 3, bIcon: <FaCheckDouble size={20} className="w-full text-[13px]" /> },
    { name: 'View Profile', id: 4, bIcon: <FaUserTie size={20} className="w-full text-[13px]" /> },
    { name: 'Sign Out', id: 5, bIcon: <FaUsersSlash size={20} className="w-full text-[13px]" /> },
  ];

  const handleButtonClick = (buttonName: string) => {
   
    setActiveButton(buttonName);
    setBookStatus(buttonName);

    updateSearchParams(buttonName.toLowerCase());

    // Close the menu on button click
    setMenuOpen(false);
  };

  const updateSearchParams = (bookstatus: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const search_bbok = bookstatus === 'view all' ? 'viewall'
                        : bookstatus === 'incomplete'
                        ? bookstatus
                        : bookstatus === 'completed'
                        ? bookstatus
                        : null;

    if (search_bbok !== null) {
      searchParams.set('bookStatus', search_bbok);
    } else {
      searchParams.delete('bookStatus');
    }

    searchParams.delete('checkout');
    searchParams.delete('bookId');
    searchParams.delete('pageNumber');

    const newPathname = `/book?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });

  };

  return (
    <div className="flex md:items-center md:justify-end">
      <div className="flex">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden block text-gray-400 focus:outline-none"
        >
          <GiHamburgerMenu size={24}/>
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute z-50 mt-8 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {buttons.map((button) => (
            <button
              key={button.id}
              className={`block w-full px-4 py-2 text-[13px] ${
                activeButton === button.name
                  ? 'text-primary-blue bg-secondary-light'
                  : 'text-gray-800'
              }`}
              onClick={() => handleButtonClick(button.name)}
            >
              <span>{button.bIcon}</span>
              {button.name}
            </button>
          ))}
        </div>
      )}

      {/* Regular Buttons from medium to larger screens */}
      
      <div className="hidden md:flex md:items-center md:space-x-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`" my-2 w-24 h-12 text-[13px] rounded-full " ${activeButton === button.name ? " text-white scale-105 transition-all bg-gradient-to-r from-blue-400 to-primary-blue" : "text-gray-700 bg-white"}`}
            onClick={() => handleButtonClick(button.name)}
          >
            <span>{button.bIcon}</span>
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopButton;