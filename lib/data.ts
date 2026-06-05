// Mock data based on PersonalOS Obsidian vault

export interface StatData {
  label: string;
  value: string | number;
  target?: string | number;
  color: string;
  icon: string;
}

export interface ProgressItem {
  label: string;
  completed: boolean;
  progress?: number;
}

// Project type and data are centralized in @/data/projects.ts
// Re-exported here for backward compatibility
export type { ProjectData as Project } from "@/data/projects";
export { projects as aiProjects, systemArchitecture, techStack } from "@/data/projects";

export interface Publication {
  title: string;
  type: "journal" | "conference" | "book-chapter";
  status: "draft" | "in-progress" | "submitted" | "accepted" | "published";
  target: string;
  deadline?: string;
}

export interface Conference {
  name: string;
  status: "planned" | "submitted" | "accepted" | "attended" | "presented";
  date?: string;
  deadline?: string;
  location?: string;
}

export interface LitReviewPaper {
  id: number;
  title: string;
  source: string;
  year: number;
  theme: string;
  relevance: string;
}

export interface DissertationChapter {
  name: string;
  progress: number;
  status: "not-started" | "in-progress" | "draft" | "review" | "complete";
  wordCount?: number;
  targetWords?: number;
}

export interface Experiment {
  name: string;
  status: "planned" | "running" | "completed" | "analyzing";
  description: string;
  metrics?: string[];
  date?: string;
}

// ── Dashboard Stats ──

export const dashboardStats: StatData[] = [
  { label: "MComp Progress", value: "40%", color: "blue", icon: "graduation" },
  { label: "Papers Found", value: 24, target: 30, color: "green", icon: "book" },
  { label: "Publications", value: "1/6", color: "purple", icon: "file" },
  { label: "Conferences", value: "0/5", color: "amber", icon: "mic" },
  { label: "AI Projects", value: 3, color: "cyan", icon: "cpu" },
  { label: "Dissertation", value: "15%", color: "rose", icon: "edit" },
];

// ── MComp Progress ──

export const mcompCoursework: ProgressItem[] = [
  { label: "Complete coursework", completed: false, progress: 70 },
  { label: "Pass all modules", completed: false, progress: 60 },
];

export const mcompResearchProposal: ProgressItem[] = [
  { label: "Research proposal approved", completed: true },
];

export const mcompDissertation: ProgressItem[] = [
  { label: "Literature Review", completed: false, progress: 60 },
  { label: "Methodology", completed: false, progress: 30 },
  { label: "Design", completed: false, progress: 40 },
  { label: "Implementation", completed: false, progress: 10 },
  { label: "Evaluation", completed: false, progress: 0 },
  { label: "Final Submission", completed: false, progress: 0 },
];

export const supervisorMeetings = [
  {
    date: "2026-05-28",
    attendees: "Noosrat, Prof Owolaw, Prof Akintiunde",
    discussion: "Reviewed PRISMA screening progress. Discussed system architecture refinements.",
    actions: ["Finalize PRISMA flow diagram", "Begin prototype scaffolding"],
  },
  {
    date: "2026-05-14",
    attendees: "Noosrat, Prof Owolaw",
    discussion: "Literature review themes confirmed. Gap analysis direction approved.",
    actions: ["Complete gap analysis", "Draft thematic synthesis"],
  },
];

// ── Literature Review ──

export const prismaProgress = {
  identified: 120,
  afterDedup: 85,
  screened: 85,
  excluded: 55,
  included: 30,
};

export const searchDatabases = [
  { name: "Scopus", searched: false },
  { name: "IEEE Xplore", searched: false },
  { name: "SpringerLink", searched: false },
  { name: "ScienceDirect", searched: false },
  { name: "ERIC", searched: false },
  { name: "arXiv", searched: false },
  { name: "ACM Digital Library", searched: false },
];

