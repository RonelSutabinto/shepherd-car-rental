import { useState, useEffect } from 'react';

function FilteredCarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car_crud'); // Replace with your API endpoint URL
        const data = await response.json();
        setCars(data.cars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>{car.model}</div>
      ))}
    </div>
  );
}

export default FilteredCarList;
