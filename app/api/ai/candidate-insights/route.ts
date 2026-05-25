import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      candidateName,
      resumeText,
      jobTitle,
    } = body;

    const prompt = `
You are an enterprise AI recruiting assistant.

Analyze this candidate for the role.

Candidate Name:
${candidateName}

Target Role:
${jobTitle}

Resume:
${resumeText}

Return response in this JSON format:

{
  "summary": "",
  "strengths": [],
  "risks": [],
  "recommendation": "",
  "interviewFocus": []
}

`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are an expert enterprise recruiter and hiring strategist.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.4,
    });

    const text =
      completion.choices[0]?.message?.content || "{}";

    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    console.error("AI INSIGHTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate AI insights" },
      { status: 500 }
    );
  }
}