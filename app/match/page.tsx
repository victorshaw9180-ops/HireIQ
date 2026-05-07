"use client";

import { useState } from "react";

export default function MatchPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generateMatch() {
    setLoading(true);

    const res = await fetch("/api/match-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        AI Resume Match
      </h1>

      <p className="text-gray-400 mb-8">
        Compare candidate resumes against job descriptions using AI.
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        <textarea
          placeholder="Paste Resume Text"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 h-72"
        />

        <textarea
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 h-72"
        />

      </div>

      <button
        onClick={generateMatch}
        disabled={loading}
        className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
      >
        {loading ? "Analyzing..." : "Generate Match"}
      </button>

      {result && (
        <div className="mt-10 bg-slate-900 border border-slate-700 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Match Score: {result.matchScore}%
          </h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Strengths</h3>

            <ul className="list-disc ml-6 text-gray-300">
              {result.strengths?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Missing Skills</h3>

            <ul className="list-disc ml-6 text-gray-300">
              {result.missingSkills?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI Summary</h3>

            <p className="text-gray-300">
              {result.summary}
            </p>
          </div>

        </div>
      )}

    </main>
  );
}  