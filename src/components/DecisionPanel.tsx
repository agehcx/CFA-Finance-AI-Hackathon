"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { DecisionRecord } from "@/types";

export function DecisionPanel({ decision }: { decision: DecisionRecord }) {
  const [selected, setSelected] = useState(decision.selected);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-lg border border-border bg-white p-5">
        <p className="text-sm font-semibold text-ink">Thesis & model impact</p>
        <p className="mt-3 text-xs text-muted">Base case range</p>
        <p className="text-sm font-medium text-ink">{decision.baseCaseRange}</p>
        <p className="mt-3 text-xs text-muted">Bear case range</p>
        <p className="text-sm font-medium text-ink">{decision.bearCaseRange}</p>
      </div>

      <div className="rounded-lg border border-border bg-white p-5">
        <p className="text-sm font-semibold text-ink">Decision record</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {decision.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={clsx(
                "rounded-md border px-3 py-2 text-sm font-medium",
                option === selected
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-ink hover:bg-canvas"
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold uppercase text-muted">Decision rationale</p>
        <p className="mt-1 text-sm text-muted">{decision.rationale}</p>
        <p className="mt-4 text-xs font-semibold uppercase text-muted">Next review trigger</p>
        <p className="mt-1 text-sm text-ink">{decision.nextReviewTrigger}</p>
        <button className="mt-5 w-full rounded-md bg-accent py-2 text-sm font-semibold text-white hover:bg-accent/90">
          Record decision
        </button>
        <p className="mt-2 text-center text-xs text-muted">Human approval required to record</p>
      </div>
    </div>
  );
}
