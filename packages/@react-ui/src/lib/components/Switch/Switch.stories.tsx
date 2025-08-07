import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta = {
  title: 'components/switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: true },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Switch size="small" defaultChecked />
        <span className="text-sm text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch size="medium" defaultChecked />
        <span className="text-sm text-gray-600">Medium</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Switch color="primary" defaultChecked />
        <span className="text-sm text-gray-600">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch color="secondary" defaultChecked />
        <span className="text-sm text-gray-600">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch color="success" defaultChecked />
        <span className="text-sm text-gray-600">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch color="danger" defaultChecked />
        <span className="text-sm text-gray-600">Danger</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch color="warning" defaultChecked />
        <span className="text-sm text-gray-600">Warning</span>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <Switch />
        <span className="text-sm text-gray-600">Unchecked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch defaultChecked />
        <span className="text-sm text-gray-600">Checked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch disabled />
        <span className="text-sm text-gray-600">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch disabled defaultChecked />
        <span className="text-sm text-gray-600">Disabled Checked</span>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <div className="text-center">
          <p className="text-sm text-gray-600">Switch is {checked ? 'ON' : 'OFF'}</p>
          <button
            className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setChecked(!checked)}
          >
            Toggle Programmatically
          </button>
        </div>
      </div>
    );
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch defaultChecked />
        <span className="text-sm font-medium text-gray-700">Enable notifications</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch color="success" defaultChecked />
        <span className="text-sm font-medium text-gray-700">Auto-save changes</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch color="danger" />
        <span className="text-sm font-medium text-gray-700">Debug mode</span>
      </label>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [switches, setSwitches] = useState({
      switch1: false,
      switch2: true,
      switch3: false,
    });

    const handleSwitchChange =
      (key: keyof typeof switches) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSwitches((prev) => ({
          ...prev,
          [key]: e.target.checked,
        }));
      };

    return (
      <div className="p-4">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Dark Mode</span>
              <Switch
                checked={switches.switch1}
                onChange={handleSwitchChange('switch1')}
                color="primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Notifications</span>
              <Switch
                checked={switches.switch2}
                onChange={handleSwitchChange('switch2')}
                color="success"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Analytics</span>
              <Switch
                checked={switches.switch3}
                onChange={handleSwitchChange('switch3')}
                color="warning"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded text-sm">
            <strong>Current state:</strong>
            <pre className="mt-2 text-xs">{JSON.stringify(switches, null, 2)}</pre>
          </div>
        </div>
      </div>
    );
  },
};
