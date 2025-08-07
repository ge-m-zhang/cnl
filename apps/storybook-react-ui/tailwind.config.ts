import type { Config } from 'tailwindcss';

import baseConfig from '../../packages/@react-ui/src/tailwind.config.base';

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/@react-ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // Add Storybook-specific theme extensions if needed
    },
  },
};

export default config;

/*
why using actual file system paths ..
see details in apps/frontend/tailwind.config.ts
 */
