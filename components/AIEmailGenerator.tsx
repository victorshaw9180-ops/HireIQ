"use client";

import { useState } from "react";

export default function AIEmailGenerator() {
  const [candidateName, setCandidateName] =
    useState("");

  const [jobTitle, setJobTitle] =
    useState("");

  const [clientName, setClientName] =
    useState("");

  const [tone, setTone] =
    useState("Professional");

  const [generatedEmail, setGeneratedEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function generateEmail() {
    setLoading(true);

    const res = await fetch(
      "/api/ai/generate-email",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          candidateName,
          jobTitle,
          clientName,
          tone,
        }),
      }
    );

    const data = await res.json();

    setGeneratedEmail(data.email);

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        AI Recruiter Email Generator
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) =>
            setCandidateName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) =>
            setClientName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <select
          value={tone}
          onChange={(e) =>
            setTone(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        >
          <option>
            Professional
          </option>

          <option>
            Friendly
          </option>

          <option>
            Aggressive Recruiting
          </option>
        </select>

        <button
          onClick={generateEmail}
          disabled={loading}
          className="rounded-xl bg-violet-600 px-5 py-3 hover:bg-violet-700"
        >
          {loading
            ? "Generating..."
            : "Generate AI Email"}
        </button>

        {generatedEmail && (
          <textarea
            value={generatedEmail}
            readOnly
            className="min-h-[260px] w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
          />
        )}

      </div>
    </div>
  );
}