"use client";

import { useState } from "react";

export default function AIAgentPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAgent() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    const res = await fetch("/api/ai-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setReply(data.reply || data.error || "No response");
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">AI Recruiter Agent</h1>
      <p className="text-gray-400 mb-6">
        Ask questions about candidates, jobs, and hiring pipeline.
      </p>

      <textarea
        className="w-full min-h-32 rounded-xl bg-gray-900 border border-gray-700 p-4"
        placeholder="Example: Who are my best candidates for Network Engineer?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={askAgent}
        disabled={loading}
        className="mt-4 rounded-xl bg-purple-600 px-5 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI Agent"}
      </button>

      {reply && (
        <div className="mt-6 rounded-xl bg-gray-900 border border-gray-700 p-5 whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </main>
  );
}