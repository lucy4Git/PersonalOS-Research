interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function SectionCard({ title, children, action }: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
