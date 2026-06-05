import Link from "next/link";
import Header from "@/components/Header";

const architecturePages = [
  { href: "/architecture/system", title: "System Architecture", description: "Multi-layered system architecture with frontend, backend, AI, data, and security layers", icon: "layers", color: "blue" },
  { href: "/architecture/use-case", title: "Use Case Diagram", description: "Actor-use case mappings for students, lecturers, administrators, and system", icon: "users", color: "green" },
  { href: "/architecture/sequence", title: "Sequence Diagram", description: "Request flow from user query through auth, RBAC, RAG pipeline, to response", icon: "arrow", color: "purple" },
  { href: "/architecture/er-diagram", title: "ER Diagram", description: "Entity-relationship model showing tenants, users, documents, queries, and audit logs", icon: "database", color: "amber" },
  { href: "/architecture/deployment", title: "Deployment Diagram", description: "Cloud infrastructure layout with load balancing, clustering, and monitoring", icon: "cloud", color: "cyan" },
  { href: "/architecture/database-schema", title: "Database Schema", description: "MongoDB collection schemas with fields, types, and relationships", icon: "table", color: "rose" },
  { href: "/architecture/evaluation-metrics", title: "Evaluation Metrics", description: "System, AI, and user evaluation metrics with targets", icon: "chart", color: "emerald" },
  { href: "/architecture/roadmap", title: "Prototype Roadmap", description: "6-phase development roadmap with milestones and progress tracking", icon: "map", color: "indigo" },
];

export default function ArchitectureHubPage() {
  return (
    <>
      <Header title="Architecture Hub" subtitle="System Design, Diagrams & Development Roadmap" />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {architecturePages.map((page) => (
            <Link key={page.href} href={page.href} className="group">
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 h-full transition-all hover:shadow-md hover:ring-blue-300 hover:-translate-y-0.5">
                <div className={`w-10 h-10 rounded-lg bg-${page.color}-100 flex items-center justify-center mb-4`}>
                  <span className={`text-${page.color}-600 text-lg font-bold`}>
                    {page.title.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {page.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
