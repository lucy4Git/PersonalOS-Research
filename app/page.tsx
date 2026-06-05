import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import ProgressCard from "@/components/ProgressCard";
import ProjectCard from "@/components/ProjectCard";
import SectionCard from "@/components/SectionCard";
import { dashboardStats, mcompDissertation, dissertationChapters, publicationTargets, conferenceTargets } from "@/lib/data";
import { projects as aiProjects } from "@/data/projects";

export default function DashboardPage() {
  const totalWords = dissertationChapters.reduce((s, c) => s + (c.wordCount || 0), 0);
  const targetWords = dissertationChapters.reduce((s, c) => s + (c.targetWords || 0), 0);

  return (
    <>
      <Header title="Research Dashboard" subtitle="PersonalOS - Academic Research Management" />
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MComp Dissertation Progress */}
          <ProgressCard title="Dissertation Milestones" items={mcompDissertation} color="blue" />

          {/* Publication & Conference Targets */}
          <SectionCard title="2026 Targets">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Journal Papers</span>
                  <span className="font-medium text-slate-900">{publicationTargets.journals.current}/{publicationTargets.journals.target}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(publicationTargets.journals.current / publicationTargets.journals.target) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Conference Papers</span>
                  <span className="font-medium text-slate-900">{publicationTargets.conferences.current}/{publicationTargets.conferences.target}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(publicationTargets.conferences.current / publicationTargets.conferences.target) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Book Chapters</span>
                  <span className="font-medium text-slate-900">{publicationTargets.bookChapters.current}/{publicationTargets.bookChapters.target}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(publicationTargets.bookChapters.current / publicationTargets.bookChapters.target) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Conferences Attended</span>
                  <span className="font-medium text-slate-900">{conferenceTargets.attend.current}/{conferenceTargets.attend.target}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${(conferenceTargets.attend.current / conferenceTargets.attend.target) * 100}%` }} />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Dissertation Word Count */}
        <SectionCard title="Dissertation Progress">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {dissertationChapters.map((ch) => (
              <div key={ch.name} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28" fill="none" stroke="#3b82f6" strokeWidth="4"
                      strokeDasharray={`${ch.progress * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                    {ch.progress}%
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 leading-tight">{ch.name.replace("Chapter ", "Ch").replace(": ", "\n")}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500">Total word count</span>
            <span className="text-sm font-semibold text-slate-900">{totalWords.toLocaleString()} / {targetWords.toLocaleString()} words</span>
          </div>
        </SectionCard>

        {/* AI Projects */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Research Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
