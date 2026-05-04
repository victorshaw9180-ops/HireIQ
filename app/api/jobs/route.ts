import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    // If not logged in / no org → block request
    if (!orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Basic validation (important)
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        orgId,
        title: body.title,
        department: body.department || null,
        location: body.location || null,
        salary: body.salary || null,
        description: body.description || null,
        status: "active",
      },
    });

    return NextResponse.json(job, { status: 201 });

  } catch (error) {
    console.error("JOB CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create job"},
      { status: 500 }
    );
  }
}