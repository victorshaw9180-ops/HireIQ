"use client";

import { useState } from "react";

type Props = {
  applicationId: string;
  stage: string;
  label: string;
};

export default function UpdateStageButton({
  applicationId,
  stage,
  label,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to update stage");
        return;
      }

      setMessage(data.message || "Stage updated");
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Updating..." : label}
      </button>

      {message && <p className="mt-2 text-xs text-slate-400">{message}</p>}
    </div>
  );
}
// UpdateStageButton module export verified