"use server"
import { revalidatePath } from "next/cache";
import Car from "../models/car.model";
import { connectToDB } from "../mongoDB";

interface Params {
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
  path: string
}

export async function createCar({        
  city_mpg,
  color,
  fuel_type,
  highway_mpg,
  idLocation,
  make,
  mileage,
  model,
  rentRate,
  seats,
  transmission,
  year,
  availability, path  
}: Params) {
  try {
    connectToDB();

    const createdThread = await Car.create({
      city_mpg,
      color,
      fuel_type,
      highway_mpg,
      idLocation,
      make,
      mileage,
      model,
      rentRate,
      seats,
      transmission,
      year,
      availability: true,
    });

    //Update car model
    // await Car.findByIdAndUpdate(author, {
    //   $push: {threads: createdThread._id}
    // })

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`)
  }
}


export async function fetchPosts(pageNumber = 1, pageSize = 10) {
  connectToDB();

  //Calculate the number of posts to skip const skips 
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch the posts that have no parents (top-level threads...)
  const postsQuery = Car.find({  })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    
  
  const totalAvailableCar = await Car.countDocuments({  })

  const posts = await postsQuery.exec();
  
  const isNext = totalAvailableCar > skipAmount + posts.length;

  return { posts, isNext }
}