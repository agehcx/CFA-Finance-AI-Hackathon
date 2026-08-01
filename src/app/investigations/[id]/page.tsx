"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ChevronLeft, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { getInvestigation } from "@/lib/get-investigation";
import { Badge } from "@/components/Badge";
import { CopilotPanel } from "@/components/CopilotPanel";
import { HypothesisGraph } from "@/components/HypothesisGraph";
import { HypothesisList } from "@/components/HypothesisList";
import { EvidenceList } from "@/components/EvidenceList";
import { ActionsPanel } from "@/components/ActionsPanel";
import { DecisionPanel } from "@/components/DecisionPanel";

const TABS = ["Hypotheses", "Graph", "Evidence", "Actions", "Decision"] as const;
type Tab = (typeof TABS)[number];

const PRIORITY_TONE = { High: "high", Medium: "medium", Low: "low" } as const;

export default function InvestigationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const investigation = getInvestigation(id);
  const [tab, setTab] = useState<Tab>("Hypotheses");
  const [copilotOpen, setCopilotOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-border bg-white px-8 py-5">
          <Link href="/investigations" className="flex items-center gap-1 text-xs text-muted hover:text-ink">
            <ChevronLeft size={14} /> Back to investigations
          </Link>
          <div className="mt-2 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-ink">
                {investigation.title} — {investigation.dateLabel}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                <span className="text-muted">
                  Status <Badge tone="medium">{investigation.status}</Badge>
                </span>
                <span className="text-muted">
                  Priority <Badge tone={PRIORITY_TONE[investigation.priority]}>{investigation.priority}</Badge>
                </span>
                <span className="text-muted">
                  Portfolio Scope <span className="font-medium text-ink">{investigation.portfolioScope}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <button className="rounded-md border border-border p-2 hover:bg-canvas" aria-label="Bookmark">
                <Bookmark size={16} />
              </button>
              <button className="rounded-md border border-border p-2 hover:bg-canvas" aria-label="Share">
                <Share2 size={16} />
              </button>
              <button
                onClick={() => setCopilotOpen((v) => !v)}
                className="rounded-md border border-border p-2 hover:bg-canvas"
                aria-label="Toggle copilot"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  t === tab
                    ? "border-b-2 border-accent px-3 pb-2 text-sm font-semibold text-accent"
                    : "border-b-2 border-transparent px-3 pb-2 text-sm font-medium text-muted hover:text-ink"
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "Graph" ? (
          <div className="min-h-0 flex-1">
            <HypothesisGraph investigation={investigation} />
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
            <p className="mb-6 text-sm text-muted">{investigation.summary}</p>
            {tab === "Hypotheses" && <HypothesisList hypotheses={investigation.hypotheses} />}
            {tab === "Evidence" && <EvidenceList evidence={investigation.evidence} />}
            {tab === "Actions" && <ActionsPanel gaps={investigation.gaps} />}
            {tab === "Decision" && <DecisionPanel decision={investigation.decision} />}
          </div>
        )}
      </div>

      {copilotOpen && <CopilotPanel onClose={() => setCopilotOpen(false)} />}
    </div>
  );
}
