import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { evaluationMetrics } from "@/lib/data";

export default function EvaluationMetricsPage() {
  return (
    <>
      <Header title="Evaluation Metrics" subtitle="System, AI, and User Performance Targets" />
      <div className="p-8 space-y-8">
        {[
          { title: "System Performance Metrics", data: evaluationMetrics.system, color: "blue", description: "Infrastructure and service-level performance indicators." },
          { title: "AI Performance Metrics", data: evaluationMetrics.ai, color: "green", description: "RAG retrieval accuracy and LLM response quality measures." },
          { title: "User Evaluation Metrics", data: evaluationMetrics.user, color: "purple", description: "End-user experience and adoption measures from usability studies." },
        ].map((section) => (
          <SectionCard key={section.title} title={section.title}>
            <p className="text-sm text-slate-600 mb-4">{section.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {section.data.map((m) => (
                <div key={m.name} className={`bg-${section.color}-50 rounded-lg p-4 ring-1 ring-${section.color}-200`}>
                  <p className="text-sm font-medium text-slate-700">{m.name}</p>
                  <p className={`text-2xl font-bold text-${section.color}-700 mt-1`}>{m.target}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500">Current: {m.current}</span>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}

        <SectionCard title="Evaluation Strategy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { method: "Automated Benchmarks", desc: "Scripted load tests and RAG accuracy evaluation using test datasets.", tools: "pytest, Locust, RAGAS" },
              { method: "A/B Comparison", desc: "Compare responses with and without RAG to measure improvement.", tools: "Custom test harness" },
              { method: "User Study", desc: "System Usability Scale (SUS) questionnaire with 15-30 participants across roles.", tools: "Google Forms, SUS scoring" },
            ].map((m) => (
              <div key={m.method} className="border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 text-sm">{m.method}</p>
                <p className="text-sm text-slate-600 mt-1">{m.desc}</p>
                <p className="text-xs text-slate-500 mt-2">Tools: {m.tools}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
