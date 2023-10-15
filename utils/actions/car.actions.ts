
"use server";

import { connectToDB } from "@/libs/mongodb";
import Car from "../models/Car";


export async function fetchCars(pageNumber = 1, pageSize = 10,searchMake?: string, searchModel?: string) {
  await connectToDB();

  //Calculate the number of cars 
  const skipAmount = (pageNumber - 1) * pageSize;
  const search_make = searchMake ? { $regex: searchMake, $options: 'i' } : null;
  const search_model = searchModel ? { $regex: searchModel, $options: 'i' }: null;

  const query = {}
  if (search_make) {
    query.make = search_make
  }

  if (search_model) {
    query.model = search_model
  }

  // // Fetch the cars...
  const carsQuery = Car.find(query).skip(skipAmount).limit(pageSize)

  const totalCarsCount = await Car.countDocuments()

  const cars = await carsQuery.exec();
  
  const isNext = totalCarsCount > skipAmount + cars.length;

  return { cars, isNext }
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the URL's current search parameters
  const searchParams = new URLSearchParams(window.location.search);

  // Set the search parameter to the specified value
  searchParams.set(type, value);

  // Reset page URL from specified search parameter
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};