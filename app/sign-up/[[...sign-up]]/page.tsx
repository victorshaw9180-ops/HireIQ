//import { SignUp } from "@clerk/nextjs";

//export default function Page() {
//  return <SignUp />;
//}

//import { SignUp } from "@clerk/nextjs";

//export default function Page() {
//  return <SignUp afterSignUpUrl="/dashboard" />;
//}

//import { SignUp } from "@clerk/nextjs";

//export default function Page() {
//  return <SignUp fallbackRedirectUrl="/dashboard" />;
//}

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  );
}