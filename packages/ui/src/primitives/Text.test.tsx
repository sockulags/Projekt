import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies size and weight classes', () => {
    render(
      <Text size="lg" weight="bold">
        Big
      </Text>,
    );
    const el = screen.getByText('Big');
    expect(el.className).toMatch(/text-lg/);
    expect(el.className).toMatch(/font-bold/);
  });
});
