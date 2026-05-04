import { NextRequest, NextResponse } from "next/server";
import { scoreCandidate } from "@/lib/ai/scoreCandidate";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Use POST method for candidate scoring" },
    { status: 405 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidateId, jobId } = body;

    if (!candidateId || !jobId) {
      return NextResponse.json(
        { success: false, error: "candidateId and jobId are required" },
        { status: 400 }
      );
    }

    const result = await scoreCandidate(candidateId, jobId);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("Score candidate error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to score candidate",
      },
      { status: 500 }
    );
  }
}