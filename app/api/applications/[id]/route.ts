import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const formData = await req.formData();
    const stage = formData.get("stage")?.toString();

    if (!stage) {
      return NextResponse.json(
        { error: "Stage required" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: { id },
      data: { stage },
    });

    return NextResponse.redirect(
      new URL("/applications", req.url)
    );

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update stage" },
      { status: 500 }
    );
  }
}