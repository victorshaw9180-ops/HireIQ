import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";

export default async function NewApplicationPage() {
  const orgId = await getOrgId();

  if (!orgId) return <div>Please login</div>;

  const jobs = await prisma.job.findMany({
    where: { orgId },
  });

  const candidates = await prisma.candidate.findMany({
    where: { orgId },
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Apply Candidate to Job</h1>

      <form action="/api/applications" method="POST">
        <select name="candidateId" required>
          <option value="">Select Candidate</option>
          {candidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select name="jobId" required>
          <option value="">Select Job</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
} 