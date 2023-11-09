
"use server";

import { connectToDB } from "@/libs/mongodb";
import Car from "../models/Car";

export async function fetchCars(pageNumber = 1, pageSize = 8,searchMake?: string, searchModel?: string) {
  await connectToDB();

   if(searchMake){
    searchMake = searchMake==='All Cars' ? '':searchMake; 
   } 

  const search_make = searchMake ? { $regex: searchMake, $options: 'i' } : null;
  const search_model = searchModel ? { $regex: searchModel, $options: 'i' }: null;

  //  This section was created by Alex, =====================================
  // our class's technical support for Capstone web application development==
  const query: any = {};
  if (search_make) {
    query.make = search_make;
  }

  if (search_model) {
    query.model = search_model
  }//===================================

  //Calculate the number of cars 
  const skipAmount = (pageNumber - 1) * pageSize;
  const totalCarsCount = await Car.countDocuments(query);
  const totalPages = Math.ceil(totalCarsCount / pageSize);

  //Fetch the cars...
  const carsQuery = Car.find(query).skip(skipAmount).limit(pageSize)

  const cars = await carsQuery.exec();
  const isNext = totalPages > pageNumber

  return { cars, totalPages, isNext }
}

//This query can fetch the top 6 of most popular car from shepherd car rental services
export async function fetchTopCars(){
  await connectToDB();

  //Temporarily hide this car filtering
  // const matchFilter = {};
  // if (make) matchFilter.make = make;
  // if (model) matchFilter.model = model;

  const cars = Car.aggregate([
    {
      $lookup: {
        from: 'carbooks', 
        localField: '_id',
        foreignField: 'carId',
        as: 'carbooks',
      },
    },
    {
      $addFields: {
        carBooks: {
          $ifNull: ['$carBooks', []], // Handle null carBooks field by defaulting to an empty array
        },
        totalCarBooks: { $size: '$carbooks' },
      },
    },
    // { $match: matchFilter, },
    { $sort: { totalCarBooks: -1 },},
    { $limit: 6,},
    {
      // Include fields from Car collection 
      $project: {
        _id: 1, 
        city_mpg: 1,
        make: 1,
        model: 1,
        year: 1,
        color: 1,
        rentRate: 1,
        seats: 1,
        // Include other fields from Car
        totalCarBooks: 1, // Include the calculated totalCarBooks field
        carBooks: {
          $slice: ['$carbooks', 3], // Include only top 3 car books for each car as sub query
        },
      },
    },
  ]);

  const topCars = await cars.exec();

  return { topCars };
}

export async function fetchCarsById(Id: string) {
  await connectToDB();
  
  const query: any = {};
  if (Id) {
    query._id = Id;
  }

  // // Fetch the cars...
  const carsQuery = Car.findOne(query);
  const car = await carsQuery.exec();
  
  return { car }
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

