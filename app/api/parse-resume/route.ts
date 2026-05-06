import { AI_CONFIG } from "@/lib/ai/config";
import { mockResumeParse } from "@/lib/ai/mockResponses";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ResumeSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string(),
  skills: z.array(z.string()),
  experienceYears: z.string().optional(),
  recentRole: z.string().optional(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  score: z.number().min(0).max(100),
});

async function extractTextFromFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

 if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
  const data = await pdfParse(buffer);
  return data.text;
}

  throw new Error("Only PDF and TXT files are supported for now.");
}

async function parseResumeWithAI(resumeText: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an expert recruitment resume parser. Return only valid JSON.",
      },
      {
        role: "user",
        content: `
Read this resume and return JSON only.

JSON format:
{
  "name": "",
  "email": "",
  "phone": "",
  "location": "",
  "summary": "",
  "skills": [],
  "experienceYears": "",
  "recentRole": "",
  "strengths": [],
  "gaps": [],
  "score": 0
}

Resume:
${resumeText.slice(0, 15000)}
`,
      },
    ],
  });

   const aiContent = response.choices[0]?.message?.content;

  if (!aiContent) {
    throw new Error("OpenAI returned empty response.");
  }

  const parsedJson = JSON.parse(aiContent);
  return ResumeSchema.parse(parsedJson);
}

export async function POST(req: NextRequest) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Resume file is required." },
        { status: 400 }
      );
    }

    const resumeText = await extractTextFromFile(file);

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not read enough text from resume." },
        { status: 400 }
      );
    }

    // ✅ CHECK AI CREDITS BEFORE PARSING
    const org = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!org || org.aiCredits <= 0) {
      return NextResponse.json(
        { error: "No AI credits left. Please upgrade your plan." },
        { status: 403 }
      );
    }

    // ✅ DEMO MODE PARSING
    if (AI_CONFIG.demoMode) {
      const parsed = mockResumeParse(resumeText);

      // ✅ DEDUCT 1 CREDIT
      await prisma.organization.update({
        where: { id: orgId },
        data: {
          aiCredits: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({
        success: true,
        demoMode: true,
        rawTextLength: resumeText.length,
        creditsLeft: org.aiCredits - 1,
        parsed,
      });
    }

    // ✅ REAL OPENAI PARSING
    const parsed = await parseResumeWithAI(resumeText);

    // ✅ DEDUCT 1 CREDIT
    await prisma.organization.update({
      where: { id: orgId },
      data: {
        aiCredits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      demoMode: false,
      rawTextLength: resumeText.length,
      creditsLeft: org.aiCredits - 1,
      parsed,
    });
  } catch (error: any) {
    console.error("Parse resume error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to parse resume.",
      },
      { status: 500 }
    );
  }
}