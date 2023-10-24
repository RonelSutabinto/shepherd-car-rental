import { useState } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from '@chakra-ui/react';

const UpdateForm = ({ data, onClose }: any) => {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`/api/put`, { id: data._id, name, email });
      // Handle success (e.g., show a success message)
      // Close the update form if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <form  className="modal-box w-11/12 max-w-5xl">
           
                <div className='grid grid-cols-1
                md:grid-cols-2 p-4'>
                    <div className='px-4'>
                      
                    </div>
                    <div className='border-[1px] shadow-md border-b-slate-500 p-4 rounded-2xl '>

                      {/* Chakra ui form rent a car input details starts here=== */}
                      <FormControl  >
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
                            <FormLabel className='text-xs text-gray-600'>Number Of Days</FormLabel>
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

                        <FormControl className='mt-4'>
                          <FormLabel className='text-xs text-gray-600'>Renters Full Name</FormLabel>
                          <Input 
                            size='sm' 
                            ref={initialRef} 
                            placeholder='Full name' 
                            id="fullNameInput" 
                            onChange={(e) => setFull_name(e.target.value)}
                          />
                        </FormControl>

                        <FormControl className='mt-4'  mt={4}>
                          <FormLabel className='text-xs text-gray-600'>Contact Number</FormLabel>
                          <Input 
                            size='sm' 
                            placeholder='Contact number'  
                            id="contactInput"
                            onChange={(e) => setContact_no(e.target.value)}
                          />
                        </FormControl>
                      
                    </div>
                </div>
              
          </form>
    </>
  );
};

export default UpdateForm;