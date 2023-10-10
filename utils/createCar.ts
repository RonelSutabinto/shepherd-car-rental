

  // Call the createCar function when you want to create a new car
// createCar();


// utils/createCar.js
const createCar = async () => {
  // ... your createCar logic ...
  const carData = {
    // ... // Fill in the car data you want to send to the server
    city_mpg: 25,
      color: 'Blue',
      fuel_type: 'Gasoline',
      highway_mpg: 30,
      idLocation: '123abc',
      make: 'Toyota',
      mileage: 50000,
      model: 'Camry',
      rentRate: 50,
      seats: 5,
      transmission: 'Automatic',
      year: 2020,
      availability: true  
  };

  try {
    const response = await fetch('../../api/cars/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (response.ok) {
      console.log('Car created successfully');
      // Perform any additional actions after creating the car, such as fetching the updated car list
    } else {
      console.error('Failed to create car');
    }
  } catch (error) {
    console.error('Error creating car:', error);
  }
};

export default createCar;