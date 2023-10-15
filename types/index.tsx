import { MouseEventHandler } from "react";

export interface MadeProps {
    carMade: string;
    setCarMade: (made: string) => void;
  }
  
  export interface CarProps {
    city_mpg: number;
    color: string;
    fuelType: string;
    fuel_type: string;
    highway_mpg: number;
    idLocation: string;
    make: string;
    mileage: number;
    model: string;
    mpg: number;
    rentRate: number;
    seats: number;
    transmission: string;
    year: number;
  }

 
  
