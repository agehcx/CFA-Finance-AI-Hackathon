"use client";

import { useState, useEffect } from "react";
import {
  Scale,
  Landmark,
  FileText,
  PieChart,
  Calculator,
  Globe,
  Tag,
  LineChart,
  X,
  Info,
  Minus,
  Plus,
  Maximize2,
  ExternalLink,
  ChevronDown,
  ClipboardCheck,
  ChevronRight,
  Filter,
  ArrowDownUp,
  Shield,
  Lock,
  Check,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { Investigation } from "@/types";

type NodeKind = "event" | "driver" | "entity" | "evidence" | "thesis" | "model" | "fund";

interface PreviewRow {
  label: string;
  cellRef: string;
  value: string;
  highlight?: boolean;
}

interface GridRow {
  rowNumber: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}

interface GraphNode {
  id: string;
  kind: NodeKind;
  icon: LucideIcon;
  label: string;
  x: number;
  y: number;
  dateLabel?: string;
  updatedBy?: string;
  description: string;
  locked?: boolean;
  previewRows?: PreviewRow[];
  gridRows?: GridRow[];
}

interface GraphEdge {
  from: string;
  to: string;
  label: string;
  verified: boolean;
}

const KIND_STYLES: Record<NodeKind, { ring: string; bg: string; text: string }> = {
  event: { ring: "border-purple-300", bg: "bg-purple-50", text: "text-purple-600" },
  driver: { ring: "border-sky-300", bg: "bg-sky-50", text: "text-sky-600" },
  entity: { ring: "border-indigo-300", bg: "bg-indigo-50", text: "text-indigo-600" },
  evidence: { ring: "border-amber-300", bg: "bg-amber-50", text: "text-amber-600" },
  thesis: { ring: "border-emerald-300", bg: "bg-emerald-50", text: "text-emerald-600" },
  model: { ring: "border-accent", bg: "bg-accent-soft", text: "text-accent" },
  fund: { ring: "border-teal-300", bg: "bg-teal-50", text: "text-teal-600" },
};

const NODE_SIZE = 60;
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 860;

// ponytail: hand-placed jitter so the layout doesn't read as a mirrored diamond; swap for a real force layout if the graph grows past ~12 nodes
const JITTER: Record<string, { dx: number; dy: number }> = {
  tariff: { dx: 20, dy: -9 },
  pricing: { dx: -15, dy: 15 },
  demand: { dx: 12, dy: -12 },
  holding: { dx: -9, dy: 6 },
  meeting: { dx: 9, dy: -12 },
  thesis: { dx: -12, dy: 9 },
  supplier: { dx: -18, dy: 12 },
  model: { dx: 15, dy: -6 },
  fund: { dx: -9, dy: 9 },
  datagov: { dx: 10, dy: -20 },
};

function jitter(id: string, x: number, y: number): { x: number; y: number } {
  const offset = JITTER[id] ?? { dx: 0, dy: 0 };
  return { x: x + offset.dx, y: y + offset.dy };
}

function buildNodes(centerHolding: string): GraphNode[] {
  return [
    {
      id: "tariff",
      kind: "event",
      icon: Scale,
      label: "30% Semiconductor Tariff",
      ...jitter("tariff", 240, 50),
      dateLabel: "12 May 2026",
      description:
        "U.S. announces a 30% tariff on imported semiconductors, triggering this investigation.",
    },
    {
      id: "pricing",
      kind: "driver",
      icon: Tag,
      label: "Price Pass-Through",
      ...jitter("pricing", 120, 195),
      description: "Ability to raise prices to offset the incremental tariff cost.",
    },
    {
      id: "demand",
      kind: "driver",
      icon: LineChart,
      label: "Demand Elasticity",
      ...jitter("demand", 360, 195),
      description: "Elasticity of end-customer demand to a price increase.",
    },
    {
      id: "holding",
      kind: "entity",
      icon: Landmark,
      label: centerHolding,
      ...jitter("holding", 240, 335),
      description: `${centerHolding} is the holding most directly exposed to this tariff event.`,
    },
    {
      id: "meeting",
      kind: "evidence",
      icon: FileText,
      label: "Ops Review Note (5/15)",
      ...jitter("meeting", 90, 500),
      dateLabel: "15 May 2026",
      description:
        "Notes from the May 15 operating review meeting; cited as supporting evidence for the margin thesis.",
    },
    {
      id: "datagov",
      kind: "entity",
      icon: Shield,
      label: "Data Governance",
      locked: true,
      ...jitter("datagov", 80, 335),
      description: "Restricted data access required to view compliance records.",
    },
    {
      id: "thesis",
      kind: "thesis",
      icon: PieChart,
      label: "Margin Compression Thesis",
      ...jitter("thesis", 240, 500),
      dateLabel: "9 May 2026",
      description: "Working thesis: tariffs compress gross margin absent full pass-through.",
    },
    {
      id: "supplier",
      kind: "evidence",
      icon: FileText,
      label: "Supplier Channel Check",
      ...jitter("supplier", 400, 500),
      dateLabel: "2 Jun 2026",
      description: "Supplier channel check on order volumes and pricing behavior.",
    },
    {
      id: "model",
      kind: "model",
      icon: Calculator,
      label: "FY27 Operating Model",
      ...jitter("model", 240, 665),
      dateLabel: "15 May 2026",
      updatedBy: "Model Owner",
      description:
        "Gross Margin (C14) in this model underpins the Gross Margin Thesis and is cited in the May 15 operating review meeting note.",
      previewRows: [
        { label: "Revenue Growth", cellRef: "B3", value: "5.5%" },
        { label: "Utilization", cellRef: "C10", value: "82.0%" },
        { label: "Gross Margin", cellRef: "C14", value: "28.5%", highlight: true },
      ],
      gridRows: [
        { rowNumber: 8, value: "FY27" },
        { rowNumber: 9, label: "Revenue Growth", value: "5.5%" },
        { rowNumber: 10, label: "Price / Mix", value: "1.0%" },
        { rowNumber: 11, label: "Utilization", value: "82.0%" },
        { rowNumber: 12, label: "COGS % of Sales", value: "71.5%" },
        { rowNumber: 13, label: "Operating Expenses %", value: "13.0%" },
        { rowNumber: 14, label: "Gross Margin", value: "28.5%", highlight: true },
        { rowNumber: 15, label: "Operating Margin", value: "15.5%" },
        { rowNumber: 16, label: "Net Margin", value: "12.0%" },
      ],
    },
    {
      id: "fund",
      kind: "fund",
      icon: Globe,
      label: "Global Equity Fund",
      ...jitter("fund", 240, 810),
      description: "Portfolio whose exposure is informed by this investigation's FY27 model output.",
    },
  ];
}

const EDGES: GraphEdge[] = [
  { from: "tariff", to: "pricing", label: "drives", verified: true },
  { from: "tariff", to: "demand", label: "drives", verified: true },
  { from: "pricing", to: "demand", label: "influences", verified: true },
  { from: "pricing", to: "holding", label: "impacts", verified: true },
  { from: "datagov", to: "holding", label: "governs", verified: false },
  { from: "demand", to: "holding", label: "impacts", verified: true },
  { from: "holding", to: "meeting", label: "supports", verified: false },
  { from: "holding", to: "thesis", label: "drives", verified: true },
  { from: "holding", to: "supplier", label: "supports", verified: false },
  { from: "thesis", to: "model", label: "feeds into", verified: true },
  { from: "model", to: "fund", label: "informs", verified: true },
];

interface EdgeGeometry {
  path: string;
  midX: number;
  midY: number;
}

function edgePath(from: GraphNode, to: GraphNode): EdgeGeometry {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const r = NODE_SIZE / 2 + 2;

  const start = { x: from.x + ux * r, y: from.y + uy * r };
  const end = { x: to.x - ux * r, y: to.y - uy * r };

  return {
    path: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
    midX: (start.x + end.x) / 2,
    midY: (start.y + end.y) / 2,
  };
}

function DocumentPanel({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  const Icon = node.icon;
  const style = KIND_STYLES[node.kind];

  if (node.kind === "model") {
    return (
      <div>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-white">
              <Calculator size={14} />
            </span>
            <p className="text-sm font-semibold text-ink">TSMC_FY27_Model.xlsx</p>
          </div>
          <button onClick={onClose} aria-label="Close document" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start justify-between text-sm">
            <div>
              <p className="text-muted">Microsoft Excel</p>
              <p className="text-ink">.xlsx · 1.2 MB</p>
            </div>
            <div className="text-right">
              <p className="text-muted">Last updated</p>
              <p className="text-ink">{node.dateLabel}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-muted">Updated by</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent">
              MO
            </span>
            <span className="text-ink">{node.updatedBy}</span>
          </div>

          <p className="mt-5 text-xs font-semibold uppercase text-muted">Sheet</p>
          <div className="mt-1 flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm text-ink">
            Operating Model
            <ChevronDown size={14} className="text-muted" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase text-muted">Relevant cells</p>
          <div className="mt-1 overflow-hidden rounded-md border border-border">
            {node.previewRows?.map((row) => (
              <div
                key={row.cellRef}
                className={clsx(
                  "flex items-center justify-between px-3 py-2 text-sm",
                  row.highlight ? "bg-accent-soft font-semibold text-accent" : "text-ink"
                )}
              >
                <span>
                  {row.label} ({row.cellRef})
                </span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase text-muted">Preview (Operating Model)</p>
            <p className="text-xs text-muted">Showing rows 8-16, cols A-F</p>
          </div>
          <div className="mt-1 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-canvas text-muted">
                  <th className="w-8 px-2 py-1 text-left font-medium"> </th>
                  <th className="px-2 py-1 text-left font-medium">A</th>
                  <th className="px-2 py-1 text-left font-medium">B</th>
                  <th className="px-2 py-1 text-left font-medium">C</th>
                  <th className="px-2 py-1 text-left font-medium">D</th>
                </tr>
              </thead>
              <tbody>
                {node.gridRows?.map((row) => (
                  <tr key={row.rowNumber} className="border-b border-border last:border-0">
                    <td className="px-2 py-1 text-muted">{row.rowNumber}</td>
                    <td className="px-2 py-1" />
                    <td className="px-2 py-1 text-ink">{row.label}</td>
                    <td
                      className={clsx(
                        "px-2 py-1",
                        row.highlight ? "bg-accent-soft font-semibold text-accent" : "text-ink"
                      )}
                    >
                      {row.value}
                    </td>
                    <td className="px-2 py-1" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-accent py-2 text-sm font-semibold text-white hover:bg-accent/90">
            <Calculator size={14} /> Open in Microsoft Excel <ExternalLink size={14} />
          </button>

          <p className="mt-5 text-xs font-semibold uppercase text-muted">Why this is linked</p>
          <p className="mt-1 text-sm text-muted">{node.description}</p>

          <p className="mt-5 text-xs font-semibold uppercase text-muted">Actions</p>
          <div className="mt-1 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border py-2 text-sm font-medium text-ink hover:bg-canvas">
              <Scale size={14} /> Compare scenarios
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border py-2 text-sm font-medium text-ink hover:bg-canvas">
              <ClipboardCheck size={14} /> Create review task
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={clsx("flex h-7 w-7 items-center justify-center rounded-full", style.bg, style.text)}>
            <Icon size={14} />
          </span>
          <p className="text-sm font-semibold text-ink">{node.label}</p>
        </div>
        <button onClick={onClose} aria-label="Close details" className="text-muted hover:text-ink">
          <X size={18} />
        </button>
      </div>
      <div className="px-6 py-4">
        {node.dateLabel && <p className="text-xs text-muted">{node.dateLabel}</p>}
        <p className="mt-3 text-xs font-semibold uppercase text-muted">Why this is linked</p>
        <p className="mt-1 text-sm text-muted">{node.description}</p>
      </div>
    </div>
  );
}

export function HypothesisGraph({ investigation }: { investigation: Investigation }) {
  const centerHolding = investigation.affectedHoldings[0] ?? "Core Holding";
  const nodes = buildNodes(centerHolding);
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Sort hypotheses by exposure
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const sortedHypotheses = [...investigation.hypotheses].sort((a, b) => {
    return sortOrder === "desc" ? b.exposure - a.exposure : a.exposure - b.exposure;
  });

  const [selectedHypothesis, setSelectedHypothesis] = useState<string>(sortedHypotheses[0]?.id ?? "h1");
  const selected = selectedId ? nodeById.get(selectedId) : undefined;
  
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null);
  const [manualVerifications, setManualVerifications] = useState<Set<string>>(new Set());

  // Mock interactivity based on hypothesis selection
  const activeEdges = EDGES.map((edge, index) => {
    const edgeId = `${edge.from}-${edge.to}`;
    if (manualVerifications.has(edgeId)) {
      return { ...edge, verified: true };
    }
    
    if (selectedHypothesis === "h1") return edge;
    // Tweak some edges for mock variation
    const verified = (index + selectedHypothesis.charCodeAt(selectedHypothesis.length - 1)) % 3 !== 0;
    return { ...edge, verified };
  });

  const handleVerifyEdge = (edgeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setManualVerifications(prev => {
      const next = new Set(prev);
      next.add(edgeId);
      return next;
    });
    setActiveEdgeId(null);
  };

  const [graphWidth, setGraphWidth] = useState(500);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      setGraphWidth(prev => Math.max(300, Math.min(prev + e.movementX, 1200)));
    };
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={clsx("flex h-full overflow-hidden bg-[#f8fafc]", isDragging && "cursor-col-resize select-none")} 
      onClick={() => setActiveEdgeId(null)}
    >
      {/* Left Sidebar: Ranked hypotheses */}
      <div className="flex w-[280px] shrink-0 flex-col border-r border-border bg-white shadow-sm z-10">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-[14px] font-bold text-[#1a2547]">Ranked hypotheses</span>
          <button 
            onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
            className="rounded border border-border p-1.5 text-muted hover:bg-canvas transition-colors"
            title="Sort by exposure"
          >
            <ArrowDownUp size={14} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedHypotheses.map((hyp) => {
            const isActive = hyp.id === selectedHypothesis;
            return (
              <button
                key={hyp.id}
                onClick={() => setSelectedHypothesis(hyp.id)}
                className={clsx(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all",
                  isActive
                    ? "border-blue-300 bg-[#eff6ff] shadow-sm"
                    : "border-border bg-white hover:bg-canvas"
                )}
              >
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md mt-0.5",
                    isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-[#3b4256]"
                  )}
                >
                  <span className="text-[12px] font-bold">{hyp.code}</span>
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <p className={clsx("truncate text-[13px] font-semibold", isActive ? "text-[#1e3a8a]" : "text-[#1a2547]")}>
                      {hyp.title}
                    </p>
                    <span className={clsx("text-[11px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded", isActive ? "bg-blue-100 text-blue-700" : "bg-emerald-50 text-emerald-700")}>
                      {hyp.exposure}%
                    </span>
                  </div>
                  <p className={clsx("text-[11px] leading-snug line-clamp-2", isActive ? "text-blue-800/80" : "text-muted")}>
                    {hyp.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div 
        className={clsx(
          "flex shrink-0 flex-col bg-white border-r border-border relative",
          !isDragging && "transition-all duration-300 ease-in-out",
          !selected && "flex-1 min-w-0"
        )}
        style={{ width: selected ? graphWidth : undefined }}
      >
        {selected && (
          <div 
            className="absolute right-[-4px] top-0 bottom-0 w-2 cursor-col-resize z-20 group"
            onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
          >
            <div className={clsx("mx-auto h-full w-[2px] transition-colors", isDragging ? "bg-blue-500" : "bg-transparent group-hover:bg-blue-300")} />
          </div>
        )}
        <div className="flex shrink-0 items-center gap-1.5 px-6 pt-5 text-base font-semibold text-ink">
          Knowledge graph
          <Info size={15} className="text-muted" />
        </div>
        <div className="flex shrink-0 items-center gap-1.5 px-6 pt-3">
          <button className="rounded border border-border p-1.5 text-muted hover:bg-canvas" aria-label="Zoom out">
            <Minus size={14} />
          </button>
          <span className="px-1.5 text-xs text-muted">100%</span>
          <button className="rounded border border-border p-1.5 text-muted hover:bg-canvas" aria-label="Zoom in">
            <Plus size={14} />
          </button>
          <button className="ml-auto rounded border border-border p-1.5 text-muted hover:bg-canvas" aria-label="Fullscreen">
            <Maximize2 size={14} />
          </button>
        </div>

        <div className="min-h-0 flex-1 px-4 py-3">
          <svg
            viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
          >
            <defs>
              <marker id="arrow-solid" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2a4a" />
              </marker>
              <marker id="arrow-dashed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>

            {activeEdges.map((edge) => {
              const from = nodeById.get(edge.from);
              const to = nodeById.get(edge.to);
              if (!from || !to) return null;
              const { path, midX, midY } = edgePath(from, to);
              const labelWidth = edge.label.length * 6.5 + 14;
              const edgeId = `${edge.from}-${edge.to}`;
              const isPopupOpen = activeEdgeId === edgeId;
              
              return (
                <g key={edgeId}>
                  <g 
                    onClick={(e) => {
                      if (!edge.verified) {
                        e.stopPropagation();
                        setActiveEdgeId(isPopupOpen ? null : edgeId);
                      }
                    }}
                    className={clsx(!edge.verified && "cursor-pointer hover:opacity-80 transition-opacity")}
                  >
                    <path
                      d={path}
                      fill="none"
                      stroke={edge.verified ? "#1e2a4a" : "#64748b"}
                      strokeWidth={edge.verified ? 2.25 : 1.75}
                      strokeDasharray={edge.verified ? undefined : "6 4"}
                      markerEnd={`url(#${edge.verified ? "arrow-solid" : "arrow-dashed"})`}
                    />
                    <rect
                      x={midX - labelWidth / 2}
                      y={midY - 9.5}
                      width={labelWidth}
                      height={19}
                      rx={4}
                      fill={isPopupOpen ? "#eff6ff" : "#f8fafc"}
                      stroke={isPopupOpen ? "#3b82f6" : "#e5e7eb"}
                      strokeWidth={1}
                    />
                    <text x={midX} y={midY + 4} textAnchor="middle" fontSize="12" fontWeight={600} fill={isPopupOpen ? "#1d4ed8" : "#374151"}>
                      {edge.label}
                    </text>
                  </g>
                  
                  {isPopupOpen && (
                    <foreignObject x={midX + labelWidth / 2 + 5} y={midY - 20} width={160} height={60} className="overflow-visible">
                      <div className="flex flex-col gap-1 rounded-md border border-blue-200 bg-white p-2 shadow-lg w-[140px]" onClick={e => e.stopPropagation()}>
                        <span className="text-[10px] font-semibold text-muted uppercase text-center mb-1">AI-Proposed Edge</span>
                        <div className="flex gap-1.5">
                          <button onClick={(e) => handleVerifyEdge(edgeId, e)} className="flex flex-1 items-center justify-center gap-1 rounded bg-blue-600 py-1 text-[11px] font-bold text-white hover:bg-blue-700">
                            <Check size={12} /> Verify
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setActiveEdgeId(null); }} className="flex flex-1 items-center justify-center gap-1 rounded border border-border bg-gray-50 py-1 text-[11px] font-bold text-ink hover:bg-gray-100">
                            <X size={12} /> Reject
                          </button>
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {nodes.map((node) => {
              const Icon = node.icon;
              const style = KIND_STYLES[node.kind];
              const isSelected = node.id === selectedId;
              const isLocked = node.locked;
              
              return (
                <foreignObject key={node.id} x={node.x - 100} y={node.y - NODE_SIZE / 2 - 10} width={200} height={NODE_SIZE + 60} className="overflow-visible">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isLocked) setSelectedId(node.id === selectedId ? null : node.id);
                    }}
                    className={clsx(
                      "flex w-full flex-col items-center gap-1.5 relative pt-[10px]",
                      isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    )}
                  >
                    <div className="relative">
                      <span
                        className={clsx(
                          "flex items-center justify-center rounded-full border-2 bg-white shadow-sm transition-transform",
                          style.ring,
                          !isLocked && "hover:scale-105",
                          isSelected && "ring-2 ring-accent ring-offset-[3px]"
                        )}
                        style={{ width: NODE_SIZE, height: NODE_SIZE }}
                      >
                        <span className={clsx("flex h-10 w-10 items-center justify-center rounded-full", style.bg, style.text)}>
                          <Icon size={19} />
                        </span>
                      </span>
                      {isLocked && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-white shadow-sm border border-white">
                          <Lock size={10} />
                        </span>
                      )}
                    </div>
                    <span className="line-clamp-2 max-w-[164px] text-center text-xs font-medium leading-tight text-ink">
                      {node.label}
                    </span>
                  </button>
                </foreignObject>
              );
            })}
          </svg>
        </div>

        <div className="shrink-0 px-6 pb-4">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0 w-4 border-t border-ink/60" /> Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-0 w-4 border-t border-dashed border-muted" /> AI-proposed
            </span>
          </div>
        </div>
      </div>

      {selected && (
        <div className="min-w-0 flex-1 overflow-y-auto bg-canvas animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="mx-auto max-w-[640px] px-6 py-6">
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <DocumentPanel node={selected} onClose={() => setSelectedId(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
