import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        body.razorpay_order_id +
        "|" +
        body.razorpay_payment_id
      )
      .digest("hex");

    const valid =
      generatedSignature === body.razorpay_signature;

    return NextResponse.json({
      success: valid,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}