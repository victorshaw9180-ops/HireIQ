"use client";

const plans = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    badge: "Try Free",
    description: "One-time trial for new recruiters",
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
    badge: "Most Popular",
    description: "For active recruiters and small teams",
    features: [
      "1000 resume pool / month",
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
    badge: "Agency Scale",
    description: "For staffing agencies and power teams",
    features: [
      "Unlimited resume pool",
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
        padding: "48px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Choose Your Plan</h1>
      <p style={{ color: "#A8B0C3", marginTop: 8, marginBottom: 32 }}>
        Start free, then upgrade as your recruiting workflow grows.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              background:
                plan.id === "growth" ? "rgba(108,99,255,0.16)" : "#0f131a",
              border:
                plan.id === "growth"
                  ? "1px solid #6C63FF"
                  : "1px solid #2A2F3E",
              borderRadius: 18,
              padding: 24,
              position: "relative",
            }}
          >
            {plan.badge && (
              <div
                style={{
                  display: "inline-block",
                  background: "#6C63FF",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                {plan.badge}
              </div>
            )}

            <h2 style={{ fontSize: 24, fontWeight: 800 }}>{plan.name}</h2>
            <p style={{ color: "#8B91A8", marginTop: 8 }}>
              {plan.description}
            </p>

            <p style={{ fontSize: 34, fontWeight: 800, marginTop: 20 }}>
              {plan.price}
            </p>

            <ul style={{ marginTop: 22, paddingLeft: 0, listStyle: "none" }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ marginBottom: 10, color: "#DCE3F0" }}>
                  ✅ {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => upgrade(plan.id)}
              style={{
                width: "100%",
                marginTop: 22,
                background: "#A100FF",
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "12px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {plan.id === "free" ? "Start Free" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}