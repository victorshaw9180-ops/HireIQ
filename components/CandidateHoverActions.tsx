import { FileText, Plus } from "lucide-react";

export default function CandidateHoverActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="group relative">
        <button className="rounded-full bg-yellow-500/15 p-2 text-yellow-300 hover:bg-yellow-500/25">
          <FileText size={16} />
        </button>

        <div className="absolute left-0 top-10 z-50 hidden w-80 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 text-sm shadow-2xl backdrop-blur-xl group-hover:block">
          <h3 className="mb-3 font-semibold text-white">Latest Notes</h3>
          <p className="text-slate-300">• Candidate prefers remote roles.</p>
          <p className="mt-2 text-slate-300">• Strong US IT recruitment background.</p>
          <p className="mt-2 text-slate-500">Added by Vishal Shah · 2 days ago</p>
        </div>
      </div>

      <div className="group relative">
        <button className="rounded-full bg-purple-500/15 p-2 text-purple-300 hover:bg-purple-500/25">
          <Plus size={16} />
        </button>

        <div className="absolute left-0 top-10 z-50 hidden w-96 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 text-sm shadow-2xl backdrop-blur-xl group-hover:block">
          <h3 className="mb-3 font-semibold text-white">Submission Timeline</h3>

          <div className="space-y-3">
            <div>
  <p className="font-medium text-white">
    Java Developer{" "}
    <span className="text-slate-400">
      (Client Req ID: INF-JD-2048 / TalentHawk Req ID: TH-REQ-1001)
    </span>{" "}
    — Infosys
  </p>
  <p className="text-purple-300">Submitted · Recruiter: Vishal Shah</p>
  <p className="text-slate-500">Today, 11:20 AM</p>
</div>

<div>
    <div>
    <p className="font-medium text-white">
    SAP Consultant{" "}
    <span className="text-slate-400">
      (Client Req ID: DEL-SAP-8821 / TalentHawk Req ID: TH-REQ-1002)
    </span>{" "}
    — Deloitte
    </p>
    <p className="text-blue-300">Interview · Recruiter: Priya Mehta</p>
    <p className="text-slate-500">Yesterday, 5:40 PM</p>
    </div>

    <div>
    <p className="font-medium text-white">
    Data Analyst{" "}
    <span className="text-slate-400">
    (Client Req ID: TCS-DA-4410 / TalentHawk Req ID: TH-REQ-1003)
    </span>{" "}
    — TCS
    </p>
    <p className="text-green-300">Offer · Recruiter: Aman Patel</p>
    <p className="text-slate-500">May 12, 2026</p>
    </div>
</div>
        </div>
      </div>
    </div>
  );
}