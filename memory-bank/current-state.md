# current-state.md — Source of Truth

> This file is the authoritative snapshot of the project at any given moment.
> `@developer` must update it after every meaningful change.
> `@manager` must verify it during every review.

---

## Project Status

**Phase:** 1 — v0 built (mock data, no backend)
**Last Updated:** 2026-07-18
**Updated By:** Claude Code

---

## What Is Built

Portfolio Investigation Copilot v0 — see `memory-bank/projectbrief.md` and `docs/PRD.md`.

| Module | Status | Notes |
|--------|--------|-------|
| Repo structure | ✅ Done | Governance files created |
| Agent rules backbones | ✅ Done | Created backbone structures under `.agents/rules/` |
| Next.js app | ✅ Done | Next 15.5.20 (patched), React 19, Tailwind 4, TS strict |
| Sidebar + nav | ✅ Done | `src/components/Sidebar.tsx` — Today / Investigations / Portfolio & Theses / Decision Memory / Library |
| Today page | ✅ Done | `src/app/page.tsx` — revised to match the modern SaaS mockup with shadowed cards and a portfolio snapshot |
| Investigation detail | ✅ Done | `src/app/investigations/[id]/page.tsx` — tabs: Hypotheses, Graph, Evidence, Actions, Decision |
| Copilot chat panel | ✅ Done | `src/components/CopilotPanel.tsx` — UI + local state only, canned replies, no live model call |
| Investigations / Portfolio / Memory / Library pages | ✅ Done | List views over mock data |
| Privy integration | ⬜ Not started | Deferred — no wallet/crypto surface in this product, see projectbrief.md Notes |
| Backend / persistence | ⬜ Not started | Mock data in `src/lib/mock-data.ts`; resets on refresh |
| Real copilot (LLM-backed) | ⬜ Not started | `CopilotPanel` interface ready to swap canned replies for a real call |

---

## What Is Broken / Blocked

| Issue | Blocker | Owner |
|-------|---------|-------|
| Nothing currently blocked | — | — |

---

## What Is Next

1. Decide whether to wire a real backend (Postgres) or keep this a
   client-only prototype for the hackathon demo.
2. If time allows, wire a real model call behind `CopilotPanel` scoped to
   an investigation's evidence.
3. Populate brand specifics in `design/ci-brand.md`, `design/ui-theme.md`,
   `design/ux-principles.md` if the team wants to diverge from the
   Tailwind theme tokens in `src/app/globals.css`.

---

## Active Decisions / Open Questions

- [x] What does the core user flow look like? → see `docs/PRD.md`
- [ ] Backend / database, or stay client-only for the demo?
- [ ] Deployment target confirmation (assume Vercel per `CLAUDE.md`)
- [ ] Is Privy needed at all for this product, or should CLAUDE.md drop it?
