"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function ResumePage() {
  const [result, setResult] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    setResult(text);
  }

  return (
    <AppShell>
    <div style={{ padding: 20 }}>
    
      <h1 
      style={{
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "16px",
  }}>
    Resume Upload
    </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="resume"
          required
          accept=".pdf,.doc,.docx"
        />

        <br />
        <br />

        <button type="submit">Upload Resume</button>
      </form>

      {result && (
        <pre
          style={{
            marginTop: 20,
            background: "#111827",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
            whiteSpace: "pre-wrap",
          }}
        >
        {result}
      </pre>
      )}
</div>
   </AppShell>
  );
}