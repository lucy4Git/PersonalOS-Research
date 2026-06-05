interface ProgressItem {
  label: string;
  completed: boolean;
  progress?: number;
}

interface ProgressCardProps {
  title: string;
  items: ProgressItem[];
  color?: string;
}

const barColors: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
  rose: "bg-rose-500",
};

export default function ProgressCard({ title, items, color = "blue" }: ProgressCardProps) {
  const barColor = barColors[color] || barColors.blue;
  const completedCount = items.filter((i) => i.completed).length;
  const overallProgress = items.length > 0
    ? Math.round(items.reduce((sum, i) => sum + (i.completed ? 100 : (i.progress || 0)), 0) / items.length)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="text-sm text-slate-500">
          {completedCount}/{items.length} done ({overallProgress}%)
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 mb-5">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
              ${item.completed
                ? "bg-emerald-100 text-emerald-600"
                : "bg-slate-100 text-slate-400"
              }`}
            >
              {item.completed ? "✓" : idx + 1}
            </span>
            <span className={`flex-1 text-sm ${item.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
              {item.label}
            </span>
            {!item.completed && item.progress !== undefined && (
              <span className="text-xs text-slate-500">{item.progress}%</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
