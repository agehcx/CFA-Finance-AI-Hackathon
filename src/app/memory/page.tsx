import { investigations } from "@/lib/mock-data";
import { Card } from "@/components/Card";

export default function DecisionMemoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <h1 className="text-2xl font-bold text-ink">Decision Memory</h1>
      <p className="mt-1 text-sm text-muted">
        Recorded decisions across every investigation, kept for future reference.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {investigations.map((inv) => (
          <Card key={inv.id}>
            <p className="font-semibold text-ink">{inv.title}</p>
            <p className="mt-1 text-sm text-muted">
              Decision: <span className="font-medium text-ink">{inv.decision.selected}</span>
            </p>
            <p className="mt-1 text-xs text-muted">{inv.decision.rationale}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
