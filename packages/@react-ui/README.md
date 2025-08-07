# @gmzh/react-ui

A comprehensive React UI component library built with TypeScript and Tailwind CSS, featuring accessible components.

## Installation & Setup

```bash
npm install @gmzh/react-ui
```

### Option 1: Zero Configuration (Recommended for beginners)

Perfect if you don't have Tailwind CSS or want the simplest setup:

```tsx
// Import the complete design system
import '@gmzh/react-ui/styles'; //Import CSS once at the Entry point or Root App
import { Button, TextField } from '@gmzh/react-ui';

function App() {
  return (
    <div>
      <Button variant="contained">Get Started</Button>
      <TextField label="Enter your name" />
    </div>
  );
}
```

**That's it!** You get everything:

- Complete Tailwind CSS utilities
- Custom color palette with CSS variables
- Inter font family
- Dark mode support
- All component styles

### Option 2: Tailwind Integration (For existing Tailwind projects)

If you already have Tailwind CSS configured, add our plugin for enhanced integration:

```js
// tailwind.config.js (add the plugin to your existing config)
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // your existing content
  plugins: [
    require('@gmzh/react-ui/tailwind-plugin'), // Add this line
  ],
  // Your existing theme, colors, etc. remain unchanged
};
```

```tsx
// Import the design system (includes additional colors and utilities)
import '@gmzh/react-ui/styles';
import { Button, TextField } from '@gmzh/react-ui';

function App() {
  return (
    <div className="p-6 bg-gray-100">
      {/* Your Tailwind classes work seamlessly */}
      <Button variant="contained" color="blue">
        Get Started
      </Button>
      <TextField label="Enter your name" />
      {/* Plus access to extended color palette */}
      <div className="bg-blue-main text-white p-4">Custom UI colors</div>
    </div>
  );
}
```

**Benefits**: Your existing Tailwind setup + our extended color system and utilities.

## Usage Examples

### Basic Components

```tsx
import { Button, Alert, TextField, Switch } from '@gmzh/react-ui';

function MyApp() {
  return (
    <div className="p-6 space-y-4">
      <Button variant="contained" color="blue">
        Primary Button
      </Button>

      <TextField label="Email" type="email" placeholder="Enter your email" />

      <Switch defaultChecked />

      <Alert variant="success">Operation completed successfully!</Alert>
    </div>
  );
}
```

### Form Example

```tsx
import { TextField, TextArea, Checkbox, Button } from '@gmzh/react-ui';

function ContactForm() {
  return (
    <form className="space-y-4">
      <TextField label="Name" required />
      <TextArea label="Message" rows={4} />
      <Checkbox>I agree to the terms</Checkbox>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
```

### Layout Components

```tsx
import { Box, Flex, Typography } from '@gmzh/react-ui';

function Dashboard() {
  return (
    <Box padding="lg" background="white" rounded="md">
      <Flex direction="column" gap="md">
        <Typography variant="h2">Dashboard</Typography>
        <Typography variant="body1">Welcome back!</Typography>
      </Flex>
    </Box>
  );
}
```

## Available Components

### Form Controls

- `Button` - Multiple variants and colors
- `TextField` - Text inputs with validation
- `TextArea` - Multi-line text inputs
- `Checkbox` - Checkboxes with custom styling
- `Switch` - Toggle switches

### Layout & Typography

- `Box` - Flexible container component
- `Flex` - Flexbox layout component
- `Typography` - Text component with variants

### Feedback

- `Alert` - Status messages (success, error, warning, info)
- `Badge` - Status indicators
- `Spinner` - Loading indicators
- `Tooltip` - Contextual information

### Navigation

- `Tabs` - Tabbed interfaces

### System

- `ThemeProvider` - Dark/light mode support

## Dark Mode

```tsx
import { ThemeProvider } from '@gmzh/react-ui';

function App() {
  return <ThemeProvider defaultTheme="system">{/* Your components */}</ThemeProvider>;
}
```

## Component Props

All components support:

- **Variants**: Different visual styles (`contained`, `outlined`, `text`)
- **Sizes**: Consistent sizing (`xs`, `sm`, `md`, `lg`, `xl`)
- **Colors**: Full palette (`blue`, `teal`, `green`, `red`, `gold`, etc.)
- **States**: Error, disabled, loading states

## TypeScript Support

Full TypeScript support with autocomplete and type checking:

```tsx
import type { ButtonProps, AlertProps } from '@gmzh/react-ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Development

```bash
# Build the package
pnpm build

# Development mode
pnpm dev

# Storybook documentation
pnpm --filter storybook-react-ui dev
```

## License

MIT License - see LICENSE file for details.
