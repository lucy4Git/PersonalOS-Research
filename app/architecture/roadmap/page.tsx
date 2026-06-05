"use client";

import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { roadmapPhases } from "@/lib/diagrams";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "in-progress": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  upcoming: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
};

const barColors: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-emerald-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const bgColors: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-emerald-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

export default function RoadmapPage() {
  const overallProgress = Math.round(
    roadmapPhases.reduce((sum, p) => sum + p.progress, 0) / roadmapPhases.length
  );

  return (
    <>
      <Header title="Prototype Roadmap" subtitle="6-Phase Development Roadmap with Milestone Tracking" />
      <div className="p-8 space-y-8">
        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Overall Project Progress</h3>
            <span className="text-2xl font-bold text-blue-700">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-slate-500">
            <span>Jan 2026</span>
            <span>Feb 2027</span>
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-6">Phase Timeline</h3>
          <div className="grid grid-cols-6 gap-2">
            {roadmapPhases.map((phase) => {
              const style = statusStyles[phase.status];
              return (
                <div key={phase.id} className="text-center">
                  <div className={`${bgColors[phase.color]} text-white rounded-lg p-3 mb-2`}>
                    <p className="text-xs font-bold">Phase {phase.id}</p>
                    <p className="text-2xl font-bold mt-1">{phase.progress}%</p>
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-tight">{phase.name.replace(`Phase ${phase.id}: `, "")}</p>
                  <p className="text-xs text-slate-400 mt-1">{phase.startDate} - {phase.endDate}</p>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs ${style.bg} ${style.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {phase.status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Phase Cards */}
        {roadmapPhases.map((phase) => {
          const completedMilestones = phase.milestones.filter((m) => m.completed).length;
          const bar = barColors[phase.color];

          return (
            <div key={phase.id} className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
                <div className={`w-12 h-12 ${bgColors[phase.color]} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {phase.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{phase.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[phase.status].bg} ${statusStyles[phase.status].text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[phase.status].dot}`} />
                      {phase.status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{phase.subtitle} | {phase.startDate} to {phase.endDate}</p>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-bold text-slate-700">{phase.progress}% | {completedMilestones}/{phase.milestones.length} milestones</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                  <div className={`${bar} h-3 rounded-full transition-all duration-500`} style={{ width: `${phase.progress}%` }} />
                </div>

                <div className="space-y-2">
                  {phase.milestones.map((ms, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1.5">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${ms.completed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                        {ms.completed ? "✓" : idx + 1}
                      </span>
                      <span className={`flex-1 text-sm ${ms.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                        {ms.label}
                      </span>
                      {ms.date && (
                        <span className="text-xs text-slate-400">{ms.date}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
