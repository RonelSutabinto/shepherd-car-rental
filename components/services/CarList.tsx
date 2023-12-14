import { fetchCars } from '@/utils/actions/car.actions';
import { carProps } from '@/utils/props/carProps';
import React, { useEffect, useState } from 'react'
import CarDrawer from './CarDrawer';

interface CarDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    make: string;
    model: string;
    openModal: (car: carProps) => void;
  } 
  interface CarList {
    cars: carProps[];
    totalPages: number;
    isNext: boolean;
  }
const CarList = ({isOpen, onClose, make, model, openModal}: CarDetailsProps) => {
  const [carList, setCarList] = useState<CarList>({cars: [], totalPages: 0, isNext: false});

  const [authId, setAuthId] = useState<string>('');
  

  const getCars = async () => {
    try {
      const result = await fetchCars(1, 20, make, model);
      setCarList(result);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleCarSelection = (car: carProps) => {
    openModal(car);
    onClose(); 
  };

  useEffect(() => {
    if (isOpen) {
      getCars();
    }

  }, [isOpen, make, model]);

  return (
    <div>
      <CarDrawer isOpen={isOpen} onClose={onClose} carList={carList.cars} openModal={handleCarSelection} />
    </div>
  )
}

export default CarList
