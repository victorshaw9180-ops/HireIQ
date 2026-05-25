"use client";

type Activity = {
  id: string;
  type: string;
  content: string;
  createdAt: string;
};

type Props = {
  activities: Activity[];
};

export default function ApplicationActivityTimeline({
  activities,
}: Props) {
  if (!activities.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-500">
          No activity found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Activity Timeline
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-l border-purple-500 pl-4"
          >
            <p className="text-sm text-white">
              {activity.content}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}