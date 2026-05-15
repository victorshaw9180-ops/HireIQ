import BackButton from "@/components/BackButton";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Inbox,
  Megaphone,
  Clock,
  CheckCircle,
  Users,
  Mic,
} from "lucide-react";

const modules = [
  {
    title: "EmailBox",
    subtitle: "Inbox, sent emails, templates, bulk outreach, Outlook sync",
    icon: <Mail size={22} />,
    status: "Ready for integration",
  },
  {
    title: "PhoneBox",
    subtitle: "Call logs, voicemail, call notes, transcripts, click-to-call",
    icon: <Phone size={22} />,
    status: "Coming next",
  },
  {
    title: "TextBox",
    subtitle: "SMS conversations, reminders, interview confirmations",
    icon: <MessageSquare size={22} />,
    status: "Planned",
  },
  {
    title: "WhatsApp Connect",
    subtitle: "Candidate WhatsApp outreach, confirmations, and follow-ups",
    icon: <Send size={22} />,
    status: "Planned",
  },
  {
    title: "Campaigns",
    subtitle: "Bulk emails, broadcast campaigns, engagement tracking",
    icon: <Megaphone size={22} />,
    status: "Planned",
  },
  {
    title: "Communication Timeline",
    subtitle: "All candidate/client communication history in one place",
    icon: <Clock size={22} />,
    status: "Enterprise feature",
  },
];

const emailRecords = [
  {
    candidate: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    subject: "Java Developer Opportunity",
    status: "Delivered",
    time: "Today, 11:42 AM",
  },
  {
    candidate: "Priya Mehta",
    email: "priya.mehta@email.com",
    subject: "Interview Availability Request",
    status: "Read",
    time: "Today, 10:15 AM",
  },
  {
    candidate: "Amit Patel",
    email: "amit.patel@email.com",
    subject: "Follow-up regarding submission",
    status: "Sent",
    time: "Yesterday, 7:20 PM",
  },
];

export default function TalentConnectPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <BackButton />

      <div className="mb-8">
        <p className="text-sm font-semibold text-purple-400">
          TalentConnect
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          Communication Center
        </h1>
        <p className="mt-2 max-w-4xl text-slate-400">
          Manage candidate, recruiter, manager, and client communication across
          email, calls, SMS, WhatsApp, campaigns, and communication timelines.
        </p>
      </div>

      <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg hover:border-purple-500 transition"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-purple-600/20 p-3 text-purple-300">
                {module.icon}
              </div>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                {module.status}
              </span>
            </div>

            <h2 className="text-xl font-bold">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{module.subtitle}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">TalentHawk Email Center</h2>
              <p className="mt-1 text-sm text-slate-400">
                Send single emails, track delivery, and prepare bulk outreach.
              </p>
            </div>

            <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-500">
              Compose Email
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Inbox", "24", <Inbox key="inbox" size={18} />],
              ["Sent", "312", <Send key="sent" size={18} />],
              ["Delivered", "286", <CheckCircle key="delivered" size={18} />],
              ["Bulk Queue", "50", <Users key="users" size={18} />],
            ].map(([title, value, icon]) => (
              <div
                key={title as string}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="mb-2 text-purple-300">{icon}</div>
                <p className="text-sm text-slate-400">{title}</p>
                <h3 className="mt-1 text-2xl font-bold">{value}</h3>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {emailRecords.map((record) => (
                  <tr
                    key={record.email}
                    className="border-t border-slate-800"
                  >
                    <td className="p-4 font-medium">{record.candidate}</td>
                    <td className="p-4 text-slate-400">{record.email}</td>
                    <td className="p-4 text-slate-300">{record.subject}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs text-purple-300">
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{record.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">PhoneBox Preview</h2>
          <p className="mt-2 text-sm text-slate-400">
            Future calling module for recruiter calls, voicemail, call logs,
            transcripts, and candidate/client call history.
          </p>

          <div className="mt-6 space-y-4">
            {[
              ["Calls Logged", "84"],
              ["Voicemails", "12"],
              ["Transcripts", "31"],
              ["Pending Follow-ups", "19"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="text-sm text-slate-400">{title}</p>
                <h3 className="mt-1 text-2xl font-bold">{value}</h3>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="mb-2 flex items-center gap-2 text-purple-300">
              <Mic size={18} />
              Call Transcript AI
            </div>
            <p className="text-sm text-slate-400">
              Later, TalentHawk can summarize recruiter calls and attach notes
              to candidate/client timelines.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}