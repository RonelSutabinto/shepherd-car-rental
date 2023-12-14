"use client"
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  //const router = useRouter();
  
  //router.push('/',  { scroll: false });
  redirect("/");
  return (
    <></>
  );
}

export default Page



