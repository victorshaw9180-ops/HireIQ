import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      candidateEmail,
      candidateName,
      interviewTitle,
      interviewDate,
    } = body;

    if (
      !candidateEmail ||
      !candidateName ||
      !interviewTitle ||
      !interviewDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "TalentHawk <onboarding@resend.dev>",

      to: candidateEmail,

      subject: `Interview Scheduled - ${interviewTitle}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          
          <h2>
            Interview Scheduled
          </h2>

          <p>
            Hello ${candidateName},
          </p>

          <p>
            Your interview has been scheduled successfully.
          </p>

          <p>
            <strong>Interview:</strong>
            ${interviewTitle}
          </p>

          <p>
            <strong>Date:</strong>
            ${interviewDate}
          </p>

          <br/>

          <p>
            Regards,
          </p>

          <p>
            TalentHawk Recruitment Team
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}