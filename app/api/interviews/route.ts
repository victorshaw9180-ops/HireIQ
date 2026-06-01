import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      applicationId,
      title,
      scheduledAt,
      interviewerName,
    } = body;

    if (
      !applicationId ||
      !title ||
      !scheduledAt ||
      !interviewerName
    ) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        title,
        scheduledAt: new Date(scheduledAt),
        interviewerName,
      },
    });

    return NextResponse.json(interview);
  } catch (error) {
    console.error("INTERVIEW CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}