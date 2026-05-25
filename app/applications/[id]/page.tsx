import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },

    include: {
      candidate: true,
      job: true,
      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {application.candidate.name}
          </h1>

          <p className="text-slate-400 mt-2">
            {application.job.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm mb-2">
              Current Stage
            </p>

            <h2 className="text-2xl font-bold">
              {application.stage}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm mb-2">
              Recruiter
            </p>

            <h2 className="text-2xl font-bold">
              {application.recruiterName || "Unknown"}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-400 text-sm mb-2">
              AI Score
            </p>

            <h2 className="text-2xl font-bold">
              {application.aiScore ?? "-"}
            </h2>
          </div>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Activity Timeline
          </h2>

          <div className="space-y-4">

            {application.activities.length === 0 && (
              <p className="text-slate-500">
                No activity yet.
              </p>
            )}

            {application.activities.map((activity) => (
              <div
                key={activity.id}
                className="border border-slate-800 rounded-xl p-4"
              >
                <p className="font-semibold">
                  {activity.type}
                </p>

                <p className="text-slate-300 mt-1">
                  {activity.content}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}