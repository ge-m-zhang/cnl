import type { Meta, StoryObj } from '@storybook/react';
import { TextArea, CommentTextArea, MessageTextArea, CodeTextArea } from './TextArea';
import { useState } from 'react';

const meta = {
  title: 'components/textarea',
  component: TextArea,
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
    resizable: {
      control: { type: 'select' },
      options: [true, false, 'vertical', 'horizontal'],
      description: 'Controls how the textarea can be resized by dragging',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes textarea take full width of its container',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showCharacterCount: {
      control: { type: 'boolean' },
    },
    autoResize: {
      control: { type: 'boolean' },
      description: 'Automatically grows height based on content',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

// ⚡ SIMPLE RESIZE TEST - Clean examples that should work
export const SimpleResizeTest: Story = {
  name: '⚡ Simple Resize Test',
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div className="bg-green-100 border border-green-300 rounded p-4">
        <h3 className="font-bold text-green-800 mb-2">⚡ Testing Both Directions</h3>
        <p className="text-green-700 text-sm">
          These TextAreas should resize both vertically AND horizontally. Look for the resize handle
          in the bottom-right corner and drag it!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-3 text-center">🔵 Both Directions</h4>
          <TextArea
            resizable={true}
            placeholder={`Drag me BOTH ways! ↕️↔️

Try dragging the corner handle in any direction.`}
            rows={4}
            className="w-full border-2 border-blue-400"
          />
          <p className="text-xs text-blue-600 mt-2 text-center">resizable={true}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-center">🟢 Vertical Only</h4>
          <TextArea
            resizable="vertical"
            placeholder="I only resize UP and DOWN ↕️

Horizontal dragging should be disabled."
            rows={4}
            className="w-full border-2 border-green-400"
          />
          <p className="text-xs text-green-600 mt-2 text-center">resizable="vertical"</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-center">🟠 Horizontal Only</h4>
          <TextArea
            resizable="horizontal"
            placeholder="I only resize LEFT and RIGHT ↔️

Vertical dragging should be disabled."
            rows={4}
            className="w-full border-2 border-orange-400"
          />
          <p className="text-xs text-orange-600 mt-2 text-center">resizable="horizontal"</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 How to Test:</h4>
        <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
          <li>
            Look for the <strong>resize handle</strong> (diagonal lines) in the bottom-right corner
            of each textarea
          </li>
          <li>Click and drag the handle to resize</li>
          <li>
            The <strong>blue textarea</strong> should resize in <strong>any direction</strong>
          </li>
          <li>
            The <strong>green textarea</strong> should only resize <strong>vertically</strong>
          </li>
          <li>
            The <strong>orange textarea</strong> should only resize <strong>horizontally</strong>
          </li>
        </ol>
      </div>
    </div>
  ),
};

// 🎯 DRAG & RESIZE DEMO - Shows all resize options
export const DragAndResize: Story = {
  name: '🎯 Drag & Resize Options',
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Resize Options</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ↕️ Vertical Only (Default)
          </label>
          <TextArea
            resizable="vertical"
            placeholder="Drag the bottom-right corner vertically"
            rows={3}
            className="border-2 border-blue-200"
          />
          <p className="text-xs text-gray-500 mt-1">Most common - drag up/down only</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">↔️ Horizontal Only</label>
          <TextArea
            resizable="horizontal"
            placeholder="Drag the bottom-right corner horizontally"
            rows={3}
            className="border-2 border-green-200"
          />
          <p className="text-xs text-gray-500 mt-1">Drag left/right only</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">More Options</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ↕️↔️ Both Directions
          </label>
          <TextArea
            resizable={true}
            placeholder="Drag both ways! Maximum flexibility"
            rows={3}
            className="border-2 border-purple-200"
          />
          <p className="text-xs text-gray-500 mt-1">Drag any direction</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🚫 Not Resizable</label>
          <TextArea
            resizable={false}
            placeholder="Fixed size - no dragging allowed"
            rows={3}
            className="border-2 border-red-200"
          />
          <p className="text-xs text-gray-500 mt-1">Fixed size, no resize handle</p>
        </div>
      </div>
    </div>
  ),
};

