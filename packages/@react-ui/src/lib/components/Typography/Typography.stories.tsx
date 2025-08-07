// packages/@react-ui/src/lib/components/Typography/Typography.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'components/typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is the default body text with improved line height and tracking',
  },
};

export const Heading: Story = {
  args: {
    variant: 'h1',
    children: 'Main Heading with Responsive Scaling',
  },
};

export const Bold: Story = {
  args: {
    variant: 'body1',
    bold: true,
    children: 'Bold text example with improved line height',
  },
};

export const Hyperlink: Story = {
  args: {
    variant: 'body1',
    hyperlink: true,
    children: 'Hover to see underline effect',
  },
};

// All variants in one story with responsive preview
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-4">
        <Typography variant="h1">H1 - Main Heading (Responsive: text-4xl → text-5xl)</Typography>
        <Typography variant="h2">H2 - Section Heading (Responsive: text-3xl → text-4xl)</Typography>
        <Typography variant="h3">
          H3 - Subsection Heading (Responsive: text-2xl → text-3xl)
        </Typography>
        <Typography variant="h4">H4 - Sub-subsection (Responsive: text-xl → text-2xl)</Typography>
        <Typography variant="h5">H5 - Minor Heading (Responsive: text-lg → text-xl)</Typography>
        <Typography variant="h6">
          H6 - Smallest Heading (Responsive: text-base → text-lg)
        </Typography>
      </div>

      <div className="space-y-4">
        <Typography variant="subtitle1">Subtitle 1 (Responsive: text-base → text-lg)</Typography>
        <Typography variant="subtitle2">Subtitle 2 (Responsive: text-sm → text-base)</Typography>
        <Typography variant="body1">
          Body 1 - Primary body text with improved line height (1.6)
        </Typography>
        <Typography variant="body2">
          Body 2 - Secondary body text with improved line height (1.6)
        </Typography>
        <Typography variant="caption">
          Caption - Smallest text with optimized line height (1.5)
        </Typography>
      </div>
    </div>
  ),
};

// Text features with improved examples
export const TextFeatures: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-2">
        <Typography variant="body1">Normal text with improved line height</Typography>
        <Typography variant="body1" bold>
          Bold text with improved line height
        </Typography>
        <Typography variant="body1" hyperlink>
          Hyperlink text with hover effect
        </Typography>
        <Typography variant="body1" strikethrough>
          Strikethrough text example
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="body1" align="center">
          Centered text with improved line height
        </Typography>
        <Typography variant="body1" align="right">
          Right-aligned text example
        </Typography>
        <Typography variant="body1" align="justify">
          Justified text example with improved line height for better readability. This demonstrates
          how the text flows with the new line height settings.
        </Typography>
      </div>

      <div className="w-48">
        <Typography variant="body1" noWrap>
          Very long text that gets truncated with ellipsis
        </Typography>
      </div>
    </div>
  ),
};

// New story to showcase responsive behavior
export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Typography variant="h1">Responsive Heading 1</Typography>
        <Typography variant="body1">
          This heading scales from text-4xl on mobile to text-5xl on larger screens. Notice the
          improved line height and letter spacing for better readability.
        </Typography>
      </div>

      <div className="space-y-4">
        <Typography variant="h2">Responsive Heading 2</Typography>
        <Typography variant="body1">
          This heading scales from text-3xl to text-4xl. The line height and tracking are optimized
          for each size to maintain readability.
        </Typography>
      </div>

      <div className="space-y-4">
        <Typography variant="subtitle1">Responsive Subtitle</Typography>
        <Typography variant="body1">
          Subtitles scale from text-base to text-lg, with appropriate line height adjustments for
          optimal readability at each size.
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
