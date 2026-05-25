import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const content = body.content;

    if (!content) {
      return NextResponse.json(
        { error: "Content required" },
        { status: 400 }
      );
    }

    const note = await prisma.candidateNote.create({
      data: {
        applicationId: id,
        recruiterName: userId,
        content,
      },
    });

    return NextResponse.json(note);

  } catch (error) {
    console.error("NOTE CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}