import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const {
      applicationIds,
      stage,
      candidateDecision,
    } = body;

    if (
      !applicationIds ||
      applicationIds.length === 0
    ) {
      return NextResponse.json(
        {
          error: "No applications selected",
        },
        { status: 400 }
      );
    }

    await prisma.application.updateMany({
      where: {
        id: {
          in: applicationIds,
        },
      },

      data: {
        ...(stage && { stage }),

        ...(candidateDecision && {
          candidateDecision,
        }),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Bulk update failed",
      },
      { status: 500 }
    );
  }
}