# Monorepo Project Structure

A learning-oriented monorepo for side projects (web apps, APIs, reusable UI + utilities) with clear reuse patterns and minimal friction. Opinionated defaults; evolve as you learn.

## High-Level Goals
- Fast iteration + easy reuse of UI + utilities
- Consistent TypeScript strictness everywhere
- Simple deployment path (Vercel for Next.js apps initially)
- Room to grow (mobile app, docs site, design system)
- Low ceremony: only add complexity when it delivers value

## Stack Choices (Initial)
| Concern | Choice | Rationale |
|---------|--------|-----------|
| Package manager | **pnpm** | Efficient dedupe + workspaces; best ergonomics for monorepos. (Can switch if needed.) |
| Orchestration | **Turborepo** | Caching + pipeline control + familiar scripts |
| Frontend apps | **Next.js (latest)** | Learning goal + fullstack flexibility (API routes, edge) |
| API (alt) | Start w/ Next.js route handlers; later can add Fastify/Nest if needed | Avoid early fragmentation |
| Libraries build | **tsup** (ESBuild) | Fast ESM/CJS + d.ts emission w/ minimal config |
| Transpile | SWC (Next.js) / ESBuild (libs) | Defaults of chosen tools |
| Testing | **Vitest** (unit) + optional **Playwright** (e2e) later | Fast + TS-native |
| Linting | ESLint (@typescript-eslint + import/order) | Standard ecosystem |
| Formatting | Prettier | De facto standard |
| Types | TS strict + project references | Speed + isolation |
| CI | GitHub Actions | Free + integrates w/ caching |
| Deployment | Vercel (Next apps) | Zero-config to start |
| Env config | dotenv (.env.*) + lightweight runtime validation (zod) | Safe + explicit |
| Versioning | Semantic Versioning (independent; no publish yet) | Expandable to package publishing later |
| Docs | Next.js docs app OR Docusaurus later | Start simple |
| UI Docs | Storybook (optional, later) | Add when UI grows |

## Repository Layout (Proposed)
```
/ (repo root)
  package.json            # Workspace + root scripts
  pnpm-workspace.yaml     # Workspace package globs
  turbo.json              # Turborepo pipeline
  tsconfig.base.json      # Shared compilerOptions + path aliases
  .editorconfig
  .eslintignore
  .eslintrc.cjs           # Root lint config wiring shared config package
  .prettierrc.json
  .gitignore
  .env.example            # Document required vars (non-secret)
  PROJECT_STRUCTURE.md    # This file
  README.md               # Overview + quickstart

  apps/
    web-main/             # Primary Next.js app
      next.config.mjs
      package.json
      src/
        pages/ or app/
        components/
        lib/
        styles/
    web-docs/ (optional)  # Documentation site (Next.js) later
    api-playground/       # (Optional) API experimentation app or route handlers

  packages/
    ui/                   # Reusable UI components (React + TS)
      src/
      index.ts
      tsconfig.json
    utils/                # Pure utility functions
      src/
      index.ts
    config/               # Runtime config loader + env schema (zod)
    types/                # Global/shared .d.ts or type exports
    eslint-config/        # Internal sharable ESLint preset
      index.js
    tsconfig/             # Central tsconfig variants (base, lib, next-app, etc.)
    scripts/              # Reusable node CLI scripts (build helpers, codegen)

  tools/                  # One-off automation, migrations
  .github/
    workflows/            # CI pipelines

  docs/                   # Non-generated markdown docs (architecture, decisions)
```

### Naming Conventions
- Apps: `web-<name>`, `api-<name>` if a standalone backend emerges
- Packages: single word where possible (`ui`, `utils`, `config`, `types`)
- Internal import prefixes (path aliases):
  - `@ui/*` -> `packages/ui/src/*`
  - `@utils/*` -> `packages/utils/src/*`
  - `@config` -> runtime config module
  - `@types` -> shared types

Configured in `tsconfig.base.json` + mirrored for Next.js via `next.config.mjs` or `tsconfig.json` references.

## TypeScript Setup
- Strict mode everywhere (`strict: true`)
- Use project references for build speed (libs reference base; apps reference libs)
- Library build via `tsup --dts` to emit types; no manual `.d.ts` rollups needed initially. (A rollup is a single flattened declaration file; not needed unless publishing to npm with consumption issues.)

## Turborepo Pipelines (Draft)
`turbo.json` sample tasks:
```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", "!.turbo/**"] },
    "dev": { "cache": false },
    "lint": {},
    "typecheck": { "dependsOn": ["^typecheck"] },
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] },
    "format": { "cache": false }
  }
}
```
Run examples:
- `pnpm dev` – parallel dev across apps
- `pnpm build` – builds with dependency graph
- `pnpm lint` / `pnpm test` / `pnpm typecheck`

