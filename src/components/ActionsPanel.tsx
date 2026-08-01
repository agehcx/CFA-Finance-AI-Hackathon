"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { EvidenceGap } from "@/types";
import { ChevronRight, Sparkles, ChevronDown, User, Calendar } from "lucide-react";

export function ActionsPanel({ gaps }: { gaps: EvidenceGap[] }) {
  const [activeId, setActiveId] = useState(gaps[0]?.id);
  const active = gaps.find((g) => g.id === activeId) ?? gaps[0];

  if (gaps.length === 0) {
    return <p className="text-sm text-muted">No evidence gaps identified.</p>;
  }

  return (
    <div className="flex h-full gap-6 items-stretch pb-6">
      {/* Left Column: Evidence gaps */}
      <div className="flex w-[320px] shrink-0 flex-col rounded-xl border border-border bg-white shadow-sm overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-gray-50/50 px-4 py-3">
          <span className="text-sm font-semibold text-ink">Evidence gaps</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-200 text-xs font-semibold text-gray-700">
            {gaps.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {gaps.map((g) => {
            const isActive = g.id === active?.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveId(g.id)}
                className={clsx(
                  "flex w-full items-center justify-between border-l-[3px] border-b border-border px-4 py-4 text-left transition-colors",
                  isActive ? "border-l-blue-600 bg-blue-50/40" : "border-l-transparent bg-white hover:bg-canvas"
                )}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "h-2 w-2 shrink-0 rounded-full",
                        g.priority === "High" ? "bg-amber-500" : "bg-blue-500"
                      )}
                    />
                    <p className="truncate text-[13px] font-semibold text-ink">
                      {g.title || "Gap"} <span className="text-muted font-normal">—</span>{" "}
                      <span className={g.status === "Unknown" ? "text-orange-600 font-semibold" : "text-ink"}>
                        {g.status}
                      </span>
                    </p>
                  </div>
                  <p className="ml-4 mt-1 text-[11px] text-muted">
                    {g.priority} priority · Impact: {g.impact}
                  </p>
                </div>
                <ChevronRight size={16} className="text-muted shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle Column: Task Form */}
      {active && (
        <div className="flex min-w-[400px] flex-1 flex-col rounded-xl border border-border bg-white shadow-sm overflow-hidden h-[calc(100vh-200px)]">
          <div className="px-6 py-5 border-b border-border bg-white shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-blue-600" />
              <h3 className="text-sm font-bold text-ink">AI-drafted task</h3>
            </div>
            <p className="text-[12px] text-muted ml-6">Review and assign</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 text-[13px]">
            <div className="grid grid-cols-[140px_1fr] gap-y-6 items-start">
              <div className="font-semibold text-ink pt-2">Question</div>
              <div className="rounded-md border border-border p-3 text-ink bg-white shadow-sm leading-relaxed">
                {active.question}
              </div>

              <div className="font-semibold text-ink pt-2">Why it matters</div>
              <div className="rounded-md border border-border p-3 text-ink bg-white shadow-sm leading-relaxed">
                {active.whyItMatters}
              </div>

              <div className="font-semibold text-ink pt-2">Related hypothesis</div>
              <div className="rounded-md border border-border p-3 text-ink bg-white shadow-sm leading-relaxed">
                {active.relatedHypothesis}
              </div>

              {active.suggestedSources && active.suggestedSources.length > 0 && (
                <>
                  <div className="font-semibold text-ink pt-2">Suggested sources</div>
                  <div className="rounded-md border border-border p-3 text-ink bg-white shadow-sm leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1 text-muted marker:text-gray-300">
                      {active.suggestedSources.map((s) => (
                        <li key={s}><span className="text-ink">{s}</span></li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <div className="font-semibold text-ink pt-2.5">Owner</div>
              <div className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-ink bg-white shadow-sm cursor-pointer hover:bg-canvas transition-colors">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-muted" />
                  {active.owner || "Unassigned"}
                </div>
                <ChevronDown size={16} className="text-muted" />
              </div>

              <div className="font-semibold text-ink pt-2.5">Due time</div>
              <div className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-ink bg-white shadow-sm cursor-pointer hover:bg-canvas transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted" />
                  {active.dueTime || "Set date"}
                </div>
                <ChevronDown size={16} className="text-muted" />
              </div>

              {active.decisionUnlocked && (
                <>
                  <div className="font-semibold text-ink pt-2">Decision unlocked</div>
                  <div className="rounded-md border border-border p-3 text-ink bg-white shadow-sm leading-relaxed">
                    {active.decisionUnlocked}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-border px-6 py-4 flex justify-end gap-3 bg-gray-50/50 shrink-0">
            <button className="rounded-md border border-border px-5 py-2 text-[13px] font-semibold text-ink bg-white hover:bg-canvas shadow-sm transition-colors">
              Save draft
            </button>
            <button className="rounded-md bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors">
              Assign task
            </button>
          </div>
        </div>
      )}

      {/* Right Column: Case Activity & Copilot */}
      <div className="flex w-[280px] shrink-0 flex-col gap-6 h-[calc(100vh-200px)]">
        {/* Case Activity */}
        <div className="rounded-xl border border-border bg-white shadow-sm p-5 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-5 shrink-0">
            <h3 className="text-sm font-bold text-ink">Case activity</h3>
            <button className="text-[12px] font-medium text-blue-600 hover:underline">View all</button>
          </div>

          <div className="relative pl-3 border-l border-gray-200 space-y-6 pb-2 overflow-y-auto flex-1">
            <div className="relative">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
              <p className="text-[11px] text-muted">Today, 09:15</p>
              <p className="text-[13px] font-semibold text-ink mt-0.5">Evidence gap identified</p>
              <p className="text-[12px] text-muted mt-1 leading-relaxed">
                Tariff pass-through ability marked as Unknown (High priority)
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
              <p className="text-[11px] text-muted">Today, 09:16</p>
              <p className="text-[13px] font-semibold text-ink mt-0.5">AI drafted task</p>
              <p className="text-[12px] text-muted mt-1 leading-relaxed">
                Task created from gap and related hypothesis
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
              <p className="text-[11px] text-muted">Today, 09:17</p>
              <p className="text-[13px] font-semibold text-ink mt-0.5">Task reviewed</p>
              <p className="text-[12px] text-muted mt-1 leading-relaxed">Ready for assignment</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
              <p className="text-[11px] text-muted">—</p>
              <p className="text-[13px] font-semibold text-ink mt-0.5">Awaiting assignment</p>
              <p className="text-[12px] text-muted mt-1 leading-relaxed">—</p>
            </div>
          </div>

          <button className="mt-4 text-[12px] font-medium text-blue-600 hover:underline shrink-0 text-left">
            View all activity
          </button>
        </div>

        {/* Copilot box */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5 shadow-sm shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold text-ink">Copilot</h3>
          </div>
          <p className="text-[12px] text-muted mb-4">You have 3 High-priority unknowns.</p>
          <button className="w-full flex items-center gap-3 rounded-md border border-blue-300 bg-white px-4 py-3 text-[13px] font-semibold text-blue-700 hover:bg-blue-50 shadow-sm transition-colors text-left">
            <Sparkles size={16} className="shrink-0" />
            <span className="leading-tight">
              Create tasks for all<br />
              High-priority unknowns
            </span>
          </button>

          <button className="mt-4 text-[12px] font-medium text-blue-600 hover:underline block mb-2">
            See all recommendations
          </button>
          <p className="text-[10px] text-muted">AI-generated suggestions. Review before use.</p>
        </div>
      </div>
    </div>
  );
}
