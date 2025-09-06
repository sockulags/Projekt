import { describe, it, expect } from 'vitest';

import { add } from './add';

describe('add', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