export const litReviewThemes = [
  "Multi-tenant Architecture",
  "Retrieval-Augmented Generation",
  "RBAC & Tenant Isolation",
  "AI Governance in Higher Education",
  "Academic Intelligence Systems",
  "LLMs in Higher Education",
];

export const litReviewPapers: LitReviewPaper[] = [
  { id: 1, title: "Agentic AI Modernization: Transforming Institutional Infrastructure Through Orchestrated Multi-Agent LLM Framework", source: "Academia.edu", year: 2025, theme: "Multi-tenant Architecture", relevance: "Multi-agent LLM architecture; 35-40% cost savings" },
  { id: 2, title: "Applying LLMs to Legacy System Modernization in Higher Education", source: "IJISRT", year: 2025, theme: "Multi-tenant Architecture", relevance: "Legacy HEI system modernization (SIS, LMS, ERP)" },
  { id: 3, title: "LMS Modernization Solutions for Universities in 2026", source: "Informatix Systems", year: 2026, theme: "Multi-tenant Architecture", relevance: "Multi-tenant architecture patterns for next-gen LMS" },
  { id: 4, title: "Burn-After-Use for Preventing Data Leakage through a Secure Multi-Tenant Architecture in Enterprise LLM", source: "ResearchGate", year: 2025, theme: "Multi-tenant Architecture", relevance: "SMTA with ephemeral contexts for tenant isolation" },
  { id: 5, title: "Tenant Data Security for LLM Applications in Multi-Tenancy", source: "TDCommons", year: 2025, theme: "Multi-tenant Architecture", relevance: "Tenant-aware RBAC, vector DB isolation" },
  { id: 6, title: "Architecture & DevSecOps Patterns for Secure, Multi-tenant AI/LLM Platform on Azure", source: "Microsoft Q&A", year: 2025, theme: "Multi-tenant Architecture", relevance: "Enterprise multi-tenant LLM with zero-trust" },
  { id: 7, title: "Retrieval-augmented generation for educational application: A systematic survey", source: "ScienceDirect", year: 2025, theme: "RAG in Education", relevance: "51 studies on RAG in education" },
  { id: 8, title: "A Scalable and Low-Cost Mobile RAG Architecture for AI-Augmented Learning in Higher Education", source: "MDPI", year: 2025, theme: "RAG in Education", relevance: "LLaMA + vector DB evaluated over 4 semesters" },
  { id: 9, title: "An LLM-Powered Assessment RAG For Higher Education", source: "arXiv", year: 2026, theme: "RAG in Education", relevance: "RAG for HE assessment" },
  { id: 10, title: "A Systematic Literature Review of RAG: Techniques, Metrics, and Challenges", source: "arXiv", year: 2025, theme: "RAG in Education", relevance: "128 articles, metrics and evaluation" },
  { id: 11, title: "Engineering the RAG Stack: Architecture and Trust Frameworks", source: "arXiv", year: 2026, theme: "RAG in Education", relevance: "RAG architecture and trust/safety frameworks" },
  { id: 12, title: "Balancing regulation and innovation: agile AI governance in higher education", source: "Taylor & Francis", year: 2026, theme: "AI Governance", relevance: "Cross-national agile governance frameworks" },
  { id: 13, title: "A Framework for Developing University Policies on Generative AI Governance", source: "arXiv", year: 2025, theme: "AI Governance", relevance: "Cross-national GenAI policy framework" },
  { id: 14, title: "Institutional Policies on AI in Higher Education: Frameworks and Best Practices", source: "Wiley", year: 2025, theme: "AI Governance", relevance: "Five dimensions: integrity, privacy, equity, transparency, pedagogy" },
  { id: 15, title: "AI Governance in Higher Education: The 2026 Framework for Policy & Risk", source: "The Education Magazine", year: 2026, theme: "AI Governance", relevance: "EU AI Act - HE classified as high-risk" },
  { id: 16, title: "AI Policies for Higher Education: Manifesto for Critical Considerations", source: "MAP Education", year: 2025, theme: "AI Governance", relevance: "Regulatory framework, stakeholder guidelines, AI literacy" },
  { id: 17, title: "Large Language Model-Based Chatbots in Higher Education", source: "Wiley", year: 2025, theme: "LLMs in HE", relevance: "Comprehensive review of LLM chatbots in HE" },
  { id: 18, title: "Opportunities and challenges of large multimodal foundation models in education", source: "npj Science of Learning", year: 2025, theme: "LLMs in HE", relevance: "Multimodal foundation models in education" },
  { id: 19, title: "Multi-Agent Learning Path Planning via LLMs", source: "arXiv", year: 2026, theme: "LLMs in HE", relevance: "Multi-agent LLM for personalized learning paths" },
  { id: 20, title: "A systematic literature review to implement LLM in higher education", source: "Springer", year: 2025, theme: "LLMs in HE", relevance: "SLR on LLM implementation issues in HE" },
  { id: 21, title: "The impact of LLMs on higher education: AI and Education 4.0", source: "Frontiers", year: 2024, theme: "LLMs in HE", relevance: "LLMs and Education 4.0 principles" },
  { id: 22, title: "Exploring Educational Applications of LLMs: Systematic Review and Topic Analysis", source: "MDPI", year: 2025, theme: "LLMs in HE", relevance: "507 documents, 369% annual growth rate" },
  { id: 23, title: "Leveraging AI in Learning Management Systems: A Systematic Review", source: "IJST", year: 2025, theme: "LLMs in HE", relevance: "AI in LMS - 2020-2024 review" },
  { id: 24, title: "Comprehensive review of LLMs: issues and solutions in learning environments", source: "Springer", year: 2025, theme: "LLMs in HE", relevance: "Hallucination, bias, privacy in education" },
];

