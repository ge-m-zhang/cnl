import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'components/alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an alert message',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success alert',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'This is an error alert',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This is a warning alert',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an info alert',
  },
};
