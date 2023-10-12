


"use server";

import { connectToDB } from "@/libs/mongodb";
import Thread from "../models/thread.actions";
import Car from "../models/Car";


export async function fetchCars(pageNumber = 1, pageSize = 10,searchMake?: string, searchModel?: string) {
  connectToDB();

  //Calculate the number of cars 
  const skipAmount = (pageNumber - 1) * pageSize;
  const search_make = searchMake ? { $regex: searchMake, $options: 'i' } : '';
  const search_model = searchModel ? { $regex: searchModel, $options: 'i' }: '';

  // Fetch the cars...
  const carsQuery = Car.find({ make: search_make} || { model: searchModel})
    .skip(skipAmount)
    .limit(pageSize)

  // const carsQuery = Car.find()
  // .skip(skipAmount)
  // .limit(pageSize)

  const totalCarsCount = await Car.countDocuments()

  const cars = await carsQuery.exec();
  
  const isNext = totalCarsCount > skipAmount + cars.length;

  return { cars, isNext }
}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //Calculate the number of posts to skip const skips 
  const skipAmount = (pageNumber - 1) * pageSize;
  const search = { $regex: "talk", $options: 'i' }

  //Fetch the posts that have no parents (top-level threads...)
  const postsQuery = Thread.find({ text: search })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    // .populate({ path: 'author', model: User })
    // .populate({
    //   path: 'children',
    //   populate: {
    //     path: 'author',
    //     model: User,
    //     select: "_id name parentId image"
    //   }
    // })
  
  const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined]} })

  const posts = await postsQuery.exec();
  
  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext }
}


export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};