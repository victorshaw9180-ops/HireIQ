import BackButton from "@/components/BackButton";
import { PLAN_CONFIG } from "@/lib/plans";

const plans = [
  PLAN_CONFIG.starter,
  PLAN_CONFIG.growth,
  PLAN_CONFIG.enterprise,
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Billing & Subscription
        </h1>

        <p className="mt-2 text-slate-400">
          Upgrade your TalentHawk subscription.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.planId}
            className={`rounded-2xl border p-6 ${
              plan.planId === "growth"
                ? "border-purple-500 bg-purple-950/30"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            <h2 className="text-xl font-bold">
              {plan.uiName}
            </h2>

            <p className="mt-4 text-4xl font-bold">
              ₹{plan.monthlyPrice}
            </p>

            <p className="text-sm text-slate-400">
              per month
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>✓ {plan.recruiterSeats} Recruiter Seats</li>
              <li>✓ {plan.aiCredits} AI Credits</li>

              <li>
                ✓{" "}
                {plan.resumePool >= 999999
                  ? "Unlimited Resume Pool"
                  : `${plan.resumePool} Resume Pool`}
              </li>

              <li>
                ✓{" "}
                {plan.activeJobs >= 9999
                  ? "Unlimited Jobs"
                  : `${plan.activeJobs} Active Jobs`}
              </li>

              {plan.bulkEmail && <li>✓ Bulk Email</li>}
              {plan.teamManagement && <li>✓ Team Management</li>}
              {plan.advancedAnalytics && (
                <li>✓ Advanced Analytics</li>
              )}
            </ul>

            <button className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold">
              Upgrade via Razorpay
            </button>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold">
          Payment Method
        </h2>

        <p className="mt-2 text-slate-400">
          Razorpay (UPI, Cards, Net Banking, Wallets)
        </p>
      </section>
    </main>
  );
}