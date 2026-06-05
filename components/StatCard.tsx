interface StatCardProps {
  label: string;
  value: string | number;
  target?: string | number;
  color?: string;
  icon?: React.ReactNode;
}

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200" },
};

export default function StatCard({ label, value, target, color = "blue", icon }: StatCardProps) {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className={`${colors.bg} rounded-xl p-5 ring-1 ${colors.ring}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <p className={`text-3xl font-bold mt-2 ${colors.text}`}>{value}</p>
      {target && (
        <p className="text-xs text-slate-500 mt-1">Target: {target}</p>
      )}
    </div>
  );
}
