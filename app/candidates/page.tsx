import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import Sidebar from "@/components/Sidebar";

export default async function CandidatesPage() {
  const orgId = await getOrgId();
  if (!orgId) return <div>Please login</div>;

  const candidates = await prisma.candidate.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b10", color: "white" }}>
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 32, width: "100%" }}>
        <h1>Candidates</h1>

        {candidates.length === 0 && <p>No candidates yet.</p>}

        {candidates.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #333",
              padding: 16,
              marginTop: 12,
              borderRadius: 10,
              background: "#0f131a",
            }}
          >
            <h3>{c.name}</h3>
            <p>{c.email}</p>
          </div>
        ))}
      </main>
    </div>
  );
}