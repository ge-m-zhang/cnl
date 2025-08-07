import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerWithText, ButtonSpinner } from './Spinner';

const meta = {
  title: 'components/spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'white'],
    },
    emptyColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'white', 'transparent'],
    },
    label: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Loading...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="small" />
        <span className="text-sm text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="medium" />
        <span className="text-sm text-gray-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="large" />
        <span className="text-sm text-gray-600">Large</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" />
        <span className="text-sm text-gray-600">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="secondary" />
        <span className="text-sm text-gray-600">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-sm text-gray-600">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="danger" />
        <span className="text-sm text-gray-600">Danger</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span className="text-sm text-gray-600">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded">
        <Spinner color="white" />
        <span className="text-sm text-white">White</span>
      </div>
    </div>
  ),
};

export const WithEmptyColor: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" emptyColor="primary" />
        <span className="text-sm text-gray-600">With Empty Color</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="success" emptyColor="success" />
        <span className="text-sm text-gray-600">Success Empty</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="danger" emptyColor="danger" />
        <span className="text-sm text-gray-600">Danger Empty</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" emptyColor="transparent" />
        <span className="text-sm text-gray-600">Transparent Empty</span>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <SpinnerWithText text="Loading..." position="right" />
      <SpinnerWithText text="Please wait..." position="left" color="success" />
      <SpinnerWithText text="Processing..." position="top" color="warning" />
      <SpinnerWithText text="Saving changes..." position="bottom" color="danger" />
    </div>
  ),
};

export const ButtonSpinners: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled
      >
        <ButtonSpinner />
        Loading...
      </button>
      <button
        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        disabled
      >
        <ButtonSpinner color="white" />
        Saving...
      </button>
      <button
        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        disabled
      >
        <ButtonSpinner color="white" />
        Deleting...
      </button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Card Loading */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <Spinner size="large" color="primary" />
            <p className="mt-4 text-sm text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>

      {/* Inline Loading */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">User Profile</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Name:</span>
            <span className="flex items-center gap-2">
              <Spinner size="small" />
              Loading...
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Email:</span>
            <span>user@example.com</span>
          </div>
        </div>
      </div>

      {/* Form Loading */}
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Submit Form</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled
          />
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            disabled
          >
            <Spinner size="small" color="white" className="mr-2" />
            Submitting...
          </button>
        </div>
      </div>

      {/* Page Loading */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center justify-center h-32">
          <Spinner size="large" color="primary" emptyColor="primary" />
          <p className="mt-4 text-sm text-gray-600">Loading page...</p>
        </div>
      </div>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Spinner label="Fetching user data" />
      <Spinner label="Processing payment" color="success" />
      <Spinner label="Uploading files" color="warning" size="large" />
      <Spinner label="Deleting items" color="danger" size="small" />
    </div>
  ),
};
