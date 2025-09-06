# Project TODO

Guideline: Keep highest priority items at the top of Active. When an item is completed and verified, move it with a brief note to the Done Log (append at bottom) and remove from Active. Keep entries concise.

## Active (Prioritized)

1. Code quality cleanup
   - Auto-fix import/order + consistent-type-import warnings in UI stories/tests
   - Replace `any` in `Text` component with generic element inference
   - Add ESLint ignore for `dist/` outputs
2. Pre-commit workflow
   - Add husky + lint-staged (eslint --fix, prettier, affected tests)
3. Docs & Storybook
   - Generate Typedoc in CI artifact upload
   - Deploy Storybook preview per PR (GitHub Pages or Vercel)
4. Theming foundation
   - Introduce CSS variable tokens (colors, spacing, radii, shadow)
   - Dark mode toggle story
5. Testing enhancements
   - Add axe accessibility checks for core components
   - Add coverage thresholds (>=80% lines/ui)
6. Visual regression (optional, later)
   - Integrate Chromatic or Loki for UI package
7. Performance & CI
   - Enable Turborepo remote cache (Vercel) and add cache key annotation
   - Add size-limit / bundle analyzer for UI and Next.js app
8. Maintenance automation
   - Renovate or Dependabot config
   - Nightly CI job: typecheck + test
9. Design system expansion
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