export const researchGaps = [
  { id: 1, title: "No Centralized Multi-tenant Academic Intelligence System", description: "Existing literature addresses LLMs in education and multi-tenant SaaS separately. No study combines these into a centralized platform for HEIs." },
  { id: 2, title: "Limited RAG for Institutional Knowledge", description: "RAG studies focus on single courses/institutions. No research on institution-wide RAG with tenant-level isolation." },
  { id: 3, title: "RBAC + AI Governance Integration Gap", description: "AI governance and RBAC exist separately. No study integrates both into a unified LLM architecture with role-aware responses." },
  { id: 4, title: "Multi-institutional Scalability", description: "No study evaluates a single LLM system serving multiple institutions with varying policies and legacy systems." },
  { id: 5, title: "Evaluation Frameworks for Academic AI", description: "No comprehensive framework combining technical, system, and institutional impact metrics." },
];

// ── Publications ──

export const publications: Publication[] = [
  { title: "SLR: Academic Intelligence Systems", type: "journal", status: "draft", target: "TBD", deadline: "2026-09-01" },
  { title: "Journal Paper 2", type: "journal", status: "draft", target: "TBD" },
  { title: "Journal Paper 3", type: "journal", status: "draft", target: "TBD" },
  { title: "Conference Paper 1", type: "conference", status: "draft", target: "TBD" },
  { title: "Conference Paper 2", type: "conference", status: "draft", target: "TBD" },
  { title: "Book Chapter 1", type: "book-chapter", status: "draft", target: "TBD" },
];

export const publicationTargets = {
  journals: { current: 0, target: 3 },
  conferences: { current: 0, target: 2 },
  bookChapters: { current: 0, target: 1 },
};

// ── Conferences ──

export const conferences: Conference[] = [
  { name: "IndabaX", status: "planned", location: "TBD", deadline: "TBD" },
  { name: "Conference 2", status: "planned" },
  { name: "Conference 3", status: "planned" },
  { name: "Conference 4", status: "planned" },
  { name: "Conference 5", status: "planned" },
];

export const conferenceTargets = {
  attend: { current: 0, target: 5 },
  present: { current: 0, target: 3 },
};

// AI Projects data removed — now lives in @/data/projects.ts
// aiProjects, systemArchitecture, techStack are re-exported above

