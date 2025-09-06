import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

const setupFile = resolve(__dirname, 'vitest.setup.ts');

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [setupFile],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/placeholder.test.ts',
    ],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
