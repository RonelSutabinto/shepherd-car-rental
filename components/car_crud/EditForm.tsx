"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ id, city_mpg, color, fuel_type, highway_mpg, idLocation, make, mileage, model, rentRate, seats, transmission, year }: any) {

  const [newCity_mpg, setNewCity_mpg] = useState(city_mpg);
  const [newColor, setNewColor] = useState(color);
  const [newFuel_type, setNewFuel_type] = useState(fuel_type);
  const [newHighway_mpg, setNewHighway_mpg] = useState(highway_mpg);
  const [newIdLocation, setNewIdLocation] = useState(idLocation);
  const [newMake, setNewMake] = useState(make);
  const [newMileage, setNewMileage] = useState(mileage);
  const [newModel, setNewModel] = useState(model);
  const [newRentRate, setNewRentRate] = useState(rentRate);
  const [newSeats, setNewSeats] = useState(seats);
  const [newTransmission, setNewTransmission] = useState(transmission);
  const [newYear, setNewYear] = useState(year);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/car_crud/${id}`, {
        method: "PUT",
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

      if (!res.ok) {
        throw new Error("Failed to update Car");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
          onChange={(e) => setNewCity_mpg(e.target.value)}
          value={newCity_mpg}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="City MPG"
        />

        <input
          onChange={(e) => setNewColor(e.target.value)}
          value={newColor}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Car Color"
        />

        <input
          onChange={(e) => setNewFuel_type(e.target.value)}
          value={newFuel_type}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Fuel Type"
        />

        <input
          onChange={(e) => setNewHighway_mpg(e.target.value)}
          value={newHighway_mpg}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Highway MPG"
        />

        <input
          onChange={(e) => setNewIdLocation(e.target.value)}
          value={newIdLocation}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Location ID"
        />

        <input
          onChange={(e) => setNewMake(e.target.value)}
          value={newMake}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Car make"
        />

        <input
          onChange={(e) => setNewMileage(e.target.value)}
          value={newMileage}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Mileage"
        />

        <input
          onChange={(e) => setNewModel(e.target.value)}
          value={newModel}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Model"
        />

        <input
          onChange={(e) => setNewRentRate(e.target.value)}
          value={newRentRate}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Rent Rate"
        />

        <input
          onChange={(e) => setNewSeats(e.target.value)}
          value={newSeats}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Number of Seats"
        />

        <input
          onChange={(e) => setNewTransmission(e.target.value)}
          value={newTransmission}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Transmission"
        />

        <input
          onChange={(e) => setNewYear(e.target.value)}
          value={newYear}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Year Model"
        />

      <button className="bg-secondary-blue rounded-md font-bold text-white py-3 px-6 w-fit">
        Update Car
      </button>
    </form>
  );
}
