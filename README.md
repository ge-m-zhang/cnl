# React Nest Template

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ge-m-zhang/ReactNest-template)

A modern full-stack template built with React, NestJS, and TypeScript, featuring a robust component library and development tools.

## 🚀 Features

- **Frontend**

  - React with TypeScript
  - Vite for fast development and building
  - TanStack Query for data fetching
  - Recoil for state management
  - React Router for routing
  - Tailwind CSS for styling
  - Custom UI component library (@react-ui)

- **Backend**

  - NestJS with TypeScript
  - RESTful API architecture
  - Google OAuth integration
  - JWT authentication
  - Optional integrations (OpenAI, AWS)

- **Development Tools**
  - PNPM for package management
  - Turborepo for monorepo management
  - ESLint and Prettier for code formatting
  - Vitest for testing
  - Storybook for component documentation

## 📦 Project Structure

```
├── apps/
│   ├── frontend/          # React frontend application
│   ├── backend/           # NestJS backend application
│   └── storybook-react-ui # Storybook for UI components
├── packages/
│   └── @react-ui/         # Shared UI component library
└── pnpm-workspace.yaml    # PNPM workspace configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM (v8 or higher)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm start

# Build all packages and applications
pnpm build
```

### Development

```bash
# Start frontend development server
pnpm --filter frontend dev

# Start backend development server
pnpm --filter backend dev

# Start Storybook for component library
pnpm --filter storybook-react-ui dev

# Build and watch the UI library during development
pnpm --filter @react-ui dev
```

### UI Component Development

```bash
# Explore components interactively
pnpm --filter storybook-react-ui dev
# Visit http://localhost:6006

# Build the component library
pnpm --filter @react-ui build

# Test component library
pnpm --filter @react-ui test
```

## 🔧 Backend Setup

The backend service requires some configuration before it can be used. Please refer to the [Backend README](./apps/backend/README.md) for detailed setup instructions, including:

- Required environment variables
- Google OAuth setup
- JWT configuration
- Optional feature setup (OpenAI, AWS)

## 🎨 UI Component Library

The project includes a custom UI component library (@react-ui) with **13 fully implemented components** built for modern web applications. All components feature TypeScript support, accessibility compliance, and comprehensive Storybook documentation.

### 🧩 Implemented Components

**📋 Form Controls** - Complete form solution

- **Button** - Multiple variants (contained, outlined, text), sizes, colors, icon support, and loading states
- **TextField** - Text inputs with validation, symbols, helper text, and multiple input types
- **TextArea** - Multi-line inputs with auto-resize, character counting, and flexible resizing
- **Checkbox** - Customizable checkboxes with indeterminate state support and custom icons
- **Switch** - Modern toggle switches with multiple sizes and colors

**📱 Layout & Structure** - Flexible layout system

- **Box** - Universal container with spacing, colors, layout utilities, borders, and shadows
- **Flex** - Powerful flexbox component with direction, gap, alignment, wrapping, and responsive controls

**🗂️ Navigation** - User-friendly navigation

- **Tabs** - Tabbed interfaces with 3 variants (outlined, underlined, pills) and compound component pattern

**💬 Feedback & Information** - Rich user interaction

- **Alert** - Contextual feedback messages (success, error, warning, info) with proper styling
- **Badge** - Status indicators and color-coded labels
- **Tooltip** - Contextual information with 12 placement options, multiple triggers, and variants
- **Spinner** - Loading indicators with multiple sizes, colors, and text positioning

**📝 Typography** - Rich text system

- **Typography** - Comprehensive text component with heading levels (h1-h6), variants, alignment, and styling options

**⚙️ System**

- **ThemeProvider** - Dark/light mode support with system preference detection

### 🚧 Future Components (Planned)

Additional components are planned for future releases, including Card, Modal, Table, Select, Radio, and more navigation components.

### ✨ Key Features

- **🎯 Accessibility First** - Full ARIA support, keyboard navigation, screen reader optimization
- **🎨 Highly Customizable** - Multiple variants, sizes, colors, and states for every component
- **📚 Interactive Documentation** - Comprehensive Storybook with live examples for all implemented components
- **🔒 Type Safe** - Full TypeScript definitions with IntelliSense support
- **🚀 Performance Optimized** - Tree-shakable imports, minimal bundle impact
- **📱 Responsive Ready** - Mobile-first design with responsive utilities
- **✅ Production Ready** - All listed components are fully implemented and tested

## 🔧 Configuration

### Frontend Configuration

- **Vite**: Configured for React and TypeScript
- **Tailwind**: Custom theme configuration with dark mode support
- **TypeScript**: Strict mode enabled with path aliases

### Backend Configuration

- **NestJS**: RESTful API setup with TypeORM
- **Authentication**: Google OAuth integration
- **Environment**: Configurable through .env files
- **Optional Features**: OpenAI and AWS integrations can be enabled or removed as needed

## 🧪 Testing

```bash
# Run frontend tests
pnpm --filter frontend test

# Run backend tests
pnpm --filter backend test
```

## 🐳 Docker Support

Both frontend and backend include Docker configurations for containerized deployment;
See Dockfile in each folder for details.

## 📝 License

MIT

## 🔄 Template Evolution

This template is designed to evolve with your projects and provide a consistent foundation for all your React/Nest applications.

### Component Development Workflow

- **Create project** from this template for new applications
- **Develop components** in the context of real features and use cases
- **Sync stable components** back to the template repository
- **Existing projects** receive updates via pnpm link or package versioning

### Component Library Integration

```bash
# Link local UI library to existing projects
cd /path/to/existing-project
pnpm link /path/to/ReactNest-template/packages/@react-ui

# Or install from published package
pnpm add @gmzh/react-ui

# Or add as GitHub dependency
pnpm add github:yourusername/ReactNest-template#main --filter @react-ui
```

### Using Components in Your App

```tsx
import {
  Button,
  TextField,
  TextArea,
  Alert,
  Tooltip,
  Switch,
  Flex,
  Box,
  Typography,
  Badge,
} from '@gmzh/react-ui';

function MyComponent() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <Box padding="lg" background="white" rounded="lg" shadow="md">
      <Flex direction="column" gap="lg">
        <Flex justify="between" align="center">
          <Typography variant="h3">User Settings</Typography>
          <Badge variant="success">Premium</Badge>
        </Flex>

        <Flex direction="column" gap="md">
          <TextField
            label="Display Name"
            placeholder="Enter your name"
            fullWidth
            helperText="This will be visible to other users"
          />

          <TextArea
            label="Bio"
            placeholder="Tell us about yourself..."
            rows={3}
            maxLength={200}
            showCharacterCount
            fullWidth
          />

          <Flex gap="sm" align="center">
            <Switch defaultChecked />
            <Typography variant="body2">Email notifications</Typography>
          </Flex>

          {showSuccess && <Alert variant="success">Settings saved successfully!</Alert>}

          <Flex gap="sm" justify="end">
            <Button variant="outlined">Cancel</Button>
            <Tooltip content="Save and apply changes">
              <Button variant="contained" color="primary" onClick={() => setShowSuccess(true)}>
                Save Changes
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
```

## 🚀 Next Steps

When using this template for real-world applications, consider implementing:

### CI/CD Pipeline

This template is prepared for CI/CD implementation. For production applications:

- Add GitHub Actions workflows for automated testing and deployment
- Implement quality gates with test coverage requirements
- Set up staging and production environments
- Configure automated Docker image building and publishing
