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

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <h1 style={{ color: "white", fontSize: "32px", textAlign: "center", marginBottom: "20px" }}>
          TalentHawk Sign Up
        </h1>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}