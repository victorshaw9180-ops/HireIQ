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
            Parse resumes, score candidates, match talent to jobs, and manage
            your hiring pipeline faster with AI.
          </p>

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