import { FileText, Plus } from "lucide-react";
export default function CandidateHoverActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="group relative">
        <button className="rounded-full bg-yellow-500/15 p-2 text-yellow-300 hover:bg-yellow-500/25">
          <FileText size={16} />
        </button>

        <div className="absolute left-0 top-12 z-50 hidden w-[360px] rounded-2xl border border-slate-700 bg-slate-900/90 p-4 text-sm shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:block">
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

        <div className="absolute left-0 top-12 z-50 hidden w-[650px] max-h-[420px] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900/90 p-4 text-sm shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:block">
          <h3 className="mb-3 font-semibold text-white">Submission Timeline</h3>

  <div className="space-y-3">
  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
  <p className="font-medium text-white">
    Java Developer{" "}
    <span className="text-slate-400">
      (Client Req ID: INF-JD-2048 / TalentHawk ID: TH-REQ-1001)
    </span>{" "}
    — Infosys
  </p>
  <div className="mt-2 flex items-center gap-2">
  <span className="rounded-full bg-purple-600/20 px-2 py-1 text-xs text-purple-300">
    Submitted
  </span>

  <span className="text-xs text-slate-400">
    Recruiter: Vishal Shah
  </span>
</div>
  <p className="text-slate-500">Today, 11:20 AM</p>
            </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
    <p className="font-medium text-white">
    SAP Consultant{" "}
    <span className="text-slate-400">
      (Client Req. ID: DEL-SAP-8821 / TalentHawk ID: TH-REQ-1002)
    </span>{" "}
    — Deloitte
    </p>
    <div className="mt-2 flex items-center gap-2">
  <span className="rounded-full bg-yellow-600/20 px-2 py-1 text-xs text-yellow-300">
    Interview
  </span>

  <span className="text-xs text-slate-400">
    Recruiter: Priya Mehta
  </span>
</div>
    <p className="text-slate-500">Yesterday, 5:40 PM</p>
    </div>

    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
    <p className="font-medium text-white">
    Data Analyst{" "}
    <span className="text-slate-400">
    (Client Req. ID: TCS-DA-4410 / TalentHawk ID: TH-REQ-1003)
    </span>{" "}
    — TCS
    </p>
    <div className="mt-2 flex items-center gap-2">
  <span className="rounded-full bg-blue-600/20 px-2 py-1 text-xs text-blue-300">
    Offer
  </span>

  <span className="text-xs text-slate-400">
    Recruiter: Aman Patel
  </span>
</div>
    <p className="text-slate-500">May 12, 2026</p>
    </div>
  
  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
  <p className="font-medium text-white">
    DevOps Engineer{" "}
    <span className="text-slate-400">
      (Client Req. ID: ACC-DEVOPS-7710 / TalentHawk ID: TH-REQ-1004)
    </span>{" "}
    — Accenture
  </p>

  <div className="mt-2 flex items-center gap-2">
    <span className="rounded-full bg-green-700/30 px-2 py-1 text-xs text-green-300">
      Placed
    </span>

    <span className="text-xs text-slate-400">
      Recruiter: Vishal Shah
    </span>
  </div>

  <p className="mt-1 text-xs text-slate-500">May 10, 2026</p>
</div>

</div>
    </div>
      </div>
    </div>
  );
}