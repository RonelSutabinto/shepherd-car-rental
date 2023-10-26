import { connectToDB } from "@/libs/mongodb";
import Car from "@/utils/models/Car";
import { NextResponse } from "next/server";

// Temporarily add to the comment section for code experemental of rendering api endpoint response that filtered by id
// export async function GET(req: any) {
//   await connectToDB();
  
//   const { Id } = req.query;
  
//   let query = {};

//   if (Id) {
//     query._id = Id
//   }

//   const cars = await Car.findOne(query);
//   return NextResponse.json({ cars });
// }

export async function GET(req: any) {
  await connectToDB();
  
  const { searchParams } = new URL(req.url);
  
   let query = {};

  // if (searchParams) {
  //   query._id = searchParams
  // }

 
  console.log(searchParams.get('query'))

  const car = await Car.findOne(query);
  return NextResponse.json(car);
  
}

