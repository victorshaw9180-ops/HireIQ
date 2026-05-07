import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    const validPlans = ["starter", "growth", "pro"];

    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const credits = plan === "starter" ? 20 : plan === "growth" ? 200 : 1000;

    await prisma.organization.update({
      where: { id: orgId },
      data: {
        plan,
        aiCredits: credits,
      },
    });

    return NextResponse.json({
      success: true,
      plan,
      aiCredits: credits,
    });
  } catch (error) {
    console.error("UPGRADE ERROR:", error);
    return NextResponse.json({ error: "Upgrade failed" }, { status: 500 });
  }
}