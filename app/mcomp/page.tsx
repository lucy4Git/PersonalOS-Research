import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";
import SectionCard from "@/components/SectionCard";
import { mcompCoursework, mcompResearchProposal, mcompDissertation, supervisorMeetings } from "@/lib/data";

export default function MCompPage() {
  return (
    <>
      <Header title="MComp Progress" subtitle="Master of Computing - Academic Tracking" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProgressCard title="Coursework" items={mcompCoursework} color="blue" />
          <ProgressCard title="Research Proposal" items={mcompResearchProposal} color="green" />
          <ProgressCard title="Dissertation Milestones" items={mcompDissertation} color="purple" />
        </div>

        {/* Supervisor Meetings */}
        <SectionCard title="Supervisor Meetings">
          <div className="space-y-4">
            {supervisorMeetings.map((meeting, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{meeting.date}</span>
                  <span className="text-sm text-slate-500">{meeting.attendees}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{meeting.discussion}</p>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Action Items</p>
                  <ul className="space-y-1">
                    {meeting.actions.map((action, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Research Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Research Question">
            <p className="text-sm text-slate-700 italic leading-relaxed">
              &ldquo;How can a centralized multi-tenant LLM-based academic intelligence system be designed and implemented for higher education institutions?&rdquo;
            </p>
          </SectionCard>

          <SectionCard title="Supervisors">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">PO</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Prof Pius Adewale Owolaw</p>
                  <p className="text-xs text-slate-500">Primary Supervisor</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">AA</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Prof Alonge Ayodeli Akintiunde</p>
                  <p className="text-xs text-slate-500">Co-Supervisor</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
