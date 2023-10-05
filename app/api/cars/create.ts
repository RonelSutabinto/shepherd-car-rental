import mongodb from "@/libs/mongodb";
import  Car, { ICar } from "@/models/Car";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await mongodb;
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
        availability
       } = req.body;

      const newCar: ICar = await Car.create({ 
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
        availability
       });

      res.status(201).json(newCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


