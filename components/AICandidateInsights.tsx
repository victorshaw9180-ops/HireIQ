"use client";

import { useState } from "react";

type Props = {
  candidateName: string;
  resumeText: string;
  jobTitle: string;
};

export default function AICandidateInsights({
  candidateName,
  resumeText,
  jobTitle,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>(null);

  async function generateInsights() {
    try {

      setLoading(true);

      const res = await fetch(
        "/api/ai/candidate-insights",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            candidateName,
            resumeText,
            jobTitle,
          }),
        }
      );

      const result = await res.json();

      setData(result);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-bold text-white">
          AI Candidate Intelligence
        </h2>

        <button
          onClick={generateInsights}
          disabled={loading}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
        >
          {loading ? "Analyzing..." : "Generate AI Insights"}
        </button>

      </div>

      {!data ? (
        <div className="text-sm text-slate-400">
          Generate AI-powered recruiter insights.
        </div>
      ) : (
        <div className="space-y-5">

          <div>
            <h3 className="mb-2 text-sm font-bold text-violet-400">
              Summary
            </h3>

            <p className="text-sm text-slate-200">
              {data.summary}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-green-400">
              Strengths
            </h3>

            <ul className="list-disc pl-5 text-sm text-slate-200">
              {data.strengths?.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-red-400">
              Risks
            </h3>

            <ul className="list-disc pl-5 text-sm text-slate-200">
              {data.risks?.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-yellow-400">
              Interview Focus
            </h3>

            <ul className="list-disc pl-5 text-sm text-slate-200">
              {data.interviewFocus?.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-cyan-400">
              Recommendation
            </h3>

            <p className="text-sm text-slate-200">
              {data.recommendation}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}