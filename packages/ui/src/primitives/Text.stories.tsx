import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  args: { children: 'Sample text', size: 'md' },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Small: Story = { args: { size: 'sm', children: 'Small text' } };
export const Medium: Story = { args: { size: 'md', children: 'Medium text' } };
export const Large: Story = { args: { size: 'lg', children: 'Large text' } };
export const WeightVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};
