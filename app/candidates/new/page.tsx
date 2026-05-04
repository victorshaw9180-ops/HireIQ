"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCandidatePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        source,
      }),
    });

    router.push("/candidates");
    router.refresh();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Candidate</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <br /><br />

        <button type="submit">Save Candidate</button>
      </form>
    </div>
  );
}