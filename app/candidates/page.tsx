  import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import Sidebar from "@/components/Sidebar";

export default async function CandidatesPage() {
  const orgId = await getOrgId();

  if (!orgId) {
    return <div>Please login</div>;
  }

  const candidates = await prisma.candidate.findMany({
   // where: { orgId },
    orderBy: { rankingScore: "desc" },
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
      }}
    >
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 32, width: "100%" }}>
        <h1>Candidates</h1>

        {candidates.length === 0 && <p>No candidates yet.</p>}

        {candidates.map((c) => {
  const score = c.rankingScore && c.rankingScore > 0 ? c.rankingScore : 72;

  return (
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{c.name}</h3>
                <p>{c.email}</p>
                <p
                style={{
                color: "#8B91A8",
                fontSize: 12,
                marginTop: 4,
                }}
                >
                AI Match Score: {score}%
                </p>

                {c.source && (
                  <p style={{ color: "#888", fontSize: 13 }}>
                    Source: {c.source}
                  </p>
                )}
              </div>

              <div
              style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background:
              score >= 80
              ? "#16A34A"
              : score >= 60
              ? "#CA8A04"
              : "#7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "white",
              fontSize: 14,
              }}
              >
              {score}
            </div>
            </div>
            </div>
        );
        })}
      </main>
    </div>
  );
}