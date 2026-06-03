import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { PLAN_CONFIG } from "@/lib/plans";

export async function POST(req: Request) {
  try {
    
    const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    
    const { plan } = await req.json();

    let amount = 0;

    if (plan === "starter") amount = PLAN_CONFIG.starter.monthlyPrice * 100;
    else if (plan === "growth") amount = PLAN_CONFIG.growth.monthlyPrice * 100;
    else if (plan === "enterprise") amount = PLAN_CONFIG.enterprise.monthlyPrice * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}