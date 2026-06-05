import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import { profile } from "@/lib/data";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" subtitle="Profile & Research Configuration" />
      <div className="p-8 space-y-8">
        {/* Profile */}
        <SectionCard title="Researcher Profile">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              NA
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.roles.map((role) => (
                  <span key={role} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Mission */}
        <SectionCard title="Mission Statement">
          <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{profile.mission}&rdquo;</p>
        </SectionCard>

        {/* Research Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Research Methodology">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Research Paradigm</p>
                <p className="text-sm text-slate-900 mt-1">{profile.methodology}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Development Methodology</p>
                <p className="text-sm text-slate-900 mt-1">{profile.devMethodology}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Supervisors">
            <div className="space-y-3">
              {profile.supervisors.map((sup, idx) => (
                <div key={sup} className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${idx === 0 ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"} rounded-full flex items-center justify-center font-bold text-sm`}>
                    {sup.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{sup}</p>
                    <p className="text-xs text-slate-500">{idx === 0 ? "Primary Supervisor" : "Co-Supervisor"}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Main Research Question */}
        <SectionCard title="Main Research Question">
          <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-sm text-slate-800 leading-relaxed italic">&ldquo;{profile.mainRQ}&rdquo;</p>
          </div>
        </SectionCard>

        {/* Ethical Considerations */}
        <SectionCard title="Ethical Considerations">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["Data Privacy", "User Consent", "Fairness", "Transparency", "Accountability"].map((item) => (
              <div key={item} className="bg-emerald-50 rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-emerald-700">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Limitations */}
        <SectionCard title="Known Limitations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["Dataset Availability", "LLM Cost", "Institutional Integration Complexity", "Governance Constraints"].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-800">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
