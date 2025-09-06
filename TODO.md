# Project TODO

Guideline: Keep highest priority items at the top of Active. When an item is completed and verified, move it with a brief note to the Done Log (append at bottom) and remove from Active. Keep entries concise.

## Git Workflow Notes

- Branch naming: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`, `docs/<scope>`, `refactor/<scope>`, `test/<scope>`, `ci/<scope>`
- Scope examples: `ui-button`, `storybook`, `release`, `lint`, `deps`, `theming`, `a11y`
- Commit convention (Conventional Commits): `type(scope): brief imperative summary`
  - Types: feat, fix, chore, docs, refactor, test, ci, perf, build
  - Use `!` for breaking: `feat(ui-text)!: adjust prop names`
- Body: wrap at ~72 chars, explain motivation + what changed (why > how)
- Footer: reference issues: `Closes #12` ; breaking change details: `BREAKING CHANGE: ...`
- PR checklist (add to description):
  - [ ] Lint & tests pass locally
  - [ ] Changeset added if user-facing package change
  - [ ] Storybook updated (if UI change)
  - [ ] Docs / README touched (if needed)
  - [ ] Accessibility considerations noted
  - [ ] No increase in bundle size without justification
- Rebase strategy: Prefer squash merges for features; keep `main` linear
- Avoid committing build artifacts (`dist`)—enforced by .gitignore
- Run `pnpm test --filter=@internal/ui` for focused component test before commit when touching UI
- Use draft PR early for feedback; mark ready when CI green

## Active (Prioritized)

1. Docs & Storybook
   - (DONE) Generate Typedoc in CI artifact upload
   - (DONE) Storybook preview artifact via workflow
   - (DONE) Persistent Storybook via GitHub Pages
2. Theming foundation
   - Introduce CSS variable tokens (colors, spacing, radii, shadow)
   - Dark mode toggle story
3. Testing enhancements
   - Add axe accessibility checks for core components
   - Add coverage thresholds (>=80% lines/ui)
4. Visual regression (optional, later)
   - Integrate Chromatic or Loki for UI package
5. Performance & CI
   - Enable Turborepo remote cache (Vercel) and add cache key annotation
   - Add size-limit / bundle analyzer for UI and Next.js app
6. Maintenance automation
   - Renovate or Dependabot config
   - Nightly CI job: typecheck + test
7. Design system expansion
   - New components: Badge, Avatar, Stack, Input, TextArea

## Backlog (Unprioritized)

- Runtime prop validation (dev warnings)
- Monorepo project references (composite) for faster incremental builds
- Storybook docs: contribution guidelines page
- Security scanning workflow (CodeQL)
- Add CHANGELOG auto-commit step post release

## Done Log

- Initial monorepo scaffold
- UI Button + tests + Storybook
- Tailwind & PostCSS integration
- Added Text & Card components + stories + tests
- Added Changesets, Typedoc config, CI workflow cleanup
- Removed root tsconfig.json (simplified config) & adjusted ESLint
- Release pipeline (changeset entry + release workflow)
- Code quality cleanup (imports normalized, Text polymorphic typing, added package .eslintrc, dist ignored)
- Pre-commit workflow (husky + lint-staged hook running eslint --fix & prettier)
- Docs: CI Typedoc artifact + Storybook preview workflow
- Storybook Pages deploy (auto on main)
