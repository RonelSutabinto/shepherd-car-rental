
// import connectMongoDB from "@/libs/mongodb";
// import Car from "@/utils/models/Car";

// import { NextResponse } from "next/server";

/*export default async function handler(req: any) {
    await connectMongoDB();
  
    const { make, model } = req.query;
    
    let query: any = {};
  
    if (make) {
      query.make = { $regex: make, $options: 'i' }; // Case-insensitive regex match
    }
  
    if (model) {
      query.model = { $regex: model, $options: 'i' }; // Case-insensitive regex match
    }
  
    
    const filteredCars = await Car.find(query);
    return NextResponse.json({ cars: filteredCars });
   
  }*/

import connectMongoDB from "@/libs/mongodb";
import Car from "@/utils/models/Car";

import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { 
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
    year 
  } = await request.json();

  await connectMongoDB();
  await Car.create({ 
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
    year  
  });

  return NextResponse.json({ message: "Car Created" }, { status: 201 });
}

export async function GET(req: any) {
  await connectMongoDB();
  
  const { make, model } = req.query;
  
  let query: any = {};

  if (make) {
    query.make = { $regex: make, $options: 'i' }; // Case-insensitive regex match
  }

  if (model) {
    query.model = { $regex: model, $options: 'i' }; // Case-insensitive regex match
  }

  const cars = await Car.find(query);
  return NextResponse.json({ cars });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Car.findByIdAndDelete(id);
  return NextResponse.json({ message: "Car deleted" }, { status: 200 });
}


/*import connectMongoDB from "@/libs/mongodb";
import Car from "@/utils/models/Car";

import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const car = await Car.findOne({ _id: id });
  return NextResponse.json({ car }, { status: 200 });
}

export default async function FilteredCars(request: any, { params }: any) {
  await connectMongoDB();

  const { make, model, rate, drive, year } = req.query;

  const query: any = {};

  if (make) {
    query.make = { $regex: make, $options: 'i' };
  }
  if (model) {
    query.model = { $regex: model, $options: 'i' };
  }
  if (rate) {
    query.rate = parseFloat(rate as string);
  }
  if (drive) {
    query.drive = drive;
  }
  if (year) {
    query.year = parseInt(year as string, 10);
  }

  try {
    const filteredCars = await Car.find(query);
    res.status(200).json({ cars: filteredCars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}*/
