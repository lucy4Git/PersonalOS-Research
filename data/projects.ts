/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  data/projects.ts — Single source of truth for all     │
 * │  project information in the PersonalOS Dashboard.      │
 * │                                                        │
 * │  To update any project, edit ONLY this file.           │
 * │  Dashboard, AI Projects, Roadmap, and Architecture     │
 * │  pages all read from here.                             │
 * └─────────────────────────────────────────────────────────┘
 */

// ── Types ──

export type ProjectStatus = "active" | "planned" | "completed" | "on-hold";
export type RoadmapStatus = "completed" | "in-progress" | "upcoming";

export interface Milestone {
  label: string;
  completed: boolean;
  progress?: number;
  date?: string;
}

export interface ProjectData {
  /** Unique slug used as key across pages */
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  description: string;
  techStack: string[];
  tasks: Milestone[];
  nextMilestone: string;
  /** Path relative to vault root, e.g. "05_AI_Projects/Blood Cell Detection" */
  vaultLink: string;
}

export interface RoadmapPhase {
  id: number;
  name: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: RoadmapStatus;
  milestones: Milestone[];
  color: string;
}

export interface ArchitectureLayer {
  [layer: string]: string[];
}

export interface TechStackCategory {
  [key: string]: string;
}

export interface TechStackMap {
  [category: string]: TechStackCategory;
}

// ── Projects ──

export const projects: ProjectData[] = [
  {
    id: "academic-intelligence-system",
    name: "Centralized Academic Intelligence System",
    status: "active",
    progress: 44,
    description:
      "Multi-tenant LLM-based platform for higher education with RAG, RBAC, and AI governance.",
    techStack: [
      "FastAPI",
      "Next.js",
      "MongoDB",
      "LangChain",
      "ChromaDB",
      "Python",
      "TypeScript",
      "Docker",
    ],
    vaultLink: "05_AI_Projects/Academic Intelligence System",
    tasks: [
      { label: "Research proposal approved", completed: true },
      { label: "Literature review in progress", completed: true, progress: 60 },
      { label: "System architecture design", completed: true },
      { label: "PRISMA screening completion", completed: true },
      { label: "Prototype implementation", completed: false, progress: 10 },
      { label: "Backend development", completed: false, progress: 0 },
      { label: "Frontend development", completed: false, progress: 0 },
      { label: "Testing", completed: false, progress: 0 },
      { label: "Dissertation writing", completed: false, progress: 5 },
    ],
    nextMilestone: "Complete SLR and finalize system architecture",
  },
  {
    id: "blood-cell-detection",
    name: "Blood Cell Detection",
    status: "completed",
    progress: 100,
    description:
      "YOLO-based blood cell detection and classification system developed using custom-trained object detection models.",
    techStack: [
      "YOLOv10",
      "YOLOv11",
      "YOLOv12",
      "Flask",
      "OpenCV",
      "Python",
      "PyTorch",
      "Ultralytics",
    ],
    vaultLink: "05_AI_Projects/Blood Cell Detection",
    tasks: [
      { label: "Dataset preparation", completed: true },
      { label: "YOLO model training", completed: true },
      { label: "Model evaluation", completed: true },
      { label: "Detection pipeline", completed: true },
      { label: "Flask/webcam prototype", completed: true },
      { label: "Snapshot capture", completed: true },
      { label: "Video recording support", completed: true },
    ],
    nextMilestone:
      "Add project documentation, screenshots, GitHub portfolio page, and Vercel showcase page",
  },
  {
    id: "poultry-disease-detection",
    name: "Poultry Disease Detection",
    status: "completed",
    progress: 100,
    description:
      "Generative AI chatbot for poultry disease detection integrated with a Management Information System.",
    techStack: [
      "FastAPI",
      "MongoDB",
      "LLaMA 3",
      "JWT",
      "Python",
      "ResNet-18",
      "DenseNet-121",
      "VGG16",
    ],
    vaultLink: "05_AI_Projects/Poultry Disease Detection",
    tasks: [
      { label: "Research paper completed", completed: true },
      { label: "CNN model training", completed: true },
      { label: "ResNet-18 implementation", completed: true },
      { label: "DenseNet-121 implementation", completed: true },
      { label: "VGG16 implementation", completed: true },
      { label: "DenseNet-121 selected as best model", completed: true },
      { label: "LLaMA 3 integration", completed: true },
      { label: "FastAPI backend architecture", completed: true },
      { label: "MongoDB integration", completed: true },
      { label: "JWT security", completed: true },
      { label: "MIS module", completed: true },
      { label: "Evaluation completed", completed: true },
    ],
    nextMilestone:
      "Add architecture diagrams, publication link, and project showcase page",
  },
];

// ── Derived helpers ──

/** Get a single project by id */
export function getProject(id: string): ProjectData | undefined {
  return projects.find((p) => p.id === id);
}

/** All projects with a given status */
export function getProjectsByStatus(status: ProjectStatus): ProjectData[] {
  return projects.filter((p) => p.status === status);
}

