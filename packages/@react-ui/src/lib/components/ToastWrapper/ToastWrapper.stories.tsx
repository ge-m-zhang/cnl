import type { Meta, StoryObj } from '@storybook/react';
import { ToastWrapper } from './ToastWrapper';

const meta = {
  title: 'components/toastwrapper',
  component: ToastWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof ToastWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ToastWrapper',
  },
};
