# projectbrief.md — Portfolio Investigation Copilot

## One-liner

An investigation workspace for portfolio managers and analysts: turn a market
event ("30% semiconductor tariff") into ranked hypotheses, linked evidence,
identified evidence gaps, and a recorded, human-approved decision — with an
AI copilot assisting at every step but never deciding on its own.

## Problem

When a market event hits a holding, the research trail (meeting notes,
models, filings, chat threads) is scattered across tools. Analysts
re-litigate the same questions after each news cycle because there's no
durable record of what was investigated, what evidence supported or
rejected each hypothesis, and why the fund ultimately held, trimmed, or
exited.

## Solution shape (adapted from the reference product)

1. **Today** — a home surface: ask a free-text question or pick a
   suggested investigation (surfaced from a triggering event), see what
   needs attention (cases waiting review, tasks due today).
2. **Investigation** — one page per event, with tabs:
   - **Hypotheses** — ranked H1..Hn with resolution state (Supported /
     Contested / Rejected / Monitor).
   - **Graph** — the event → driver → holding → evidence → thesis → model →
     fund causal chain, human-verified links solid, AI-proposed links
     dashed.
   - **Evidence** — linked documents/models, each marked human-verified or
     not.
   - **Actions** — evidence gaps the copilot has identified, with an
     AI-drafted task (question, why it matters, related hypothesis,
     suggested owner) that a human assigns.
   - **Decision** — Hold / Add / Trim / Exit / Wait for proof /
     Re-underwrite, with rationale and a next-review trigger. Recording a
     decision always requires human approval.
3. **Copilot panel** — pinned alongside every investigation, answers
   questions scoped to that investigation's verified evidence.
4. **Investigations / Portfolio & Theses / Decision Memory / Library** —
   sidebar surfaces for browsing all investigations, holdings with open
   theses, a permanent record of past decisions, and shared reference docs.

## Explicit non-goals (v0)

- No live market data or brokerage integration — data is illustrative/mock.
- No autonomous trading or auto-recorded decisions — every decision
  requires an explicit human action ("Human approval required to record").
- No wallet/crypto flow — this product isn't blockchain-related, so Privy
  is not wired in for v0 (see Notes below).

## Reference

Adapted from a "Portfolio Investigation Copilot" product concept (five
reference screenshots supplied by the user), reusing its sidebar IA, the
Today/suggested-investigations pattern, the hypothesis graph, the evidence
gap → AI-drafted task flow, and the decision record panel.

## Notes

- Chain / network: none — not applicable, this is a research/decision
  workflow tool, not a token or trading product.
- Backend / database: none yet — v0 ships as a client-rendered app over
  mock data (`src/lib/mock-data.ts`) so the UI and flows can be validated
  first; a real backend (Postgres + auth) is the natural next step once the
  UI is validated.
- Deployment target: Vercel (matches the Next.js stack already committed to
  in `CLAUDE.md`).
