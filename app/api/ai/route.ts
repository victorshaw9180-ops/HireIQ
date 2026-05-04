import { NextResponse } from "next/server";

function extractSkills(text: string) {
  const lowerText = text.toLowerCase();

  const skillKeywords = [
    "customer service",
    "csr",
    "call center",
    "customer support",
    "client service",
    "data entry",
    "microsoft office",
    "excel",
    "word",
    "powerpoint",
    "outlook",
    "salesforce",
    "crm",
    "sharepoint",
    "healthcare",
    "insurance",
    "billing",
    "claims",
    "enrollment",
    "patient records",
    "email",
    "phone support",
    "communication",
    "problem solving",
    "documentation",
    "administration",
    "scheduling",
    "recruitment",
    "sourcing",
    "screening",
    "boolean",
    "linkedin",
    "ats",
    "javascript",
    "typescript",
    "react",
    "node",
    "python",
    "sql",
    "aws",
    "azure",
    "oracle",
    "sap",
  ];

  const skills: string[] = [];

  for (const skill of skillKeywords) {
    if (lowerText.includes(skill)) {
      skills.push(
        skill
          .split(" ")
          .map((word) =>
            word.length <= 3
              ? word.toUpperCase()
              : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ")
      );
    }
  }

  return [...new Set(skills)];
}

function extractName(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines[0] || "Candidate";
}

function createSummary(text: string, skills: string[]) {
  const cleanText = text.replace(/\s+/g, " ").trim();

  const lowerText = cleanText.toLowerCase();

  let roleType = "professional";

  if (
    lowerText.includes("customer service") ||
    lowerText.includes("customer support") ||
    lowerText.includes("call center") ||
    lowerText.includes("csr")
  ) {
    roleType = "customer service representative";
  } else if (
    lowerText.includes("recruiter") ||
    lowerText.includes("recruitment") ||
    lowerText.includes("sourcing")
  ) {
    roleType = "recruitment professional";
  } else if (
    lowerText.includes("developer") ||
    lowerText.includes("javascript") ||
    lowerText.includes("react")
  ) {
    roleType = "technical professional";
  } else if (
    lowerText.includes("healthcare") ||
    lowerText.includes("patient")
  ) {
    roleType = "healthcare support professional";
  }

  const firstPart = cleanText.slice(0, 350);

  return `This resume appears to represent a ${roleType}. The candidate profile highlights ${
    skills.length > 0 ? skills.slice(0, 8).join(", ") : "relevant professional experience"
  }. Based on the resume content, the candidate has experience related to: ${firstPart}...`;
}

function calculateScore(text: string, skills: string[]) {
  const lowerText = text.toLowerCase();

  let score = 50;

  if (skills.length >= 3) score += 15;
  if (skills.length >= 6) score += 10;
  if (lowerText.includes("experience")) score += 10;
  if (lowerText.includes("present")) score += 5;
  if (lowerText.includes("managed") || lowerText.includes("created")) score += 5;
  if (lowerText.includes("customer") || lowerText.includes("client")) score += 5;

  return Math.min(score, 100);
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume text is empty or too short",
        },
        { status: 400 }
      );
    }

    const name = extractName(text);
    const skills = extractSkills(text);
    const summary = createSummary(text, skills);
    const aiScore = calculateScore(text, skills);

    return NextResponse.json({
      success: true,
      name,
      summary,
      skills,
      aiScore,
    });
  } catch (error: any) {
    console.error("AI ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "AI analysis failed",
      },
      { status: 500 }
    );
  }
}