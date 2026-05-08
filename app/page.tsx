import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ maxWidth: 900, textAlign: "center" }}>
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
          AI-Powered ATS for Modern Recruiters
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
          Parse resumes, score candidates, match talent to jobs, and manage your hiring pipeline faster with AI.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link
            href="/dashboard"
            style={{
              background: "#6C63FF",
              color: "white",
              padding: "14px 22px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open Dashboard
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
      </section>
    </main>
  );
}