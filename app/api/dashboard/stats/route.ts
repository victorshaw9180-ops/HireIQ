import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import { Stage } from "@prisma/client";

export async function GET() {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [
      totalCandidates,
      totalJobs,
      totalApplications,
      totalInterviews,
      totalHires,
    ] = await Promise.all([
      prisma.candidate.count({
        where: { orgId },
      }),

      prisma.job.count({
        where: { orgId },
      }),

      prisma.application.count({
        where: { orgId },
      }),

      prisma.application.count({
        where: {
          orgId,
          stage: {
            in: [Stage.INTERVIEW1, Stage.INTERVIEW2],
          },
        },
      }),

      prisma.application.count({
        where: {
          orgId,
          stage: Stage.HIRED,
        },
      }),
    ]);

    return NextResponse.json({
      totalCandidates,
      totalJobs,
      totalApplications,
      totalInterviews,
      totalHires,
    });

  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}   