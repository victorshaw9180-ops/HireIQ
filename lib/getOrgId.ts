//import { auth } from "@clerk/nextjs/server";

//export async function getOrgId() {
//  const { userId } = auth();
//const { userId } = await auth();
//  if (!userId) return null;
//
//  // TEMP: use userId as orgId
//  return userId;
//}

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
          role: "owner",
        },
      },
    },
  });

  return org.id;
}