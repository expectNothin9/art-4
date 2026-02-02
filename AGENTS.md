# AGENTS.md

This document defines how humans and AI coding agents should work in this repository.
All contributions must follow the conventions and principles below.

---

## Project principles

- Prefer **server-first** architecture.
- Default to **clarity over cleverness**.
- Optimize for long-term maintainability and reviewability.
- Minimize client-side JavaScript unless explicitly required.
- Follow existing patterns before introducing new ones.

---

## Tech stack

- Framework: **Next.js (App Router)**
- Language: **TypeScript (strict)**
- Runtime & package manager: **Node.js + npm**
- Styling: **Tailwind CSS** with CSS variable design tokens
- UI primitives: **shadcn/ui** (Base UI-based)
- Forms: **React Hook Form + Zod**
- Tables: **TanStack Table**
- Testing:
  - Unit: **Vitest**
  - E2E: **Playwright**

---

## Runtime & package management (npm)

- Use **npm only** for:
  - installing dependencies
  - running scripts
  - managing the lockfile
- Commit `package-lock.json`.
- Do NOT use `bun`, `pnpm`, or `yarn`.

---

## Repo conventions

### Folder structure

```txt
app/                # Next.js routes, layouts, route handlers
components/         # Shared presentational components
features/           # Domain-based feature folders
  user-settings/
  billing-history/
lib/                # Shared utilities (pure, reusable)
server/             # Server-only logic (db, services, integrations)
types/              # Shared TypeScript types
```

---

## Naming conventions

### Files & folders

- All files and folders must use **kebab-case**
- Examples:
  - `user-profile-card.tsx`
  - `use-user-session.ts`
  - `format-currency.ts`

### React components

- Filename: `kebab-case.tsx`
- Exported component name: **PascalCase**

```ts
// user-profile-card.tsx
export function UserProfileCard() {}
```

### Hooks

- Filename: `use-*.ts`
- Example: `use-debounced-value.ts`

### Server actions

- `*.actions.ts`
- Example: `create-user.actions.ts`

### Route handlers

- `route.ts` (Next.js convention)

### Tests

- Unit tests: `*.test.ts` / `*.test.tsx`
- E2E tests: `*.spec.ts`

---

## Client vs Server rules

### Server Components (default)

- Use Server Components by default.
- Perform data fetching and mutations on the server.
- Use `fetch()` or server utilities from `server/`.

### Client Components

Use `"use client"` **only** when required:

- Browser-only APIs (localStorage, media, clipboard)
- Event handlers / interactive state
- Client-only third-party libraries

Rules:

- Never import server-only modules into client components.
- Keep client components small and focused.

---

## Architecture patterns

### Container / Presentational separation

- **Container**
  - Fetches data
  - Handles orchestration
  - Passes props down

- **Presentational**
  - Pure UI
  - No data fetching
  - Minimal side effects

```txt
user-settings/
  user-settings-container.tsx
  user-settings-form.tsx
```

---

## Data fetching

- Prefer data fetching in:
  - Server Components
  - Route Handlers
  - Server Actions

- Centralize reusable fetch logic in `lib/` or `server/`.
- Handle error states explicitly.

---

## Validation & types

- Validate all external input with **Zod**
  - forms
  - route params
  - query params

- Prefer deriving types from schemas:

```ts
type FormValues = z.infer<typeof formSchema>;
```

- Avoid duplicating types manually.

---

## Code style rules

- TypeScript strict mode is required.
- Avoid `any` unless justified with a comment.
- Prefer named exports.
- Keep functions and components small.
- Avoid deep relative imports; use path aliases (`@/lib`, `@/components`, etc.).

---

## Testing expectations

- Unit tests for:
  - business logic
  - utilities
  - non-trivial hooks

- Playwright coverage for critical user flows.
- All PRs must pass:
  - lint
  - typecheck
  - tests
  - build

---

## Agent workflow

When implementing a feature or change:

1. Identify the correct folder and file names (kebab-case).
2. Follow existing architectural patterns.
3. Minimize unrelated changes.
4. Add tests when logic is non-trivial.
5. Provide a short PR-style summary:
   - What changed
   - Why it changed
   - How to test
   - Follow-ups / TODOs

---

## Guardrails

- Do NOT introduce new libraries without justification.
- Do NOT refactor unrelated code in the same change.
- Do NOT bypass validation or typing for speed.
- Follow this document unless explicitly told otherwise.

---

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm run test`
- E2E: `npm run e2e`

---

## Memoization policy (useMemo / useCallback / React.memo)

### Goal

Keep components simple and correct by default. Avoid “defensive” memoization that adds complexity and often doesn’t improve performance.

### Default rule

- **Do not add `useMemo`, `useCallback`, or `React.memo` by default.**
- If you think you need them, first verify a real problem (profiling, measurable rerender cost, or a known identity requirement).

### When memoization is allowed

Memoization is acceptable only for one of these reasons (include a short comment when it’s not obvious):

1. **Identity is semantically required**

- stable function reference required by a subscription/event API
- third-party lib requires stable callbacks/objects
- effect dependencies must not churn

Example:

```ts
// stable identity required by <ThirdPartyLib /> subscription
const onEvent = useCallback((evt) => { ... }, []);
```

2. **Measured performance issue**

- expensive computation proven by profiling
- large list/table with expensive child renders
- passing props into `memo()`’d child where identity churn causes rerenders

Example:

```ts
// expensive compute confirmed in profiler
const expensive = useMemo(() => heavyCompute(input), [input]);
```

3. **Public component contract**

- a shared component documents that it expects stable callbacks/props for correctness/perf

### When memoization is discouraged

Avoid `useMemo` / `useCallback` in these cases:

- “just in case” usage
- trivial derived values (`a + b`, small `map/filter`, string concatenation)
- handlers that are only used inline and not part of dependency logic
- memoizing values that change every render anyway (unstable deps)

### Lint rules (baseline enforcement)

We treat memoization as an “escape hatch”. ESLint should warn when it appears so it gets reviewed intentionally.

### Allowed patterns that reduce the need for memoization

Prefer these approaches before adding memo hooks:

- **Split components**: move heavy subtrees into their own components
- **Lift stable values**: move constants outside the component
- **Use `useRef` for mutable instance state** (not for UI state)
- **Prefer server components** (in Next.js App Router) to reduce client rerenders
- **Stabilize props at source** rather than memoizing everywhere downstream

### Documentation requirement

If memoization is used:

- add a short comment if the reason isn’t immediately obvious
- link to a profiling note or issue when applicable
