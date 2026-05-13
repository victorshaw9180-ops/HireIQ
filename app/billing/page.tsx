import BackButton from "@/components/BackButton";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "For solo recruiters and small teams.",
    features: ["100 resume parses", "AI matching", "Basic analytics", "1 workspace"],
  },
  {
    name: "Growth",
    price: "$79",
    desc: "For growing staffing teams.",
    features: ["1,000 resume parses", "Advanced analytics", "Team access", "Priority email support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For agencies and enterprise hiring teams.",
    features: ["Unlimited users", "Custom workflows", "Dedicated support", "Client-wise analytics"],
  },
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <div className="mb-8">
        <p className="text-sm font-semibold text-purple-400">TalentHawk Billing</p>
        <h1 className="mt-2 text-3xl font-bold">Plans & Payments</h1>
        <p className="mt-2 text-slate-400">
          Manage subscription plans, AI credits, invoices, and recruitment automation billing.
        </p>
      </div>

      <section className="mb-8 grid gap-6 md:grid-cols-4">
        {[
          ["Current Plan", "Growth"],
          ["AI Credits Used", "1,284"],
          ["Credits Remaining", "8,716"],
          ["Next Billing Date", "June 12, 2026"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >
            <p className="text-sm text-slate-400">{title}</p>
            <h2 className="mt-2 text-2xl font-bold">{value}</h2>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 shadow-lg ${
              plan.popular
                ? "border-purple-500 bg-purple-950/30"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            {plan.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold">
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>

            <p className="mt-6 text-4xl font-bold">{plan.price}</p>
            {plan.price !== "Custom" && (
              <p className="text-sm text-slate-500">per month</p>
            )}

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <button className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold hover:bg-purple-500">
              {plan.price === "Custom" ? "Contact Sales" : "Subscribe"}
            </button>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold">Payment Methods</h2>
        <p className="mt-2 text-sm text-slate-400">
          Stripe integration will support cards, invoices, wallets, and eligible local payment methods.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            Credit / Debit Cards
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            Wallet Payments
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            UPI / Local Payments
          </div>
        </div>
      </section>
    </main>
  );
}