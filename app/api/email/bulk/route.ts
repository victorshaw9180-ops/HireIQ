import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { prisma } from "@/lib/prisma";
import { consumeCredits } from "@/lib/credits";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orgId = body.orgId;

    const org = await prisma.organization.findUnique({
    where: {
    id: orgId,
    },
    });

    if (!org) {
    return NextResponse.json(
    { error: "Organization not found" },
    { status: 404 }
    );
    }

    if (org.plan === "FREE" ||
        org.plan === "starter"
    ) {
  return NextResponse.json(
    {
      error:
        "Bulk emailing is available only in Growth plan and above. Please upgrade your plan to unlock this feature.",
    },
    { status: 403 }
  );
    }

    const { emails, subject, message } = body;

    if (!emails || emails.length === 0) {
      return NextResponse.json(
        { error: "No emails provided" },
        { status: 400 }
      );
    }
    await consumeCredits(orgId, emails.length);

    const results = await Promise.all(
      emails.map((email: string) =>
        resend.emails.send({
          from: "TalentHawk <onboarding@resend.dev>",
          to: email,
          subject,
          html: `
            <div style="font-family: Arial;">
              <h2>${subject}</h2>
              <p>${message}</p>
            </div>
          `,
        })
      )
    );

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to send bulk emails" },
      { status: 500 }
    );
  }
}