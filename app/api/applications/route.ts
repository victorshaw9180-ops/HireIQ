import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import { Stage } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: { orgId },
      include: {
        candidate: true,
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("APPLICATION GET ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const candidateId = formData.get("candidateId")?.toString();
    const jobId = formData.get("jobId")?.toString();

    const recruiterName =
    formData.get("recruiterName")?.toString() || "Unknown Recruiter";

    if (!candidateId || !jobId) {
      return NextResponse.json(
        { error: "Candidate and Job are required" },
        { status: 400 }
      );
    }

     const application = await prisma.application.create({
      data: {
        orgId,
        candidateId,
        jobId,

         recruiterName,
        submittedAt: new Date(),
      
        stage: Stage.NEW,
        
        activities: {
          create: {
            type: "APPLICATION_CREATED",
            content: `${recruiterName} added candidate into pipeline.`,
          },
        },
      },
 
      include: {
        candidate: true,
        job: true,
        activities: true,
      },
    });

     return NextResponse.json({
      success: true,
      application,
    });

  } catch (error) {
    console.error("APPLICATION CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}