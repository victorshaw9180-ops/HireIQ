"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
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
          <Link href="/pricing" style={{ color: "#A8B0C3" }}>
            Pricing
          </Link>

          <Link href="/sign-in" style={{ color: "white" }}>
            Sign in
          </Link>

          <Link
            href="/sign-up"
            style={{
              background: "#6C63FF",
              color: "white",
              padding: "10px 16px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            Start Free
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
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
          AI-Powered Recruitment OS
        </div>

        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          The First AI Recruitment Operating System
          <br />
          Built for Recruiters. Built by Recruiters.
        </h1>

        <p
          style={{
            fontSize: 20,
            color: "#A8B0C3",
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 800,
            marginInline: "auto",
          }}
        >
          TalentHawk helps staffing firms and recruitment agencies source,
          screen, rank, engage and hire candidates faster using AI-powered
          recruiting workflows.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link
            href="/sign-up"
            style={{
              background: "#6C63FF",
              color: "white",
              padding: "14px 22px",
              borderRadius: 12,
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
              fontWeight: 700,
            }}
          >
            View Pricing
          </Link>
        </div>

        {/* FEATURES */}
        <div
          style={{
            marginTop: 70,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {[
            "AI Resume Parsing",
            "AI Candidate Matching",
            "TalentConnect Hub",
            "Pipeline Management",
            "Recruiter Analytics",
            "Team Collaboration",
          ].map((feature) => (
            <div
              key={feature}
              style={{
                background: "#111827",
                border: "1px solid #1F2937",
                borderRadius: 16,
                padding: 20,
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}