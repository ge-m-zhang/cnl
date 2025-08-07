import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'components/checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>;

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
        <Checkbox size="small" defaultChecked />
        <span className="text-sm text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox size="medium" defaultChecked />
        <span className="text-sm text-gray-600">Medium</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Checkbox color="primary" defaultChecked />
        <span className="text-sm text-gray-600">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox color="secondary" defaultChecked />
        <span className="text-sm text-gray-600">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox color="success" defaultChecked />
        <span className="text-sm text-gray-600">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox color="danger" defaultChecked />
        <span className="text-sm text-gray-600">Danger</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox color="warning" defaultChecked />
        <span className="text-sm text-gray-600">Warning</span>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <Checkbox />
        <span className="text-sm text-gray-600">Unchecked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox defaultChecked />
        <span className="text-sm text-gray-600">Checked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox indeterminate />
        <span className="text-sm text-gray-600">Indeterminate</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox disabled />
        <span className="text-sm text-gray-600">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox disabled defaultChecked />
        <span className="text-sm text-gray-600">Disabled Checked</span>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox defaultChecked />
        <span className="text-sm font-medium text-gray-700">
          I agree to the terms and conditions
        </span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox color="success" defaultChecked />
        <span className="text-sm font-medium text-gray-700">Subscribe to newsletter</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <Checkbox color="danger" />
        <span className="text-sm font-medium text-gray-700">Enable debug mode</span>
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <div className="text-center">
          <p className="text-sm text-gray-600">Checkbox is {checked ? 'checked' : 'unchecked'}</p>
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

export const CustomIcon: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Checkbox
          defaultChecked
          icon={
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <span className="text-sm text-gray-600">Custom Icon</span>
      </div>
    </div>
  ),
};

export const IndeterminateExample: Story = {
  render: () => {
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    });

    const checkedCount = Object.values(items).filter(Boolean).length;
    const isAllChecked = checkedCount === Object.keys(items).length;
    const isIndeterminate = checkedCount > 0 && !isAllChecked;

    const handleAllChange = (checked: boolean) => {
      setItems({
        item1: checked,
        item2: checked,
        item3: checked,
      });
    };

    const handleItemChange =
      (key: keyof typeof items) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems((prev) => ({
          ...prev,
          [key]: e.target.checked,
        }));
      };

    return (
      <div className="space-y-3 p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={(e) => handleAllChange(e.target.checked)}
          />
          <span className="font-medium text-gray-700">Select All</span>
        </label>
        <div className="ml-6 space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={items.item1} onChange={handleItemChange('item1')} />
            <span className="text-gray-700">Item 1</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={items.item2} onChange={handleItemChange('item2')} />
            <span className="text-gray-700">Item 2</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={items.item3} onChange={handleItemChange('item3')} />
            <span className="text-gray-700">Item 3</span>
          </label>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Status:</strong> {checkedCount} of {Object.keys(items).length} selected
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
      marketing: false,
      notifications: true,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    const handleCheckboxChange =
      (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.checked,
        }));
        // Clear error when user checks the required field
        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: '',
          }));
        }
      };

    return (
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <div className="space-y-4">
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  color={errors.terms ? 'danger' : 'primary'}
                  checked={formData.terms}
                  onChange={handleCheckboxChange('terms')}
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    I agree to the terms and conditions
                  </span>
                  {errors.terms && <div className="text-red-600 text-xs mt-1">{errors.terms}</div>}
                </div>
              </label>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                color="success"
                checked={formData.newsletter}
                onChange={handleCheckboxChange('newsletter')}
              />
              <span className="text-sm text-gray-700">Subscribe to newsletter</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                color="warning"
                checked={formData.marketing}
                onChange={handleCheckboxChange('marketing')}
              />
              <span className="text-sm text-gray-700">Receive marketing emails</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                color="secondary"
                checked={formData.notifications}
                onChange={handleCheckboxChange('notifications')}
              />
              <span className="text-sm text-gray-700">Enable push notifications</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Preferences
          </button>

          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <strong>Current selections:</strong>
            <pre className="mt-2 text-xs">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </form>
      </div>
    );
  },
};
