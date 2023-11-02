
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Radio, RadioGroup, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import SearchCar from './SearchCar';
  
  const CarDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        
        <button 
            className=" m-2 flex justify-center py-2 h-9 bg-secondary-blue text-white px-2 rounded-lg hover:bg-secondary-blue-200 hover:text-white transition duration-300 text-[12px]" 
            onClick={onOpen}
        >
          Change Car
        </button>
        <Drawer 
          placement={'right'} 
          onClose={onClose} 
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent className = " w-3xl">
            <DrawerHeader borderBottomWidth='1px'>Select the filtered car</DrawerHeader>
            <DrawerBody>
            
            <SearchCar />
            
            
              
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default CarDrawer;