/** Computed stats used by dashboard and AI Projects page */
export function getProjectStats() {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const planned = projects.filter((p) => p.status === "planned").length;
  const totalTasks = projects.reduce((s, p) => s + p.tasks.length, 0);
  const completedTasks = projects.reduce(
    (s, p) => s + p.tasks.filter((t) => t.completed).length,
    0
  );
  return { total, active, completed, planned, totalTasks, completedTasks };
}

// ── System Architecture (main project) ──

export const systemArchitecture: ArchitectureLayer = {
  frontend: ["Web Application", "Mobile Interface"],
  backend: ["FastAPI", "Microservices"],
  database: ["MongoDB"],
  aiLayer: ["LLM", "RAG", "Vector Database", "Multi-agent Coordination"],
  security: ["RBAC", "Authentication", "Audit Logging"],
};

export const techStack: TechStackMap = {
  frontend: {
    framework: "Next.js / React",
    language: "TypeScript",
    styling: "Tailwind CSS",
  },
  backend: {
    framework: "FastAPI",
    language: "Python",
    architecture: "Microservices",
  },
  database: { primary: "MongoDB", vector: "ChromaDB / Qdrant" },
  ai: {
    llm: "OpenAI / Local LLM",
    rag: "LangChain",
    embeddings: "OpenAI / HuggingFace",
  },
  devops: {
    methodology: "Personal Extreme Programming (PXP)",
    ci: "GitHub Actions",
  },
};

// ── Roadmap Phases ──

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    name: "Phase 1: Research Foundation",
    subtitle: "Literature Review & Methodology",
    startDate: "2026-01",
    endDate: "2026-04",
    progress: 75,
    status: "in-progress",
    color: "blue",
    milestones: [
      { label: "Research proposal approved", completed: true, date: "2026-01-15" },
      { label: "Define research questions & objectives", completed: true, date: "2026-02-01" },
      { label: "Complete PRISMA screening", completed: true, date: "2026-04-10" },
      { label: "Thematic synthesis & gap analysis", completed: false },
      { label: "Finalize SLR manuscript", completed: false },
    ],
  },
  {
    id: 2,
    name: "Phase 2: System Design",
    subtitle: "Architecture & Database Design",
    startDate: "2026-04",
    endDate: "2026-06",
    progress: 45,
    status: "in-progress",
    color: "purple",
    milestones: [
      { label: "System architecture design", completed: true, date: "2026-04-20" },
      { label: "ER diagram & database schema", completed: true, date: "2026-05-01" },
      { label: "Use case & sequence diagrams", completed: true, date: "2026-05-10" },
      { label: "Deployment architecture", completed: false },
      { label: "Design review with supervisors", completed: false },
    ],
  },
  {
    id: 3,
    name: "Phase 3: Backend Development",
    subtitle: "FastAPI + MongoDB + RAG Pipeline",
    startDate: "2026-06",
    endDate: "2026-09",
    progress: 10,
    status: "in-progress",
    color: "green",
    milestones: [
      { label: "Project scaffold & CI/CD", completed: true, date: "2026-06-01" },
      { label: "Auth & tenant service", completed: false },
      { label: "Document ingestion pipeline", completed: false },
      { label: "RAG query service", completed: false },
      { label: "RBAC & audit logging", completed: false },
      { label: "API integration tests", completed: false },
    ],
  },
  {
    id: 4,
    name: "Phase 4: Frontend Development",
    subtitle: "Next.js Dashboard & Chat Interface",
    startDate: "2026-08",
    endDate: "2026-10",
    progress: 5,
    status: "upcoming",
    color: "cyan",
    milestones: [
      { label: "PersonalOS dashboard (this UI)", completed: true },
      { label: "Multi-tenant login & onboarding", completed: false },
      { label: "AI chat interface", completed: false },
      { label: "Document management UI", completed: false },
      { label: "Admin panel & analytics", completed: false },
    ],
  },
  {
    id: 5,
    name: "Phase 5: Evaluation",
    subtitle: "Testing, Benchmarks & User Study",
    startDate: "2026-10",
    endDate: "2026-11",
    progress: 0,
    status: "upcoming",
    color: "amber",
    milestones: [
      { label: "System performance benchmarks", completed: false },
      { label: "RAG retrieval accuracy tests", completed: false },
      { label: "Multi-tenant isolation testing", completed: false },
      { label: "Usability study (SUS)", completed: false },
      { label: "Results analysis & visualization", completed: false },
    ],
  },
  {
    id: 6,
    name: "Phase 6: Dissertation Submission",
    subtitle: "Writing, Review & Final Submission",
    startDate: "2026-11",
    endDate: "2027-02",
    progress: 0,
    status: "upcoming",
    color: "rose",
    milestones: [
      { label: "Complete all dissertation chapters", completed: false },
      { label: "Internal review with supervisors", completed: false },
      { label: "Revisions & proofreading", completed: false },
      { label: "Submit journal paper from SLR", completed: false },
      { label: "Final dissertation submission", completed: false },
    ],
  },
];
