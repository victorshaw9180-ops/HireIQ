import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import AppShell from "@/components/AppShell";

export default async function ResumeListPage() {
  try {
    const orgId = await getOrgId();

    if (!orgId) return <div>Please login</div>;

    const resumes = await prisma.resume.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });

    return (
      <AppShell>
        <h1>Uploaded Resumes</h1>

        <div style={{ marginBottom: 16 }}>
  <a
    href="/resume"
    style={{
      display: "inline-block",
      background: "#6c63ff",
      color: "#ffffff",
      padding: "10px 14px",
      borderRadius: 8,
      textDecoration: "none",
      cursor: "pointer",
      position: "relative",
      zIndex: 50,
    }}
  >
    Upload Resume
  </a>
</div>

        <hr />

        {resumes.length === 0 && <p>No resumes uploaded yet.</p>}

        {resumes.map((resume) => (
          <div
            key={resume.id}
            style={{
              border: "1px solid #333",
              padding: 16,
              marginBottom: 12,
              borderRadius: 10,
              background: "#0f131a",
            }}
          >
            <h3>{resume.fileName}</h3>
            <p>Size: {resume.fileSize} bytes</p>
            <p>Uploaded: {resume.createdAt.toLocaleString()}</p>
            <p>AI Score: {resume.aiScore ?? "Not scored"}</p>
            <p>Summary: {resume.summary ?? "No summary yet"}</p>
          </div>
        ))}
      </AppShell>
    );
  } catch (error) {
    console.error("RESUME LIST ERROR:", error);

    return (
      <AppShell>
        <h1>Uploaded Resumes</h1>
        <p>Could not load resumes. Check database connection and restart server.</p>

        <a
          href="/resume"
          style={{
            color: "#8b7cff",
            textDecoration: "underline",
          }}
        >
          Back to Resume Upload
        </a>
      </AppShell>
    );
  }
}