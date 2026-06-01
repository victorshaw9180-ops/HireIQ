"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { PLAN_CONFIG } from "@/lib/plans";

const plans = [
  PLAN_CONFIG.free,
  PLAN_CONFIG.starter,
  PLAN_CONFIG.growth,
  PLAN_CONFIG.enterprise,
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <BackButton />

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          TalentHawk Pricing
        </h1>

        <p className="mt-2 text-slate-400">
          Built for Recruiters. Built by Recruiters.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.planId}
            className={`rounded-2xl border p-6 ${
              plan.planId === "growth"
                ? "border-purple-500 bg-purple-950/30"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            <h2 className="text-2xl font-bold">
              {plan.uiName}
            </h2>

            <p className="mt-4 text-4xl font-bold">
              ₹{plan.monthlyPrice}
            </p>

            {plan.monthlyPrice > 0 && (
              <p className="text-sm text-slate-400">
                per month
              </p>
            )}

            <ul className="mt-6 space-y-3 text-sm">
              <li>✓ {plan.recruiterSeats} Recruiter Seat(s)</li>
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

            <Link
              href="/billing"
              className="mt-6 block rounded-xl bg-purple-600 px-4 py-3 text-center font-semibold"
            >
              {plan.planId === "free"
                ? "Start Free"
                : `Choose ${plan.uiName}`}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}