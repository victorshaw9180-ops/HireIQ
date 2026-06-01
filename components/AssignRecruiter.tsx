"use client";

import { useEffect, useState } from "react";

interface Recruiter {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  applicationId: string;
  currentRecruiterId?: string | null;
}

export default function AssignRecruiter({
  applicationId,
  currentRecruiterId,
}: Props) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(
    currentRecruiterId || ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRecruiters() {
      try {
        const response = await fetch("/api/team");

        if (!response.ok) {
          throw new Error("Failed to fetch recruiters");
        }

        const data = await response.json();

        setRecruiters(data);
      } catch (error) {
        console.error("FETCH RECRUITERS ERROR:", error);
      }
    }

    fetchRecruiters();
  }, []);

  async function handleAssignRecruiter() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `/api/applications/${applicationId}/assign`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recruiterId: selectedRecruiter,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Assignment failed");
      }

      setMessage("Recruiter assigned successfully");
    } catch (error) {
      console.error("ASSIGN RECRUITER ERROR:", error);

      setMessage("Failed to assign recruiter");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
      }}
    >
      <h3
        style={{
          color: "white",
          marginBottom: 18,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Assign Recruiter
      </h3>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={selectedRecruiter}
          onChange={(e) => setSelectedRecruiter(e.target.value)}
          style={{
            background: "#111827",
            color: "white",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: "12px 14px",
            minWidth: 260,
            outline: "none",
          }}
        >
          <option value="">Select Recruiter</option>

          {recruiters.map((recruiter) => (
            <option
              key={recruiter.id}
              value={recruiter.id}
            >
              {recruiter.name} ({recruiter.role})
            </option>
          ))}
        </select>

        <button
          onClick={handleAssignRecruiter}
          disabled={loading || !selectedRecruiter}
          style={{
            background: loading ? "#374151" : "#6C63FF",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "12px 18px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Assigning..." : "Assign Recruiter"}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: 16,
            color:
              message === "Recruiter assigned successfully"
                ? "#22c55e"
                : "#ef4444",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          marginTop: 20,
          borderTop: "1px solid #1e293b",
          paddingTop: 16,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          • Assign ownership of candidate pipeline
          <br />
          • Recruiters can manage interviews and notes
          <br />
          • Enables enterprise multi-user ATS workflows
        </div>
      </div>
    </div>
  );
}