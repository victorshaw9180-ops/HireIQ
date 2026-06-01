import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const feedback = await prisma.interviewFeedback.create({
      data: {
        interviewId: id,
        rating: Number(body.rating),
        feedback: body.feedback,
        recommendation: body.recommendation,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}