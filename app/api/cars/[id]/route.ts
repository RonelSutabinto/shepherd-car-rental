
import { connectToDB } from "@/libs/mongodb";
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
      year,
      availability,
      idStripe 
    } = await request.json();
  
    await connectToDB();
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
      year,
      availability,
      idStripe 
    });
  
    return NextResponse.json({ message: "Car Created" }, { status: 201 });
  }
  
  export async function GET(req: any) {
    await connectToDB();
    
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
    await connectToDB();
    await Car.findByIdAndDelete(id);
    return NextResponse.json({ message: "Car deleted" }, { status: 200 });
  }
  
  
