"use client"

import React, { useState } from 'react';

import { topCarProps } from '@/utils/props/carProps'; 
import BookModal from '../booking/BookModal';
import CarouselCarList from './CarouselCarLIst';
import CarCard from '../home/CarCard';

interface TopCars {
  topCars: topCarProps[];
}

const TopCars = ({ topCars }: TopCars) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Define selectedCar state
  const [selectedCar, setSelectedCar] = useState<topCarProps | null>(null);

  const openModal = (car: topCarProps) => {
    // Set the selected car
    setSelectedCar(car); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <CarouselCarList topCars={topCars} openModal={openModal} />
      {isModalOpen && selectedCar && (
        <BookModal isOpen={isModalOpen} onClose={closeModal} title='Book A Car' car={selectedCar} authId = {''}>
          <CarCard isList={false} car = {selectedCar} authId={''}/> 
        </BookModal>
      )}
    </div>
  );
};

export default TopCars;
