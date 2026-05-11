//import { SignIn } from "@clerk/nextjs";

//export default function Page() {
//  return <SignIn afterSignInUrl="/dashboard" />;
//}

//import { SignIn } from "@clerk/nextjs";

//export default function Page() {
//  return <SignIn />
//}

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          TalentHawk Sign In
        </h1>

        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </main>
  );
}