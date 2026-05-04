import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const candidateId = formData.get("candidateId")?.toString();
    const jobId = formData.get("jobId")?.toString();

    if (!candidateId || !jobId) {
      return NextResponse.json(
        { error: "Candidate and Job are required" },
        { status: 400 }
      );
    }

    await prisma.application.create({
      data: {
        orgId,
        candidateId,
        jobId,
        stage: "NEW",
      },
    });

    return NextResponse.redirect(new URL("/applications", req.url));
  } catch (error) {
    console.error("APPLICATION CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}