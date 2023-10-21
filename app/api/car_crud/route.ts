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

export async function GET(request: any) {
  await connectMongoDB();
  const cars = await Car.find();
  return NextResponse.json({ cars });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Car.findByIdAndDelete(id);
  return NextResponse.json({ message: "Car deleted" }, { status: 200 });
}

/**
 import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list({
        limit: 4,
    });

    return NextResponse.json(prices.data.reverse())
}
 */