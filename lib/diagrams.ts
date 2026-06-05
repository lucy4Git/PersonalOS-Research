// Mermaid diagram definitions based on PersonalOS vault architecture

export const systemArchitectureDiagram = `
graph TB
  subgraph Frontend["Frontend Layer"]
    WEB["Web Application<br/>(Next.js / React)"]
    MOB["Mobile Interface<br/>(React Native)"]
  end

  subgraph API["API Gateway"]
    GW["FastAPI Gateway<br/>Rate Limiting / Auth"]
  end

  subgraph Backend["Backend Services (Microservices)"]
    AUTH["Auth Service<br/>JWT / OAuth2"]
    TENANT["Tenant Service<br/>Multi-tenancy Mgmt"]
    DOC["Document Service<br/>Ingestion & Processing"]
    QUERY["Query Service<br/>RAG Pipeline"]
    AGENT["Agent Service<br/>Multi-Agent Coordination"]
    ADMIN["Admin Service<br/>Governance & Audit"]
  end

  subgraph AI["AI Layer"]
    LLM["LLM Engine<br/>(OpenAI / Local)"]
    EMB["Embedding Model<br/>(HuggingFace)"]
    RAG["RAG Pipeline<br/>(LangChain)"]
  end

  subgraph Data["Data Layer"]
    MONGO[("MongoDB<br/>Application Data")]
    VECTOR[("Vector DB<br/>ChromaDB / Qdrant")]
    CACHE[("Redis<br/>Cache")]
  end

  subgraph Security["Security Layer"]
    RBAC["RBAC Engine"]
    AUDIT["Audit Logger"]
    ENCRYPT["Encryption<br/>At Rest & Transit"]
  end

  WEB --> GW
  MOB --> GW
  GW --> AUTH
  GW --> TENANT
  GW --> DOC
  GW --> QUERY
  GW --> AGENT
  GW --> ADMIN
  QUERY --> RAG
  RAG --> LLM
  RAG --> EMB
  DOC --> EMB
  EMB --> VECTOR
  AUTH --> MONGO
  TENANT --> MONGO
  DOC --> MONGO
  QUERY --> VECTOR
  QUERY --> CACHE
  AGENT --> LLM
  AUTH --> RBAC
  ADMIN --> AUDIT
  RBAC --> ENCRYPT

  classDef frontend fill:#dbeafe,stroke:#3b82f6,color:#1e40af
  classDef backend fill:#f0fdf4,stroke:#22c55e,color:#166534
  classDef ai fill:#fef3c7,stroke:#f59e0b,color:#92400e
  classDef data fill:#fae8ff,stroke:#a855f7,color:#6b21a8
  classDef security fill:#fee2e2,stroke:#ef4444,color:#991b1b
  classDef gateway fill:#e0e7ff,stroke:#6366f1,color:#3730a3

  class WEB,MOB frontend
  class AUTH,TENANT,DOC,QUERY,AGENT,ADMIN backend
  class LLM,EMB,RAG ai
  class MONGO,VECTOR,CACHE data
  class RBAC,AUDIT,ENCRYPT security
  class GW gateway
`;

