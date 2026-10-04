import { CommunityJob } from '../data/jobs';

export interface ResumeAnalysisResult {
  matchPercentage: number;
  matchGrade: 'High' | 'Moderate' | 'Developing';
  headline: string;
  matchedSkills: string[];
  missingSkills: string[];
  matchedResponsibilities: string[];
  actionableSuggestions: {
    section: string;
    priority: 'High' | 'Medium' | 'Low';
    suggestion: string;
    example: string;
  }[];
  tailoredFresherSummary: string;
  referralEndorsement: {
    eligible: boolean;
    status: string;
    advice: string;
  };
}

export const SAMPLE_RESUMES = {
  cs_fresher: `ZAYN AHMAD
London, UK | zayn.ahmad@example.com | github.com/zaynahmad | linkedin.com/in/zaynahmad

EDUCATION
BSc Computer Science (First Class Honours), University of London (2022 - 2025)
Relevant Coursework: Web Engineering, Data Structures & Algorithms, Database Systems, Cloud Computing

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, HTML5, CSS3, SQL
Frameworks & Libraries: React.js, Tailwind CSS, Vite, Node.js, Express
Tools & Version Control: Git, GitHub, Docker, Postman, Figma

PROJECTS
• Community Education Portal (React, TypeScript, Tailwind)
  - Built a responsive full-stack educational resource library for 500+ student users
  - Implemented interactive quiz module with client-side state management
  - Optimized bundle size with lazy loading and dynamic imports

• Audio Tape Archive Browser (JavaScript, REST API)
  - Designed interactive catalog filtering 200+ historical audio files
  - Connected frontend UI to Express REST endpoints with 99.8% test coverage

COMMUNITY & LEADERSHIP
• Volunteer Tech Lead, One Community Youth Coding Club (2024 - Present)
  - Mentored 25 younger students in HTML/CSS fundamentals and Git workflow`,

  career_changer: `SARAH M.
Berlin, Germany | sarah.m@example.com

SUMMARY
Passionate junior creator transitioning into digital technology and media production. Background in event management and communications with strong interest in frontend design and digital storytelling.

EDUCATION
BA Communications & Media, Berlin Free University (2020 - 2023)
Full-Stack Web Development Certificate (300 hours) (2025)

SKILLS
Digital Tools: Figma, Adobe Premiere Pro, Canva, WordPress, Google Analytics
Code Basics: HTML, CSS, JavaScript basics, Git
Soft Skills: Team Collaboration, Event Logistics, Public Speaking, Writing

EXPERIENCE
Event Assistant, Cultural Assembly Center (2023 - 2025)
- Assisted in planning and hosting 12 cultural community events with 300+ attendees
- Managed volunteer schedule and social media video announcements`,

  fresher_minimal: `ALI REZA
Birmingham, UK | alireza@example.com

EDUCATION
BSc Information Systems (Expected Grad 2026)

SKILLS
Python basics, Microsoft Excel, Word, basic computer troubleshooting

INTERESTS
Technology, audio recording, community volunteering`
};