// 📏 CONTAINER FLEXIBILITY DEMO
export const ContainerFlexibility: Story = {
  name: '📏 Container Flexibility',
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <h3 className="text-lg font-semibold mb-4">Full Width Examples</h3>

        {/* Container width demo */}
        <div className="space-y-6">
          <div className="w-full max-w-md border-2 border-dashed border-blue-300 p-4">
            <p className="text-sm text-blue-600 mb-2">Container: max-width: 28rem</p>
            <TextArea
              fullWidth
              placeholder="I take the full width of this container"
              helperText="fullWidth={true}"
            />
          </div>

          <div className="w-full max-w-2xl border-2 border-dashed border-green-300 p-4">
            <p className="text-sm text-green-600 mb-2">Container: max-width: 42rem</p>
            <TextArea
              fullWidth
              placeholder="I adapt to this wider container"
              helperText="fullWidth={true} - Same component, different container"
            />
          </div>

          <div className="w-80 border-2 border-dashed border-purple-300 p-4">
            <p className="text-sm text-purple-600 mb-2">Container: width: 20rem</p>
            <TextArea
              fullWidth
              placeholder="I fit this narrow container"
              helperText="fullWidth={true} - Responsive to any container"
            />
          </div>
        </div>
      </div>

      {/* Auto resize demo */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Auto-Resize (Height grows with content)</h3>
        <div className="max-w-md">
          <TextArea
            autoResize
            fullWidth
            placeholder="Start typing and watch me grow taller automatically...

Keep typing more content and I'll expand!

Perfect for chat messages, comments, or any growing text content."
            helperText="autoResize={true} + fullWidth={true}"
            className="border-2 border-orange-200"
          />
        </div>
      </div>
    </div>
  ),
};

// 🔄 COMBINATION DEMO - Best of both worlds
export const CombinedFeatures: Story = {
  name: '🔄 Combined Features',
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <h3 className="text-lg font-semibold">Flexible + Draggable TextAreas</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Width + Both Directions Resizable
          </label>
          <TextArea
            fullWidth
            resizable={true}
            placeholder="I take full width AND you can drag me both ways!"
            helperText="Perfect for forms where users need maximum flexibility"
            className="border-2 border-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto-Resize + Full Width + Character Count
          </label>
          <TextArea
            autoResize
            fullWidth
            showCharacterCount
            maxLength={500}
            placeholder="I grow automatically AND show character count. Perfect for social media posts or comments!"
            helperText="Smart sizing with user feedback"
            className="border-2 border-green-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code Editor Style (Full Width + Horizontal Resize)
          </label>
          <CodeTextArea
            fullWidth
            resizable="horizontal"
            placeholder="// Perfect for code editing
function example() {
  console.log('I can be resized horizontally');
  return 'Full width with horizontal drag';
}"
            className="border-2 border-purple-200"
          />
        </div>
      </div>
    </div>
  ),
};

// 📱 RESPONSIVE CONTAINER DEMO
export const ResponsiveContainer: Story = {
  name: '📱 Responsive Container',
  render: () => {
    const [containerSize, setContainerSize] = useState<'small' | 'medium' | 'large'>('medium');

    const containerSizes = {
      small: 'max-w-xs',
      medium: 'max-w-md',
      large: 'max-w-2xl',
    };

    return (
      <div className="space-y-6 w-full">
        <div>
          <h3 className="text-lg font-semibold mb-4">Container Size Demo</h3>
          <div className="flex gap-2 mb-4">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setContainerSize(size)}
                className={`px-3 py-1 text-sm rounded ${
                  containerSize === size
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`border-2 border-dashed border-blue-300 p-4 transition-all ${containerSizes[containerSize]}`}
        >
          <p className="text-sm text-blue-600 mb-2">
            Current container: {containerSize} ({containerSizes[containerSize]})
          </p>
          <TextArea
            fullWidth
            resizable="vertical"
            placeholder={`I'm ${containerSize} and flexible! Change the container size above to see me adapt.`}
            helperText="fullWidth makes me responsive to any container size"
            rows={4}
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <h4 className="font-semibold text-yellow-800">💡 Pro Tip:</h4>
          <p className="text-yellow-700 text-sm">
            Use <code className="bg-yellow-100 px-1 rounded">fullWidth</code> to make TextArea
            responsive to its container. Perfect for responsive layouts, forms, and dynamic content
            areas!
          </p>
        </div>
      </div>
    );
  },
};
