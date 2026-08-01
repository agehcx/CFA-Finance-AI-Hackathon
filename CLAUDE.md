# Project

> Portfolio Investigation Copilot — an investigation workspace for portfolio managers/analysts: ranked hypotheses, an evidence graph, evidence-gap tasks, and a human-approved decision record for every market event. Full spec: `docs/PRD.md`, `memory-bank/projectbrief.md`.

## Stack

- **Framework**: Next.js (App Router)
- **UI**: React + Tailwind CSS
- **Wallet / Auth**: Privy
- **Blockchain**: none — this product has no wallet/token surface

## Project Structure (expected)

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Shared UI components
  hooks/        # Custom React hooks
  lib/          # Utilities, helpers, constants
  types/        # TypeScript types
public/         # Static assets
```

## Conventions

- TypeScript throughout — no `any`, prefer explicit types
- Tailwind for all styling — no CSS modules or inline styles
- Components are named exports, not default exports (except page.tsx / layout.tsx)
- Fetch / mutations go in server actions or API routes, not directly in components
- Privy is approved in `memory-bank/techstack.md` but not wired in for v0 — this product has no wallet/crypto surface. If auth is added later, Privy handles it; do not add a second wallet/auth library.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # eslint
npm run typecheck # tsc --noEmit
```

## Environment Variables

```
NEXT_PUBLIC_PRIVY_APP_ID=
# add others here as the project grows
```

## Git Conventions

- Every commit made with Claude Code assistance **must** include the co-author trailer:
  ```
  Co-authored-by: Claude <noreply@anthropic.com>
  ```
- Use conventional commit prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Do not commit `.env.local` or any file containing secrets

## Notes

- Project idea / full spec: see `docs/PRD.md` and `memory-bank/projectbrief.md`.
