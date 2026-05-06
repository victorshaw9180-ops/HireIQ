export default function GeneralSettingsPage() {
  return (
    <main className="p-8 text-white max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">General Settings</h1>
      <p className="text-gray-400 mb-8">Manage company profile and workspace settings.</p>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm mb-2">Company Name</label>
          <input
            placeholder="HireIQ"
            className="w-full bg-black border border-slate-700 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Timezone</label>
          <select className="w-full bg-black border border-slate-700 rounded-xl p-3">
            <option>Asia/Kolkata</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>

        <button className="bg-purple-600 rounded-xl px-5 py-3 font-semibold">
          Save Settings
        </button>
      </div>
    </main>
  );
}