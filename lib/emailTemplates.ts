export const emailTemplates = [
  {
    id: "submission",
    name: "Candidate Submission",
    subject: "Candidate Submission for {{jobTitle}}",
    body: `
Hello,

Please find below candidate submission.

Candidate Name: {{candidateName}}
Role: {{jobTitle}}

Regards,
TalentHawk AI Recruiting Team
    `,
  },

  {
    id: "interview",
    name: "Interview Invitation",
    subject: "Interview Scheduled for {{jobTitle}}",
    body: `
Hello {{candidateName}},

Your interview has been scheduled.

Position: {{jobTitle}}

Regards,
TalentHawk AI Recruiting Team
    `,
  },

  {
    id: "followup",
    name: "Recruiter Follow-up",
    subject: "Follow-up Regarding Opportunity",
    body: `
Hello {{candidateName}},

Just following up regarding the opportunity.

Regards,
TalentHawk AI Recruiting Team
    `,
  },

  {
    id: "rejection",
    name: "Candidate Rejection",
    subject: "Application Update",
    body: `
Hello {{candidateName}},

Thank you for your interest.
Currently we are moving forward with other candidates.

Regards,
TalentHawk AI Recruiting Team
    `,
  },
];