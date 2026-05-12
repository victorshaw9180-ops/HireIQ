"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import BackButton from "@/components/BackButton";

type UploadResult = {
  success: boolean;
  message: string;
  resume?: {
    id: string;
    fileName: string;
    fileUrl?: string;
    aiScore?: number;
    summary?: string;
  };
  error?: string;
};

export default function ResumePage() {
  const [result, setResult] = useState<UploadResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({
          success: false,
          message: data.error || "Resume upload failed",
        });
        return;
      }

      setResult({
        success: true,
        message: "Resume uploaded successfully",
        resume: data.resume,
      });

      form.reset();
    } catch (error) {
      setResult({
        success: false,
        message: "Something went wrong while uploading resume.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div style={{ padding: 20, maxWidth: 760 }}>
        
        <BackButton />

        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Resume Upload
        </h1>

        <p style={{ color: "#9CA3AF", marginBottom: 24 }}>
          Upload a PDF, DOC, or DOCX resume. TalentHawk will save the file and
          prepare it for AI analysis.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #2A2F3E",
            background: "#0f131a",
            padding: 22,
            borderRadius: 14,
          }}
        >
          <input
            type="file"
            name="resume"
            required
            accept=".pdf,.doc,.docx"
            style={{
              display: "block",
              marginBottom: 18,
              color: "white",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#4B5563" : "#6C63FF",
              color: "white",
              border: "none",
              padding: "11px 16px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: 22,
              background: result.success ? "#052e1a" : "#3b0a0a",
              border: result.success
                ? "1px solid #16A34A"
                : "1px solid #DC2626",
              color: "white",
              padding: 18,
              borderRadius: 14,
            }}
          >
            <h3 style={{ marginBottom: 8 }}>
              {result.success ? "✅ Upload Successful" : "❌ Upload Failed"}
            </h3>

            <p>{result.message}</p>

            {result.resume && (
              <>
                <p style={{ marginTop: 10 }}>
                  <strong>File:</strong> {result.resume.fileName}
                </p>

                <p>
                  <strong>AI Score:</strong> {result.resume.aiScore ?? 0}
                </p>

                <p>
                  <strong>Summary:</strong>{" "}
                  {result.resume.summary || "No summary yet"}
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <a
                    href="/resume/list"
                    style={{
                      background: "#6C63FF",
                      color: "white",
                      padding: "9px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    View Resume List
                  </a>

                  <a
                    href="/resume"
                    style={{
                      border: "1px solid #374151",
                      color: "white",
                      padding: "9px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Upload Another
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}