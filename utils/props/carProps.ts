

export interface carProps {
  _id: string
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
  availability: boolean,
}

export interface SearchProps {
  made: string;
  model: string; 
}

export interface HomeProps {
  searchParams: SearchProps;
}

export interface BookProps {
  location: Number,
  pickupDateTime: Date,
  no_days : Number,
  total_amount: Number,
  full_name: String,
  contact_no: String,
  carId: String,
  createdAt: Date
}

export interface booksProps {
  location: string, 
  pickupDateTime: string, 
  total_amount: number, 
  no_days: number, 
  full_name: string ,
  contact_no: string, 
  carId: string
}