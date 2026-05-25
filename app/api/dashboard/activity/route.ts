import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function GET() {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const activities = await prisma.activity.findMany({
      where: {
        application: {
          orgId,
        },
      },

      include: {
        application: {
          include: {
            candidate: true,
            job: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    });

    return NextResponse.json(activities);

  } catch (error) {
    console.error("ACTIVITY FETCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}