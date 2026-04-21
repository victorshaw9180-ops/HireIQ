//import { SignIn } from "@clerk/nextjs";

//export default function Page() {
//  return <SignIn afterSignInUrl="/dashboard" />;
//}

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn fallbackRedirectUrl="/Dashboard" />;
}