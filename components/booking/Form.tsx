import { FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from '@chakra-ui/react'
import React from 'react'

const Form = () => {
  return (
    <div>
      <FormControl  >
        <h3 className='text-[16px] mb-1 text-gray-600'>Localtion</h3>
        <Select 
          size='sm' 
          placeholder="Select Location"
          id="locationSelect"
        //   onChange={(e) => Location(e.target.value)}
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
        // onChange={(e) => setPickupDateTime(e.target.value)}
        />
      </FormControl>

      <div className='grid grid-cols-1 md:grid-cols-2 '>
        <FormControl className='mt-4'>
        <h3 className='text-[15px] mb-2 text-gray-600'>Number Of Days</h3>
        <NumberInput 
          size='sm' 
          defaultValue={1} 
          min={1} 
          max={20} 
      //   onChange={(valueString) => handleNumberChange(valueString)}
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
      //   defaultValue={`$${car.rentRate.toFixed(2)}`}
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
          // ref={initialRef} 
          placeholder='Full name' 
          id="fullNameInput" 
          // onChange={(e) => setFull_name(e.target.value)}
        />
      </FormControl>

      <FormControl className='mt-4'  mt={4}>
        <FormLabel className='text-[15px] text-gray-600'>Contact Number</FormLabel>
        <Input 
          size='sm' 
          placeholder='Contact number'  
          id="contactInput"
          // onChange={(e) => setContact_no(e.target.value)}
        />
      </FormControl>
                      
    </div>
  )
}

export default Form
