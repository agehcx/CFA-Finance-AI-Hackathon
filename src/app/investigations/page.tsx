import Link from "next/link";
import { investigations } from "@/lib/mock-data";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

const PRIORITY_TONE = { High: "high", Medium: "medium", Low: "low" } as const;

export default function InvestigationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <h1 className="text-2xl font-bold text-ink">Investigations</h1>
      <p className="mt-1 text-sm text-muted">Every open and closed portfolio investigation.</p>
      <div className="mt-6 flex flex-col gap-3">
        {investigations.map((inv) => (
          <Link key={inv.id} href={`/investigations/${inv.id}`}>
            <Card className="hover:border-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{inv.title}</p>
                  <p className="text-xs text-muted">{inv.dateLabel} · {inv.portfolioScope}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={PRIORITY_TONE[inv.priority]}>{inv.priority}</Badge>
                  <Badge tone="neutral">{inv.status}</Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
