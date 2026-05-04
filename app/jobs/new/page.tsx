"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, department, location, salary }),
    });

    router.push("/jobs");
    router.refresh();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br /><br />

        <input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <br /><br />

        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br /><br />

        <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <br /><br />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}