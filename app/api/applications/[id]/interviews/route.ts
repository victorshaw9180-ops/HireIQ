import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const interviews = await prisma.interview.findMany({
      where: {
        applicationId: id,
      },

      orderBy: {
        scheduledAt: "asc",
      },
    });

    return NextResponse.json(interviews);

  } catch (error) {

    console.error("GET INTERVIEWS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const body = await req.json();

    const {
      title,
      interviewerName,
      scheduledAt,
    } = body;

    const interview = await prisma.interview.create({
      data: {
        applicationId: id,
        title,
        interviewerName,
        scheduledAt: new Date(scheduledAt),
      },
    });

    return NextResponse.json(interview);

  } catch (error) {

    console.error("CREATE INTERVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}