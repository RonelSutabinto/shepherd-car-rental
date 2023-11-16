import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CarCard from '../home/CarCard';
import { fetchCars } from '@/utils/actions/car.actions';
import { carProps } from '@/utils/props/carProps';


interface CarDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  make: string;
  model: string;
} 
interface CarList {
  cars: carProps[];
  totalPages: number;
  isNext: boolean;
}
  
const CarDrawer = ({isOpen,onClose, make, model}: CarDetailsProps) => {

  const [carList, setCarList] = useState<CarList>({cars: [], 
      totalPages: 0, 
      isNext: false});

  const getCars = async () => {
    try {
      const result = await fetchCars(1, 20, make, model);
      setCarList(result);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getCars();
    }
  }, [isOpen, make, model]);

  return (
    <div className='mt-6'>
      {/* Drawer  */}
      <Drawer onClose={onClose} isOpen={isOpen} size={`md`}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' >Car Catalog</DrawerHeader>
          <DrawerBody className='w-full'>
            <Stack spacing='24px'>   
              {carList.cars.length === 0 ? (
              <p className="no-result">No cars found</p>
              ) : (
              
                <div className="grid w-fit gap-4 md:gap-6 mt-10 mx-2">
                {carList.cars.map((car) => (
                  <CarCard key={car._id} isList={true} car = {car}/>  
                ))}
                </div>
              )}
            </Stack>
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
