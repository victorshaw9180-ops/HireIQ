"use client";

import { useState } from "react";
import EmailTemplateSelector from "./EmailTemplateSelector";

export default function BulkEmailPanel() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function sendEmails() {
    const emailList = emails
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    await fetch("/api/email/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emails: emailList,
        subject,
        message,
      }),
    });

    alert("Bulk emails sent");
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold mb-5">
        TalentConnect Bulk Outreach
      </h2>

      <div className="space-y-4">
        
        <EmailTemplateSelector
        onSelect={(template) => {
        setSubject(template.subject);
        setMessage(template.body);
        }}
        />
        
        <textarea
          placeholder="candidate1@email.com, candidate2@email.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="w-full min-h-[100px] rounded-xl bg-slate-950 border border-slate-700 p-3"
        />

        <input
          type="text"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3"
        />

        <textarea
          placeholder="Write your outreach message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[180px] rounded-xl bg-slate-950 border border-slate-700 p-3"
        />

        <button
          onClick={sendEmails}
          className="bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl"
        >
          Send Bulk Emails
        </button>

      </div>
    </div>
  );
}