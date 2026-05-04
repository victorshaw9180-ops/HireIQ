"use client";

import { useState } from "react";

export default function GenerateJDPage() {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("Professional");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateJD() {
    setLoading(true);
    setJd("");

    const res = await fetch("/api/generate-jd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, skills, tone }),
    });

    const data = await res.json();
    setJd(data.jd || data.error || "No JD generated");
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">AI Job Description Writer</h1>
      <p className="text-gray-400 mb-6">
        Generate job descriptions quickly.
      </p>

      <input
        className="w-full rounded-xl bg-gray-900 border border-gray-700 p-4 mb-4"
        placeholder="Job title e.g. Network Engineer"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full rounded-xl bg-gray-900 border border-gray-700 p-4 mb-4"
        placeholder="Skills e.g. TCP/IP, Routing, Firewall, Cisco"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <select
        className="w-full rounded-xl bg-gray-900 border border-gray-700 p-4 mb-4"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Friendly</option>
        <option>Startup</option>
        <option>Corporate</option>
      </select>

      <button
        onClick={generateJD}
        disabled={loading || !title}
        className="rounded-xl bg-purple-600 px-5 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate JD"}
      </button>

      {jd && (
        <div className="mt-6 rounded-xl bg-gray-900 border border-gray-700 p-5 whitespace-pre-wrap">
          {jd}
        </div>
      )}
    </main>
  );
}