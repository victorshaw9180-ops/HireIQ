import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { candidateId, jobId, orgId } = body;

    if (!candidateId || !jobId || !orgId) {
      return NextResponse.json(
        { error: "candidateId, jobId, and orgId are required" },
        { status: 400 }
      );
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        candidateId,
        jobId,
        orgId,
      },
    });

    if (existingApplication) {
      return NextResponse.json({
        success: true,
        message: "Candidate already exists in pipeline for this job",
        application: existingApplication,
      });
    }

    const application = await prisma.application.create({
      data: {
        candidateId,
        jobId,
        orgId,
        stage: "NEW",
        notes: {
          source: "Candidate profile",
          action: "Added to pipeline",
          addedBy: userId,
          addedAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate added to pipeline",
      application,
    });
  } catch (error) {
    console.error("Add to pipeline error:", error);

    return NextResponse.json(
      { error: "Failed to add candidate to pipeline" },
      { status: 500 }
    );
  }
}