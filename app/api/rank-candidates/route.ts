import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export async function POST() {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const candidates = await prisma.candidate.findMany({
      where: { orgId },
      include: {
        applications: true,
      },
    });

    for (const candidate of candidates) {
      const baseScore = Number(candidate.parsedData && typeof candidate.parsedData === "object"
        ? (candidate.parsedData as any).score || 0
        : 0);

      const appScore =
        candidate.applications.length > 0
          ? Math.max(...candidate.applications.map((a) => a.aiScore || 0))
          : 0;

      const rankingScore = Math.round((baseScore * 0.4) + (appScore * 0.6));

      await prisma.candidate.update({
        where: { id: candidate.id },
        data: { rankingScore },
      });
    }

    return NextResponse.json({
      success: true,
      ranked: candidates.length,
    });
  } catch (error) {
    console.error("RANKING ERROR:", error);
    return NextResponse.json(
      { error: "Failed to rank candidates" },
      { status: 500 }
    );
  }
}