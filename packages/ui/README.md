# @internal/ui

Component library (React + Tailwind). Built with tsup, consumed by internal Next.js apps.

## Usage

```tsx
import '@internal/ui'; // global styles side-effect
import { Button } from '@internal/ui';
```

## Scripts

- build: tsup bundle
- storybook: component docs playground (dev server)
- build-storybook: static build for deployment

## Storybook

### Development

Run locally: `pnpm --filter @internal/ui storybook`

### Production

- **Live Storybook**: [https://sockulags.github.io/Projekt/](https://sockulags.github.io/Projekt/)
- **Auto-deployment**: Automatically deploys to GitHub Pages on every push to `main` branch
- **Workflow**: `.github/workflows/storybook-pages.yml`

## Notes

Global CSS imported inside package entry. Do not import global.css directly unless you need raw styles.
