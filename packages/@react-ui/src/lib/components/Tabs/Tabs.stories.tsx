import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

const meta = {
  title: 'components/tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'demo',
  },
  render: () => (
    <Tabs.Context defaultValue="tab1" variant="outlined">
      <Tabs.List>
        <Tabs value="tab1">Tab 1</Tabs>
        <Tabs value="tab2">Tab 2</Tabs>
        <Tabs value="tab3">Tab 3</Tabs>
      </Tabs.List>
      <Tabs.Content>
        <Tabs.Panel value="tab1">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Content for Tab 1</h3>
            <p className="text-gray-600">
              This is the content for the first tab. You can put any content here.
            </p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Content for Tab 2</h3>
            <p className="text-gray-600">
              This is the content for the second tab. Each tab can have completely different
              content.
            </p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="tab3">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Content for Tab 3</h3>
            <p className="text-gray-600">
              This is the content for the third tab. The content is dynamically shown based on the
              active tab.
            </p>
          </div>
        </Tabs.Panel>
      </Tabs.Content>
    </Tabs.Context>
  ),
};

export const Variants: Story = {
  args: {
    value: 'demo',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Outlined Tabs</h3>
        <Tabs.Context defaultValue="outlined1" variant="outlined">
          <Tabs.List>
            <Tabs value="outlined1">Design</Tabs>
            <Tabs value="outlined2">Development</Tabs>
            <Tabs value="outlined3">Testing</Tabs>
          </Tabs.List>
          <Tabs.Content>
            <Tabs.Panel value="outlined1">
              <div className="p-4 bg-gray-50 rounded-b-lg">
                <p>Design phase content with wireframes and mockups.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="outlined2">
              <div className="p-4 bg-gray-50 rounded-b-lg">
                <p>Development phase with coding and implementation.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="outlined3">
              <div className="p-4 bg-gray-50 rounded-b-lg">
                <p>Testing phase with quality assurance and bug fixes.</p>
              </div>
            </Tabs.Panel>
          </Tabs.Content>
        </Tabs.Context>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Underlined Tabs</h3>
        <Tabs.Context defaultValue="underlined1" variant="underlined">
          <Tabs.List>
            <Tabs value="underlined1">Overview</Tabs>
            <Tabs value="underlined2">Features</Tabs>
            <Tabs value="underlined3">Pricing</Tabs>
          </Tabs.List>
          <Tabs.Content>
            <Tabs.Panel value="underlined1">
              <div className="p-4">
                <p>Product overview and general information.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="underlined2">
              <div className="p-4">
                <p>Detailed feature list and capabilities.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="underlined3">
              <div className="p-4">
                <p>Pricing plans and subscription options.</p>
              </div>
            </Tabs.Panel>
          </Tabs.Content>
        </Tabs.Context>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pills Tabs</h3>
        <Tabs.Context defaultValue="pills1" variant="pills">
          <Tabs.List>
            <Tabs value="pills1">Profile</Tabs>
            <Tabs value="pills2">Settings</Tabs>
            <Tabs value="pills3">Notifications</Tabs>
          </Tabs.List>
          <Tabs.Content>
            <Tabs.Panel value="pills1">
              <div className="p-4">
                <p>User profile information and personal details.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="pills2">
              <div className="p-4">
                <p>Application settings and preferences.</p>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="pills3">
              <div className="p-4">
                <p>Notification settings and alerts management.</p>
              </div>
            </Tabs.Panel>
          </Tabs.Content>
        </Tabs.Context>
      </div>
    </div>
  ),
};
