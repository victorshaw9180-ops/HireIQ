import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

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
      where: {
        orgId,
      },

      select: {
        recruiterName: true,
        stage: true,
      },
    });

    const recruiterStats: Record<
      string,
      {
        submissions: number;
        hires: number;
      }
    > = {};

    for (const app of applications) {
      const recruiter =
        app.recruiterName || "Unknown Recruiter";

      if (!recruiterStats[recruiter]) {
        recruiterStats[recruiter] = {
          submissions: 0,
          hires: 0,
        };
      }

      recruiterStats[recruiter].submissions += 1;

      if (app.stage === "HIRED") {
        recruiterStats[recruiter].hires += 1;
      }
    }

    return NextResponse.json(recruiterStats);

  } catch (error) {
    console.error("RECRUITER ANALYTICS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch recruiter analytics" },
      { status: 500 }
    );
  }
}