import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, LightTooltip, DarkTooltip, LabelTooltip } from './Tooltip';

const meta = {
  title: 'components/tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark', 'label'],
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'focus', 'click', 'manual'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover me</button>,
  },
};

export const Variants: Story = {
  args: {
    content: 'Demo tooltip',
    children: <div>Demo</div>,
  },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Dark tooltip" variant="dark">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Dark</button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Light</button>
      </Tooltip>
      <Tooltip content="Label tooltip" variant="label">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Label</button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  args: {
    content: 'Demo tooltip',
    children: <div>Demo</div>,
  },
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-16">
      <Tooltip content="Top Start" placement="top-start" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Top Start</button>
      </Tooltip>
      <Tooltip content="Top" placement="top" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Top</button>
      </Tooltip>
      <Tooltip content="Top End" placement="top-end" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Top End</button>
      </Tooltip>

      <Tooltip content="Left" placement="left" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Left</button>
      </Tooltip>
      <div></div>
      <Tooltip content="Right" placement="right" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Right</button>
      </Tooltip>

      <Tooltip content="Bottom Start" placement="bottom-start" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Bottom Start</button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Bottom</button>
      </Tooltip>
      <Tooltip content="Bottom End" placement="bottom-end" arrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">Bottom End</button>
      </Tooltip>
    </div>
  ),
};

export const WithArrow: Story = {
  args: {
    content: 'Tooltip with arrow',
    arrow: true,
    children: <button className="px-4 py-2 bg-green-500 text-white rounded">With Arrow</button>,
  },
};

export const Triggers: Story = {
  args: {
    content: 'Demo tooltip',
    children: <div>Demo</div>,
  },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Hover to show" trigger="hover">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover</button>
      </Tooltip>
      <Tooltip content="Focus to show" trigger="focus">
        <button className="px-4 py-2 bg-green-500 text-white rounded">Focus</button>
      </Tooltip>
      <Tooltip content="Click to toggle" trigger="click">
        <button className="px-4 py-2 bg-purple-500 text-white rounded">Click</button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a delay',
    delay: 1000,
    hideDelay: 500,
    children: (
      <button className="px-4 py-2 bg-orange-500 text-white rounded">Delayed Tooltip</button>
    ),
  },
};

export const ConvenienceComponents: Story = {
  args: {
    content: 'Demo tooltip',
    children: <div>Demo</div>,
  },
  render: () => (
    <div className="flex gap-4">
      <LightTooltip content="Light tooltip shortcut">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Light Tooltip</button>
      </LightTooltip>
      <DarkTooltip content="Dark tooltip shortcut">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Dark Tooltip</button>
      </DarkTooltip>
      <LabelTooltip content="Label tooltip shortcut">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">Label Tooltip</button>
      </LabelTooltip>
    </div>
  ),
};
