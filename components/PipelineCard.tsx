interface PipelineItem {
  title: string;
  type?: string;
  status: string;
  target: string;
  deadline?: string;
}

interface PipelineCardProps {
  title: string;
  items: PipelineItem[];
  columns?: string[];
}

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  submitted: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  published: "bg-purple-100 text-purple-700",
  planned: "bg-slate-100 text-slate-600",
  presented: "bg-emerald-100 text-emerald-700",
  attended: "bg-blue-100 text-blue-700",
};

export default function PipelineCard({ title, items, columns = ["Title", "Status", "Target", "Deadline"] }: PipelineCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{items.length} items</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((col) => (
                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || "bg-slate-100 text-slate-600"}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.target}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.deadline || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
