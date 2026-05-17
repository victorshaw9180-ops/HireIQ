import { AI_CONFIG } from "@/lib/ai/config";
import { mockResumeParse } from "@/lib/ai/mockResponses";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import mammoth from "mammoth";

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

 if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Only PDF, DOCX, and TXT files are supported for now.");
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

      // ✅ SAVE DEMO CANDIDATE
await prisma.candidate.upsert({
  where: {
    email: parsed.email || `candidate-${Date.now()}@talenthawk.ai`,
  },
  update: {
    name: parsed.name || "Unknown Candidate",
    phone: parsed.phone || "",
    source: "Resume Upload",
    rankingScore: parsed.score || 72,
    parsedData: {
      title: parsed.recentRole || "",
      summary: parsed.summary || "",
      experience: parsed.experienceYears || "",
      skills: parsed.skills || [],
      strengths: parsed.strengths || [],
      gaps: parsed.gaps || [],
      location: parsed.location || "",
    },
  },
  create: {
    orgId,
    name: parsed.name || "Unknown Candidate",
    email: parsed.email || `candidate-${Date.now()}@talenthawk.ai`,
    phone: parsed.phone || "",
    source: "Resume Upload",
    rankingScore: parsed.score || 72,
    parsedData: {
      title: parsed.recentRole || "",
      summary: parsed.summary || "",
      experience: parsed.experienceYears || "",
      skills: parsed.skills || [],
      strengths: parsed.strengths || [],
      gaps: parsed.gaps || [],
      location: parsed.location || "",
    },
  },
});

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

    // ✅ SAVE CANDIDATE TO DATABASE
await prisma.candidate.upsert({
  where: {
    email: parsed.email || `candidate-${Date.now()}@talenthawk.ai`,
  },
  update: {
    name: parsed.name || "Unknown Candidate",
    phone: parsed.phone || "",
    source: "Resume Upload",
    rankingScore: parsed.score || 72,
    parsedData: {
      title: parsed.recentRole || "",
      summary: parsed.summary || "",
      experience: parsed.experienceYears || "",
      skills: parsed.skills || [],
      strengths: parsed.strengths || [],
      gaps: parsed.gaps || [],
      location: parsed.location || "",
    },
  },
  create: {
    orgId,

    name: parsed.name || "Unknown Candidate",

    email:
      parsed.email ||
      `candidate-${Date.now()}@talenthawk.ai`,

    phone: parsed.phone || "",

    source: "Resume Upload",

    rankingScore: parsed.score || 72,

    parsedData: {
      title: parsed.recentRole || "",
      summary: parsed.summary || "",
      experience: parsed.experienceYears || "",
      skills: parsed.skills || [],
      strengths: parsed.strengths || [],
      gaps: parsed.gaps || [],
      location: parsed.location || "",
    },
  },
});

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