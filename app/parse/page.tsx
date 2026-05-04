"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

type ParsedResume = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary: string;
  skills: string[];
  experienceYears?: string;
  recentRole?: string;
  strengths: string[];
  gaps: string[];
  score: number;
};

export default function ParseResumePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedResume | null>(null);
  const [error, setError] = useState("");

  async function handleUpload(files: File[]) {
    const file = files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Resume parsing failed");
      }

      setResult(data.parsed);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleUpload,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  return (
    <main className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">AI Resume Parser</h1>
      <p className="text-gray-400 mb-8">
        Upload a resume and HireIQ will extract summary, skills, strengths, gaps,
        and AI score.
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
          isDragActive
            ? "border-purple-400 bg-purple-500/10"
            : "border-gray-700 bg-gray-900"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium">
          {isDragActive ? "Drop resume here..." : "Drag & drop resume here"}
        </p>
        <p className="text-gray-400 mt-2">PDF or TXT supported</p>
      </div>

      {loading && (
        <div className="mt-6 rounded-xl bg-gray-900 p-5">
          <p className="text-purple-300">Analyzing resume with AI...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-950 border border-red-700 p-5">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {result && (
        <section className="mt-8 grid gap-6">
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {result.name || "Candidate"}
                </h2>
                <p className="text-gray-400">
                  {result.recentRole || "Role not detected"}
                </p>
                <p className="text-gray-500 text-sm">
                  {result.email || "No email"} · {result.phone || "No phone"}
                </p>
              </div>

              <div className="h-24 w-24 rounded-full border-4 border-purple-500 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">{result.score}</p>
                  <p className="text-xs text-gray-400">AI Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-3">Summary</h3>
            <p className="text-gray-300 leading-relaxed">{result.summary}</p>
          </div>

          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-3">Primary Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-500/20 text-purple-200 px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">Strengths</h3>
              <ul className="space-y-2 text-gray-300">
                {result.strengths?.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-3">Gaps</h3>
              <ul className="space-y-2 text-gray-300">
                {result.gaps?.map((item, index) => (
                  <li key={index}>⚠️ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <button className="rounded-xl bg-purple-600 hover:bg-purple-700 px-5 py-3 font-semibold">
            Add to Pipeline
          </button>
        </section>
      )}
    </main>
  );
}