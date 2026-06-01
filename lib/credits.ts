import { prisma } from "@/lib/prisma";

export async function consumeCredits(
  orgId: string,
  amount: number
) {
  const org = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
  });

  if (!org) {
    throw new Error("Organization not found");
  }

  if (org.aiCredits < amount) {
    throw new Error("Insufficient AI credits");
  }

  await prisma.organization.update({
    where: {
      id: orgId,
    },
    data: {
      aiCredits: {
        decrement: amount,
      },
    },
  });
}