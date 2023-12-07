"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }: any) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/car_crud?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <>
    <button onClick={removeTopic} className="text-secondary-orange rounded-full rounded-md bg-seconday-blue">
      <HiOutlineTrash size={24} />
    </button>
    </>
  );
}
