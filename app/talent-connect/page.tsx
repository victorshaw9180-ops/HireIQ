"use client";

import BackButton from "@/components/BackButton";
import { useState } from "react";

const templates = [
  "Interview Invitation",
  "Job Opportunity",
  "Follow-up Email",
  "Candidate Rejection",
];

export default function EmailPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <div className="mb-8">
        <p className="text-sm font-semibold text-purple-400">
          TalentHawk Email Center
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Recruiter Communication Hub
        </h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          Send candidate outreach, interview invites, follow-ups,
          and recruiter communication directly from TalentHawk.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <label className="mb-2 block text-sm text-slate-400">
              Recipient Email
            </label>

            <input
              type="email"
              placeholder="candidate@email.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm text-slate-400">
              Subject
            </label>

            <input
              type="text"
              placeholder="Interview Opportunity with TalentHawk"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm text-slate-400">
              Email Template
            </label>

            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
            >
              <option value="">Select Template</option>

              {templates.map((template) => (
                <option key={template} value={template}>
                  {template}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm text-slate-400">
              Message
            </label>

            <textarea
              rows={12}
              placeholder="Write your recruiter outreach email..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500">
              Send Email
            </button>

            <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800">
              Save Draft
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">
            Email Analytics
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-slate-400">
                Emails Sent Today
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                128
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Open Rate
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                62%
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Reply Rate
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                28%
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Campaigns Running
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                4
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}