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

  const activities = await prisma.activity.findMany({
  where: {
    application: {
      orgId,
    },
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 10,
});

const screeningCount = await prisma.application.count({
  where: {
    orgId,
    stage: "SCREENING",
  },
});

const interviewCount = await prisma.application.count({
  where: {
    orgId,
    stage: "INTERVIEW",
  },
});

const offerCount = await prisma.application.count({
  where: {
    orgId,
    stage: "OFFER",
  },
});

const hiredCount = await prisma.application.count({
  where: {
    orgId,
    stage: "HIRED",
  },
});

const recruiterAnalytics = await prisma.application.groupBy({
  by: ["recruiterName"],

  where: {
    orgId,
  },

  _count: {
    id: true,
  },
});

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
              <div>Screening: {screeningCount}</div>
              <div>Interview: {interviewCount}</div>
              <div>Offer: {offerCount}</div>
              <div>Hired: {hiredCount}</div>
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
            <h3 style={{ marginBottom: 20 }}>Recruiter Activity</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activities.length === 0 ? (
            <div style={{ color: "#8B91A8" }}>
            No recruiter activity yet.
            </div>
          ) : (
            activities.map((activity) => (
            <div key={activity.id} style={activityItem}>
            <span>{activity.content}</span>

            <span style={{ color: "#666" }}>
            {new Date(activity.createdAt).toLocaleString()}
            </span>
            </div>
          ))
          )}
          </div>
        </div>
        
        <div style={{ ...cardStyle, marginTop: 30 }}>
  <h3 style={{ marginBottom: 20 }}>
    Recruiter Performance
  </h3>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    {recruiterAnalytics.length === 0 ? (
      <div style={{ color: "#8B91A8" }}>
        No recruiter analytics yet.
      </div>
    ) : (
      recruiterAnalytics.map((recruiter) => (
        <div
          key={recruiter.recruiterName}
          style={activityItem}
        >
          <span>
            {recruiter.recruiterName || "Unknown Recruiter"}
          </span>

          <span>
            {recruiter._count.id} submissions
          </span>
        </div>
      ))
    )}
  </div>
</div>

      </main>
    </div>
  );
}