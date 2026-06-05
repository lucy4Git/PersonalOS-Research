"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { chapterDetails } from "@/lib/diagrams";

const statusColors: Record<string, { bg: string; text: string }> = {
  "not-started": { bg: "bg-slate-100", text: "text-slate-600" },
  "in-progress": { bg: "bg-blue-100", text: "text-blue-700" },
  draft: { bg: "bg-amber-100", text: "text-amber-700" },
  review: { bg: "bg-purple-100", text: "text-purple-700" },
  complete: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

const chapterColors = [
  "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500",
  "bg-cyan-500", "bg-rose-500", "bg-indigo-500",
];

export default function DissertationCommandCenter() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(2);

  const totalWords = chapterDetails.reduce((s, c) => s + c.wordCount, 0);
  const targetWords = chapterDetails.reduce((s, c) => s + c.targetWords, 0);
  const overallProgress = Math.round(chapterDetails.reduce((s, c) => s + c.progress, 0) / chapterDetails.length);
  const chaptersStarted = chapterDetails.filter((c) => c.progress > 0).length;

  return (
    <>
      <Header title="Dissertation Command Center" subtitle="Chapter-by-Chapter Progress, Word Counts & Section Tracking" />
      <div className="p-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 ring-1 ring-blue-200">
            <p className="text-sm font-medium text-slate-600">Overall Progress</p>
            <p className="text-3xl font-bold mt-1 text-blue-700">{overallProgress}%</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 ring-1 ring-emerald-200">
            <p className="text-sm font-medium text-slate-600">Words Written</p>
            <p className="text-3xl font-bold mt-1 text-emerald-700">{totalWords.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-0.5">of {targetWords.toLocaleString()} target</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 ring-1 ring-purple-200">
            <p className="text-sm font-medium text-slate-600">Chapters Started</p>
            <p className="text-3xl font-bold mt-1 text-purple-700">{chaptersStarted}/{chapterDetails.length}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 ring-1 ring-amber-200">
            <p className="text-sm font-medium text-slate-600">Word Count Progress</p>
            <p className="text-3xl font-bold mt-1 text-amber-700">{Math.round((totalWords / targetWords) * 100)}%</p>
          </div>
        </div>

        {/* Visual Progress Bar per Chapter */}
        <SectionCard title="Chapter Progress Overview">
          <div className="space-y-4">
            {chapterDetails.map((ch, idx) => (
              <div key={ch.number} className="flex items-center gap-4">
                <div className={`w-8 h-8 ${chapterColors[idx]} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {ch.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{ch.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{ch.wordCount.toLocaleString()} / {ch.targetWords.toLocaleString()} words</span>
                      <span className="text-sm font-bold text-slate-700">{ch.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className={`${chapterColors[idx]} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${ch.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Detailed Chapter Cards */}
        <div className="space-y-4">
          {chapterDetails.map((ch, idx) => {
            const isExpanded = expandedChapter === ch.number;
            const style = statusColors[ch.status];

            return (
              <div key={ch.number} className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                {/* Chapter Header - Clickable */}
                <button
                  onClick={() => setExpandedChapter(isExpanded ? null : ch.number)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className={`w-12 h-12 ${chapterColors[idx]} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    <span className="text-lg font-bold">{ch.number}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900">{ch.fullTitle}</h3>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                        {ch.status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className={`${chapterColors[idx]} h-2 rounded-full`} style={{ width: `${ch.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-700">{ch.progress}%</span>
                      <span className="text-xs text-slate-500">{ch.wordCount.toLocaleString()} words</span>
                      {ch.lastEdited && <span className="text-xs text-slate-400">Last edited: {ch.lastEdited}</span>}
                    </div>
                  </div>

                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                    {/* Notes */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-5">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Notes</p>
                      <p className="text-sm text-slate-700">{ch.notes}</p>
                    </div>

                    {/* Section Breakdown */}
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Section Breakdown</p>
                    <div className="space-y-3">
                      {ch.sections.map((section) => (
                        <div key={section.name} className="flex items-center gap-4">
                          <span className="text-sm text-slate-700 w-64 flex-shrink-0">{section.name}</span>
                          <div className="flex-1">
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div className={`${chapterColors[idx]} h-2 rounded-full transition-all`} style={{ width: `${section.progress}%` }} />
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-10 text-right">{section.progress}%</span>
                          <span className="text-xs text-slate-400 w-20 text-right">{section.wordCount.toLocaleString()} words</span>
                        </div>
                      ))}
                    </div>

                    {/* Word Count Summary */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Chapter word count</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {ch.wordCount.toLocaleString()} / {ch.targetWords.toLocaleString()} words ({Math.round((ch.wordCount / ch.targetWords) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
