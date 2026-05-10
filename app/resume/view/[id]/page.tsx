import { prisma } from "@/lib/prisma";
import { getOrgId } from "@/lib/getOrgId";
import AppShell from "@/components/AppShell";

export default async function ResumeViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orgId = await getOrgId();

  if (!orgId) return <div>Please login</div>;

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      orgId,
    },
  });

  if (!resume || !resume.fileUrl) {
    return (
      <AppShell>
        <h1>Resume Not Found</h1>
        <p>This resume file is not available.</p>
      </AppShell>
    );
  }

  const isPdf =
    resume.fileType?.includes("pdf") ||
    resume.fileName.toLowerCase().endsWith(".pdf");

  const isDoc =
    resume.fileName.toLowerCase().endsWith(".doc") ||
    resume.fileName.toLowerCase().endsWith(".docx");

  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    resume.fileUrl
  )}`;

  return (
    <AppShell>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 24 }}>Resume Viewer</h1>
        <p style={{ color: "#9CA3AF" }}>{resume.fileName}</p>

        <a
          href="/resume/list"
          style={{
            color: "#8B7CFF",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Back to Resume List
        </a>
      </div>

      <div
        style={{
          border: "1px solid #2A2F3E",
          borderRadius: 14,
          overflow: "hidden",
          background: "#0f131a",
          height: "78vh",
        }}
      >
        {isPdf ? (
          <iframe
            src={resume.fileUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "white",
            }}
          />
        ) : isDoc ? (
          <iframe
            src={officeViewerUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "white",
            }}
          />
        ) : (
          <div style={{ padding: 24 }}>
            <p>Preview not available for this file type.</p>
            <a href={resume.fileUrl} download>
              Download Resume
            </a>
          </div>
        )}
      </div>
    </AppShell>
  );
}