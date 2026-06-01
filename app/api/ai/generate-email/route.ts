import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      candidateName,
      jobTitle,
      clientName,
      tone,
    } = body;

    const generatedEmail = `
Hello ${candidateName},

I hope you are doing well.

We are currently hiring for a ${jobTitle} opportunity with ${clientName}.

Based on your background and experience, we believe this role could be an excellent fit for you.

Please let us know your availability to discuss further.

Regards,
TalentHawk Recruiting Team
    `;

    return NextResponse.json({
      email: generatedEmail,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate AI email",
      },
      { status: 500 }
    );
  }
}