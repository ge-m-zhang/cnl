import type { Meta, StoryObj } from '@storybook/react';
import { Popper } from './Popper';

const meta = {
  title: 'components/popper',
  component: Popper,
  tags: ['autodocs'],
} satisfies Meta<typeof Popper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Popper',
  },
};
