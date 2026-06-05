import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { evaluationMetrics } from "@/lib/data";

export default function ResultsPage() {
  return (
    <>
      <Header title="Results & Metrics" subtitle="Evaluation Metrics & Target Performance" />
      <div className="p-8 space-y-8">
        {/* System Performance */}
        <SectionCard title="System Performance Metrics">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Metric</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Target</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Current</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {evaluationMetrics.system.map((m) => (
                  <tr key={m.name} className="hover:bg-slate-50">
                    <td className="py-3 text-sm font-medium text-slate-900">{m.name}</td>
                    <td className="py-3 text-sm text-slate-600">{m.target}</td>
                    <td className="py-3 text-sm text-slate-500">{m.current}</td>
                    <td className="py-3">
                      <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-full text-xs">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* AI Performance */}
        <SectionCard title="AI Performance Metrics">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Metric</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Target</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Current</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {evaluationMetrics.ai.map((m) => (
                  <tr key={m.name} className="hover:bg-slate-50">
                    <td className="py-3 text-sm font-medium text-slate-900">{m.name}</td>
                    <td className="py-3 text-sm text-slate-600">{m.target}</td>
                    <td className="py-3 text-sm text-slate-500">{m.current}</td>
                    <td className="py-3">
                      <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-full text-xs">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* User Evaluation */}
        <SectionCard title="User Evaluation Metrics">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Metric</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Target</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Current</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {evaluationMetrics.user.map((m) => (
                  <tr key={m.name} className="hover:bg-slate-50">
                    <td className="py-3 text-sm font-medium text-slate-900">{m.name}</td>
                    <td className="py-3 text-sm text-slate-600">{m.target}</td>
                    <td className="py-3 text-sm text-slate-500">{m.current}</td>
                    <td className="py-3">
                      <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-full text-xs">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Summary Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-2">Awaiting Experimental Data</h3>
          <p className="text-sm text-amber-800">
            All evaluation metrics are pending. Results will be populated once experiments are executed
            and the prototype system is deployed for testing. See the Experiments page for planned evaluations.
          </p>
        </div>
      </div>
    </>
  );
}
