"use server";

import { connectToDB } from "@/libs/mongodb";
import CarBook from "../models/CarBook";
import { UpdateBookProps, booksParams } from "../props/carProps";
import Car from "../models/Car";
import { revalidatePath } from "next/cache";
import { format } from 'date-fns';

export async function fetchCarBooks(searchStatus?: string, page?: string, pageSize?: string) {
  try {
    await connectToDB();

    const result = searchStatus === 'incomplete' ? false : 
                   searchStatus === 'completed'? true : null;
  
    const filter = { isComplete: result }
    const cars = await Car.find();

    // Get page number and page size to determine the skip range
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
    const limit = parseInt(pageSize as string);
    
    if(result === null) { 
     
      // Fetch all book cars 
      const carbooks = await CarBook.find().skip(skip).limit(limit).exec();
           
      // Merge books with cars based on carId
      const mergedCarbooks = carbooks.map(carbook => {
        const car = cars.find(c => c._id.toString() === carbook.carId.toString());
        return {
          ...carbook.toJSON(),
          make : car.make,
          model : car.model,
          transmission: car.transmission,
          rentRate : car.rentRate,
          seats : car.seats,
          city_mpg : car.city_mpg,
          idStripe: car.idStripe,

        };
      });

      return { mergedCarbooks };
      
    } else {
      
      // Fetch book cars by completed status
      const carbooks = await CarBook.find(filter).skip(skip).limit(limit).exec();

      // Merge book with cars based on carId
      const mergedCarbooks = carbooks.map(carbook => {
        const car = cars.find(c => c._id.toString() === carbook.carId.toString());
        return {
          ...carbook.toJSON(),
          make : car.make,
          model : car.model,
          transmission: car.transmission,
          rentRate : car.rentRate,
          seats : car.seats,
          city_mpg : car.city_mpg,
          idStripe: car.idStripe,
        };
      });

      return { mergedCarbooks };

    }    

  } catch (error) {
    console.error('Fetching bookcar error:', error);
  }
 
}

// Update book collection to register the checkout session id
export async function updateCarBookSessionCheckOut( _id: string , checkOutSessionId: string, path: string ){

  // Update carbook collection by finding the document by its _id
  try {
    await connectToDB();

    // Update carbook collection
    await CarBook.findByIdAndUpdate(
      { _id: _id },
      { card_number: checkOutSessionId }
    );
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to checkout bookcar: ${error.message}`);
  }
  
}

// Update book collection after successfully execute the payment checkout process
export async function updateCarBookCheckOut( checkout: string , bookId: string, path: string){

  // Update carbook collection by finding the document by its _id
  try {
    await connectToDB();

    // Update carbook collection to complete the checkout process
    if(checkout==='success'){
      await CarBook.findByIdAndUpdate(
        { _id: bookId },
        { isComplete: true }
      );
    }

    revalidatePath(path);

  } catch (error: any) {
    throw new Error(`Failed to checkout bookcar: ${error.message}`);
  }
  
}

export async function updateCarBook( 
  bookId: string,
  location: string, 
  pickupDateTime: string, 
  rate: number,
  no_days: number, 
  total_amount: number, 
  full_name: string,
  contact_no: string, 
  carId: string
){

  // Update carbook collection by finding the document by its _id
  try {
    await connectToDB();

   
    await CarBook.findByIdAndUpdate(
      { _id: bookId },
      {
        location : location, 
        pickupDateTime: pickupDateTime, 
        rate: rate,
        no_days : no_days, 
        total_amount: total_amount, 
        full_name: full_name,
        contact_no: contact_no, 
        carId: carId
       }
    
    );

    revalidatePath('/book')

  } catch (error: any) {
    throw new Error(`Failed to update bookcar: ${error.message}`);
  }
  
}

// Create 
export async function createCarBook({ 
  location, 
  pickupDateTime, 
  rate, 
  no_days, 
  total_amount, 
  full_name ,
  contact_no, 
  carId, 
  isComplete,
  card_type,
  card_number,
  checkoutId,
  expiry
}: booksParams) {

  const formatDateTime = format(new Date(pickupDateTime),"yyyy-MM-dd'T'HH:mm");

  try {
    await connectToDB();

    const createdCarBook = await CarBook.create({
      location,
      formatDateTime,
      rate,
      no_days,
      total_amount,
      full_name,
      contact_no,
      carId,
      isComplete,
      card_type,
      card_number,
      checkoutId,
      expiry
    });

  // Update car model
  await Car.findByIdAndUpdate(carId, {
    $push: { threads: createdCarBook._id },
  });

    console.log("Book a car successfully created");
  } catch (error: any) {
    throw new Error(`Failed to create to book a car: ${error.message}`);
  }
}


export async function fetchBookById(Id: string) {
  await connectToDB();

  const query = {}
  if (Id) {
    query._id = Id
  }
  
  // // Fetch the cars...
  const bookQuery = CarBook.findOne(query);
  const book = await bookQuery.exec();
  
  return { book }
}