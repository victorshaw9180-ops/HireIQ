import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const priceMap: Record<string, string | undefined> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  growth: process.env.STRIPE_GROWTH_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
};

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY environment variable" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const body = await req.json().catch(() => null);
    const plan = body?.plan;

    if (!plan || typeof plan !== "string") {
      return NextResponse.json(
        { error: "Missing plan. Use starter, growth, or enterprise." },
        { status: 400 }
      );
    }

    if (plan === "enterprise") {
      return NextResponse.json(
        {
          error:
            "Enterprise plan requires sales contact. Stripe checkout is only enabled for Starter and Growth right now.",
        },
        { status: 400 }
      );
    }

    const priceId = priceMap[plan];

    if (!priceId) {
      return NextResponse.json(
        {
          error: `Missing Stripe price ID for ${plan}. Add it in Vercel environment variables.`,
        },
        { status: 500 }
      );
    }

    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      client_reference_id: userId,
      metadata: {
        clerkUserId: userId,
        plan,
        app: "TalentHawk",
      },
      subscription_data: {
        metadata: {
          clerkUserId: userId,
          plan,
          app: "TalentHawk",
        },
      },
      success_url: `${appUrl}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/billing?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 }
    );
  }
}