// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@gmzh/react-ui/tailwind-plugin')],
  theme: {
    extend: {
      // Frontend-specific extensions
    },
  },
};

export default config;

/*
why using actual file system paths is better than module aliases in Tailwind's content configuration:
Build-time Resolution: Tailwind needs to scan and process files at build time to generate the CSS. 
When using module aliases like @react-ui, Tailwind might not be able to resolve these paths correctly during the build process because:
Module aliases are typically resolved by bundlers (eg Vite) at runtime
Tailwind's content scanner runs before the bundler's module resolution
Direct File Access: Tailwind needs direct access to the source files to:
Extract class names
Generate the appropriate CSS
Watch for changes during development
 */
