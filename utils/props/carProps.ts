

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

//start of car search parameters=======
export interface SearchProps {
  made: string,
  model: string,
  totalPages: number,
  pageNumber: number
}

export interface HomeProps {
  searchParams: SearchProps;
}
// end of car search parameters========

//start of cars list pages control parameters=======
export interface PagesControllerProps {
  totalPages: number,
  pageNumber: number
}

export interface CarPagesControllerProps {
  pagesParams: PagesControllerProps;
}
// end cars list pages control  parameters========

// start of car reservation parameters
export interface SearchBookHistoryProps{
  bookStatus: string,
  page: string,
  pageSize: string,
  checkOutSessionId: string,
  bookId: string,
  checkout: string,
  pathName: string
}
export interface BookHistoryParams{
  searchParams: SearchBookHistoryProps
}
// end of car reservation parameters

// start of checkout session id property====
export interface checkoutSession{
  id: string
}

export interface CheckoutSession{
  sessionParams: checkoutSession
}
//end of checkout session id property========

export interface UpdateBookCarProps{
  made: string,
  model: string,
  bookId: string,
  carId: string
}

export interface UpdateBookCarParams{
  searchParams: UpdateBookCarProps
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
  checkoutId?: string,
  expiry?: string,
}

export interface UpdateBookProps {
  bookId: string,
  location: string, 
  pickupDateTime: string, 
  rate: number,
  no_days: number, 
  total_amount: number, 
  full_name: string ,
  contact_no: string, 
  carId: string,
  path: string
}

// Create interface parameters for book a car webhook server side rendering 
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
  checkoutId?: string
  expiry?: string,

}





