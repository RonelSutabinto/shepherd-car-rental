"use client"
import { Divider, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaCar, FaGasPump, FaWheelchair } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { format } from 'date-fns';
import { booksProps, carProps } from '@/utils/props/carProps';
import { useRouter } from 'next/navigation';
import { updateCarBook } from '@/utils/actions/carbook.actions';
interface CarCardProps {
  car: carProps,
  book: booksProps
}

const Form = ({car, book}:CarCardProps) => {
  const router = useRouter();

  const { city_mpg, year, make, model, transmission, rentRate, seats } = car; 

    // Handle the number of days change event here
    const handleNumberChange = (value: string) => {
      
      const parsedValue = parseInt(value, 10) || 0;
      book.no_days = parsedValue;

      // Calculate total amount based on number of days and rent per day
      const amount = parsedValue * rentRate;
      book.total_amount = amount;

      // Assign the formatted total amount to the rentRateInput chakra component
      const total_amountField = document.getElementById('rentRateInput') as HTMLInputElement;
      if (total_amountField) {
        total_amountField.value = `$${amount.toFixed(2)}`;
      }
    };

    const handleFormSubmit = async () => {
      try {

        alert("Car book was successfully updated."+
         "\n location: "+ book.location+
         "\n full name: "+book.full_name+
         "\n Contact: "+ book.contact_no +
         "\n Model: "+ car.model
        );
    
        updateCarBook(
          book._id,
          book.location,
          book.pickupDateTime,
          book.rate,
          book.no_days,
          book.total_amount,
          book.full_name,
          book.contact_no,
          car._id
        );

        

        router.push('/book');
      } catch (error) {
        // Handle error (if needed)
        console.error('Error updating car book:', error);
      }
    };

    const handleBack = () => {
      router.push('/book');
    }

  return (
   
    <div className='flex flex-col  justify-end w-full mt-14 px-5 max-w-3xl'>
      {/* <form onSubmit={handleFormSubmit}> */}
        <div className='flex justify-start max-w-3xl'>
          <button 
            className=" m-2 flex justify-center py-2 h-9 border border-secondary-orange text-secondary-orange px-2 rounded-lg hover:bg-secondary-orange hover:text-white transition duration-300 text-[12px] font-bold" 
            onClick={handleBack}
          >
            <IoMdArrowRoundBack size={20}  />
            Back
          </button>

          <button 
            className=" m-2 flex justify-center py-2 h-9 border border-secondary-blue text-secondary-blue px-2 rounded-lg hover:bg-secondary-blue hover:text-white transition duration-300 text-[12px]" 
            onClick={handleFormSubmit}
          >
            <MdOutlineSaveAlt size={20}  />
            Save
          </button>
        </div>
        
        <Divider />
        <div className='grid grid-cols-1 md:grid-cols-2 p-4 max-w-3xl'>

          <div>
            <FormControl  >
              <h3 className='text-[16px] mb-1 text-gray-600'>Localtion</h3>
              <Select 
                size='sm' 
                placeholder="Select Location"
                id="locationSelect"
                defaultValue={book.location}
                onChange={(e) => book.location = e.target.value}
              >
                  <option value="1">Courtenay, BC</option>
                  <option value="2">Comox Valley, BC</option>
                  <option value="3">Nanaimo, BC</option>
              </Select>
            </FormControl>

            <FormControl className='mt-4'>
              <h3 className='text-[15px] mb-1 text-gray-600' >Pick Up Date And Time</h3>
              <Input                   
              placeholder="Select Date and Time"
              size="sm"
              type="datetime-local"
              id="dataTimePicker"
              defaultValue={format(new Date(book.pickupDateTime),"yyyy-MM-dd'T'HH:mm")} 
              onChange={(e) => book.pickupDateTime = e.target.value}
              />
            </FormControl>

            <div className='grid grid-cols-1 md:grid-cols-2 '>
              <FormControl className='mt-4'>
              <h3 className='text-[15px] mb-2 text-gray-600'>Number Of Days</h3>
              <NumberInput 
                size='sm' 
                defaultValue = {book.no_days}
                min={1} 
                max={20} 
                onChange={(valueString) => handleNumberChange(valueString)}
                  id="numberOfDaysInput"
                  name="no_days"
              >
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </FormControl>

              <FormControl className='mt-4' >
              <FormLabel className='text-[15px] text-gray-600'>Total Amount</FormLabel>
              <Input 
                className=' text-secondary-orange font-bold'
                size='sm' 
                defaultValue={`$${book.total_amount.toFixed(2)}`}
                placeholder='Total amount' 
                readOnly // Make the input field read-only
                id="rentRateInput"
              />
              </FormControl>
            </div>

            <FormControl className='mt-4'>
              <FormLabel className='text-[15px] text-gray-600'>Renters Full Name</FormLabel>
              <Input 
                size='sm' 
                placeholder='Full name' 
                id="fullNameInput" 
                defaultValue={book.full_name}
                onChange={(e) => book.full_name = e.target.value}
              />
            </FormControl>

            <FormControl className='mt-4'  mt={4}>
              <FormLabel className='text-[15px] text-gray-600'>Contact Number</FormLabel>
              <Input 
                size='sm' 
                placeholder='Contact number'  
                id="contactInput"
                defaultValue={book.contact_no}
                onChange={(e) => book.contact_no = e.target.value}
              />
            </FormControl>
                            
          </div>


          <div className='px-6 pt-10 '>
          
              {/* View the car detail */}
            <div className="flex flex-col p-4 pr-4 justify-center items-start text-black-100 bg-gray-100 border-blue-600 rounded-3xl group">
                <div className="w-full flex justify-between items-start gap-1">
                  <h2 className="text-[18px] leading-[22px] font-bold capitalize">
                    {make} {model} - {year}
                  </h2>
                </div>

                <p className='flex mt-2 text-[32px] leading-[38px] font-extrabold'>
                  <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                  {rentRate}
                  <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                </p>

                <div className='flex w-full'>
                  <div className='relative w-full h-24'>
                    <Image src="/tmpImage.png" alt='car model' fill priority className='object-contain' />
                    
                  </div>
                  <div className='flex group-hover:visible w-full justify-between text-grey pl-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <FaCar  className="w-full text-[20px]" />
                      <p className='text-[14px] leading-[17px]'>
                        {transmission === "Manual" ? "Manual" : "Auto"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <FaWheelchair  className="w-full text-[20px]" />
                      <p className=" text-[14px] leading-[17px]">{seats}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <FaGasPump className="w-full text-[20px]" />
                      <p className="text-[14px] leading-[17px]">{city_mpg} MPG</p>
                    </div>
                  </div>
                </div>
              </div >
              
          </div>
        </div>
        <Divider />
      {/* </form> */}
    </div>
  )
}

export default Form
