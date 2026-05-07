import Link from "next/link";
import { getOrgId } from "@/lib/getOrgId";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";

export default async function DashboardPage() {
  const orgId = await getOrgId();

  if (!orgId) {
    return <div>Please login</div>;
  }

  const jobs = await prisma.job.count({ where: { orgId } });
  const candidates = await prisma.candidate.count({ where: { orgId } });
  const applications = await prisma.application.count({ where: { orgId } });
  const resumes = await prisma.resume.count({ where: { orgId } });

  const cardStyle = {
    background: "#0f131a",
    border: "1px solid #2A2F3E",
    padding: 20,
    borderRadius: 16,
  };

  const buttonStyle = {
    background: "#6C63FF",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  };

  const activityItem = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#151922",
    border: "1px solid #222938",
    fontSize: 14,
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 32, width: "100%" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
          TalentHawk Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          <div style={cardStyle}>
            <h3>Jobs</h3>
            <p style={{ fontSize: 30, marginTop: 12 }}>{jobs}</p>
          </div>

          <div style={cardStyle}>
            <h3>Candidates</h3>
            <p style={{ fontSize: 30, marginTop: 12 }}>{candidates}</p>
          </div>

          <div style={cardStyle}>
            <h3>Applications</h3>
            <p style={{ fontSize: 30, marginTop: 12 }}>{applications}</p>
          </div>

          <div style={cardStyle}>
            <h3>Resumes</h3>
            <p style={{ fontSize: 30, marginTop: 12 }}>{resumes}</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginTop: 30,
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginBottom: 14 }}>Hiring Funnel</h3>
            <div style={{ color: "#8B91A8", lineHeight: 2 }}>
              <div>Applied: {applications}</div>
              <div>Screening: 0</div>
              <div>Interview: 0</div>
              <div>Offer: 0</div>
              <div>Hired: 0</div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: 14 }}>AI Usage</h3>
            <div style={{ color: "#8B91A8", lineHeight: 2 }}>
              <div>AI Parses: {resumes}</div>
              <div>AI Matches: {applications}</div>
              <div>Credits Used: 0</div>
              <div>Credits Remaining: Active</div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: 14 }}>Top Candidate Sources</h3>
            <div style={{ color: "#8B91A8", lineHeight: 2 }}>
              <div>LinkedIn</div>
              <div>Indeed</div>
              <div>Referral</div>
              <div>Direct Upload</div>
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle, marginTop: 30 }}>
          <h3 style={{ marginBottom: 20 }}>Quick Actions</h3>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/jobs/new" style={buttonStyle}>+ Add Job</Link>
            <Link href="/resume" style={buttonStyle}>Upload Resume</Link>
            <Link href="/match" style={buttonStyle}>AI Match</Link>
            <Link href="/settings/team" style={buttonStyle}>Invite Recruiter</Link>
          </div>
        </div>

        <div style={{ ...cardStyle, marginTop: 30 }}>
          <h3 style={{ marginBottom: 20 }}>Recruiter Activity</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={activityItem}>
              <span>🟢 Candidate moved to Screening</span>
              <span style={{ color: "#666" }}>2 min ago</span>
            </div>

            <div style={activityItem}>
              <span>📄 Resume parsed successfully</span>
              <span style={{ color: "#666" }}>12 min ago</span>
            </div>

            <div style={activityItem}>
              <span>🤖 AI Match completed for Java Developer role</span>
              <span style={{ color: "#666" }}>25 min ago</span>
            </div>

            <div style={activityItem}>
              <span>👥 Recruiter invited to organization</span>
              <span style={{ color: "#666" }}>1 hour ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}