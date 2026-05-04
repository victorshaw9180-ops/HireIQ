import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { message, orgId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const candidates = await prisma.candidate.findMany({
      where: orgId ? { orgId } : {},
      take: 10,
      include: {
        applications: {
          include: {
            job: true,
          },
        },
      },
    });

    const jobs = await prisma.job.findMany({
      where: orgId ? { orgId } : {},
      take: 10,
    });

    // MOCK MODE until OpenAI credits added
    const reply = `
AI Recruiter Agent Demo Response:

You asked: "${message}"

Current data found:
- Candidates: ${candidates.length}
- Jobs: ${jobs.length}

Top recommendation:
Review candidates with higher AI score, matching skills, and active applications first.

Once OpenAI credits are added, this agent will answer intelligently using real candidate/job context.
`;

    return NextResponse.json({
      success: true,
      reply,
      context: {
        candidatesCount: candidates.length,
        jobsCount: jobs.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "AI agent failed" },
      { status: 500 }
    );
  }
}