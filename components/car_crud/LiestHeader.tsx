import Link from "next/link";

export default function ListHeader() {
  return (
    <nav className="flex justify-between rounded-lg items-center bg-slate-800 px-8 py-3">
      <Link className=" text-white font-bold" href={"/"}>
        Car List
      </Link>
      <Link className="bg-secondary-orange rounded-full bg-white p-2" href={"/add_car"}>
        Add Car
      </Link>
    </nav>
  );
}
