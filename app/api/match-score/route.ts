import { NextRequest, NextResponse } from "next/server";
import { AI_CONFIG } from "@/lib/ai/config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and Job Description required" },
        { status: 400 }
      );
    }

    // Demo mode — no OpenAI credits required
    if (AI_CONFIG.demoMode) {
      const resumeLower = resumeText.toLowerCase();
      const jdLower = jobDescription.toLowerCase();

      const skills = [
        "network",
        "routing",
        "switching",
        "firewall",
        "lan",
        "wan",
        "sd-wan",
        "tcp/ip",
        "cisco",
        "vpn",
        "security",
        "troubleshooting",
        "cloud",
        "aws",
        "azure",
        "financial services",
      ];

      const matchedSkills = skills.filter(
        (skill) => resumeLower.includes(skill) && jdLower.includes(skill)
      );

      const missingSkills = skills.filter(
        (skill) => jdLower.includes(skill) && !resumeLower.includes(skill)
      );

      const matchScore = Math.min(
        95,
        Math.max(45, 55 + matchedSkills.length * 6 - missingSkills.length * 3)
      );

      return NextResponse.json({
        matchScore,
        strengths: matchedSkills.length
          ? matchedSkills.map((s) => `Candidate has relevant experience with ${s}.`)
          : ["Candidate resume has some relevant experience indicators."],
        missingSkills: missingSkills.length ? missingSkills : ["No major missing skills detected in demo mode."],
        summary:
          "Demo mode analysis: Candidate appears partially aligned with the job description based on detected skills and keywords.",
        demoMode: true,
      });
    }

    return NextResponse.json(
      { error: "OpenAI mode is disabled until credits/API billing are enabled." },
      { status: 403 }
    );
  } catch (error: any) {
    console.error("MATCH SCORE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate match score" },
      { status: 500 }
    );
  }
}