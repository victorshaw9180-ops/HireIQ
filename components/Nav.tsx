export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
      <a href="/dashboard">Dashboard</a>
      <a href="/jobs">Jobs</a>
      <a href="/candidates">Candidates</a>
      <a href="/applications">Applications</a>
      <a href="/resume">Upload Resume</a>
      <a href="/resume/list">Resume List</a>
      <a href="/ai">AI Analyzer</a>
    </nav>
  );
}