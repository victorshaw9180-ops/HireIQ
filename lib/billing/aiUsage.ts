import { prisma } from "@/lib/prisma";

const AI_LIMITS: Record<string, number> = {
  starter: 20,
  growth: 200,
  pro: 1000,
  agency: 5000,
};

export async function checkAiUsage(orgId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  if (!org) throw new Error("Organization not found");

  const plan = org.plan || "starter";
  const limit = AI_LIMITS[plan] || AI_LIMITS.starter;

  const used = await prisma.resume.count({
    where: { orgId },
  });

  return {
    allowed: used < limit,
    used,
    limit,
    plan,
  };
}