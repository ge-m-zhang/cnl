import type { Meta, StoryObj } from '@storybook/react';
import { TextField, EmailField, PasswordField, NumberField, SearchField } from './TextField';
import { useState } from 'react';

const meta = {
  title: 'components/textfield',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Small</label>
        <TextField size="small" placeholder="Small input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
        <TextField size="medium" placeholder="Medium input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Large</label>
        <TextField size="large" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default</label>
        <TextField placeholder="Default state" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Success</label>
        <TextField
          state="success"
          placeholder="Success state"
          helperText="Great! Your input looks good."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Error</label>
        <TextField placeholder="Error state" error="This field is required" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Disabled</label>
        <TextField disabled placeholder="Disabled input" value="This input is disabled" />
      </div>
    </div>
  ),
};

export const WithSymbols: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Symbol</label>
        <TextField symbol="$" placeholder="0.00" type="number" helperText="Enter amount in USD" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Symbol</label>
        <TextField
          symbol={
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          }
          placeholder="Enter username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emoji Symbol</label>
        <TextField symbol="📧" type="email" placeholder="your@email.com" />
      </div>
    </div>
  ),
};

export const WithLabelsAndHelpers: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <TextField
        label="First Name"
        placeholder="Enter your first name"
        helperText="This field is required"
      />
      <TextField
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        error="Please enter a valid email address"
      />
      <TextField
        label="Phone Number"
        hiddenLabel
        type="tel"
        placeholder="Hidden label example"
        helperText="The label is hidden but still accessible"
      />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
        <TextField type="text" placeholder="Text input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <TextField type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <TextField type="password" placeholder="Enter password" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
        <TextField type="number" placeholder="123" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <TextField type="search" placeholder="Search..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tel</label>
        <TextField type="tel" placeholder="+1 (555) 123-4567" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
        <TextField type="url" placeholder="https://example.com" />
      </div>
    </div>
  ),
};

export const ConvenienceComponents: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Field</label>
        <EmailField placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password Field</label>
        <PasswordField placeholder="Enter password" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number Field</label>
        <NumberField placeholder="Enter number" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Search Field</label>
        <SearchField placeholder="Search..." />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full">
      <TextField
        fullWidth
        label="Full width input"
        placeholder="This input takes the full width of its container"
        helperText="Resize the container to see the effect"
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-6 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Controlled Input</label>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
            helperText={`You typed: "${value}"`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password with Toggle
          </label>
          <div className="relative">
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      website: '',
      amount: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    const handleInputChange =
      (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: '',
          }));
        }
      };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            placeholder="John"
            error={errors.firstName}
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            placeholder="Doe"
          />
        </div>

        <EmailField
          label="Email"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="john@example.com"
          error={errors.email}
        />

        <TextField
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          placeholder="+1 (555) 123-4567"
          symbol="📞"
        />

        <PasswordField
          label="Password"
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter password"
          error={errors.password}
          helperText="Must be at least 6 characters"
        />

        <TextField
          label="Website"
          type="url"
          value={formData.website}
          onChange={handleInputChange('website')}
          placeholder="https://example.com"
          symbol="🌐"
        />

        <NumberField
          label="Amount"
          value={formData.amount}
          onChange={handleInputChange('amount')}
          placeholder="0.00"
          symbol="$"
          helperText="Enter amount in USD"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Form
        </button>
      </form>
    );
  },
};
