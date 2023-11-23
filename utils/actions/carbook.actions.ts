"use server";

import { connectToDB } from "@/libs/mongodb";
import CarBook from "../models/CarBook";
import { booksParams } from "../props/carProps";
import Car from "../models/Car";
import { revalidatePath } from "next/cache";

export async function fetchCarBooks(searchStatus?: string, pageNumber = 1, pageSize = 5, isAuthLoad = false, authId?: string) {
  // Fetch all book cars 
  if(!isAuthLoad){
    authId = '';
  } 

  try {
    await connectToDB();

    const result = searchStatus === 'incomplete' ? false : 
                   searchStatus === 'completed'? true : null;
  
    const filter = { isComplete: result, userID: authId }
    const cars = await Car.find();

    
    if(result === null) { 
     
      //Calculate the number of book cars 
      const skipAmount = (pageNumber - 1) * pageSize;
      const totalBooksCount = await CarBook.countDocuments({userID: authId});
      const totalPages = Math.ceil(totalBooksCount / pageSize);

      
      const carbooks = await CarBook.find({userID: authId}).skip(skipAmount).limit(pageSize).exec();
      const isNext = totalPages > pageNumber

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
          year: car.year,
          userID: carbook.userID, // Include the userID field from CarBook

        };
      });

      return { mergedCarbooks,  totalPages, isNext, totalBooksCount };
      
    } else {
      //Calculate the number of book cars 
      const skipAmount = (pageNumber - 1) * pageSize;
      const totalBooksCount = await CarBook.countDocuments(filter);
      const totalPages = Math.ceil(totalBooksCount / pageSize);

      // Fetch book cars by completed status
      const carbooks = await CarBook.find(filter).skip(skipAmount).limit(pageSize).exec();
      const isNext = totalPages > pageNumber

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
          year: car.year,
          userID: carbook.userID, // Include the userID field from CarBook
        };
      });

      return { mergedCarbooks,  totalPages, isNext, totalBooksCount };

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
  userID,
  card_number,
  checkoutId,
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
      userID,
      card_number,
      checkoutId,
      expiry
    });

    revalidatePath('/book')
    console.log("Book a car successfully created");
  } catch (error: any) {
    throw new Error(`Failed to create to book a car: ${error.message}`);
  }
}


export async function fetchBookById(Id: string) {
  await connectToDB();
  
  const query: any = {};
  if (Id) {
    query._id = Id;
  }
  
  // // Fetch the cars...
  const bookQuery = CarBook.findOne( query);
  const book = await bookQuery.exec();
  
  return { book }
}

export async function updateCarBookField() {

  try {
    await connectToDB();
    // Find documents with card_type field and update them using the model
    const carBooksToUpdate = await CarBook.find({ card_type: { $exists: true } });

    for (const book of carBooksToUpdate) {
      book.userID = book.card_type; // Copy card_type to userID field
      delete book.card_type; // Remove card_type field
      await book.save(); // Save the updated document
    }

    console.log("Updated carbooks collection field successfully");
  } catch (error) {
    console.error('Error updating carbooks collection field:', error);
  }
}