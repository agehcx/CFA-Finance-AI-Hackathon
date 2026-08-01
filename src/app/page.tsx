"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  PieChart,
  Building2,
  Leaf,
  Flame,
  Calendar,
  RefreshCw,
  ChevronRight,
  MoreHorizontal,
  Cpu,
  Bot,
} from "lucide-react";

import { investigations, attention } from "@/lib/mock-data";

// ponytail: static per-card display details keyed by id; move into mock-data if more pages need them
const CARD_META: Record<string, { due: string; thumb: React.ReactNode }> = {
  "semiconductor-tariff-impact": {
    due: "Due today",
    thumb: (
      <img src="/semi.png" alt="Semiconductor" className="h-full w-full object-cover" />
    ),
  },
  "samsung-post-earnings-selloff": {
    due: "Due in 2 days",
    thumb: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b1c3d] to-[#122a5c]">
        <span className="text-[13px] font-bold tracking-[0.15em] text-white">
          SAMSUNG
        </span>
      </div>
    ),
  },
  "industrial-automation-deal-review": {
    due: "Due in 3 days",
    thumb: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-700 via-zinc-800 to-orange-950">
        <Bot size={36} className="text-orange-300/90" />
      </div>
    ),
  },
};

function holdingChips(holdings: string[]): { shown: string[]; extra: number } {
  // ponytail: mimics screenshot truncation (3 chips when many, 2 when few)
  const limit = holdings.length > 4 ? 3 : 2;
  const shown = holdings.slice(0, limit).map((h) => h.split(" ")[0]);
  return { shown, extra: holdings.length - shown.length };
}

const SNAPSHOT_METRICS = [
  {
    label: "Total Exposure",
    value: "68.4%",
    sub: "of NAV",
    icon: PieChart,
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    label: "Holdings",
    value: "42",
    sub: "companies",
    trend: "+0 from yesterday",
    icon: Building2,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Day's Return",
    value: "+1.32%",
    sub: "(+$18.7M)",
    icon: Leaf,
    iconClass: "bg-green-50 text-green-600",
    valueClass: "text-green-600",
    subClass: "text-green-600",
  },
  {
    label: "High Risk Events",
    value: "3",
    sub: "active",
    icon: Flame,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    label: "Upcoming Earnings",
    value: "5",
    sub: "this week",
    icon: Calendar,
    iconClass: "bg-blue-50 text-blue-600",
  },
];

