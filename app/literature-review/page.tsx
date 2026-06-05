import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";
import { prismaProgress, searchDatabases, litReviewThemes, litReviewPapers, researchGaps } from "@/lib/data";

export default function LiteratureReviewPage() {
  const themeGroups = litReviewThemes.map((theme) => ({
    theme,
    papers: litReviewPapers.filter((p) => p.theme === theme || p.theme.includes(theme.split(" ")[0])),
  }));

  return (
    <>
      <Header title="Literature Review" subtitle="Systematic Literature Review - PRISMA Methodology" />
      <div className="p-8 space-y-8">
        {/* PRISMA Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="Identified" value={prismaProgress.identified} color="blue" />
          <StatCard label="After Dedup" value={prismaProgress.afterDedup} color="cyan" />
          <StatCard label="Screened" value={prismaProgress.screened} color="amber" />
          <StatCard label="Excluded" value={prismaProgress.excluded} color="rose" />
          <StatCard label="Included" value={prismaProgress.included} color="green" />
        </div>

        {/* PRISMA Funnel */}
        <SectionCard title="PRISMA Flow">
          <div className="flex items-center justify-center gap-2 py-4">
            {[
              { label: "Identified", value: prismaProgress.identified, color: "bg-blue-500" },
              { label: "Deduplicated", value: prismaProgress.afterDedup, color: "bg-cyan-500" },
              { label: "Screened", value: prismaProgress.screened, color: "bg-amber-500" },
              { label: "Included", value: prismaProgress.included, color: "bg-emerald-500" },
            ].map((step, idx) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="text-center">
                  <div className={`${step.color} text-white rounded-lg px-4 py-3 font-bold text-lg`}>
                    {step.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{step.label}</p>
                </div>
                {idx < 3 && (
                  <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Databases */}
          <SectionCard title="Search Databases">
            <div className="space-y-2">
              {searchDatabases.map((db) => (
                <div key={db.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50">
                  <span className="text-sm text-slate-700">{db.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${db.searched ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                    {db.searched ? "Searched" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Research Gaps */}
          <SectionCard title="Research Gaps Identified">
            <div className="space-y-3">
              {researchGaps.map((gap) => (
                <div key={gap.id} className="border-l-4 border-amber-400 pl-4 py-2">
                  <p className="text-sm font-semibold text-slate-900">Gap {gap.id}: {gap.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{gap.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Papers by Theme */}
        {themeGroups.filter(g => g.papers.length > 0).map((group) => (
          <SectionCard key={group.theme} title={group.theme}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">#</th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">Title</th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">Source</th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2 pr-4">Year</th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2">Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {group.papers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 text-sm text-slate-500">{paper.id}</td>
                      <td className="py-3 pr-4 text-sm font-medium text-slate-900 max-w-md">{paper.title}</td>
                      <td className="py-3 pr-4 text-sm text-slate-600 whitespace-nowrap">{paper.source}</td>
                      <td className="py-3 pr-4 text-sm text-slate-600">{paper.year}</td>
                      <td className="py-3 text-sm text-slate-600">{paper.relevance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        ))}
      </div>
    </>
  );
}
