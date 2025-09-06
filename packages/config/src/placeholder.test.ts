import { describe, it, expect } from 'vitest';

import { config } from './index';

describe('config placeholder', () => {
  it('loads config', () => {
    expect(config.APP_ENV).toBeDefined();
  });
});
