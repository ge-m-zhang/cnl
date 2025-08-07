import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'components/radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Radio',
  },
};
