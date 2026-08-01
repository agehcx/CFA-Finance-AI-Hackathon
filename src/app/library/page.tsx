import { Card } from "@/components/Card";

const RESOURCES = [
  { title: "Investigation playbook", note: "How to structure a new investigation and rank hypotheses." },
  { title: "Evidence verification standards", note: "What counts as human-verified vs AI-proposed evidence." },
  { title: "Decision record template", note: "Required fields for Hold / Add / Trim / Exit / Re-underwrite." },
];

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <h1 className="text-2xl font-bold text-ink">Library</h1>
      <p className="mt-1 text-sm text-muted">Shared reference material for the investigation team.</p>
      <div className="mt-6 flex flex-col gap-3">
        {RESOURCES.map((r) => (
          <Card key={r.title}>
            <p className="font-semibold text-ink">{r.title}</p>
            <p className="mt-1 text-sm text-muted">{r.note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
