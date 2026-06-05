"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import SectionCard from "@/components/SectionCard";
import { sequenceDiagram } from "@/lib/diagrams";

export default function SequenceDiagramPage() {
  return (
    <>
      <Header title="Sequence Diagram" subtitle="RAG Query Flow - From User Input to AI Response" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={sequenceDiagram} title="Academic Query Sequence Diagram" />

        <SectionCard title="Flow Description">
          <div className="space-y-4">
            {[
              { step: 1, title: "User Submits Query", desc: "Student/lecturer enters an academic question through the web or mobile interface." },
              { step: 2, title: "Authentication & Authorization", desc: "API gateway validates JWT token, extracts tenant_id, and checks RBAC permissions." },
              { step: 3, title: "RAG Pipeline Processing", desc: "Query is embedded and used for similarity search against tenant-scoped vector database." },
              { step: 4, title: "Context Retrieval", desc: "Relevant document chunks are retrieved from the vector DB with tenant isolation enforced." },
              { step: 5, title: "LLM Response Generation", desc: "Query + retrieved context sent to LLM engine for grounded answer generation." },
              { step: 6, title: "Audit & Response", desc: "Query and response are logged for audit, then returned to user with source citations." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold text-sm">{item.step}</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
