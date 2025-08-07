import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'components/badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Badge',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Badge',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Badge',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Badge',
  },
};
