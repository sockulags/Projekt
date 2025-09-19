# Project Monorepo

Learning-focused TypeScript monorepo with Next.js apps and reusable packages.

## Quick Start

1. Install pnpm if not installed: `npm i -g pnpm`
2. Install deps: `pnpm install`
3. Start dev (once apps exist): `pnpm dev`

## Scripts

- `pnpm dev` – Run dev across apps
- `pnpm build` – Build all packages/apps respecting graph
- `pnpm lint` – Lint all
- `pnpm typecheck` – Type check all
- `pnpm test` – Run tests
- `pnpm format` – Prettier write

## Structure

See `PROJECT_STRUCTURE.md` for detailed layout & conventions.

## Storybook

- **Live demo**: [https://sockulags.github.io/Projekt/](https://sockulags.github.io/Projekt/)
- Automatically updated on every push to `main`
- Local development: `pnpm --filter @internal/ui storybook`

## Adding Content

- New package: create under `packages/` with `package.json` + `src/index.ts`
- New app: scaffold under `apps/` (e.g., Next.js) and align tsconfig paths

## License

MIT (adjust if needed)