export const useCaseDiagram = `
graph LR
  subgraph Actors
    STU(("Student"))
    LEC(("Lecturer"))
    ADM(("Administrator"))
    SYS(("System Admin"))
  end

  subgraph StudentUC["Student Use Cases"]
    S1["Ask Academic Questions"]
    S2["Get Study Guidance"]
    S3["Access Learning Materials"]
    S4["View Personalized Recommendations"]
    S5["Chat with AI Assistant"]
  end

  subgraph LecturerUC["Lecturer Use Cases"]
    L1["Upload Course Materials"]
    L2["Generate Assessment Content"]
    L3["Query Research Papers"]
    L4["Get Teaching Analytics"]
    L5["Review Student Queries"]
  end

  subgraph AdminUC["Admin Use Cases"]
    A1["Manage Tenants"]
    A2["Configure RBAC Policies"]
    A3["View Audit Logs"]
    A4["Monitor System Performance"]
    A5["Manage AI Governance Rules"]
  end

  subgraph SystemUC["System Use Cases"]
    SY1["Process Documents"]
    SY2["Generate Embeddings"]
    SY3["Execute RAG Pipeline"]
    SY4["Enforce Tenant Isolation"]
    SY5["Log All Activities"]
  end

  STU --> S1
  STU --> S2
  STU --> S3
  STU --> S4
  STU --> S5
  LEC --> L1
  LEC --> L2
  LEC --> L3
  LEC --> L4
  LEC --> L5
  ADM --> A1
  ADM --> A2
  ADM --> A3
  ADM --> A4
  ADM --> A5
  SYS --> SY1
  SYS --> SY2
  SYS --> SY3
  SYS --> SY4
  SYS --> SY5

  classDef actor fill:#dbeafe,stroke:#3b82f6,color:#1e40af
  classDef studentUC fill:#f0fdf4,stroke:#22c55e,color:#166534
  classDef lecturerUC fill:#fef3c7,stroke:#f59e0b,color:#92400e
  classDef adminUC fill:#fae8ff,stroke:#a855f7,color:#6b21a8
  classDef sysUC fill:#fee2e2,stroke:#ef4444,color:#991b1b

  class STU,LEC,ADM,SYS actor
  class S1,S2,S3,S4,S5 studentUC
  class L1,L2,L3,L4,L5 lecturerUC
  class A1,A2,A3,A4,A5 adminUC
  class SY1,SY2,SY3,SY4,SY5 sysUC
`;

export const sequenceDiagram = `
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant GW as API Gateway
  participant AUTH as Auth Service
  participant RBAC as RBAC Engine
  participant QS as Query Service
  participant RAG as RAG Pipeline
  participant VDB as Vector DB
  participant LLM as LLM Engine
  participant AUDIT as Audit Logger

  U->>FE: Submit academic query
  FE->>GW: POST /api/query
  GW->>AUTH: Validate JWT token
  AUTH-->>GW: Token valid + tenant_id

  GW->>RBAC: Check permissions(user, action)
  RBAC-->>GW: Authorized

  GW->>QS: Forward query + tenant context
  QS->>RAG: Process with RAG pipeline

  RAG->>VDB: Similarity search(query_embedding, tenant_filter)
  VDB-->>RAG: Relevant document chunks

  RAG->>LLM: Generate response(query + context)
  LLM-->>RAG: AI-generated answer

  RAG-->>QS: Formatted response + sources
  QS->>AUDIT: Log query + response
  QS-->>GW: Response payload
  GW-->>FE: JSON response
  FE-->>U: Display answer with citations
`;

export const erDiagram = `
erDiagram
  TENANT ||--o{ USER : has
  TENANT ||--o{ DOCUMENT : owns
  TENANT ||--o{ POLICY : configures
  USER ||--o{ QUERY : submits
  USER ||--o{ SESSION : has
  USER }o--|| ROLE : assigned
  ROLE ||--o{ PERMISSION : grants
  DOCUMENT ||--o{ CHUNK : split_into
  CHUNK ||--o{ EMBEDDING : has
  QUERY ||--|| RESPONSE : generates
  QUERY ||--o{ RETRIEVAL : triggers
  RETRIEVAL }o--|| CHUNK : references
  RESPONSE ||--o{ AUDIT_LOG : logged_in

  TENANT {
    string id PK
    string name
    string domain
    string config
    datetime created_at
    boolean is_active
  }

  USER {
    string id PK
    string tenant_id FK
    string email
    string name
    string role_id FK
    datetime last_login
  }

  ROLE {
    string id PK
    string name
    string description
    string tenant_id FK
  }

  PERMISSION {
    string id PK
    string role_id FK
    string resource
    string action
  }

  DOCUMENT {
    string id PK
    string tenant_id FK
    string title
    string type
    string source_path
    datetime uploaded_at
    string status
  }

  CHUNK {
    string id PK
    string document_id FK
    int sequence
    string content
    string metadata
  }

  EMBEDDING {
    string id PK
    string chunk_id FK
    string model
    float[] vector
  }

  QUERY {
    string id PK
    string user_id FK
    string tenant_id FK
    string text
    datetime created_at
  }

  RESPONSE {
    string id PK
    string query_id FK
    string content
    float confidence
    string sources
    int tokens_used
  }

  RETRIEVAL {
    string id PK
    string query_id FK
    string chunk_id FK
    float similarity_score
    int rank
  }

  AUDIT_LOG {
    string id PK
    string tenant_id FK
    string user_id FK
    string action
    string resource
    string details
    datetime timestamp
  }

  SESSION {
    string id PK
    string user_id FK
    datetime started_at
    datetime ended_at
    int query_count
  }

  POLICY {
    string id PK
    string tenant_id FK
    string type
    string rules
    boolean is_active
  }
`;

