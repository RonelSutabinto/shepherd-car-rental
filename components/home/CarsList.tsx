

import { carProps } from "@/utils/props/carProps";
import CarCard from "../home/CarCard";

interface CarProps {
  cars: carProps
}

export default function CarsList({ cars }: any) {
  
  return (
   <>
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 w-full gap-8 pt-10">
    
    {cars.length === 0 ? (
      <p className="no-result">No Cars found</p>
      ) : (
        <>
          {cars.map((car: any) => (
              <CarCard isList={true} car = {car}/>
          ))}
        </>
      )}
    </div>
   </>
  )
}


