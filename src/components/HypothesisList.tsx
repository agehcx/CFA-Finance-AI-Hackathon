"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { CheckCircle2, AlertCircle, XCircle, Eye } from "lucide-react";
import { Hypothesis } from "@/types";

const RESOLUTION_META = {
  Supported: { icon: CheckCircle2, className: "text-green" },
  Contested: { icon: AlertCircle, className: "text-amber" },
  Rejected: { icon: XCircle, className: "text-red" },
  Monitor: { icon: Eye, className: "text-accent" },
};

export function HypothesisList({ hypotheses }: { hypotheses: Hypothesis[] }) {
  const [activeId, setActiveId] = useState(hypotheses[0]?.id);
  const active = hypotheses.find((h) => h.id === activeId) ?? hypotheses[0];

  if (hypotheses.length === 0) {
    return <p className="text-sm text-muted">No hypotheses recorded yet.</p>;
  }

  return (
    <div className="grid grid-cols-[220px_1fr] gap-6">
      <div className="flex flex-col gap-2">
        {hypotheses.map((h) => {
          const meta = RESOLUTION_META[h.resolution];
          const Icon = meta.icon;
          const isActive = h.id === active?.id;
          return (
            <button
              key={h.id}
              onClick={() => setActiveId(h.id)}
              className={clsx(
                "flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                isActive
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-white hover:bg-canvas"
              )}
            >
              <span>
                <span className="font-semibold text-ink">{h.code} </span>
                <span className="text-ink">{h.title}</span>
              </span>
              <Icon size={16} className={meta.className} />
            </button>
          );
        })}
      </div>
      {active && (
        <div className="rounded-lg border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink">
              {active.code}: {active.title}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{active.summary}</p>
          <p className="mt-4 text-xs text-muted">
            {active.evidenceCount} pieces of evidence · Status: {active.resolution}
          </p>
        </div>
      )}
    </div>
  );
}
