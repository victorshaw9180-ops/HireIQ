import BackButton from "@/components/BackButton";
import CandidateHoverActions from "@/components/CandidateHoverActions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const bestFitJobs = [
  {
    title: "Java Developer",
    client: "Infosys",
    match: "92%",
    location: "Remote",
    status: "Open",
  },
  {
    title: "SAP Consultant",
    client: "Deloitte",
    match: "86%",
    location: "New Jersey",
    status: "Interviewing",
  },
  {
    title: "Data Analyst",
    client: "TCS",
    match: "81%",
    location: "Hybrid",
    status: "Open",
  },
];

const applications = [
  {
    job: "Java Developer",
    client: "Infosys",
    stage: "Submitted",
    recruiter: "Vishal Shah",
    date: "May 16, 2026",
  },
  {
    job: "SAP Consultant",
    client: "Deloitte",
    stage: "Interview",
    recruiter: "Priya Mehta",
    date: "May 14, 2026",
  },
  {
    job: "Data Analyst",
    client: "TCS",
    stage: "Offer",
    recruiter: "Aman Patel",
    date: "May 12, 2026",
  },
];

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const candidate = await prisma.candidate.findUnique({
    where: { id },
  });

  if (!candidate) {
    notFound();
  }

  const score =
    candidate.rankingScore && candidate.rankingScore > 0
      ? candidate.rankingScore
      : 72;

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{candidate.name}</h1>
              <CandidateHoverActions />
            </div>

            <p className="mt-2 text-slate-400">
              {candidate.email || "No email added"} · Source:{" "}
              {candidate.source || "Manual Upload"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Java", "Spring Boot", "AWS", "Microservices", "SQL"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-purple-600/20 px-3 py-1 text-xs text-purple-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
            <p className="text-slate-400">Recruiter Owner</p>
            <p className="mt-1 font-semibold">Vishal Shah</p>

            <p className="mt-4 text-slate-400">Candidate Status</p>
            <p className="mt-1 font-semibold text-green-400">Active</p>
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-6 lg:grid-cols-4">
        {[
          ["Current Stage", "Interview"],
          ["Best Match", `${score}%`],
          ["Applications", "3"],
          ["Last Activity", "Today"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{title}</p>
            <h2 className="mt-2 text-2xl font-bold">{value}</h2>
          </div>
        ))}
      </section>

      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">Best Fit Jobs</h2>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Client</th>
                <th className="p-4">Match</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bestFitJobs.map((job) => (
                <tr key={job.title} className="border-t border-slate-800">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4 text-slate-400">{job.client}</td>
                  <td className="p-4 text-green-400">{job.match}</td>
                  <td className="p-4 text-slate-400">{job.location}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold hover:bg-purple-500">
                      Add to Pipeline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          Applications / Pipeline Records
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="p-4">Job</th>
                <th className="p-4">Client</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Recruiter</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={`${app.job}-${app.client}`}
                  className="border-t border-slate-800"
                >
                  <td className="p-4 font-medium">{app.job}</td>
                  <td className="p-4 text-slate-400">{app.client}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300">
                      {app.stage}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{app.recruiter}</td>
                  <td className="p-4 text-slate-500">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">TalentConnect Timeline</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <p>• Email sent: Job opportunity — Today</p>
            <p>• Call logged: Candidate confirmed availability — Yesterday</p>
            <p>• LinkedIn touchpoint added — May 12, 2026</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">AI Insights</h2>
          <p className="mt-4 text-sm text-slate-300">
            Candidate is a strong fit based on parsed profile, source,
            AI match score, and active pipeline suitability.
          </p>
        </div>
      </section>
    </main>
  );
}