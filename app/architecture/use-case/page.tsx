"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import { useCaseDiagram } from "@/lib/diagrams";

export default function UseCasePage() {
  return (
    <>
      <Header title="Use Case Diagram" subtitle="Actor-Use Case Mappings for the Academic Intelligence System" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={useCaseDiagram} title="Use Case Diagram" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { actor: "Student", color: "green", cases: ["Ask academic questions", "Get study guidance", "Access learning materials", "View personalized recommendations", "Chat with AI assistant"] },
            { actor: "Lecturer", color: "amber", cases: ["Upload course materials", "Generate assessment content", "Query research papers", "Get teaching analytics", "Review student queries"] },
            { actor: "Administrator", color: "purple", cases: ["Manage tenants", "Configure RBAC policies", "View audit logs", "Monitor system performance", "Manage AI governance rules"] },
            { actor: "System", color: "rose", cases: ["Process documents", "Generate embeddings", "Execute RAG pipeline", "Enforce tenant isolation", "Log all activities"] },
          ].map((group) => (
            <div key={group.actor} className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
              <div className={`w-10 h-10 rounded-full bg-${group.color}-100 flex items-center justify-center mb-3`}>
                <span className={`text-${group.color}-700 font-bold text-sm`}>{group.actor[0]}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">{group.actor}</h3>
              <ul className="space-y-2">
                {group.cases.map((uc) => (
                  <li key={uc} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${group.color}-400 mt-1.5 flex-shrink-0`} />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
