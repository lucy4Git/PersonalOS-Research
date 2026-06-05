"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import SectionCard from "@/components/SectionCard";
import { databaseSchemaDiagram } from "@/lib/diagrams";

const collections = [
  {
    name: "tenants",
    description: "Institution records with configuration and quotas",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "name", type: "string", desc: "Institution name" },
      { name: "slug", type: "string", desc: "URL-safe identifier" },
      { name: "domain", type: "string", desc: "Custom domain" },
      { name: "config", type: "object", desc: "LLM settings, model preferences" },
      { name: "limits", type: "object", desc: "Rate limits and quotas" },
      { name: "is_active", type: "boolean", desc: "Tenant active status" },
    ],
  },
  {
    name: "users",
    description: "Students, lecturers, and administrators",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "tenant_id", type: "ObjectId", desc: "FK to tenants" },
      { name: "email", type: "string", desc: "Unique per tenant" },
      { name: "password_hash", type: "string", desc: "Bcrypt hashed" },
      { name: "full_name", type: "string", desc: "Display name" },
      { name: "role", type: "string", desc: "student | lecturer | admin | super_admin" },
      { name: "preferences", type: "object", desc: "UI and AI preferences" },
    ],
  },
  {
    name: "documents",
    description: "Uploaded academic materials for RAG indexing",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "tenant_id", type: "ObjectId", desc: "FK to tenants (isolation)" },
      { name: "uploaded_by", type: "ObjectId", desc: "FK to users" },
      { name: "title", type: "string", desc: "Document title" },
      { name: "type", type: "string", desc: "policy | study_guide | lecture | research" },
      { name: "status", type: "string", desc: "pending | processing | indexed | failed" },
      { name: "chunk_count", type: "int", desc: "Number of chunks generated" },
    ],
  },
  {
    name: "conversations",
    description: "Chat sessions between users and the AI",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "user_id", type: "ObjectId", desc: "FK to users" },
      { name: "tenant_id", type: "ObjectId", desc: "FK to tenants" },
      { name: "title", type: "string", desc: "Auto-generated or user-set" },
      { name: "message_count", type: "int", desc: "Total messages" },
    ],
  },
  {
    name: "messages",
    description: "Individual messages within conversations",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "conversation_id", type: "ObjectId", desc: "FK to conversations" },
      { name: "role", type: "string", desc: "user | assistant | system" },
      { name: "content", type: "string", desc: "Message text" },
      { name: "sources", type: "object", desc: "Retrieved chunk references" },
      { name: "tokens_used", type: "int", desc: "LLM tokens consumed" },
      { name: "response_time_ms", type: "float", desc: "Generation latency" },
    ],
  },
  {
    name: "audit_logs",
    description: "Immutable governance and compliance records",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "tenant_id", type: "ObjectId", desc: "FK to tenants" },
      { name: "user_id", type: "ObjectId", desc: "FK to users" },
      { name: "action", type: "string", desc: "Action performed" },
      { name: "resource", type: "string", desc: "Target resource" },
      { name: "ip_address", type: "string", desc: "Client IP" },
      { name: "details", type: "object", desc: "Additional metadata" },
    ],
  },
];

export default function DatabaseSchemaPage() {
  return (
    <>
      <Header title="Database Schema" subtitle="MongoDB Collection Schemas - Academic Intelligence System" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={databaseSchemaDiagram} title="Database Schema Diagram" />

        <div className="space-y-6">
          {collections.map((col) => (
            <SectionCard key={col.name} title={col.name} action={
              <span className="text-xs text-slate-500">{col.fields.length} fields</span>
            }>
              <p className="text-sm text-slate-600 mb-4">{col.description}</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">Field</th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">Type</th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {col.fields.map((field) => (
                      <tr key={field.name} className="hover:bg-slate-50">
                        <td className="py-2 pr-4 text-sm font-mono text-blue-700">{field.name}</td>
                        <td className="py-2 pr-4 text-sm text-slate-600 font-mono">{field.type}</td>
                        <td className="py-2 text-sm text-slate-600">{field.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </>
  );
}
