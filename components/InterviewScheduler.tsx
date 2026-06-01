"use client";

import { useEffect, useState } from "react";

type Interview = {
  id: string;
  title: string;
  interviewerName: string;
  scheduledAt: string;
  status: string;
};

type Props = {
  applicationId: string;
};

export default function ScheduleInterview({
  applicationId,
}: Props) {

  const [interviews, setInterviews] = useState<Interview[]>([]);

  const [title, setTitle] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  async function fetchInterviews() {

    const res = await fetch(
      `/api/applications/${applicationId}/interviews`
    );

    const data = await res.json();

    setInterviews(data);
  }

  useEffect(() => {
    fetchInterviews();
  }, []);

  async function scheduleInterview() {

    if (
      !title ||
      !interviewerName ||
      !scheduledAt
    ) return;

    await fetch(
      `/api/applications/${applicationId}/interviews`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          interviewerName,
          scheduledAt,
        }),
      }
    );

    setTitle("");
    setInterviewerName("");
    setScheduledAt("");

    fetchInterviews();
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <h2 className="mb-5 text-lg font-bold text-white">
        Schedule Interview
      </h2>

      <div className="mb-5 grid gap-3 md:grid-cols-3">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Interview Round"
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />

        <input
          value={interviewerName}
          onChange={(e) => setInterviewerName(e.target.value)}
          placeholder="Interviewer Name"
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />

        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />

      </div>

      <button
        onClick={scheduleInterview}
        className="mb-6 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500"
      >
        Schedule Interview
      </button>

      <div className="flex flex-col gap-3">

        {interviews.length === 0 ? (

          <div className="text-sm text-slate-400">
            No interviews scheduled.
          </div>

        ) : (

          interviews.map((interview) => (

            <div
              key={interview.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >

              <div className="mb-2 flex items-center justify-between">

                <span className="font-semibold text-white">
                  {interview.title}
                </span>

                <span className="text-xs text-violet-400">
                  {interview.status}
                </span>

              </div>

              <div className="text-sm text-slate-300">
                Interviewer: {interview.interviewerName}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {new Date(interview.scheduledAt).toLocaleString()}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}