export default function TodayPage() {
  const suggested = investigations.filter((inv) => inv.status !== "Closed");

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="flex">
        {/* Main Content Area */}
        <div className="min-w-0 flex-1 px-12 py-8">
          {/* Header */}
          <header className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-[40px] font-bold tracking-tight text-[#1a2547]">
                Today
              </h1>
              <p className="mt-1 text-[19px] text-[#3b4256]">
                Good morning, Alex.
              </p>

              <div className="mt-6 space-y-1 text-[15px] text-[#1f2937]">
                <p>
                  <span className="mr-2 text-[17px] font-bold">3</span>
                  investigations require review.
                </p>
                <p>
                  <span className="mr-2 text-[17px] font-bold">2</span>
                  events may impact portfolio performance today.
                </p>
              </div>
            </div>

            <Link
              href="/investigations"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#1a2547] shadow-sm transition-colors hover:bg-gray-50"
            >
              Open Investigations <ArrowRight size={16} />
            </Link>
          </header>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-[15px] text-[--text-primary] placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ask about a market event, company, or theme..."
            />
          </div>

          {/* Portfolio Snapshot */}
          <section className="mb-8">
            <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a2547]">
              Portfolio Snapshot
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {SNAPSHOT_METRICS.slice(0, 4).map((m, i) => (
                <div key={m.label} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[13px] font-medium text-[--text-secondary]">
                      {m.label}
                    </p>
                    <div className="text-right">
                      <p className={`text-[11px] font-semibold ${m.subClass ?? "text-[--text-secondary]"}`}>
                        {m.sub}
                      </p>
                      {m.trend && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {m.trend}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-[24px] font-bold leading-tight ${m.valueClass ?? "text-[#1a2547]"}`}>
                    {m.value}
                  </p>

                  {/* Sparkline Minigraph for certain metrics */}
                  {(i === 0 || i === 2) && (
                    <div className="absolute bottom-5 right-5 h-[32px] w-[80px] opacity-30">
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                        <path 
                          d={i === 0 ? "M0,40 L0,20 L10,25 L20,15 L30,28 L40,10 L50,18 L60,5 L70,12 L80,2 L90,8 L100,0 L100,40 Z" : "M0,40 L0,30 L10,28 L20,22 L30,25 L40,15 L50,18 L60,10 L70,12 L80,5 L90,8 L100,2 L100,40 Z"} 
                          fill={i === 0 ? "#2563EB" : "#10B981"}
                        />
                        <polyline 
                          points={i === 0 ? "0,20 10,25 20,15 30,28 40,10 50,18 60,5 70,12 80,2 90,8 100,0" : "0,30 10,28 20,22 30,25 40,15 50,18 60,10 70,12 80,5 90,8 100,2"}
                          fill="none" 
                          stroke={i === 0 ? "#2563EB" : "#10B981"} 
                          strokeWidth="2" 
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Investigations */}
          <section>
            <header className="mb-4 flex items-center justify-between">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a2547]">
                Suggested Investigations
              </h2>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                Updated just now <RefreshCw size={12} />
              </div>
            </header>

            <div className="flex flex-col gap-5">
              {suggested.map((inv) => {
                const meta = CARD_META[inv.id];
                const chips = holdingChips(inv.affectedHoldings);
                const isHigh = inv.priority === "High";
                return (
                  <div
                    key={inv.id}
                    className="relative flex gap-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Left: badge + thumbnail */}
                    <div className="w-[150px] shrink-0">
                      <span
                        className={`mb-3 block w-fit rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                          isHigh
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {inv.priority} Priority
                      </span>
                      <div className="h-[96px] w-[150px] overflow-hidden rounded-lg">
                        {meta?.thumb}
                      </div>
                    </div>

                    {/* Middle: title + summary */}
                    <div className="min-w-0 flex-1 pt-8">
                      <h3 className="mb-2 text-[19px] font-bold text-[#1a2547]">
                        {inv.title}
                      </h3>
                      <p className="max-w-[420px] text-[14px] leading-relaxed text-[var(--text-secondary)]">
                        {inv.summary}
                      </p>
                    </div>

                    {/* Right: stats + CTA */}
                    <div className="flex w-[330px] shrink-0 flex-col justify-between pt-8">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className="w-[80px] text-[13px] text-[var(--text-secondary)]">
                            Exposure
                          </span>
                          <span className="mr-4 text-[17px] font-bold text-[#1a2547]">
                            {inv.exposurePct.toFixed(1)}%
                          </span>
                          <div className="h-1.5 w-[140px] overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${isHigh ? "bg-amber-400" : "bg-blue-600"}`}
                              style={{
                                width: `${Math.min(inv.exposurePct * 3, 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="w-[80px] shrink-0 text-[13px] text-[var(--text-secondary)]">
                            Holdings
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {chips.shown.map((h) => (
                              <span
                                key={h}
                                className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[12px] font-medium text-[#3b4256]"
                              >
                                {h}
                              </span>
                            ))}
                            {chips.extra > 0 && (
                              <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[12px] font-medium text-[#3b4256]">
                                +{chips.extra}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="w-[80px] text-[13px] text-[var(--text-secondary)]">
                            Timeline
                          </span>
                          <span className="flex items-center gap-2 text-[14px] font-medium text-[#1a2547]">
                            <Calendar size={15} className="text-gray-400" />
                            {meta?.due}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Link
                          href={`/investigations/${inv.id}`}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#1a2547] shadow-sm transition-colors hover:bg-gray-50"
                        >
                          Investigate <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>

                    {/* ⋯ menu */}
                    <button
                      type="button"
                      aria-label="More options"
                      className="absolute right-5 top-5 text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[340px] shrink-0 border-l border-gray-200 px-8 py-10">
          <div className="mb-12">
            <h3 className="mb-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a2547]">
              Action Center
            </h3>

            <div className="flex flex-col gap-7">
              {[
                { count: attention.casesWaitingReview, label: "Cases waiting review" },
                { count: attention.tasksDueToday, label: "Tasks due today" },
                { count: 5, label: "Pending decisions" },
              ].map(({ count, label }) => (
                <div
                  key={label}
                  className="group flex cursor-pointer items-center justify-between"
                >
                  <div>
                    <span className="block text-[28px] font-bold leading-none text-[#1a2547]">
                      {count}
                    </span>
                    <span className="mt-1.5 block text-[14px] text-[var(--text-secondary)]">
                      {label}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a2547]">
              System Health
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[var(--text-secondary)]">
                  Data Sync
                </span>
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#1a2547]">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> Active
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] text-[var(--text-secondary)]">
                    Coverage
                  </span>
                  <span className="text-[14px] font-medium text-[#1a2547]">
                    94%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[94%] rounded-full bg-[#1a2547]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] text-[var(--text-secondary)]">
                  Last sync
                </span>
                <span className="text-[13px] text-[#1a2547]">2 mins ago</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
