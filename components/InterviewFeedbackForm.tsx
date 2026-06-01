"use client";

import { useState } from "react";

export default function InterviewFeedbackForm({
  interviewId,
}: {
  interviewId: string;
}) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [recommendation, setRecommendation] = useState("SELECT");

  async function submitFeedback() {
    await fetch(`/api/interviews/${interviewId}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        feedback,
        recommendation,
      }),
    });

    alert("Feedback submitted");
  }

  return (
    <div className="border border-slate-800 rounded-xl p-5 mt-5">
      <h3 className="text-lg font-semibold mb-4">
        Interview Feedback
      </h3>

      <div className="space-y-4">

        <div>
          <label className="text-sm block mb-2">
            Rating (1-10)
          </label>

          <input
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm block mb-2">
            Feedback
          </label>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 min-h-[120px]"
          />
        </div>

        <div>
          <label className="text-sm block mb-2">
            Recommendation
          </label>

          <select
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
          >
            <option value="SELECT">Select</option>
            <option value="REJECT">Reject</option>
            <option value="HOLD">Hold</option>
            <option value="NEXT_ROUND">Next Round</option>
          </select>
        </div>

        <button
          onClick={submitFeedback}
          className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
        >
          Submit Feedback
        </button>

      </div>
    </div>
  );
}