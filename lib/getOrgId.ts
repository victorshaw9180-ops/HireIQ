
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function getOrgId() {
  const { userId } = await auth();

  if (!userId) return null;

  const existingMember = await prisma.orgMember.findFirst({
    where: { userId },
    include: { org: true },
  });

  if (existingMember) {
    return existingMember.orgId;
  }

  const org = await prisma.organization.create({
    data: {
      name: "My Company",
      plan: "starter",
      members: {
        create: {
          userId,
          role: UserRole.ADMIN,
        },
      },
    },
  });

  return org.id;
}