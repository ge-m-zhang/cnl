import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta = {
  title: 'components/box',
  component: Box,
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Box',
  },
};

export const WithBackground: Story = {
  args: {
    background: 'primary',
    padding: 'md',
    rounded: 'lg',
    children: 'Primary Background Box',
  },
};

export const WithSuccessBackground: Story = {
  args: {
    background: 'success',
    padding: 'md',
    rounded: 'lg',
    children: 'Success Background Box',
  },
};

export const WithShadow: Story = {
  args: {
    background: 'white',
    padding: 'md',
    rounded: 'lg',
    shadow: 'lg',
    children: 'Box with Shadow',
  },
};

export const ResponsivePadding: Story = {
  args: {
    background: 'gray',
    padding: 'sm',
    rounded: 'md',
    children: 'Box with Responsive Padding',
  },
};

export const WithBorder: Story = {
  args: {
    background: 'white',
    padding: 'md',
    rounded: 'lg',
    border: 'thin',
    children: 'Box with Border',
  },
};

export const FullWidth: Story = {
  args: {
    background: 'gray',
    padding: 'md',
    width: 'full',
    children: 'Full Width Box',
  },
};

export const WithCustomElement: Story = {
  args: {
    as: 'button',
    background: 'primary',
    padding: 'md',
    rounded: 'lg',
    children: 'Box as Button',
  },
};

export const WithPosition: Story = {
  args: {
    background: 'primary',
    padding: 'md',
    rounded: 'lg',
    position: 'relative',
    className: 'top-4 left-4',
    children: 'Positioned Box',
  },
};
