export default function TeamSettingsPage() {
  return (
    <main className="p-8 text-white max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Team Settings</h1>
      <p className="text-gray-400 mb-8">Invite recruiters and manage access.</p>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Invite Team Member</h2>

        <input
          placeholder="teammate@email.com"
          className="w-full bg-black border border-slate-700 rounded-xl p-3 mb-4"
        />

        <select className="w-full bg-black border border-slate-700 rounded-xl p-3 mb-4">
          <option>Recruiter</option>
          <option>Admin</option>
          <option>Viewer</option>
        </select>

        <button className="bg-purple-600 rounded-xl px-5 py-3 font-semibold">
          Invite Member
        </button>
      </div>
    </main>
  );
}