import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  return (
    <main className="p-8 text-white">
    <BackButton />

      <h1 className="text-3xl font-bold mb-2">Settings</h1>

      <p className="text-slate-400 mb-8">
        Manage your TalentHawk workspace, users, preferences, billing and organization.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/settings/general"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            General Settings
          </h2>

          <p className="text-slate-400 text-sm">
            Workspace profile, timezone, branding, and company settings.
          </p>
        </Link>

        <Link
          href="/settings/team"
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Team Management
          </h2>

          <p className="text-slate-400 text-sm">
            Invite recruiters, manage access, and workspace permissions.
          </p>
        </Link>
      </div>
    </main>
  );
}