import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { title, skills, tone } = await req.json();

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Job title is required" },
        { status: 400 }
      );
    }

    // MOCK MODE until OpenAI credits added
    const jd = `
Job Title: ${title}

Summary:
We are looking for a skilled ${title} to join our team and contribute to recruitment, delivery, and business growth.

Key Responsibilities:
- Understand business and hiring requirements
- Source, screen, and evaluate suitable candidates
- Coordinate interviews and hiring communication
- Maintain candidate pipeline and ATS records
- Collaborate with internal teams and hiring managers

Required Skills:
${skills ? skills.split(",").map((s: string) => `- ${s.trim()}`).join("\n") : "- Relevant experience\n- Strong communication\n- Problem-solving ability"}

Preferred Qualifications:
- Prior experience in a similar role
- Strong ownership and accountability
- Ability to work independently

Tone:
${tone || "Professional"}
`;

    return NextResponse.json({
      success: true,
      jd,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "JD generation failed" },
      { status: 500 }
    );
  }
}