export const deploymentDiagram = `
graph TB
  subgraph Client["Client Tier"]
    BROWSER["Web Browser<br/>(Next.js SSR)"]
    MOBILE["Mobile App<br/>(React Native)"]
  end

  subgraph CDN["CDN / Edge"]
    VERCEL["Vercel Edge<br/>Static Assets & SSR"]
  end

  subgraph Cloud["Cloud Infrastructure"]
    subgraph LB["Load Balancer"]
      NGINX["Nginx / Traefik"]
    end

    subgraph AppCluster["Application Cluster"]
      API1["FastAPI Instance 1"]
      API2["FastAPI Instance 2"]
      API3["FastAPI Instance 3"]
    end

    subgraph Workers["Background Workers"]
      CELERY["Celery Workers<br/>Document Processing"]
      EMBED["Embedding Workers<br/>Vector Generation"]
    end

    subgraph DataStores["Data Stores"]
      MONGO_PRIMARY[("MongoDB Primary")]
      MONGO_REPLICA[("MongoDB Replica")]
      REDIS[("Redis Cache")]
      QDRANT[("Qdrant Vector DB")]
    end

    subgraph AI_Services["AI Services"]
      OPENAI["OpenAI API"]
      HF["HuggingFace<br/>Embeddings"]
    end

    subgraph Monitoring["Monitoring"]
      PROM["Prometheus"]
      GRAF["Grafana"]
      LOG["Log Aggregation"]
    end
  end

  BROWSER --> VERCEL
  MOBILE --> VERCEL
  VERCEL --> NGINX
  NGINX --> API1
  NGINX --> API2
  NGINX --> API3
  API1 --> MONGO_PRIMARY
  API2 --> MONGO_PRIMARY
  API3 --> MONGO_PRIMARY
  MONGO_PRIMARY --> MONGO_REPLICA
  API1 --> REDIS
  API1 --> QDRANT
  API1 --> CELERY
  CELERY --> EMBED
  EMBED --> QDRANT
  EMBED --> HF
  API1 --> OPENAI
  API1 --> PROM
  PROM --> GRAF
  API1 --> LOG

  classDef client fill:#dbeafe,stroke:#3b82f6,color:#1e40af
  classDef cdn fill:#e0e7ff,stroke:#6366f1,color:#3730a3
  classDef app fill:#f0fdf4,stroke:#22c55e,color:#166534
  classDef worker fill:#fef3c7,stroke:#f59e0b,color:#92400e
  classDef datastore fill:#fae8ff,stroke:#a855f7,color:#6b21a8
  classDef ai fill:#fecaca,stroke:#ef4444,color:#991b1b
  classDef monitor fill:#f0f9ff,stroke:#0ea5e9,color:#0c4a6e

  class BROWSER,MOBILE client
  class VERCEL cdn
  class NGINX,API1,API2,API3 app
  class CELERY,EMBED worker
  class MONGO_PRIMARY,MONGO_REPLICA,REDIS,QDRANT datastore
  class OPENAI,HF ai
  class PROM,GRAF,LOG monitor
`;

