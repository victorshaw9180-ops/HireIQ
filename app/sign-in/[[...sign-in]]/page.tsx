//import { SignIn } from "@clerk/nextjs";

//export default function Page() {
//  return <SignIn afterSignInUrl="/dashboard" />;
//}

//import { SignIn } from "@clerk/nextjs";

//export default function Page() {
//  return <SignIn />
//}

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}