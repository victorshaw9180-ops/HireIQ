import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ScoreSchema = z.object({
  matchScore: z.number().min(0).max(100),
  resumeScore: z.number().min(0).max(100),
  skillsScore: z.number().min(0).max(100),
  experienceScore: z.number().min(0).max(100),
  scoreReason: z.string(),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  verdict: z.enum(["Strong Match", "Moderate Match", "Weak Match", "Reject"]),
});

export async function scoreCandidate(candidateId: string, jobId: string) {
  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
  });

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!candidate) throw new Error("Candidate not found");
  if (!job) throw new Error("Job not found");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an expert technical recruiter and resume screening engine. Return only valid JSON.",
      },
      {
        role: "user",
        content: `
Compare this candidate with this job.

Return JSON only in this format:
{
  "matchScore": 0,
  "resumeScore": 0,
  "skillsScore": 0,
  "experienceScore": 0,
  "scoreReason": "",
  "matchedSkills": [],
  "missingSkills": [],
  "verdict": "Strong Match"
}

Scoring rules:
90-100 = excellent match
75-89 = strong match
55-74 = moderate match
35-54 = weak match
0-34 = reject

Job:
Title: ${job.title}
Department: ${job.department || ""}
Location: ${job.location || ""}
Description: ${job.description || ""}
Required Skills: ${JSON.stringify(job.skills || [])}

Candidate:
Name: ${candidate.name}
Email: ${candidate.email}
Parsed Resume Data:
${JSON.stringify(candidate.parsedData || {}, null, 2)}
`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned empty scoring response");
  }

  const parsed = ScoreSchema.parse(JSON.parse(content));

  const existingApplication = await prisma.application.findFirst({
  where: {
    candidateId,
    jobId,
  },
});

let application;

if (existingApplication) {
  application = await prisma.application.update({
    where: {
      id: existingApplication.id,
    },
    data: {
      aiScore: parsed.matchScore,
      matchScore: parsed.matchScore,
      resumeScore: parsed.resumeScore,
      skillsScore: parsed.skillsScore,
      experienceScore: parsed.experienceScore,
      scoreReason: parsed.scoreReason,
      notes: {
        matchedSkills: parsed.matchedSkills,
        missingSkills: parsed.missingSkills,
        verdict: parsed.verdict,
      },
    },
  });
} else {
  application = await prisma.application.create({
    data: {
      candidateId,
      jobId,
      orgId: candidate.orgId,
      aiScore: parsed.matchScore,
      matchScore: parsed.matchScore,
      resumeScore: parsed.resumeScore,
      skillsScore: parsed.skillsScore,
      experienceScore: parsed.experienceScore,
      scoreReason: parsed.scoreReason,
      notes: {
        matchedSkills: parsed.matchedSkills,
        missingSkills: parsed.missingSkills,
        verdict: parsed.verdict,
      },
    },
  });
}
  return {
    application,
    scoring: parsed,
  };
}