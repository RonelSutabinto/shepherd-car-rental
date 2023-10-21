

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
  idStripe: string,
}

export interface SearchProps {
  made: string,
  model: string 
}

export interface HomeProps {
  searchParams: SearchProps;
}

export interface SearchBookHistoryProps{
  bookStatus: string,
  page: string,
  pageSize: string
}
export interface BookHistoryParams{
  searchParams: SearchBookHistoryProps,
}

export interface booksProps {
  _id: string,
  location: string, 
  pickupDateTime: string, 
  rate: number,
  no_days: number, 
  total_amount: number, 
  full_name: string ,
  contact_no: string, 
  carId: string,
  isComplete: boolean,
  card_type?: string,
  card_number?: string,
  expiry?: string,
}

export interface booksParams {
  location: string, 
  pickupDateTime: string, 
  rate: number,
  no_days: number, 
  total_amount: number, 
  full_name: string ,
  contact_no: string, 
  carId: string,
  isComplete: boolean,
  card_type?: string,
  card_number?: string,
  expiry?: string,
  
}

