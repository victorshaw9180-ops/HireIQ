import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import AppShell from "@/components/AppShell";

export default async function ApplicationsPage() {
  const orgId = await getOrgId();

  if (!orgId) return <div>Please login</div>;

  const applications = await prisma.application.findMany({
    where: { orgId },
    include: {
      candidate: true,
      job: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
    <div style={{ padding: 20 }}>
    
      <h1>Applications</h1>

      {applications.length === 0 && <p>No applications yet.</p>}

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <div>
            <b>{app.candidate.name}</b>
          </div>

          <div>{app.job.title}</div>
          <div>Stage: {app.stage}</div>

          <form action={`/api/applications/${app.id}`} method="POST">
            <select name="stage" defaultValue={app.stage}>
              <option value="NEW">NEW</option>
              <option value="SCREENING">SCREENING</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="OFFER">OFFER</option>
              <option value="HIRED">HIRED</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            <button type="submit">Update</button>
          </form>
        </div>
      ))}
    </div>
    </AppShell>
  );
}