export const databaseSchemaDiagram = `
erDiagram
  tenants {
    ObjectId _id PK
    string name "Institution name"
    string slug "URL-safe identifier"
    string domain "Custom domain"
    object config "LLM settings per tenant"
    object limits "Rate limits and quotas"
    boolean is_active
    datetime created_at
    datetime updated_at
  }

  users {
    ObjectId _id PK
    ObjectId tenant_id FK
    string email
    string password_hash
    string full_name
    string role "student | lecturer | admin | super_admin"
    object preferences
    datetime last_login
    datetime created_at
  }

  documents {
    ObjectId _id PK
    ObjectId tenant_id FK
    ObjectId uploaded_by FK
    string title
    string type "policy | study_guide | lecture | research"
    string file_path
    string status "pending | processing | indexed | failed"
    int chunk_count
    object metadata
    datetime created_at
  }

  conversations {
    ObjectId _id PK
    ObjectId user_id FK
    ObjectId tenant_id FK
    string title
    int message_count
    datetime created_at
    datetime updated_at
  }

  messages {
    ObjectId _id PK
    ObjectId conversation_id FK
    string role "user | assistant | system"
    string content
    object sources "Retrieved chunk references"
    int tokens_used
    float response_time_ms
    datetime created_at
  }

  audit_logs {
    ObjectId _id PK
    ObjectId tenant_id FK
    ObjectId user_id FK
    string action
    string resource
    string ip_address
    object details
    datetime timestamp
  }

  tenants ||--o{ users : has
  tenants ||--o{ documents : owns
  tenants ||--o{ audit_logs : logs
  users ||--o{ conversations : creates
  users ||--o{ documents : uploads
  conversations ||--o{ messages : contains
  users ||--o{ audit_logs : generates
`;

// Roadmap phases are centralized in @/data/projects.ts
export type { RoadmapPhase } from "@/data/projects";
export { roadmapPhases } from "@/data/projects";

// Dissertation Command Center - detailed chapter data
export interface ChapterDetail {
  number: number;
  title: string;
  fullTitle: string;
  progress: number;
  status: "not-started" | "in-progress" | "draft" | "review" | "complete";
  wordCount: number;
  targetWords: number;
  sections: { name: string; progress: number; wordCount: number }[];
  notes: string;
  lastEdited?: string;
}

