import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import PipelineCard from "@/components/PipelineCard";
import { publications, publicationTargets } from "@/lib/data";

export default function PublicationsPage() {
  const journals = publications.filter((p) => p.type === "journal");
  const conferencePapers = publications.filter((p) => p.type === "conference");
  const bookChapters = publications.filter((p) => p.type === "book-chapter");

  return (
    <>
      <Header title="Publications" subtitle="Publication Pipeline - 2026 Targets" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Journal Papers"
            value={`${publicationTargets.journals.current}/${publicationTargets.journals.target}`}
            color="purple"
          />
          <StatCard
            label="Conference Papers"
            value={`${publicationTargets.conferences.current}/${publicationTargets.conferences.target}`}
            color="amber"
          />
          <StatCard
            label="Book Chapters"
            value={`${publicationTargets.bookChapters.current}/${publicationTargets.bookChapters.target}`}
            color="cyan"
          />
        </div>

        <PipelineCard
          title="Journal Pipeline"
          items={journals.map((p) => ({ title: p.title, status: p.status, target: p.target, deadline: p.deadline }))}
        />

        <PipelineCard
          title="Conference Pipeline"
          items={conferencePapers.map((p) => ({ title: p.title, status: p.status, target: p.target, deadline: p.deadline }))}
        />

        <PipelineCard
          title="Book Chapter Pipeline"
          items={bookChapters.map((p) => ({ title: p.title, status: p.status, target: p.target, deadline: p.deadline }))}
        />
      </div>
    </>
  );
}
