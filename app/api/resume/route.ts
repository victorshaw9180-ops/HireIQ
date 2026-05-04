import { NextResponse } from "next/server";
import { getOrgId } from "@/lib/getOrgId";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const fileSize = file.size;

    const fileText = await file.text();

let aiScore = 0;
let summary = "No summary";

try {
  const aiRes = await fetch(new URL("/api/ai", req.url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: fileText }),
  });

  const aiData = await aiRes.json();

  if (aiData.success) {
    aiScore = aiData.aiScore || 0;
    summary = aiData.summary || "No summary";
  }
} catch (err) {
  console.error("AI CALL FAILED:", err);
}

    const resume = await prisma.resume.create({
      data: {
        orgId,
        fileName,
        fileSize,
        aiScore,
        summary,
      },
    });

    return NextResponse.json({
      message: "Resume saved with AI score",
      resume,
    });
  } catch (error) {
    console.error("RESUME UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
}