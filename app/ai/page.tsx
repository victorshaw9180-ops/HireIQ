"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function AIPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function analyzeResume() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text.trim() }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b10", color: "white" }}>
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 32, width: "100%" }}>
        <h1>AI Resume Analyzer</h1>

        <textarea
          rows={10}
          cols={80}
          placeholder="Paste resume text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <br />
        <br />

        <button onClick={analyzeResume}>Analyze Resume</button>

        {result && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 10,
              background: "#111827",
              color: "#ffffff",
              border: "1px solid #333",
              overflowX: "auto",
            }}
          >
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
              {result}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
