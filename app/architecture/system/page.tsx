"use client";

import Header from "@/components/Header";
import MermaidDiagram from "@/components/MermaidDiagram";
import SectionCard from "@/components/SectionCard";
import { systemArchitectureDiagram } from "@/lib/diagrams";
import { systemArchitecture, techStack } from "@/data/projects";

export default function SystemArchitecturePage() {
  return (
    <>
      <Header title="System Architecture" subtitle="Centralized Academic Intelligence System - Architecture Overview" />
      <div className="p-8 space-y-8">
        <MermaidDiagram chart={systemArchitectureDiagram} title="System Architecture Diagram" />

        <SectionCard title="Architecture Layers">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(systemArchitecture).map(([layer, components]) => (
              <div key={layer} className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                  {layer.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <div className="space-y-2">
                  {components.map((comp) => (
                    <div key={comp} className="bg-white rounded px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                      {comp}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Technology Stack">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category} className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-900 mb-3 capitalize">{category}</p>
                <div className="space-y-2">
                  {Object.entries(items).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-slate-500 capitalize">{key}</p>
                      <p className="text-sm text-slate-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
