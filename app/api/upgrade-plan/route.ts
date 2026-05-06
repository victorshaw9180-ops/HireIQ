import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();
    const { plan } = await req.json();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let credits = 20;

    if (plan === "growth") credits = 200;
    if (plan === "pro") credits = 1000;

    await prisma.organization.update({
      where: { id: orgId },
      data: {
        plan,
        aiCredits: credits,
      },
    });

    return NextResponse.json({ success: true });

  } catch (e) {
    return NextResponse.json({ error: "Upgrade failed" }, { status: 500 });
  }
}