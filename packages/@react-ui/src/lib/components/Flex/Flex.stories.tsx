import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'components/flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Flex',
  },
};

export const Centered: Story = {
  args: {
    direction: 'column',
    align: 'center',
    justify: 'center',
    gap: 'lg',
    className: 'h-screen w-screen bg-gray-50',
    children: (
      <>
        <div className="text-4xl font-bold">Centered Content</div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Button</button>
      </>
    ),
  },
};

export const RowWithGap: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'center',
    gap: 'md',
    className: 'p-4 bg-gray-50',
    children: (
      <>
        <div className="p-2 bg-blue-100">Item 1</div>
        <div className="p-2 bg-blue-100">Item 2</div>
        <div className="p-2 bg-blue-100">Item 3</div>
      </>
    ),
  },
};
