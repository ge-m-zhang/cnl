# Storybook React UI

A Storybook application for showcasing and developing React UI components from the `@gmzh/react-ui` package.

## Overview

This Storybook instance serves as a development environment and documentation for the React UI component library. It provides an interactive playground for developing, testing, and documenting components.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start Storybook in development mode
pnpm dev
```

### Build

```bash
# Build Storybook for production
pnpm build
```

## Project Structure

- `src/` - Source files for the Storybook application
- `.storybook/` - Storybook configuration files
- `src/Component.tsx` - Main component showcase
- `src/App.tsx` - Root application component

## Features

- Component development environment
- Interactive component documentation
- Theme support with dark/light mode
- Tailwind CSS integration

## Contributing

When adding new components:

1. Create component files using the `@gmzh/react-ui` components
2. Add corresponding stories in the component directory
3. Update the component showcase in `src/Component.tsx` if needed
