import { FileText, Sheet, BookOpen } from "lucide-react";
import { EvidenceItem } from "@/types";

const ICON_BY_TYPE = {
  "Meeting Note": FileText,
  Model: Sheet,
  Report: BookOpen,
  Filing: FileText,
};

export function EvidenceList({ evidence }: { evidence: EvidenceItem[] }) {
  if (evidence.length === 0) {
    return <p className="text-sm text-muted">No evidence linked yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {evidence.map((e) => {
        const Icon = ICON_BY_TYPE[e.type];
        return (
          <div
            key={e.id}
            className="flex items-center justify-between rounded-md border border-border bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{e.title}</p>
                <p className="text-xs text-muted">{e.type} · {e.date}</p>
              </div>
            </div>
            {e.verified && (
              <span className="text-xs font-medium text-green">Human-verified</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
