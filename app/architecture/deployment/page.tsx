"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import SectionCard from "@/components/SectionCard";
import { deploymentDiagram } from "@/lib/diagrams";

export default function DeploymentDiagramPage() {
  return (
    <>
      <Header title="Deployment Diagram" subtitle="Cloud Infrastructure & Deployment Architecture" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={deploymentDiagram} title="Deployment Architecture" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              tier: "Client Tier",
              color: "blue",
              components: [
                { name: "Web Browser", tech: "Next.js SSR via Vercel Edge" },
                { name: "Mobile App", tech: "React Native (future)" },
              ],
            },
            {
              tier: "Application Tier",
              color: "green",
              components: [
                { name: "Load Balancer", tech: "Nginx / Traefik" },
                { name: "API Cluster", tech: "3x FastAPI instances" },
                { name: "Background Workers", tech: "Celery + Embedding workers" },
              ],
            },
            {
              tier: "Data Tier",
              color: "purple",
              components: [
                { name: "MongoDB", tech: "Primary + Replica Set" },
                { name: "Qdrant", tech: "Vector DB for RAG" },
                { name: "Redis", tech: "Caching layer" },
              ],
            },
          ].map((tier) => (
            <SectionCard key={tier.tier} title={tier.tier}>
              <div className="space-y-3">
                {tier.components.map((comp) => (
                  <div key={comp.name} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-slate-900">{comp.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{comp.tech}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <SectionCard title="External Services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "OpenAI API", purpose: "LLM inference for response generation" },
              { name: "HuggingFace", purpose: "Embedding model hosting" },
              { name: "Prometheus", purpose: "Metrics collection & alerting" },
              { name: "Grafana", purpose: "Dashboard & visualization" },
            ].map((svc) => (
              <div key={svc.name} className="border border-slate-200 rounded-lg p-4">
                <p className="font-medium text-slate-900 text-sm">{svc.name}</p>
                <p className="text-xs text-slate-500 mt-1">{svc.purpose}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
