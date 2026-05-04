//import { getOrgId } from "@/lib/getOrgId";
//import { prisma } from "@/lib/prisma";
//import Sidebar from "@/components/Sidebar";

//export default async function DashboardPage() {
//  const orgId = await getOrgId();

//  if (!orgId) {
//    return <div>Please login</div>;
//  }

//  const jobs = await prisma.job.count({ where: { orgId } });
//  const candidates = await prisma.candidate.count({ where: { orgId } });
//  const applications = await prisma.application.count({ where: { orgId } });
//  const resumes = await prisma.resume.count({ where: { orgId } });

//  return (
//    <>
//      <Sidebar />

//      <main style={{ marginLeft: 240, padding: 24 }}>
//        <h1>HireIQ Dashboard</h1>

//        <div
//          style={{
//            display: "grid",
//            gridTemplateColumns: "repeat(4, 1fr)",
//            gap: 16,
//            marginTop: 20,
//          }}
//        >
//          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
//            <h3>Jobs</h3>
//            <p style={{ fontSize: 28, fontWeight: "bold" }}>{jobs}</p>
//          </div>

//          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
//            <h3>Candidates</h3>
//            <p style={{ fontSize: 28, fontWeight: "bold" }}>{candidates}</p>
//          </div>
//
//          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
//            <h3>Applications</h3>
//            <p style={{ fontSize: 28, fontWeight: "bold" }}>{applications}</p>
//          </div>

//          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
//            <h3>Resumes</h3>
//            <p style={{ fontSize: 28, fontWeight: "bold" }}>{resumes}</p>
//          </div>
//        </div>
//      </main>
//    </>
//  );
//}

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

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ marginLeft: 240, padding: 24, width: "100%" }}>
        <h1>HireIQ Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
            <h3>Jobs</h3>
            <p style={{ fontSize: 28 }}>{jobs}</p>
          </div>

          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
            <h3>Candidates</h3>
            <p style={{ fontSize: 28 }}>{candidates}</p>
          </div>

          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
            <h3>Applications</h3>
            <p style={{ fontSize: 28 }}>{applications}</p>
          </div>

          <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 12 }}>
            <h3>Resumes</h3>
            <p style={{ fontSize: 28 }}>{resumes}</p>
          </div>
        </div>
      </main>
    </div>
  );
}