// ── Dissertation ──

export const dissertationChapters: DissertationChapter[] = [
  { name: "Chapter 1: Introduction", progress: 20, status: "in-progress", wordCount: 1200, targetWords: 5000 },
  { name: "Chapter 2: Literature Review", progress: 60, status: "in-progress", wordCount: 8500, targetWords: 15000 },
  { name: "Chapter 3: Methodology", progress: 30, status: "in-progress", wordCount: 2000, targetWords: 8000 },
  { name: "Chapter 4: System Design", progress: 40, status: "in-progress", wordCount: 3000, targetWords: 10000 },
  { name: "Chapter 5: Implementation", progress: 5, status: "not-started", wordCount: 500, targetWords: 12000 },
  { name: "Chapter 6: Evaluation", progress: 0, status: "not-started", wordCount: 0, targetWords: 10000 },
  { name: "Chapter 7: Conclusion", progress: 0, status: "not-started", wordCount: 0, targetWords: 5000 },
];

// Architecture & tech stack removed — now in @/data/projects.ts
// Re-exported at the top of this file

// ── Experiments ──

export const experiments: Experiment[] = [
  { name: "RAG Retrieval Accuracy", status: "planned", description: "Evaluate retrieval precision/recall across different embedding models and chunk sizes.", metrics: ["Precision", "Recall", "F1 Score", "MRR"] },
  { name: "Response Quality Assessment", status: "planned", description: "Compare LLM response quality with and without RAG for academic queries.", metrics: ["Hallucination Rate", "Relevance Score", "Faithfulness"] },
  { name: "Multi-tenant Isolation Testing", status: "planned", description: "Verify data isolation between tenants under concurrent load.", metrics: ["Isolation Score", "Cross-tenant Leakage Rate"] },
  { name: "System Performance Benchmarks", status: "planned", description: "Measure response time, throughput, and availability under varying loads.", metrics: ["Response Time (p50/p95/p99)", "Throughput (req/s)", "Availability %"] },
  { name: "Usability Study", status: "planned", description: "Evaluate system usability with students, lecturers, and administrators.", metrics: ["SUS Score", "Task Completion Rate", "User Satisfaction"] },
];

// ── Evaluation Metrics ──

export const evaluationMetrics = {
  system: [
    { name: "Response Time", target: "< 2s (p95)", current: "N/A" },
    { name: "Throughput", target: "> 100 req/s", current: "N/A" },
    { name: "Availability", target: "> 99.5%", current: "N/A" },
  ],
  ai: [
    { name: "Precision", target: "> 0.85", current: "N/A" },
    { name: "Recall", target: "> 0.80", current: "N/A" },
    { name: "F1 Score", target: "> 0.82", current: "N/A" },
    { name: "Hallucination Rate", target: "< 5%", current: "N/A" },
  ],
  user: [
    { name: "Usability (SUS)", target: "> 70", current: "N/A" },
    { name: "User Satisfaction", target: "> 4.0/5", current: "N/A" },
    { name: "Adoption Rate", target: "> 60%", current: "N/A" },
  ],
};

// ── Settings / Profile ──

export const profile = {
  name: "Noosrat Oyepeju Iyabo Aziz-Niyi",
  roles: ["MComp Student", "Researcher", "AI Engineer", "Generative AI Researcher", "Agentic AI Researcher", "Software Developer", "Graduate Assistant", "Entrepreneur"],
  supervisors: ["Prof Pius Adewale Owolaw", "Prof Alonge Ayodeli Akintiunde"],
  mission: "To become a leading AI researcher, academic, and educator specializing in Generative AI, Agentic AI, and Academic Intelligence Systems for Higher Education Institutions.",
  methodology: "Design Science Research (DSR)",
  devMethodology: "Personal Extreme Programming (PXP)",
  mainRQ: "How can a centralized multi-tenant LLM-based academic intelligence system be designed and implemented for higher education institutions?",
};
