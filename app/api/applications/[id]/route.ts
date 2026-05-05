import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import { Stage } from "@prisma/client";

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
    const stageValue = formData.get("stage")?.toString();

    if (!stageValue || !Object.values(Stage).includes(stageValue as Stage)) {
  return NextResponse.json(
    { error: "Invalid stage" },
    { status: 400 }
  );
}

    await prisma.application.update({
      where: { id },
      data: { stage: stageValue as Stage },
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