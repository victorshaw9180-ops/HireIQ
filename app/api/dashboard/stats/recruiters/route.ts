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

    const applications = await prisma.application.findMany({
      where: { orgId },

      select: {
        recruiterName: true,
        stage: true,
      },
    });

    const recruiterMap: Record<
      string,
      {
        submissions: number;
        interviews: number;
        hires: number;
      }
    > = {};

    applications.forEach((app) => {
      const recruiter = app.recruiterName || "Unknown";

      if (!recruiterMap[recruiter]) {
        recruiterMap[recruiter] = {
          submissions: 0,
          interviews: 0,
          hires: 0,
        };
      }

      recruiterMap[recruiter].submissions += 1;

      if (
        app.stage === Stage.INTERVIEW1 ||
        app.stage === Stage.INTERVIEW2
      ) {
        recruiterMap[recruiter].interviews += 1;
      }

      if (app.stage === Stage.HIRED) {
        recruiterMap[recruiter].hires += 1;
      }
    });

    const leaderboard = Object.entries(recruiterMap).map(
      ([name, stats]) => ({
        recruiter: name,
        ...stats,
      })
    );

    leaderboard.sort((a, b) => b.hires - a.hires);

    return NextResponse.json(leaderboard);

  } catch (error) {
    console.error("RECRUITER ANALYTICS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch recruiter analytics" },
      { status: 500 }
    );
  }
}