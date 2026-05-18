"use client";

import { useState } from "react";

type Props = {
  candidateId: string;
  jobId: string;
  orgId: string;
};

export default function AddToPipelineButton({ candidateId, jobId, orgId }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAdd() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/applications/add-to-pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidateId, jobId, orgId }),
    });

    const data = await res.json();
    setMessage(data.message || data.error || "Done");
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleAdd}
        disabled={loading}
        className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold hover:bg-purple-500 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add to Pipeline"}
      </button>

      {message && (
        <p className="mt-2 text-xs text-slate-400">{message}</p>
      )}
    </div>
  );
}