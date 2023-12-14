"use client"

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { carProps } from '@/utils/props/carProps';
import CarCard from './CarCard';


interface CarListProps {
  isOpen: boolean;
  onClose: () => void;
  carList: carProps[];
  openModal: (car: carProps) => void; // Define the openModal function with a Car parameter
}

const CarDrawer = ({isOpen, onClose, carList, openModal }: CarListProps) => {
   const [authId, setAuthId] = useState<string>('');

  return (
    <div className='mt-6'>

      {/* Drawer  */}
      {/* <Drawer onClose={onClose} isOpen={isOpen} size={`md`}> */}
      <Drawer onClose={onClose} isOpen={isOpen} size={`md`}>
        <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' >Car Catalog</DrawerHeader>
            <DrawerBody className='w-full'>
             
              {carList.length === 0 ? (
                <div>
                  <p className="no-result">Please wait, retrieving data..</p>
                  <Spinner color='red.500' />
                </div>
              ) : (
              
                <div className="grid w-fit gap-4 md:gap-6 mt-10 mx-2">
                {carList.map((car) => (
                  // <CarCardTop key={car._id} isList={true} car = {car} authId={authId}/>  

                  <CarCard
                    car={car}
                    fileName={'/car_img/' + car.make + '_' + car.model + '.png'}
                    authId={authId}
                    // Pass the car when invoking openModal
                    openModal={() => openModal(car)} 
                    
                  />
                ))}
                </div>
              )}
              
            </DrawerBody>
            <DrawerFooter borderTopWidth='1px'>
              <Button className='bg-secondary-orange text-white mr-6' mr={2} onClick={onClose}>
                Cancel
              </Button>
            
            </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default CarDrawer
