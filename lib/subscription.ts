import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { PLAN_CONFIG } from "@/lib/plans";


export async function getCurrentSubscription() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let subscription = await prisma.subscription.findFirst({
    where: { clerkUserId: userId },
  });

  if (!subscription) {
    subscription = await prisma.subscription.create({
      data: {
        clerkUserId: userId,
        plan: "free",
        status: "trial",
        aiCredits: PLAN_CONFIG.free.aiCredits,
        trialEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      },
    });
  }

  return subscription;
}

export async function hasEnoughCredits(requiredCredits = 1) {
  const subscription = await getCurrentSubscription();

  if (!subscription) {
    return false;
  }

  return subscription.aiCredits >= requiredCredits;
}

export async function deductCredits(requiredCredits = 1) {
  const subscription = await getCurrentSubscription();

  if (!subscription) {
    throw new Error("No active subscription found");
  }

  if (subscription.aiCredits < requiredCredits) {
    throw new Error("Not enough AI credits");
  }

  return prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      aiCredits: subscription.aiCredits - requiredCredits,
    },
  });
}