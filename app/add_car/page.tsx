"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCar() {
  const [city_mpg, setCity_mpg] = useState("");
  const [color, setColor] = useState("");
  const [fuel_type, setFuel_type] = useState("");
  const [highway_mpg, setHighway_mpg] = useState("");
  const [idLocation, setIdLocation] = useState("");
  const [make, setMake] = useState("");
  const [mileage, setMileage] = useState("");
  const [model, setModel] = useState("");
  const [rentRate, setRentRate] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("");
  const [year, setYear] = useState("");
  
  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!make || !model || !year) {
      alert("Make, model and year are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/car_crud", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ 
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
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a car");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-12 pt-6 mx-12 gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setCity_mpg(e.target.value)}
          value={city_mpg}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="City MPG"
        />

        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Car Color"
        />

        <input
          onChange={(e) => setFuel_type(e.target.value)}
          value={fuel_type}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Fuel Type"
        />

        <input
          onChange={(e) => setHighway_mpg(e.target.value)}
          value={highway_mpg}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Highway MPG"
        />

        <input
          onChange={(e) => setIdLocation(e.target.value)}
          value={idLocation}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Location ID"
        />

        <input
          onChange={(e) => setMake(e.target.value)}
          value={make}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Car make"
        />

        <input
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Mileage"
        />

        <input
          onChange={(e) => setModel(e.target.value)}
          value={model}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Model"
        />

        <input
          onChange={(e) => setRentRate(e.target.value)}
          value={rentRate}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Rent Rate"
        />

        <input
          onChange={(e) => setSeats(e.target.value)}
          value={seats}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Number of Seats"
        />

        <input
          onChange={(e) => setTransmission(e.target.value)}
          value={transmission}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Transmission"
        />

        <input
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Year Model"
        />   

        <button
          type="submit"
          className="bg-secondary-blue rounded-md font-bold text-white py-3 px-6 w-fit"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
