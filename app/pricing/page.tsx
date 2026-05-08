"use client";

import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    badge: "Try Free",
    description: "One-time trial pack for new recruiters",
    features: [
      "50 resume pool",
      "10 AI credits",
      "2 active jobs",
      "Basic pipeline",
      "Resume parser",
    ],
  },
  {
    id: "starter",
    name: "Scout",
    price: "₹349/mo",
    badge: "",
    description: "For solo and freelance recruiters",
    features: [
      "200 resume pool / month",
      "100 AI credits / month",
      "5 active jobs",
      "AI resume scoring",
      "Candidate search",
      "Basic analytics",
    ],
  },
  {
    id: "growth",
    name: "Hunter",
    price: "₹1349/mo",
    badge: "🔥 Most Popular",
    description: "For active recruiters and small teams",
    features: [
      "1000 resumes pool / month",
      "300 AI credits / month",
      "Unlimited active jobs",
      "AI shortlisting",
      "Team collaboration",
      "Recruiter analytics",
    ],
  },
  {
    id: "pro",
    name: "Elite",
    price: "₹3349/mo",
    badge: "🚀 Agency Scale",
    description: "For staffing agencies and power teams",
    features: [
      "Unlimited resumes pool",
      "1000 AI credits / month",
      "Unlimited jobs",
      "Advanced AI matching",
      "Role-based access",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  async function upgrade(plan: string) {
    const res = await fetch("/api/upgrade-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upgrade failed");
      return;
    }

    alert(`Plan updated: ${data.plan}`);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Top Navbar */}
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
            letterSpacing: "-0.5px",
          }}
        >
          TalentHawk
        </Link>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link
            href="/sign-in"
            style={{
              color: "#A8B0C3",
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

      <section style={{ padding: "48px" }}>
        <h1 style={{ fontSize: 38, fontWeight: 800 }}>
          Choose Your TalentHawk Plan
        </h1>

        <p
          style={{
            color: "#A8B0C3",
            marginTop: 8,
            marginBottom: 34,
            fontSize: 16,
          }}
        >
          Start free, then upgrade as your recruiting workflow grows.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background:
                  plan.id === "growth"
                    ? "rgba(108,99,255,0.16)"
                    : "#0f131a",
                border:
                  plan.id === "growth"
                    ? "1px solid #6C63FF"
                    : "1px solid #2A2F3E",
                borderRadius: 18,
                padding: 24,
                minHeight: 520,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                {plan.badge ? (
                  <div
                    style={{
                      display: "inline-block",
                      background: "#6C63FF",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 16,
                    }}
                  >
                    {plan.badge}
                  </div>
                ) : (
                  <div style={{ height: 40 }} />
                )}

                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    marginBottom: 10,
                  }}
                >
                  {plan.name}
                </h2>

                <p
                  style={{
                    color: "#8B91A8",
                    minHeight: 42,
                    lineHeight: 1.5,
                  }}
                >
                  {plan.description}
                </p>

                <p
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    marginTop: 24,
                    marginBottom: 22,
                  }}
                >
                  {plan.price}
                </p>

                <ul
                  style={{
                    paddingLeft: 0,
                    listStyle: "none",
                    margin: 0,
                  }}
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        marginBottom: 12,
                        color: "#DCE3F0",
                        fontSize: 15,
                      }}
                    >
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button pushed to bottom */}
              <button
                onClick={() => upgrade(plan.id)}
                style={{
                  width: "100%",
                  marginTop: "auto",
                  background: "#A100FF",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                {plan.id === "free" ? "Start Free" : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}