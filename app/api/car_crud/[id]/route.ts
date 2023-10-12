import connectMongoDB from "@/libs/mongodb";
import Car from "@/utils/models/Car";

import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { 
    new_city_mpg: city_mpg,
    new_color: color,
    new_fuel_type: fuel_type,
    new_highway_mpg: highway_mpg,
    new_idLocation: idLocation,
    new_make: make,
    new_mileage: mileage,
    new_model: model,
    new_rentRate: rentRate,
    new_seats: seats,
    new_transmission: transmission,
    new_year: year
  } = await request.json();
  await connectMongoDB();
  await Car.findByIdAndUpdate(id, { 
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
  return NextResponse.json({ message: "Car updated" }, { status: 200 });
}

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const car = await Car.findOne({ _id: id });
  return NextResponse.json({ car }, { status: 200 });
}

