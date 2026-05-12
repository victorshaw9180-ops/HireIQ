import Link from "next/link";

const helpCards = [
  {
    title: "Knowledge Base",
    desc: "Guides for resume parsing, AI scoring, jobs, candidates, and pipeline management.",
  },
  {
    title: "Raise a Ticket",
    desc: "Submit issues related to billing, users, resume parsing, or platform access.",
  },
  {
    title: "Billing Support",
    desc: "Manage subscription, invoices, payment issues, and plan upgrades.",
  },
  {
    title: "Product Updates",
    desc: "Track new TalentHawk features, releases, and improvements.",
  },
];

export default function SupportPage() {
  return (
    <main className="p-8 text-white">
      <div className="mb-8">
        <p className="text-sm text-purple-400 font-semibold">
          TalentHawk Helpdesk
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Support Center
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Get help with your AI recruitment workspace, billing, resume parsing,
          candidate pipeline, and team access.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {helpCards.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-purple-500 transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-slate-400 mt-3">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold">Need direct help?</h2>
        <p className="text-slate-400 mt-2">
          Contact TalentHawk support for account, billing, or technical help.
        </p>

        <Link
          href="mailto:support@gettalenthawk.com"
          className="inline-flex mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold hover:bg-purple-500"
        >
          Contact Support
        </Link>
      </div>
    </main>
  );
}