import { NextResponse } from "next/server";
import { getOrgId } from "@/lib/getOrgId";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const orgId = await getOrgId();

    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const fileSize = file.size;
    const fileType = file.type || "application/octet-stream";

    const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const storagePath = `${orgId}/${Date.now()}-${safeFileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, buffer, {
        contentType: fileType,
        upsert: false,
      });

    if (uploadError) {
      console.error("SUPABASE UPLOAD ERROR:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload resume file" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(storagePath);

    const fileUrl = publicUrlData.publicUrl;

    let fileText = "";

    try {
      fileText = await file.text();
    } catch {
      fileText = "";
    }

    let aiScore = 0;
    let summary = "No summary";

    try {
      if (fileText.trim().length > 20) {
        const aiRes = await fetch(new URL("/api/ai", req.url), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: fileText }),
        });

        const aiData = await aiRes.json();

        if (aiData.success) {
          aiScore = aiData.aiScore || 0;
          summary = aiData.summary || "No summary";
        }
      }
    } catch (err) {
      console.error("AI CALL FAILED:", err);
    }

    const resume = await prisma.resume.create({
      data: {
        orgId,
        fileName,
        fileSize,
        fileType,
        fileUrl,
        aiScore,
        summary,
      },
    });

    return NextResponse.json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("RESUME UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
}