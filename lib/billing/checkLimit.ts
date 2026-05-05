import { prisma } from "@/lib/prisma";

export async function checkLimit(orgId: string, type: "jobs" | "candidates") {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  const plan = org?.plan || "starter";

  let limit = 0;

  if (plan === "starter") {
    limit = type === "jobs" ? 3 : 10;
  }

  if (plan === "pro") {
    limit = type === "jobs" ? 50 : 200;
  }

  const used =
    type === "jobs"
      ? await prisma.job.count({ where: { orgId } })
      : await prisma.candidate.count({ where: { orgId } });

  return {
    allowed: used < limit,
    used,
    limit,
    plan,
  };
}