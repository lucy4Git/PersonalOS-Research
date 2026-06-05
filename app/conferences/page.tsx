import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PipelineCard from "@/components/PipelineCard";
import { conferences, conferenceTargets } from "@/lib/data";

export default function ConferencesPage() {
  return (
    <>
      <Header title="Conferences" subtitle="Conference Tracking - 2026 Targets" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            label="Attend Target"
            value={`${conferenceTargets.attend.current}/${conferenceTargets.attend.target}`}
            color="amber"
          />
          <StatCard
            label="Present Target"
            value={`${conferenceTargets.present.current}/${conferenceTargets.present.target}`}
            color="green"
          />
        </div>

        <PipelineCard
          title="Conference Tracker"
          items={conferences.map((c) => ({
            title: c.name,
            status: c.status,
            target: c.location || "TBD",
            deadline: c.deadline,
          }))}
          columns={["Conference", "Status", "Location", "Deadline"]}
        />
      </div>
    </>
  );
}
