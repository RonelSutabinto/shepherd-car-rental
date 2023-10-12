// components/CarFilter.tsx
import { useEffect, useState } from 'react';


interface Car {
    _id: string,
    city_mpg: number,
    color: string,
    fuel_type: string,
    highway_mpg: number,
    idLocation: string,
    make: string,
    mileage: number,
    model: string,
    rentRate: number,
    seats: number,
    transmission: string,
    year: number,
    availability: boolean
}

interface CarFilterProps {
    make: string;
    model: string;
    rentRate: string;
    seats: string;
    year: string;
  }
  
const ViewCar: React.FC<CarFilterProps> = ({ make, model, rentRate, seats, year }) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchFilteredCars = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/filter?make=${make}&model=${model}&rate=${rentRate}&drive=${seats}&year=${year}`);
        const data = await response.json();
        setFilteredCars(data.cars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredCars();
  }, [make, model, rentRate, seats, year]);

  return (
    <div>
      {/* Display filtered cars */}
      {filteredCars.map((car) => (
        // <div >// key={car._id}
        <div>
         {car._id} - {car.make} - {car.model} - {car.year} - {car.rentRate} - {car.seats}
          {/* <CarCard car = {car}/> */}
        </div>
      ))}
    </div>
  );
};

export default ViewCar;
