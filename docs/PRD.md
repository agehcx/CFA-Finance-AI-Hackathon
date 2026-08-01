# PRD — Portfolio Investigation Copilot

**Status:** v0 shipped (mock data, no backend)
**Owner:** TBD
**Last updated:** 2026-07-18

## Problem statement

Portfolio managers and analysts investigate the same recurring question
after every market-moving event: "does this change our thesis, and what
should we do about it?" Today that investigation happens across email,
chat, spreadsheets, and meeting notes, with no durable, shared record of
the hypotheses considered, the evidence found, or the reasoning behind the
final call. The next analyst re-derives it from scratch.

## Goal

Give the investigation itself a home: one page per event that captures
ranked hypotheses, the evidence graph behind them, the gaps still open, and
the decision ultimately recorded — with an AI copilot that accelerates
research but never replaces the human sign-off on a decision.

## Users

- **Analyst** — opens an investigation, works hypotheses, fills evidence
  gaps, drafts a recommendation.
- **Portfolio manager (PM)** — reviews the investigation, records the
  decision (Hold / Add / Trim / Exit / Wait for proof / Re-underwrite).

## Core user flow

1. Analyst lands on **Today**, sees suggested investigations triggered by
   news/events, or types a free-text question.
2. Opens an **Investigation** → reviews **Hypotheses**, expands the
   **Graph** to see how the event causally connects to a holding and the
   supporting evidence.
3. Reviews **Evidence**, checks what's human-verified vs. AI-proposed.
4. Reviews **Actions** — evidence gaps the copilot flagged — and assigns an
   AI-drafted task to close a gap.
5. PM reviews the investigation and records a **Decision**, which always
   requires an explicit human action.
6. The decision and rationale persist in **Decision Memory** for future
   reference.

## v0 scope (shipped)

| Area | Included |
|---|---|
| Today | Ask box, suggested investigations list, "needs your attention" rail |
| Investigation detail | Tabs: Hypotheses, Graph, Evidence, Actions, Decision |
| Copilot panel | Pinned chat UI, scoped message thread, canned responses (no live model call yet) |
| Investigations list | Browse all investigations |
| Portfolio & Theses | Holdings grouped by linked investigations |
| Decision Memory | Every recorded decision + rationale |
| Library | Static reference docs list |
| Data | Mock, in `src/lib/mock-data.ts` — 3 sample investigations |

## Explicitly out of scope for v0

- Real LLM-backed copilot responses (currently canned; swap in a real
  model call behind the same `CopilotPanel` interface when ready).
- Persistence — nothing written back; refresh resets to mock data.
- Auth — no login gate. Privy is an approved dependency in this repo's
  stack but isn't wired in, since this product has no wallet/crypto
  surface; add it only if/when multi-user access control is needed.
- Real document/spreadsheet preview (the reference screenshots showed an
  Excel cell-level preview) — evidence is listed, not rendered inline.

## Success signals

- An analyst can go from "event happens" to "hypotheses ranked + gaps
  identified" without leaving the app.
- A PM can see the full evidence trail behind a decision before recording
  it.
- Past decisions are searchable/reviewable months later without asking the
  original analyst.

## Next steps (post-v0)

1. Wire a real backend: Postgres schema mirroring `src/types/index.ts`
   (`Investigation`, `Hypothesis`, `EvidenceItem`, `EvidenceGap`,
   `DecisionRecord`).
2. Replace canned `CopilotPanel` replies with a real model call scoped to
   an investigation's evidence (retrieval over linked documents only).
3. Add auth (Privy, or a simpler email-based login) once there's more than
   one user's data to separate.
4. Evidence detail view with inline document/spreadsheet preview
   (screenshot 3/6 in the reference material) if the team wants it.
