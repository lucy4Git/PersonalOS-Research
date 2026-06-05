import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";
import { projects as aiProjects, systemArchitecture, techStack, getProjectStats } from "@/data/projects";

const statusStyles: Record<string, { bg: string; text: string; dot: string; ring: string }> = {
  active: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", ring: "ring-blue-300" },
  planned: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-300" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-300" },
  "on-hold": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", ring: "ring-amber-300" },
};

const progressBarColors: Record<string, string> = {
  active: "bg-blue-500",
  planned: "bg-slate-400",
  completed: "bg-emerald-500",
  "on-hold": "bg-amber-500",
};

export default function AIProjectsPage() {
  const { total, active: activeProjects, completed: completedProjects, totalTasks, completedTasks } = getProjectStats();

  return (
    <>
      <Header title="AI Projects" subtitle="Research & Development Projects - Status Overview" />
      <div className="p-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Projects" value={total} color="cyan" />
          <StatCard label="Active" value={activeProjects} color="blue" />
          <StatCard label="Completed" value={completedProjects} color="green" />
          <StatCard label="Tasks Done" value={`${completedTasks}/${totalTasks}`} color="purple" />
        </div>

        {/* Project Cards */}
        {aiProjects.map((project) => {
          const style = statusStyles[project.status];
          const barColor = progressBarColors[project.status];
          const completedCount = project.tasks.filter((t) => t.completed).length;

          return (
            <div key={project.name} className={`bg-white rounded-xl shadow-sm ring-1 ${style.ring} overflow-hidden`}>
              {/* Project Header */}
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="text-right ml-6 flex-shrink-0">
                    <p className={`text-3xl font-bold ${project.status === "completed" ? "text-emerald-600" : "text-blue-600"}`}>
                      {project.progress}%
                    </p>
                    <p className="text-xs text-slate-500">progress</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`${barColor} h-3 rounded-full transition-all duration-700`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Milestones */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Milestones</p>
                      <span className="text-xs text-slate-500">{completedCount}/{project.tasks.length} completed</span>
                    </div>
                    <ul className="space-y-2">
                      {project.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          {task.completed ? (
                            <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="w-5 h-5 border-2 border-slate-300 rounded-full flex-shrink-0" />
                          )}
                          <span className={`text-sm ${task.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                            {task.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack + Next Milestone + Vault Link */}
                  <div className="space-y-5">
                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Technology Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-slate-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Milestone */}
                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-400">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Next Milestone</p>
                      <p className="text-sm text-slate-800">{project.nextMilestone}</p>
                    </div>

                    {/* Vault Link */}
                    {project.vaultLink && (
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        <span className="text-purple-600 font-medium">Vault: {project.vaultLink}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* System Architecture (main project only) */}
        <SectionCard title="System Architecture - Academic Intelligence System">
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

        {/* Tech Stack */}
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
