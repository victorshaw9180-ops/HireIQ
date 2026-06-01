import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const { recruiterId } = body;

    if (!recruiterId) {
      return NextResponse.json(
        { error: "Recruiter ID required" },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: {
        id,
      },

      data: {
        assignedRecruiterId: recruiterId,
      },
    });

    return NextResponse.json(application);

  } catch (error) {
    console.error("ASSIGN RECRUITER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to assign recruiter" },
      { status: 500 }
    );
  }
}