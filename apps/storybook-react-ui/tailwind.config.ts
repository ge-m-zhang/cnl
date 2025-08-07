import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './.storybook/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('../frontend/node_modules/@gmzh/react-ui/tailwind-plugin')],
  theme: {
    extend: {
      // Add Storybook-specific theme extensions if needed
    },
  },
};

export default config;

/*
why using actual file system paths ..
see details in apps/frontend/tailwind.config.ts
 */
