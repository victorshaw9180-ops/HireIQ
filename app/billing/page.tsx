import BackButton from "@/components/BackButton";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "For solo recruiters and small teams.",
    features: ["100 resume parses", "AI matching", "Basic analytics"],
  },
  {
    name: "Growth",
    price: "$79",
    desc: "For growing staffing teams.",
    features: ["1,000 resume parses", "Advanced analytics", "Team access"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For agencies and enterprise hiring teams.",
    features: ["Unlimited users", "Custom workflows", "Priority support"],
  },
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <p className="text-sm font-semibold text-purple-400">TalentHawk Billing</p>
      <h1 className="mt-2 text-3xl font-bold">Plans & Payments</h1>
      <p className="mt-2 text-slate-400">
        Choose a plan for AI resume parsing, analytics, and recruitment automation.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-slate-400">{plan.desc}</p>
            <p className="mt-6 text-4xl font-bold">{plan.price}</p>
            <p className="text-sm text-slate-500">per month</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <button className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold hover:bg-purple-500">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}