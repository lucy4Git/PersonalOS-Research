import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { experiments } from "@/lib/data";

const statusStyles: Record<string, string> = {
  planned: "bg-slate-100 text-slate-600",
  running: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  analyzing: "bg-amber-100 text-amber-700",
};

export default function ExperimentsPage() {
  return (
    <>
      <Header title="Experiments" subtitle="Planned Experiments & Evaluations" />
      <div className="p-8 space-y-6">
        {experiments.map((exp) => (
          <SectionCard key={exp.name} title={exp.name} action={
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[exp.status] || statusStyles.planned}`}>
              {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
            </span>
          }>
            <p className="text-sm text-slate-600 mb-4">{exp.description}</p>
            {exp.metrics && exp.metrics.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Metrics</p>
                <div className="flex flex-wrap gap-2">
                  {exp.metrics.map((metric) => (
                    <span key={metric} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>
        ))}
      </div>
    </>
  );
}
