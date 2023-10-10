
import EditForm from "@/components/car_crud/EditForm";

const getCarById = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3001/api/car_crud/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Car");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditCar({ params }: any) {
  const { id } = params;
  const { car } = await getCarById(id);
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
  } = car;

  return (
    <div className="px-12 pt-6 mx-12 gap-4" >
      <EditForm 
        id={id} 
        city_mpg = {city_mpg}
        color = {color}
        fuel_type = {fuel_type}
        highway_mpg = {highway_mpg}
        idLocation = {idLocation}
        make = {make}
        mileage = {mileage}
        model = {model}
        rentRate = {rentRate}
        seats = {seats}
        transmission = {transmission}
        year  = {year}
      /> 
    </div>
  );
}
