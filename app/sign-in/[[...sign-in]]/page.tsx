//Clerk SignIn integration
//Resource link: https://clerk.com/docs/components/authentication/sign-in

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
