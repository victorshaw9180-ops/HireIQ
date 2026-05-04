import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.create({
      data: {
        orgId,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        source: body.source || null,
      },
    });

    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error("CANDIDATE CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    );
  }
}