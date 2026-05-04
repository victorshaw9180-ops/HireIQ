import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import Sidebar from "@/components/Sidebar";

export default async function JobsPage() {
  const orgId = await getOrgId();

  if (!orgId) return <div>Please login</div>;

  const jobs = await prisma.job.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b10", color: "white" }}>
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 32, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Jobs</h1>

          <Link
            href="/jobs/new"
            style={{
              background: "#6c63ff",
              color: "white",
              padding: "10px 14px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Create Job
          </Link>
        </div>

        <div style={{ marginTop: 24 }}>
          {jobs.length === 0 && <p>No jobs yet.</p>}

          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #333",
                borderRadius: 12,
                padding: 18,
                marginBottom: 14,
                background: "#0f131a",
              }}
            >
              <h3>{job.title}</h3>
              <p>{job.department}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}