export const chapterDetails: ChapterDetail[] = [
  {
    number: 1,
    title: "Introduction",
    fullTitle: "Chapter 1: Introduction",
    progress: 20,
    status: "in-progress",
    wordCount: 1200,
    targetWords: 5000,
    lastEdited: "2026-05-25",
    notes: "Background and problem statement drafted. Need to refine research aims and significance.",
    sections: [
      { name: "1.1 Background", progress: 40, wordCount: 400 },
      { name: "1.2 Problem Statement", progress: 30, wordCount: 300 },
      { name: "1.3 Research Aims & Objectives", progress: 20, wordCount: 200 },
      { name: "1.4 Research Questions", progress: 15, wordCount: 150 },
      { name: "1.5 Significance of Study", progress: 10, wordCount: 100 },
      { name: "1.6 Scope & Limitations", progress: 5, wordCount: 50 },
      { name: "1.7 Chapter Outline", progress: 0, wordCount: 0 },
    ],
  },
  {
    number: 2,
    title: "Literature Review",
    fullTitle: "Chapter 2: Literature Review",
    progress: 60,
    status: "in-progress",
    wordCount: 8500,
    targetWords: 15000,
    lastEdited: "2026-06-02",
    notes: "PRISMA screening complete. 24 papers included. Thematic synthesis in progress.",
    sections: [
      { name: "2.1 Introduction", progress: 80, wordCount: 500 },
      { name: "2.2 Multi-tenant Architecture", progress: 70, wordCount: 2000 },
      { name: "2.3 RAG in Education", progress: 65, wordCount: 1800 },
      { name: "2.4 AI Governance in HE", progress: 55, wordCount: 1500 },
      { name: "2.5 LLMs in Higher Education", progress: 60, wordCount: 1700 },
      { name: "2.6 Research Gap Analysis", progress: 50, wordCount: 700 },
      { name: "2.7 Conceptual Framework", progress: 40, wordCount: 300 },
    ],
  },
  {
    number: 3,
    title: "Methodology",
    fullTitle: "Chapter 3: Research Methodology",
    progress: 30,
    status: "in-progress",
    wordCount: 2000,
    targetWords: 8000,
    lastEdited: "2026-05-20",
    notes: "DSR paradigm and PXP methodology documented. Data collection section needs work.",
    sections: [
      { name: "3.1 Research Paradigm (DSR)", progress: 60, wordCount: 600 },
      { name: "3.2 Research Approach", progress: 40, wordCount: 400 },
      { name: "3.3 Development Methodology (PXP)", progress: 35, wordCount: 350 },
      { name: "3.4 Data Collection", progress: 20, wordCount: 250 },
      { name: "3.5 Evaluation Framework", progress: 15, wordCount: 200 },
      { name: "3.6 Ethical Considerations", progress: 25, wordCount: 200 },
    ],
  },
  {
    number: 4,
    title: "System Design",
    fullTitle: "Chapter 4: System Design & Architecture",
    progress: 40,
    status: "in-progress",
    wordCount: 3000,
    targetWords: 10000,
    lastEdited: "2026-05-30",
    notes: "Architecture diagrams complete. Need to detail tenant isolation and RAG pipeline design.",
    sections: [
      { name: "4.1 System Overview", progress: 60, wordCount: 600 },
      { name: "4.2 Architecture Design", progress: 55, wordCount: 700 },
      { name: "4.3 Database Design", progress: 45, wordCount: 500 },
      { name: "4.4 RAG Pipeline Design", progress: 30, wordCount: 400 },
      { name: "4.5 RBAC & Tenant Isolation", progress: 25, wordCount: 350 },
      { name: "4.6 API Design", progress: 20, wordCount: 250 },
      { name: "4.7 Deployment Architecture", progress: 15, wordCount: 200 },
    ],
  },
  {
    number: 5,
    title: "Implementation",
    fullTitle: "Chapter 5: Implementation",
    progress: 5,
    status: "not-started",
    wordCount: 500,
    targetWords: 12000,
    lastEdited: "2026-05-15",
    notes: "Project scaffold created. Awaiting backend development progress.",
    sections: [
      { name: "5.1 Development Environment", progress: 20, wordCount: 200 },
      { name: "5.2 Backend Implementation", progress: 5, wordCount: 100 },
      { name: "5.3 AI/RAG Implementation", progress: 0, wordCount: 100 },
      { name: "5.4 Frontend Implementation", progress: 5, wordCount: 100 },
      { name: "5.5 Security Implementation", progress: 0, wordCount: 0 },
      { name: "5.6 Testing", progress: 0, wordCount: 0 },
    ],
  },
  {
    number: 6,
    title: "Evaluation",
    fullTitle: "Chapter 6: Evaluation & Results",
    progress: 0,
    status: "not-started",
    wordCount: 0,
    targetWords: 10000,
    notes: "Awaiting prototype completion and experiment execution.",
    sections: [
      { name: "6.1 Evaluation Methodology", progress: 0, wordCount: 0 },
      { name: "6.2 System Performance Results", progress: 0, wordCount: 0 },
      { name: "6.3 AI Performance Results", progress: 0, wordCount: 0 },
      { name: "6.4 Usability Study Results", progress: 0, wordCount: 0 },
      { name: "6.5 Discussion", progress: 0, wordCount: 0 },
    ],
  },
  {
    number: 7,
    title: "Conclusion",
    fullTitle: "Chapter 7: Conclusion & Future Work",
    progress: 0,
    status: "not-started",
    wordCount: 0,
    targetWords: 5000,
    notes: "To be written after evaluation is complete.",
    sections: [
      { name: "7.1 Summary of Findings", progress: 0, wordCount: 0 },
      { name: "7.2 Contributions", progress: 0, wordCount: 0 },
      { name: "7.3 Limitations", progress: 0, wordCount: 0 },
      { name: "7.4 Future Work", progress: 0, wordCount: 0 },
      { name: "7.5 Concluding Remarks", progress: 0, wordCount: 0 },
    ],
  },
];
