import { Investigation } from "@/types";

export const investigations: Investigation[] = [
  {
    id: "semiconductor-tariff-impact",
    title: "Semiconductor Tariff Impact",
    dateLabel: "16 Jul 2026",
    status: "Investigating",
    priority: "High",
    portfolioScope: "All Active Equity Funds",
    exposurePct: 7.8,
    affectedHoldings: ["TSMC", "ASML", "AMAT", "LRCX", "KLAC"],
    summary:
      "U.S. announces a 30% tariff on imported semiconductors. Assessing margin pressure and pass-through ability across fund holdings.",
    hypotheses: [
      {
        id: "h1",
        code: "H1",
        title: "Direct margin pressure",
        resolution: "Supported",
        evidenceCount: 12,
        summary:
          "Tariffs materially compress gross margin absent pass-through to customers.",
        exposure: 12.5,
      },
      {
        id: "h2",
        code: "H2",
        title: "Order pull-forward",
        resolution: "Contested",
        evidenceCount: 7,
        summary:
          "Company can pass through more than 50% of cost within two quarters.",
        exposure: 8.5,
      },
      {
        id: "h3",
        code: "H3",
        title: "Supply-chain rerouting",
        resolution: "Rejected",
        evidenceCount: 5,
        summary:
          "Demand destruction offsets any price pass-through in the base case.",
        exposure: 4.2,
      },
      {
        id: "h4",
        code: "H4",
        title: "Temporary market dislocation",
        resolution: "Monitor",
        evidenceCount: 4,
        summary: "Government response provides meaningful relief over time.",
        exposure: 1.5,
      },
    ],
    evidence: [
      {
        id: "e1",
        title: "Operating Review Meeting Note",
        type: "Meeting Note",
        verified: true,
        date: "15 May 2026",
      },
      {
        id: "e2",
        title: "Samsung_FY27_Model.xlsx",
        type: "Model",
        verified: true,
        date: "15 May 2026",
      },
      {
        id: "e3",
        title: "Supplier Channel Check Report",
        type: "Report",
        verified: true,
        date: "02 Jun 2026",
      },
    ],
    gaps: [
      {
        id: "g1",
        title: "Tariff pass-through ability",
        question:
          "To what extent can U.S. semiconductor companies pass through incremental tariff costs to customers without meaningful volume loss or share erosion?",
        whyItMatters:
          "Pass-through ability determines margin resilience and pricing power. It is a key driver of earnings revisions and cash flow under tariff scenarios.",
        relatedHypothesis:
          "H1: Companies with differentiated products and long-cycle designs will sustain >50% tariff pass-through with limited volume impact.",
        priority: "High",
        impact: "High",
        status: "Unknown",
        suggestedSources: [
          "Company 10-Ks and 10-Qs (MD&A, pricing commentary)",
          "Earnings call transcripts (management commentary)",
          "Investor presentations",
          "Channel checks with distributors and OEMs",
          "Industry reports (SIA, Gartner, IC Insights)"
        ],
        owner: "Analyst — Semiconductors",
        dueTime: "Today, 12:00",
        decisionUnlocked: "Confirms pricing power and margin outlook; informs revenue and EPS estimates and portfolio positioning under tariff scenarios."
      },
      {
        id: "g2",
        title: "Inventory positioning",
        question: "How much finished-goods inventory is pre-tariff?",
        whyItMatters:
          "Inventory positioning determines how quickly the margin impact shows up in reported results.",
        relatedHypothesis: "H1: Direct margin pressure",
        priority: "High",
        impact: "Medium",
        status: "Unknown",
      },
      {
        id: "g3",
        title: "Customer demand elasticity",
        question: "How elastic is end-customer demand to a price increase?",
        whyItMatters:
          "Demand elasticity determines whether pass-through actually protects margin or just shifts the loss to volume.",
        relatedHypothesis: "H3: Supply-chain rerouting",
        priority: "High",
        impact: "High",
        status: "Unknown",
      },
    ],
    decision: {
      options: ["Hold", "Add", "Trim", "Exit", "Wait for proof", "Re-underwrite"],
      selected: "Re-underwrite",
      rationale:
        "Key assumptions remain uncertain, particularly pass-through timing and competitive response. Re-underwriting to refresh ranges and stress scenarios.",
      nextReviewTrigger: "New data on customer pass-through timing",
      baseCaseRange: "(120) to (180) bps",
      bearCaseRange: "(250) to (350) bps",
    },
  },
  {
    id: "samsung-post-earnings-selloff",
    title: "Samsung Post-Earnings Sell-Off",
    dateLabel: "14 Jul 2026",
    status: "Investigating",
    priority: "Medium",
    portfolioScope: "Global Equity Fund",
    exposurePct: 2.1,
    affectedHoldings: ["Samsung Electronics"],
    summary:
      "Stock down 8% after earnings despite in-line print. Investigating whether the reaction is guidance-driven or positioning unwind.",
    hypotheses: [
      {
        id: "h1",
        code: "H1",
        title: "Guidance disappointment",
        resolution: "Monitor",
        evidenceCount: 3,
        summary: "FY27 guidance came in below buy-side whisper numbers.",
        exposure: 210.0,
      },
    ],
    evidence: [],
    gaps: [],
    decision: {
      options: ["Hold", "Add", "Trim", "Exit", "Wait for proof", "Re-underwrite"],
      selected: "Wait for proof",
      rationale: "Too early to distinguish fundamentals from flow-driven move.",
      nextReviewTrigger: "Sell-side channel checks post-print",
      baseCaseRange: "n/a",
      bearCaseRange: "n/a",
    },
  },
  {
    id: "industrial-automation-deal-review",
    title: "Industrial Automation Deal Review",
    dateLabel: "10 Jul 2026",
    status: "Ready for Review",
    priority: "Medium",
    portfolioScope: "Growth Equity Fund",
    exposurePct: 3.4,
    affectedHoldings: ["ABB", "FANUC", "Rockwell Automation"],
    summary:
      "Reviewing FY27 operating model assumptions ahead of the PM decision meeting.",
    hypotheses: [],
    evidence: [
      {
        id: "e1",
        title: "Samsung_FY27_Model.xlsx",
        type: "Model",
        verified: true,
        date: "15 May 2026",
      },
    ],
    gaps: [],
    decision: {
      options: ["Hold", "Add", "Trim", "Exit", "Wait for proof", "Re-underwrite"],
      selected: "Hold",
      rationale: "Model refresh complete; awaiting PM sign-off.",
      nextReviewTrigger: "PM review meeting",
      baseCaseRange: "n/a",
      bearCaseRange: "n/a",
    },
  },
];

export const attention = {
  casesWaitingReview: 2,
  tasksDueToday: 3,
};
