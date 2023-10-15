"use server";

import { connectToDB } from "@/libs/mongodb";
import CarBook from "../models/CarBook";
import { BookProps, booksProps } from "../props/carProps";
import Car from "../models/Car";


export async function fetchCarBooks() {
    await connectToDB();
  
    // // Fetch the car book...
    const carbooksQuery = CarBook.find()
    const carbooks = await carbooksQuery.exec();
    return { carbooks }
  }


  export async function createCarBook({ location, pickupDateTime, total_amount, no_days, full_name ,contact_no, carId}: booksProps) {
    try {
      await connectToDB();
  
      const createdCarBook = await CarBook.create({
        location,
        pickupDateTime,
        no_days,
        total_amount,
        full_name,
        contact_no,
        carId
      });
  
      // Update Car model
      // await Car.findByIdAndUpdate(carId, {
      //   $push: { cars: createdCarBook._id },
      // });
      console.log("Book a car successfully created");
    } catch (error: any) {
      throw new Error(`Failed to create to book a car: ${error.message}`);
    }
  }
  