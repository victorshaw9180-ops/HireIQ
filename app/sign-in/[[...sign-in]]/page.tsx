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
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <h1 style={{ color: "white", fontSize: "32px", textAlign: "center", marginBottom: "20px" }}>
          TalentHawk Sign In
        </h1>

        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}