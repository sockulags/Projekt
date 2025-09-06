import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from './Text';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  args: { children: <Text>Card content</Text> },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
export const Subtle: Story = { args: { variant: 'subtle' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const WithCustom: Story = {
  args: {
    children: (
      <div>
        <Text weight="semibold">Custom Layout</Text>
        <Text size="sm">Some description.</Text>
      </div>
    ),
  },
};
