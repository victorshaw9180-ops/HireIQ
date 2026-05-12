"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

const stages = ["NEW", "SCREENING", "SHORTLISTED", "INTERVIEW", "OFFER", "HIRED", "REJECTED"];

export default function PipelinePage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => {
        console.log("APPLICATIONS:", data);
        setApplications(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading pipeline...</div>;
  }

  return (
    <main className="p-6 text-white">

      <BackButton />
      
      <h1 className="text-2xl font-bold mb-6">Pipeline</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-4">
        {stages.map((stage) => {
          const stageApps = applications.filter(
            (app) => String(app.stage).toUpperCase() === stage
          );

          return (
            <div key={stage} className="bg-slate-900 rounded-xl p-3 min-h-[500px]">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-sm">{stage}</h2>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageApps.length === 0 && (
                  <p className="text-xs text-gray-500">No candidates</p>
                )}

                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-black border border-slate-700 rounded-lg p-3"
                  >
                    <p className="font-semibold text-sm">
                      {app.candidate?.name || "No Name"}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {app.job?.title || "No Job"}
                    </p>

                    {app.aiScore !== null && app.aiScore !== undefined && (
                      <p className="text-xs text-purple-300 mt-2">
                        AI Score: {app.aiScore}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}