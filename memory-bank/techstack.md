# techstack.md — Approved & Forbidden Dependencies

> This is the whitelist. If a package is not listed under Approved, it must be proposed
> to `@architect` first. If it appears under Forbidden, it may never be imported.

---

## ✅ Approved — Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| next | latest (15.x) | App framework |
| react | latest (19.x) | UI library |
| react-dom | latest (19.x) | DOM rendering |
| typescript | latest (5.x) | Type safety |

---

## ✅ Approved — Styling

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | latest (4.x) | Utility-first CSS |
| @tailwindcss/typography | latest | Prose styling |
| clsx | latest | Conditional classnames |
| tailwind-merge | latest | Class conflict resolution |

---

## ✅ Approved — Wallet / Auth

| Package | Version | Purpose |
|---------|---------|---------|
| @privy-io/react-auth | latest | Wallet connection + auth |

---

## ✅ Approved — Animation

| Package | Version | Purpose |
|---------|---------|---------|
| motion | latest (formerly framer-motion) | Animation and spring physics — required by `design/ui-theme.md` |

---

## ✅ Approved — UI Primitives

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | latest | Icons |
| shadcn/ui (via CLI) | latest | Component primitives |
| @radix-ui/* | (via shadcn) | Headless UI |

---

## ✅ Approved — Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| zod | latest | Schema validation |
| zustand | latest | Client state (if needed) |

---

## ⬜ Proposed — Awaiting Architect Approval

_Empty until a feature requires additional packages._

| Package | Proposed By | Reason | Status |
|---------|-------------|--------|--------|
| — | — | — | — |

---

## 🚫 Forbidden

| Package | Reason |
|---------|--------|
| styled-components | Use Tailwind instead |
| emotion | Use Tailwind instead |
| moment.js | Use `date-fns` or native `Intl` |
| lodash | Use native JS or targeted imports only |
| web3.js (legacy) | Use approved chain-specific SDK only |
| ethers v5 | Propose v6 or viem instead |
| axios | Use native `fetch` (Next.js extended fetch) |

---

## Notes

- All packages must be installed via `npm` — no `yarn` or `bun` unless explicitly decided
- Lock file (`package-lock.json`) must be committed
- No packages with known critical CVEs (run `npm audit` before adding)
