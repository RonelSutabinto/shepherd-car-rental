
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "../ui/RemoveBtn";
import CarCard from "../home/CarCard";

const getCars = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/car_crud", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function CarsListCrud() {
  const { cars } = await getCars();

  
  return (
    <>
      {cars.map((c: any) => (
        <div
          key={c._id}
          className="p-6  border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{c.make}</h2>
            <div>Model: {c.model}</div>
            <div>Year: {c.year}</div>
            <div>Seats: {c.seats}</div>
            <div>MPG: {c.mileage}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={c._id} />
            <Link href={`/edit_car/${c._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}


