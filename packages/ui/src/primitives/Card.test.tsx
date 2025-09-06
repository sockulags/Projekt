import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { Text } from './Text';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <Text>Content</Text>
      </Card>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Card variant="outline">Outline</Card>);
    const el = screen.getByText('Outline');
    expect(el.className).toMatch(/border/);
  });
});