export async function analyzeResumeWithAI(
  resumeText: string,
  job: CommunityJob
): Promise<ResumeAnalysisResult> {
  // Simulate AI scanning delay for authentic experience
  await new Promise(resolve => setTimeout(resolve, 1400));

  const lowerResume = resumeText.toLowerCase();

  // Evaluate required skills matching
  const matchedRequired: string[] = [];
  const missingRequired: string[] = [];

  job.requiredSkills.forEach(skill => {
    const searchTerms = skill.toLowerCase().split(/[\s/]+/);
    const hasMatch = searchTerms.some(term => term.length > 2 && lowerResume.includes(term));
    if (hasMatch) {
      matchedRequired.push(skill);
    } else {
      missingRequired.push(skill);
    }
  });

  // Evaluate preferred skills
  const matchedPreferred: string[] = [];
  const missingPreferred: string[] = [];

  job.preferredSkills.forEach(skill => {
    const searchTerms = skill.toLowerCase().split(/[\s/]+/);
    const hasMatch = searchTerms.some(term => term.length > 2 && lowerResume.includes(term));
    if (hasMatch) {
      matchedPreferred.push(skill);
    } else {
      missingPreferred.push(skill);
    }
  });

  // Check responsibilities keywords
  const matchedResponsibilities: string[] = [];
  job.responsibilities.forEach(resp => {
    const keyTerms = resp.toLowerCase().match(/\b(react|typescript|audio|git|api|ui|css|event|video|lead|community|mastering|design|database|cloud)\b/g) || [];
    const foundCount = keyTerms.filter(t => lowerResume.includes(t)).length;
    if (foundCount >= 1) {
      matchedResponsibilities.push(resp);
    }
  });

  // Check educational signals for freshers
  const hasEducation = /degree|bsc|btech|ba|graduat|university|college|bootcamp/i.test(lowerResume);
  const hasProjects = /project|built|developed|implemented|designed|created/i.test(lowerResume);
  const hasGit = /github|git|repository|repo/i.test(lowerResume);

  // Compute calculated score
  const totalRequired = job.requiredSkills.length || 1;
  const totalPreferred = job.preferredSkills.length || 1;

  const requiredScore = (matchedRequired.length / totalRequired) * 55;
  const preferredScore = (matchedPreferred.length / totalPreferred) * 20;
  const eduScore = hasEducation ? 10 : 3;
  const projectScore = hasProjects ? 10 : 2;
  const gitScore = hasGit ? 5 : 0;

  let rawPercentage = Math.round(requiredScore + preferredScore + eduScore + projectScore + gitScore);
  
  // Bound to sensible realistic range
  const matchPercentage = Math.max(32, Math.min(94, rawPercentage));

  let matchGrade: 'High' | 'Moderate' | 'Developing' = 'Moderate';
  let headline = '';
  if (matchPercentage >= 75) {
    matchGrade = 'High';
    headline = 'Strong Fresher Profile — High Priority for Alumni Referral';
  } else if (matchPercentage >= 58) {
    matchGrade = 'Moderate';
    headline = 'Good Foundation — Strategic Resume Edits Recommended Before Applying';
  } else {
    matchGrade = 'Developing';
    headline = 'Skill Gaps Detected — Requires Project & Keyword Refinement';
  }

  // Generate tailored actionable suggestions
  const actionableSuggestions = [];

  if (missingRequired.length > 0) {
    actionableSuggestions.push({
      section: 'Skills & Technical Inventory',
      priority: 'High' as const,
      suggestion: `Explicitly add missing core requirements: "${missingRequired.slice(0, 3).join(', ')}" in your skills header.`,
      example: `Technical Skills: ${matchedRequired.concat(missingRequired.slice(0, 2)).join(', ')}`
    });
  }

  if (missingPreferred.length > 0) {
    actionableSuggestions.push({
      section: 'Projects & Portfolio Evidence',
      priority: 'Medium' as const,
      suggestion: `Align your project descriptions with ${job.company}'s work by mentioning ${missingPreferred[0]}.`,
      example: `• Built interactive frontend using React & ${missingPreferred[0]}, reducing load latency by 24%.`
    });
  }

  if (!hasProjects || lowerResume.split('project').length < 2) {
    actionableSuggestions.push({
      section: 'Projects Showcase',
      priority: 'High' as const,
      suggestion: 'Freshers are judged heavily on independent projects. Add at least 2 distinct portfolio items with GitHub links.',
      example: `• ${job.title} Demo App: Implemented modular architecture with ${job.requiredSkills.slice(0, 2).join(' & ')}.`
    });
  }

  if (!lowerResume.includes('quantif') && !/\b\d+%\b|\b\d+\+\b/i.test(lowerResume)) {
    actionableSuggestions.push({
      section: 'Action Verbs & Impact Metrics',
      priority: 'Medium' as const,
      suggestion: 'Quantify your accomplishments with concrete figures (e.g. number of users, speed increase, hours saved).',
      example: 'Improved user engagement by 35% through accessible keyboard navigation and semantic HTML.'
    });
  }

  actionableSuggestions.push({
    section: 'Fresher Objective Statement',
    priority: 'Low' as const,
    suggestion: `Replace generic objectives with a role-specific statement targeting the ${job.title} opening at ${job.company}.`,
    example: `Motivated 2025 graduate with practical mastery in ${job.requiredSkills.slice(0, 2).join(' and ')}, seeking to contribute to ${job.company}'s mission under community mentorship.`
  });

  const tailoredFresherSummary = `Motivated ${hasEducation ? 'recent graduate' : 'emerging engineer'} with hands-on foundations in ${job.requiredSkills.slice(0, 3).join(', ')}. Eager to apply disciplined problem-solving and rapid learning to the ${job.title} role at ${job.company}, supported by active participation in the ${job.referralPartner}.`;

  const referralEndorsement = {
    eligible: matchPercentage >= 65,
    status: matchPercentage >= 75 
      ? 'Direct Fast-Track Endorsement' 
      : matchPercentage >= 65 
        ? 'Endorsement with Minor Revisions' 
        : 'Revision Required Before Alumni Sign-off',
    advice: matchPercentage >= 65
      ? `Your resume matches ${matchPercentage}% of criteria. The ${job.referralPartner} will fast-track this application directly to ${job.mentorName}.`
      : `Your current match is ${matchPercentage}%. Update your resume with the suggestions above to unlock direct referral priority.`
  };

  return {
    matchPercentage,
    matchGrade,
    headline,
    matchedSkills: matchedRequired.concat(matchedPreferred),
    missingSkills: missingRequired.concat(missingPreferred),
    matchedResponsibilities,
    actionableSuggestions,
    tailoredFresherSummary,
    referralEndorsement
  };
}
