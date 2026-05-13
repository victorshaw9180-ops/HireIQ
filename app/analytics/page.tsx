"use client";

import BackButton from "@/components/BackButton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 31000 },
  { month: "May", revenue: 42000 },
];

const placementData = [
  { name: "Placements", value: 48 },
  { name: "Offers", value: 72 },
  { name: "Interviews", value: 120 },
];

const recruiterData = [
  { recruiter: "Vishal", submissions: 85 },
  { recruiter: "Aman", submissions: 64 },
  { recruiter: "Rahul", submissions: 98 },
  { recruiter: "Priya", submissions: 74 },
];

const COLORS = ["#8b5cf6", "#6366f1", "#ec4899"];

export default function AnalyticsPage() {
  return (
    <main className="p-8 text-white">
        
        <BackButton />

      <div className="mb-8">
        <p className="text-purple-400 font-semibold">
          TalentHawk Analytics
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Business Intelligence Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Revenue, placements, recruiter productivity, and pipeline analytics.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {[
    ["Total Revenue", "$42,000", "+31% this month"],
    ["Monthly Revenue", "$12,400", "May 2026"],
    ["Placements", "48", "+18% growth"],
    ["Offers Released", "72", "38.9% conversion"],
    ["Submissions", "321", "Active pipeline"],
    ["Interviews", "120", "From submitted candidates"],
    ["Active Clients", "14", "Across all teams"],
    ["AI Credits Used", "1,284", "Resume parsing + matching"],
  ].map(([title, value, note]) => (
    <div
      key={title}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      <p className="mt-2 text-sm text-purple-400">{note}</p>
    </div>
  ))}
</div>
      
      
<section className="mb-8">
  <h2 className="mb-4 text-2xl font-bold">Revenue Intelligence</h2>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {[
      ["Quarterly Revenue", "$96,000"],
      ["Half-Year Revenue", "$184,000"],
      ["Annual Revenue", "$420,000"],
      ["Avg Placement Fee", "$8,750"],
    ].map(([title, value]) => (
      <div
        key={title}
        className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-bold">{value}</h3>
      </div>
    ))}
  </div>
</section>

<section className="mb-8">
  <h2 className="mb-4 text-2xl font-bold">Recruiter Productivity KPIs</h2>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {[
      ["Avg Time to Fill", "24 days", "Target: under 30 days"],
      ["Submission → Interview", "37.3%", "Strong screening quality"],
      ["Interview → Offer", "38.9%", "Healthy conversion"],
      ["Offer → Join", "81.2%", "Good closure ratio"],
      ["Revenue / Recruiter", "$14,000", "Monthly average"],
      ["Client Response Time", "18 hrs", "Avg feedback time"],
      ["Candidate Drop-off", "11.4%", "Needs monitoring"],
      ["Open Jobs", "36", "Active requirements"],
    ].map(([title, value, note]) => (
      <div
        key={title}
        className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
      >
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-bold">{value}</h3>
        <p className="mt-2 text-sm text-slate-500">{note}</p>
      </div>
    ))}
  </div>
</section>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Revenue Growth
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Hiring Funnel
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {placementData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recruiter Performance
        </h2>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recruiterData}>
              <XAxis dataKey="recruiter" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar
                dataKey="submissions"
                fill="#8b5cf6"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}