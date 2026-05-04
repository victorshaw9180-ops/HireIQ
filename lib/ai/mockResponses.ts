export function mockResumeParse(resumeText: string) {
  const lower = resumeText.toLowerCase();
  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const emailMatch = resumeText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );

  const phoneMatch = resumeText.match(
    /(\+?\d{1,3}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4,6}/
  );

  const name =
    lines.find(
      (line) =>
        line.length >= 3 &&
        line.length <= 40 &&
        !line.includes("@") &&
        !/\d/.test(line) &&
        !line.toLowerCase().includes("resume") &&
        !line.toLowerCase().includes("curriculum") &&
        !line.toLowerCase().includes("skills")
    ) || "Candidate";

  const skills: string[] = [];

  const skillLibrary = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "SQL",
    "Excel",
    "Power BI",
    "AWS",
    "Azure",
    "GCP",
    "TCP/IP",
    "Routing",
    "Switching",
    "Firewall",
    "Cisco",
    "VPN",
    "LAN",
    "WAN",
    "DNS",
    "DHCP",
    "Linux",
    "Windows Server",
    "Active Directory",
    "Troubleshooting",
    "Network Security",
    "Server Administration",
    "Customer Support",
    "Recruitment",
    "Sourcing",
    "Screening",
    "ATS",
  ];

  for (const skill of skillLibrary) {
    if (lower.includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  }

  return {
    name,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    location: "",
    summary:
      "Demo mode summary: Candidate profile reviewed successfully based on uploaded resume content.",
    skills: skills.length ? skills : ["General Communication", "Problem Solving"],
    experienceYears: "Not detected",
    recentRole: "Not detected",
    strengths: [
      "Resume content was readable",
      "Relevant experience indicators found",
    ],
    gaps: [
      "Enable OpenAI credits for deeper analysis",
      "Manual review recommended before final decision",
    ],
    score: 70,
  };
}

export function mockCandidateScore() {
  return {
    matchScore: 75,
    resumeScore: 72,
    skillsScore: 78,
    experienceScore: 70,
    scoreReason:
      "Demo mode score: Candidate appears moderately suitable based on available resume and job data.",
    matchedSkills: ["Relevant Skills", "Communication"],
    missingSkills: ["Advanced role-specific skills"],
    verdict: "Moderate Match" as const,
  };
}

export function mockJD(title: string, skills?: string, tone?: string) {
  return `
Job Title: ${title}

Summary:
We are looking for a skilled ${title} to join our team and contribute to business success.

Key Responsibilities:
- Understand role requirements and business needs
- Perform assigned responsibilities with ownership
- Collaborate with internal teams and stakeholders
- Maintain accurate documentation and reporting
- Support continuous process improvement

Required Skills:
${
  skills
    ? skills
        .split(",")
        .map((s) => `- ${s.trim()}`)
        .join("\n")
    : "- Strong communication\n- Problem solving\n- Relevant experience"
}

Preferred Qualifications:
- Prior experience in a similar role
- Ability to work independently
- Strong accountability and ownership

Tone:
${tone || "Professional"}
`;
}