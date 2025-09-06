# @internal/ui

Component library (React + Tailwind). Built with tsup, consumed by internal Next.js apps.

## Usage

```tsx
import '@internal/ui'; // global styles side-effect
import { Button } from '@internal/ui';
```

## Scripts

- build: tsup bundle
- storybook: component docs playground

## Notes

Global CSS imported inside package entry. Do not import global.css directly unless you need raw styles.
