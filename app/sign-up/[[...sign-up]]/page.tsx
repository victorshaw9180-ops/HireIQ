//import { SignUp } from "@clerk/nextjs";

//export default function Page() {
//  return <SignUp />;
//}

//import { SignUp } from "@clerk/nextjs";

//export default function Page() {
//  return <SignUp afterSignUpUrl="/dashboard" />;
//}

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp fallbackRedirectUrl="/dashboard" />;
}