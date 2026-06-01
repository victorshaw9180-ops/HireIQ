"use client";

import { emailTemplates } from "@/lib/emailTemplates";

export default function EmailTemplateSelector({
  onSelect,
}: {
  onSelect: (template: {
    subject: string;
    body: string;
  }) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {emailTemplates.map((template) => (
        <button
          key={template.id}
          onClick={() =>
            onSelect({
              subject: template.subject,
              body: template.body,
            })
          }
          className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-violet-500"
        >
          <h3 className="font-semibold">
            {template.name}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {template.subject}
          </p>
        </button>
      ))}
    </div>
  );
}