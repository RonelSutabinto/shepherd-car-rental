"use client"
import { carProps } from '@/utils/props/carProps';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react';
import { createCarBook } from '@/utils/actions/carbook.actions';
import { format } from 'date-fns';
import CarCard from '../home/CarCard';
 
// book modal modified received data props======
interface CarDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  car: carProps;
} 

const BookModal = ({isOpen,onClose, car}: CarDetailsProps) => {
  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);

  // Webooks objects implementation ============================================
  const [location, setLocation] = useState<string>('');
  const [pickupDateTime, setPickupDateTime] = useState<string>(format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')); 
  const [rate, setRate] = useState<number>(car.rentRate);
  const [total_amount, setTotal_amount] = useState<number>(car.rentRate);
  const [no_days, setNo_days] = useState<number>(1);
  const [full_name, setFull_name] = useState<string>('');
  const [contact_no, setContact_no] = useState<string>('');
  const [carId, setCarId] = useState<string>(car._id);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [card_type, setCard_type] = useState<string>('');
  const [card_number, setCard_number] = useState<string>('');
  const [expiry, setexpiry] = useState<string>('');

  //hook a valid input of location, name and contact text field
  const [locationError, setLocationError] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');

  // Handle the number of days change event here
  const handleNumberChange = (value: string) => {
    
    const parsedValue = parseInt(value, 10) || 0;
    setNo_days(parsedValue);

    // Calculate total amount based on number of days and rent per day
    const amount = parsedValue * car.rentRate;
    setTotal_amount(amount);

    // Assign the formatted total amount to the rentRateInput chakra component
    const total_amountField = document.getElementById('rentRateInput') as HTMLInputElement;
    if (total_amountField) {
      total_amountField.value = `$${amount.toFixed(2)}`;
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {

      let isValid = true;

      if (location.length<1) {
        setLocationError('Select your preferred branch location');
        isValid = false;
      } else {
        setLocationError('');
      }

      if (full_name.length<4) {
        setNameError('Please enter a valid full name');
        isValid = false;
      } else {
        setNameError('');
      }
  
      if (contact_no.length<5) {
        setContactError('Please enter a valid contact number');
        isValid = false;
      } else {
        setContactError('');
      }
    
      if (isValid) {
        // Call the backend API endpoint to create a car book
        const response = await createCarBook({location, pickupDateTime, rate, no_days, total_amount, full_name, contact_no, carId,isComplete, card_type, card_number, expiry});

        // Handle success response (if needed)
        console.log('Car book created successfully:', response);

        // Close the modal after successful form submission
        onClose();
      }
    } catch (error) {
      // Handle error (if needed)
      console.error('Error creating car book:', error);
    }
  };

  const isErrorName = full_name === ''

  return ( 
    <>
        <Modal
          initialFocusRef = {initialRef}
          finalFocusRef= {finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          
          <ModalContent className='max-w-screen-sm'>
            <ModalHeader className='text-secondary-blue'>Book A Car</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <div className='grid grid-cols-1
              md:grid-cols-2 p-4'>
                  <div className='sm:px-4 mb-8'>
                    {/* Reuse the car card component from the list component */}
                    <CarCard isList={false} car = {car}/> 
                  </div>
                  <div className='border-[1px] shadow-md border-b-slate-500 p-4 mx-2 sm:mx-2 rounded-2xl '>

                    {/* Chakra ui form rent a car input details starts here=== */}
                    <FormControl isInvalid={!!locationError} >
                      <FormLabel className='text-xs text-gray-600'>Localtion</FormLabel>
                      <Select 
                        size='sm' 
                        placeholder="Select Location"
                        id="locationSelect"
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="1">Courtenay, BC</option>
                        <option value="2">Comox Valley, BC</option>
                        <option value="3">Nanaimo, BC</option>
                      </Select>
                      <FormErrorMessage>{locationError}</FormErrorMessage>
                    </FormControl>

                    <FormControl className='mt-4'>
                        <FormLabel className='text-xs text-gray-600' >Pick Up Date And Time</FormLabel>
                        <Input                   
                          placeholder="Select Date and Time"
                          size="sm"
                          type="datetime-local"
                          id="dataTimePicker"
                          onChange={(e) => setPickupDateTime(e.target.value)}
                        />
                      </FormControl>

                      <div className='grid grid-cols-1 md:grid-cols-2 '>
                        <FormControl className='mt-4'>
                          <FormLabel className='text-xs text-gray-600'>No. Of Days</FormLabel>
                          <NumberInput 
                            size='sm' 
                            defaultValue={1} 
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

                        <FormControl className='mt-4'  mt={4}>
                          <FormLabel className='text-xs text-gray-600'>Total Amount</FormLabel>
                          <Input 
                            className=' text-secondary-orange font-bold'
                            size='sm' 
                            defaultValue={`$${car.rentRate.toFixed(2)}`}
                            placeholder='Total amount' 
                            readOnly // Make the input field read-only
                            id="rentRateInput"
                          />
                        </FormControl>
                      </div>

                      <FormControl className='mt-4' isInvalid={!!nameError}>
                        <FormLabel className='text-xs text-gray-600'>Renters Full Name</FormLabel>
                        <Input 
                          size='sm' 
                          ref={initialRef} 
                          placeholder='Full name' 
                          id="fullNameInput" 
                          onChange={(e) => setFull_name(e.target.value)}
                        />
                        <FormErrorMessage>{nameError}</FormErrorMessage>
                      </FormControl>

                      <FormControl className='mt-4'  mt={4} isInvalid={!!contactError}>
                        <FormLabel className='text-xs text-gray-600'>Contact Number</FormLabel>
                        <Input 
                          size='sm' 
                          placeholder='Contact number'  
                          id="contactInput"
                          onChange={(e) => setContact_no(e.target.value)}
                        />
                        <FormErrorMessage>{contactError}</FormErrorMessage>
                      </FormControl>
                    
                  </div>
              </div>
            </ModalBody>

            <ModalFooter className='mx-6 mb-4'>
              <Button type="submit" className=' text-white bg-secondary-blue hover:text-black-100 hover:bg-secondary-light' mr={3}
              onClick={handleFormSubmit}
              >
                Book Now
              </Button>
              <Button className=' text-white bg-secondary-orange hover:text-black-100 hover:bg-secondary-light' onClick={onClose}>Cancel</Button>
            </ModalFooter>
            
          </ModalContent>
        </Modal>
    
      
    </>

  );
  }

  export default  BookModal;