## Root Scripts (Concept)
```jsonc
// package.json (excerpt)
{
  "private": true,
  "packageManager": "pnpm@<latest-lts>",
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "format": "prettier --write ."
  }
}
```

## ESLint / Prettier Strategy
- Root `eslint-config` package exports opinionated config
- Features: `@typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-unused-imports`
- Import ordering: enforce groups (builtin, external, internal, relative)
- Prefer named exports (avoid default unless ergonomically necessary)
- Prettier handles formatting; eslint only for logic/smells

### Suggested ESLint Rules Highlights
- `no-explicit-any` (warn) while learning—allow escape hatch
- `@typescript-eslint/consistent-type-imports`: enforce `import type`
- `import/order`: alphabetize + newline between groups
- `unused-imports/no-unused-imports`: error cleanup

## Testing Baseline
- Vitest for libraries + Next.js (with jsdom for React components)
- Optional Playwright added when e2e is needed (separate pipeline `e2e`)
- Directory structure: `src/<feature>/__tests__/` or `tests/` at package root (choose one convention and stick)

## Environment Variables
- `.env.example` documents non-secret keys (e.g., `NEXT_PUBLIC_API_URL=`)
- Runtime validation via `zod` inside `packages/config`
- Pattern:
```ts
import { config } from '@config';
config.APP_ENV; // typed
```

## Adding a New Package
1. Create `packages/<name>/package.json`
2. Add `tsconfig.json` extending base
3. Add entry `src/index.ts`
4. (Optional) Add build script if not pure TS (e.g., bundling) – `tsup src/index.ts --dts --format esm,cjs`
5. Reference via alias if common (`@name/*`)

## Adding a New App
1. Scaffold under `apps/web-<name>` using `create-next-app --ts`
2. Adjust `tsconfig.json` to extend root base and include path aliases
3. Add minimal `README.md` inside the app for purpose
4. Register any required env vars in root `.env.example`

## Docs & Storybook (Future)
- When `ui` grows: add `packages/ui/.storybook` + `storybook` script
- `web-docs` can serve architectural and usage docs (or migrate to Docusaurus later)

## Release Artifacts
- Libraries: build outputs under `dist/` (ESM + CJS + types) even if not published yet (helps local consumption)
- Apps: Next.js build outputs (`.next/`) – cached by Turborepo; Vercel handles deployment
- Consider SBOM / dependency snapshots later (e.g., `cyclonedx-npm`)

## CI (GitHub Actions) Outline
Workflows (future `/ .github/workflows`):
- `ci.yml`: install → cache → lint → typecheck → test → build (affected only via `turbo run ... --filter`)
- `preview-deploy.yml`: On PR to main for Next.js apps (Vercel auto integration)
- Add `pnpm/action-setup` + `actions/cache` keyed on lockfile + turbo cache

## Commit Messages
- Clear, imperative: "add button component" / "fix utils trim bug"
- (Optional future) Adopt Conventional Commits if automated changelog desired

## Code Style Suggestions (24)
- Function components: `PascalCase`; hooks: `useX`
- Filenames: React components `ComponentName.tsx`; utilities `camelCase.ts`
- Avoid default exports in shared packages
- Use type-only imports (`import type { X } from '...'`)
- Prefer `readonly` for stable arrays/tuples
- Prefer discriminated unions over enums unless required

## Developer Experience (26 Explained)
"Developer UX" here means reducing friction:
- Single bootstrap: `pnpm install` sets everything up
- Standard task verbs: `dev`, `build`, `test`, `lint`, `typecheck`, `format`
- Consistent terminal feedback with Turborepo prefixes per package
- Path aliases eliminate long relative imports
- Centralized config packages (`eslint-config`, `tsconfig`, `config`) mean editing in one place
- Optional task graph visualization (`npx turbo run build --graph`)
- Future additions: VSCode `extensions.json` recommend (ESLint, Prettier, TS IntelliSense), workspace settings enabling format-on-save

## Future Growth Considerations
| Area | Trigger | Action |
|------|---------|--------|
| Mobile (React Native/Expo) | When starting mobile app | Add `apps/mobile/` + shared UI abstraction layer if feasible |
| Auth & Security | When first external app requires login | Introduce `auth` package (JWT / OAuth wrapper) |
| Observability | When deploying backend beyond Vercel | Add `telemetry` package (OpenTelemetry setup) |
| Publishing | When a library is reused externally | Add `changeset` + publish steps |
| Design System | When > ~10 components | Introduce tokens package + Storybook + visual regression |

## Minimal Initial Action Plan
1. Initialize repo with root config files
2. Add `packages/tsconfig`, `packages/eslint-config`, `packages/utils`, `packages/ui`
3. Scaffold `apps/web-main` (Next.js)
4. Implement Turborepo pipeline + root scripts
5. Add Vitest + example test in `utils`

---
Feel free to request generation of the initial files next, or adjust anything above.
