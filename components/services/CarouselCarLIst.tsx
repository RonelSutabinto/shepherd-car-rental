"use client"
import React, { useState } from 'react'

const CarouselCarLIst = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    'Car 1',
    'Car 2',
    'Car 3',
    'Car 4',
    'Car 5'
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };


  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border border-gray-300 rounded-md relative">
      <div className="flex items-center justify-center mb-4">
        <button className="mr-2" onClick={handlePrev}>
          Previous
        </button>
        <button className="ml-2" onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="flex items-center justify-center space-x-4 overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-48 h-48 bg-gray-200 flex items-center justify-center transition-transform transform ${
              index === currentIndex ? 'scale-125' : 'scale-100'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselCarLIst
