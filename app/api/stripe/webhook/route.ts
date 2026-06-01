import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(
process.env.STRIPE_SECRET_KEY || "placeholder",
{
apiVersion: "2026-05-27.dahlia",
}
);

export async function POST(req: Request) {
const body = await req.text();

const signature = (await headers()).get("stripe-signature");

if (!signature) {
return NextResponse.json(
{ error: "Missing Stripe signature" },
{ status: 400 }
);
}

try {
const event = stripe.webhooks.constructEvent(
body,
signature,
process.env.STRIPE_WEBHOOK_SECRET || "placeholder"
);

console.log("Stripe Event:", event.type);

return NextResponse.json({ received: true });
} catch (error) {
console.error("Stripe Webhook Error:", error);

return NextResponse.json(
  { error: "Webhook Error" },
  { status: 400 }
);

}
}