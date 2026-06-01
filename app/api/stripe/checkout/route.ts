import { NextResponse } from "next/server";

export async function POST() {
return NextResponse.json(
{
success: false,
message:
"Stripe checkout is currently disabled. TalentHawk is using Razorpay for billing.",
},
{ status: 200 }
);
}
