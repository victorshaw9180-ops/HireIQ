"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  
  const [stats, setStats] = useState({
  totalCandidates: 0,
  totalJobs: 0,
  totalApplications: 0,
  totalInterviews: 0,
  totalHires: 0,
});

const [loading, setLoading] = useState(true);
const [leaderboard, setLeaderboard] = useState<any[]>([]);

useEffect(() => {
  fetch("/api/dashboard/stats")
    .then((res) => res.json())
    .then((data) => {
      setStats(data);
    });
     fetch("/api/dashboard/recruiters")
    .then((res) => res.json())
    .then((data) => {
      setLeaderboard(data);
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          TalentHawk
        </Link>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Link
            href="/pricing"
            style={{
              color: "#A8B0C3",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Pricing
          </Link>

          <Link
            href="/sign-in"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>

          <Link
            href="/sign-up"
            style={{
              background: "#6C63FF",
              color: "white",
              padding: "10px 16px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Start Free
          </Link>
        </div>
      </nav>

      <section
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(108,99,255,0.15)",
              border: "1px solid rgba(108,99,255,0.35)",
              color: "#A8A3FF",
              padding: "8px 14px",
              borderRadius: 999,
              marginBottom: 20,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            AI-Powered Enterprise Recruitment Operating System
          </div>

          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            TalentHawk
          </h1>

          <p
            style={{
              fontSize: 20,
              color: "#A8B0C3",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Parse resumes, score candidates, match talent to jobs, and manage
            your hiring pipeline faster with AI.
          </p>  

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5 mt-8">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Candidates</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
        {loading ? "..." : stats.totalCandidates}
        </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Jobs</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
        {loading ? "..." : stats.totalJobs}
        </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Applications</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
        {loading ? "..." : stats.totalApplications}
        </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Interviews</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
        {loading ? "..." : stats.totalInterviews}
        </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Hires</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
        {loading ? "..." : stats.totalHires}
        </h2>
        </div>

        </div>

      <div
      style={{
      marginTop: 50,
      background: "#111827",
      border: "1px solid #1F2937",
      borderRadius: 20,
      padding: 24,
      textAlign: "left",
      }}
      >
      <h2
      style={{
      fontSize: 24,
      fontWeight: 800,
      marginBottom: 20,
      }}
      >
      Recruiter Leaderboard
      </h2>

      {leaderboard.length === 0 ? (
      <p style={{ color: "#94A3B8" }}>
      No recruiter analytics available yet.
      </p>
      ) : (
      <div style={{ display: "grid", gap: 14 }}>
      {leaderboard.map((recruiter, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0F172A",
            border: "1px solid #1E293B",
            borderRadius: 14,
            padding: "14px 18px",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 4,
              }}
            >
              {recruiter.recruiter}
            </p>

            <p
              style={{
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              Submissions: {recruiter.submissions}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 14,
            }}
          >
            <span>🎯 Interviews: {recruiter.interviews}</span>
            <span>🏆 Hires: {recruiter.hires}</span>
          </div>
        </div>
      ))}
      </div>
      )}
      </div>
      
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <Link
              href="/sign-up"
              style={{
                background: "#6C63FF",
                color: "white",
                padding: "14px 22px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Start Free
            </Link>

            <Link
              href="/pricing"
              style={{
                border: "1px solid #2A2F3E",
                color: "white",
                padding: "14px 22px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}