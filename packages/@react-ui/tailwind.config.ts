import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Your existing theme from globals.css
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        'blue-main': 'var(--color-blue-main)',
        'shade-main': 'var(--color-shade-main)',
        'teal-main': 'var(--color-teal-main)',
        // Add other custom colors from your globals.css
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
};

export default config;
