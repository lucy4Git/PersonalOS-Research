"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import { erDiagram } from "@/lib/diagrams";

export default function ERDiagramPage() {
  return (
    <>
      <Header title="ER Diagram" subtitle="Entity-Relationship Model for the Academic Intelligence System" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={erDiagram} title="Entity-Relationship Diagram" />

        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Entity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Tenant", desc: "Represents an institution. All data is scoped to a tenant for isolation.", fields: 6, color: "blue" },
              { name: "User", desc: "Students, lecturers, and admins. Each belongs to one tenant with a role.", fields: 7, color: "green" },
              { name: "Document", desc: "Uploaded academic materials — policies, study guides, research papers.", fields: 8, color: "purple" },
              { name: "Chunk", desc: "Document segments created during ingestion for embedding and retrieval.", fields: 4, color: "amber" },
              { name: "Embedding", desc: "Vector representations of chunks stored in the vector database.", fields: 4, color: "cyan" },
              { name: "Query", desc: "User-submitted academic questions with tenant context.", fields: 5, color: "rose" },
              { name: "Response", desc: "AI-generated answers with confidence scores and source references.", fields: 6, color: "emerald" },
              { name: "Audit Log", desc: "Immutable record of all system actions for governance compliance.", fields: 7, color: "indigo" },
            ].map((entity) => (
              <div key={entity.name} className={`border border-slate-200 rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{entity.name}</h4>
                  <span className="text-xs text-slate-500">{entity.fields} fields</span>
                </div>
                <p className="text-sm text-slate-600">{entity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
