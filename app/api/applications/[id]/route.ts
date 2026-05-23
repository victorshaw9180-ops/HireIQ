import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import { Stage } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
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

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const stageValue = body.stage;

    if (!stageValue || !Object.values(Stage).includes(stageValue as Stage)) {
      return NextResponse.json(
        { error: "Invalid stage" },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: {
        id,
      },
      data: {
        stage: stageValue as Stage,
        notes: {
          lastStageUpdate: {
            stage: stageValue,
            updatedBy: userId,
            updatedAt: new Date().toISOString(),
          },
        },
      },
      include: {
        candidate: true,
        job: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Stage updated successfully",
      application,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update stage" },
      { status: 500 }
    );
  }
}