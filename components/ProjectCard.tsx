interface Task {
  label: string;
  completed: boolean;
  progress?: number;
}

interface ProjectCardProps {
  name: string;
  status: "active" | "planned" | "completed" | "on-hold";
  description: string;
  progress: number;
  tasks: Task[];
  nextMilestone: string;
  techStack?: string[];
  vaultLink?: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  planned: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "on-hold": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
};

const progressColors: Record<string, string> = {
  active: "bg-blue-500",
  planned: "bg-slate-400",
  completed: "bg-emerald-500",
  "on-hold": "bg-amber-500",
};

export default function ProjectCard({ name, status, description, progress, tasks, nextMilestone, techStack }: ProjectCardProps) {
  const style = statusStyles[status] || statusStyles.planned;
  const barColor = progressColors[status] || progressColors.planned;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-900 text-lg leading-tight">{name}</h3>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} flex-shrink-0 ml-2`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4">{description}</p>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-slate-500">Progress</span>
        <span className={`font-bold ${status === "completed" ? "text-emerald-600" : "text-slate-700"}`}>{progress}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tasks summary */}
      {tasks.length > 0 && (
        <p className="text-xs text-slate-500 mb-4">{completedTasks}/{tasks.length} milestones completed</p>
      )}

      {/* Tech Stack Tags */}
      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span className="text-xs text-slate-400">+{techStack.length - 5} more</span>
          )}
        </div>
      )}

      {/* Next Milestone */}
      <div className="mt-auto bg-slate-50 rounded-lg p-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Next Milestone</p>
        <p className="text-sm text-slate-700">{nextMilestone}</p>
      </div>
    </div>
  );
}
