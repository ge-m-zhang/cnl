import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from './Portal';

const meta = {
  title: 'components/portal',
  component: Portal,
  tags: ['autodocs'],
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Portal',
  },
};
