export type Priority = "High" | "Medium" | "Low";

export type HypothesisResolution =
  | "Supported"
  | "Contested"
  | "Rejected"
  | "Monitor";

export interface Hypothesis {
  id: string;
  code: string;
  title: string;
  resolution: HypothesisResolution;
  evidenceCount: number;
  summary: string;
  exposure: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: "Meeting Note" | "Model" | "Report" | "Filing";
  verified: boolean;
  date: string;
}

export interface EvidenceGap {
  id: string;
  title: string;
  question: string;
  whyItMatters: string;
  relatedHypothesis: string;
  priority: Priority;
  impact: "High" | "Medium" | "Low";
  status: "Unknown" | "In progress" | "Resolved";
  suggestedSources?: string[];
  owner?: string;
  dueTime?: string;
  decisionUnlocked?: string;
}

export interface DecisionRecord {
  options: string[];
  selected: string;
  rationale: string;
  nextReviewTrigger: string;
  baseCaseRange: string;
  bearCaseRange: string;
}

export interface Investigation {
  id: string;
  title: string;
  dateLabel: string;
  status: "Investigating" | "Ready for Review" | "Closed";
  priority: Priority;
  portfolioScope: string;
  exposurePct: number;
  affectedHoldings: string[];
  summary: string;
  hypotheses: Hypothesis[];
  evidence: EvidenceItem[];
  gaps: EvidenceGap[];
  decision: DecisionRecord;
}

export interface ChatMessage {
  id: string;
  role: "user" | "copilot";
  text: string;
  timestamp: string;
}
