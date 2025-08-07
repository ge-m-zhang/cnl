import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta = {
  title: 'components/drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Drawer',
  },
};
