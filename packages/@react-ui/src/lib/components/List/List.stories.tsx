import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta = {
  title: 'components/list',
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'List',
  },
};
