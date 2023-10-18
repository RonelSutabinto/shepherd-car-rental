"use server";

import { connectToDB } from "@/libs/mongodb";
import CarBook from "../models/CarBook";
import { booksParams } from "../props/carProps";

export async function fetchCarBooks(searchStatus?: string, page?: string, pageSize?: string) {
  try {
    await connectToDB();

    const result = searchStatus === 'incomplete' ? false : 
                   searchStatus === 'completed'? true : null;
  
    const filter = { isComplete: result }

    // Get page number and page size to determine the skip range
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);
    const limit = parseInt(pageSize as string);
    
    if(result === null) { 
     
      // Fetch all book cars 
      const carbooksQuery = CarBook.find().skip(skip).limit(limit);
      const carbooks = await carbooksQuery.exec();
      return { carbooks }
    } else {
      
      // Fetch book cars by completed status
      const carbooksQuery = CarBook.find(filter).skip(skip).limit(limit);
      const carbooks = await carbooksQuery.exec();
      return { carbooks }

    }
  } catch (error) {
    console.error('Fetching book car error:', error);
  }
 
}


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
    expiry
  }: booksParams) {
    try {
      await connectToDB();
  
      const createdCarBook = await CarBook.create({
        location,
        pickupDateTime,
        rate,
        no_days,
        total_amount,
        full_name,
        contact_no,
        carId,
        isComplete,
        card_type,
        card_number,
        expiry
      });

      console.log("Book a car successfully created");
    } catch (error: any) {
      throw new Error(`Failed to create to book a car: ${error.message}`);
    }
  }
  