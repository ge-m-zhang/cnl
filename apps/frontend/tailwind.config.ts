// apps/frontend/tailwind.config.ts
import baseConfig from '../../packages/@react-ui/src/tailwind.config.base';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,

  /*
Replaced with ../../packages/@react-ui/src/...
This ensures Tailwind can directly access and scan the component files during build time
This is more reliable because:
It uses the actual file system path that Tailwind can access directly
It doesn't depend on module resolution which happens later in the build process
It ensures all Tailwind classes in shared components are properly detected and included in the final CSS
*/
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/@react-ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
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
