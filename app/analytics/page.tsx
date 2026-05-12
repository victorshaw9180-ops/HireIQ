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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Monthly Revenue</p>
          <h2 className="text-3xl font-bold mt-2">$42,000</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Placements</p>
          <h2 className="text-3xl font-bold mt-2">48</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Offers Released</p>
          <h2 className="text-3xl font-bold mt-2">72</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Submissions</p>
          <h2 className="text-3xl font-bold mt-2">321</h2>
        </div>
      </div>

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