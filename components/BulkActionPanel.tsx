"use client";

import { useState } from "react";

export default function BulkActionPanel() {
  const [applicationIds, setApplicationIds] =
    useState("");

  const [stage, setStage] =
    useState("SUBMITTED");

  const [decision, setDecision] =
    useState("PENDING");

  async function bulkUpdate() {
    const ids = applicationIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    await fetch(
      "/api/applications/bulk-update",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          applicationIds: ids,
          stage,
          candidateDecision: decision,
        }),
      }
    );

    alert("Bulk update completed");
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Bulk Candidate Actions
      </h2>

      <div className="space-y-4">

        <textarea
          placeholder="Paste application IDs separated by commas"
          value={applicationIds}
          onChange={(e) =>
            setApplicationIds(e.target.value)
          }
          className="w-full min-h-[120px] rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <select
          value={stage}
          onChange={(e) =>
            setStage(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        >
          <option value="SUBMITTED">
            Submitted
          </option>

          <option value="INTERVIEW1">
            Interview 1
          </option>

          <option value="INTERVIEW2">
            Interview 2
          </option>

          <option value="OFFERED">
            Offered
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>

        <select
          value={decision}
          onChange={(e) =>
            setDecision(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
        >
          <option value="PENDING">
            Pending
          </option>

          <option value="SELECTED">
            Selected
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>

        <button
          onClick={bulkUpdate}
          className="rounded-xl bg-violet-600 px-5 py-3 hover:bg-violet-700"
        >
          Execute Bulk Action
        </button>

      </div>
    </div>
  );
}