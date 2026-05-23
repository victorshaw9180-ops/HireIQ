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

    const existingApplication = await prisma.application.findFirst({
      where: {
        id,
        orgId,
      },
      include: {
        candidate: true,
        job: true,
      },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const oldStage = existingApplication.stage;
    const newStage = stageValue as Stage;

    const updatedApplication = await prisma.$transaction(async (tx) => {
      const application = await tx.application.update({
        where: {
          id,
        },
        data: {
          stage: newStage,
          notes: {
            lastStageUpdate: {
              oldStage,
              newStage,
              updatedBy: userId,
              updatedAt: new Date().toISOString(),
            },
          },
        },
        include: {
          candidate: true,
          job: true,
          activities: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      await tx.activity.create({
        data: {
          applicationId: id,
          type: "STAGE_CHANGE",
          content: `Stage changed from ${oldStage} to ${newStage} for ${existingApplication.candidate?.name || "candidate"} on ${existingApplication.job?.title || "job"}. Updated by ${userId}.`,
        },
      });

      return application;
    });

    return NextResponse.json({
      success: true,
      message: `Stage updated from ${oldStage} to ${newStage}`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update stage" },
      { status: 500 }
    );
  }
}