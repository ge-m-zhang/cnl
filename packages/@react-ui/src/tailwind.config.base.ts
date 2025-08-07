import type { Config } from 'tailwindcss';

const baseConfig = {
  content: [], // Will be overridden by extending configs
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Semantic colors using CSS variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2E8DED', // main
          600: '#1264B0', // dark
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          // Semantic naming
          main: 'var(--color-blue-main)',
          dark: 'var(--color-blue-dark)',
          light: 'var(--color-blue-light)',
          lighter: 'var(--color-blue-lighter)',
        },
        shade: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#3F3FA1', // main
          700: '#3730a3',
          800: '#312e81',
          900: '#1E0F63', // dark
          950: '#1e1b4b',
          // Semantic naming
          main: 'var(--color-shade-main)',
          dark: 'var(--color-shade-dark)',
          light: 'var(--color-shade-light)',
          lighter: 'var(--color-shade-lighter)',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00CFB5', // main
          600: '#009985', // dark
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
          main: 'var(--color-teal-main)',
          dark: 'var(--color-teal-dark)',
          light: 'var(--color-teal-light)',
          lighter: 'var(--color-teal-lighter)',
        },
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#9948DA', // main
          600: '#7a27be', // dark
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          main: 'var(--color-violet-main)',
          dark: 'var(--color-violet-dark)',
          light: 'var(--color-violet-light)',
          lighter: 'var(--color-violet-lighter)',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#5734C8', // main
          600: '#341f7a', // dark
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
          main: 'var(--color-purple-main)',
          dark: 'var(--color-purple-dark)',
          light: 'var(--color-purple-light)',
          lighter: 'var(--color-purple-lighter)',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#4AA810', // main
          600: '#33750b', // dark
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          main: 'var(--color-green-main)',
          dark: 'var(--color-green-dark)',
          light: 'var(--color-green-light)',
          lighter: 'var(--color-green-lighter)',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#FB4955', // main
          600: '#DC323D', // dark
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
          main: 'var(--color-red-main)',
          dark: 'var(--color-red-dark)',
          light: 'var(--color-red-light)',
          lighter: 'var(--color-red-lighter)',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FBBA14', // main
          600: '#E59C0E', // dark
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
          main: 'var(--color-gold-main)',
          dark: 'var(--color-gold-dark)',
          light: 'var(--color-gold-light)',
          lighter: 'var(--color-gold-lighter)',
        },
        gray: {
          50: '#F2F2FA', // lighter
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#D8D8EC', // light
          400: '#9ca3af',
          500: '#5A5C81', // main
          600: '#343557', // dark
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
          main: 'var(--color-gray-main)',
          dark: 'var(--color-gray-dark)',
          light: 'var(--color-gray-light)',
          lighter: 'var(--color-gray-lighter)',
        },
      },
      spacing: {
        '5.5': '1.375rem', // 22px for large button padding
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.125', // heading line height
        normal: '1.5', // body line height
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem', // 4px
        DEFAULT: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        full: '9999px',
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'inner-dark': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        xxl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default baseConfig;
