import { connectToDB } from "@/libs/mongodb";
import Car from "@/utils/models/Car";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

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
  
  //   const { id } = req.query;
  const { searchParams } = new URL(req.url);
  
  let query = {};

  if (searchParams) {
    query._id = searchParams
  }

 
  console.log(searchParams.get('query'))

  const car = await Car.findOne(query);
  return NextResponse.json(car);
  // // const car = await Car.findOne({_id: new ObjectId(id as string)});

  // const data = await Car.findOne({ _id: new ObjectId(id as string) }); // Replace YOUR_OBJECT_ID with the object ID you want to fetch

  //   if (!data) {
  //     res.status(404).json({ error: 'Not found' });
  //   } else {
  //     res.status(200).json(data);
  //   }
  
}

/*
 await connectToDB();

  const query = {}
  if (Id) {
    query._id = Id
  }
  
  // // Fetch the cars...
  const carsQuery = Car.findOne(query);
  const car = await carsQuery.exec();
  
  return { car }
*/