//Clerk SignUp integration
//Resource link: https://clerk.com/docs/components/authentication/sign-up

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}
