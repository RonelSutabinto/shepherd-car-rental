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
  useDisclosure,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  
} from '@chakra-ui/react'
import React, { useState } from 'react';

interface CarDetailsProps {
  isOpen: boolean;
  onClose: any;
  initialRef: any;
  finalRef: any;
  car: carProps;
} 

const BookModal = ({isOpen,onClose, initialRef,finalRef, car}: CarDetailsProps) => {


    return ( 
      <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
            <ModalContent className='max-w-screen-sm'>
              <ModalHeader className='text-secondary-blue'>Book A Car</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>

                <div className='grid grid-cols-1
                md:grid-cols-2 p-5'>
                    <div>
                        {/* <CarCard car={car} /> */}
                    </div>
                    <div>
                      {/* <Form car={car} /> */}

                      <FormControl >
                        <FormLabel className='text-xs text-gray-600'>Localtion</FormLabel>
                        
                        <Select size='sm' placeholder="Select Location">
                          <option value="1">Courtenay, BC</option>
                          <option value="2">Comox Valley, BC</option>
                          <option value="3">Nanaimo, BC</option>
                        </Select>
                      </FormControl>

                      <div className='flex justify-between mt-4'>
                        <FormControl className='mr-2'>
                          <FormLabel className='text-xs text-gray-600' >Pick Up Date</FormLabel>
                          <Input                   
                            placeholder="Select Date and Time"
                            size="sm"
                            type="date-local"
                          />
                        </FormControl>

                        <FormControl className=''>
                          <FormLabel className='text-xs text-gray-600'>Number Of Days</FormLabel>
                          <NumberInput size='sm' defaultValue={1} min={1} max={20}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      </div>



                      <FormControl className='mb-2'>
                          <FormLabel className='text-xs text-gray-600'>First name</FormLabel>
                          <Input size='sm' ref={initialRef} placeholder='First name' value={car.make} />
                        </FormControl>

                        <FormControl className='mb-2'  mt={4}>
                          <FormLabel className='text-sm text-gray-600'>Last name</FormLabel>
                          <Input size='sm' placeholder='Last name' value={car.model} />
                        </FormControl>
                      
                    </div>
                </div>
            
             
                
              </ModalBody>
              <ModalFooter>
                <Button className=' text-white bg-secondary-blue hover:text-black-100 hover:bg-secondary-light' mr={3}>
                  Book Now
                </Button>
                <Button className=' text-white bg-secondary-orange hover:text-black-100 hover:bg-secondary-light' onClick={onClose}>Cancel</Button>
              </ModalFooter>

              
            </ModalContent>
            </form>
          </Modal>
      
        
      </>

    );
  }

  export default  BookModal;