import link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import AppShell from "@/components/AppShell";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
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
            <p>Size: {formatFileSize(resume.fileSize)}</p>

            {resume.fileType && <p>Type: {resume.fileType}</p>}

            <p>Uploaded: {resume.createdAt.toLocaleString()}</p>
            <p>AI Score: {resume.aiScore ?? "Not scored"}</p>
            <p>Summary: {resume.summary ?? "No summary yet"}</p>

            {resume.fileUrl ? (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={`/resume/view/${resume.id}`}
                  style={{
                    background: "#6c63ff",
                    color: "#ffffff",
                    padding: "9px 14px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  View Resume
                </a>

                <a
                  href={resume.fileUrl}
                  download
                  style={{
                    border: "1px solid #374151",
                    color: "#ffffff",
                    padding: "9px 14px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Download Resume
                </a>
              </div>
            ) : (
              <p style={{ color: "#fbbf24", marginTop: 12 }}>
                File link not available for older upload.
              </p>
            )}
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