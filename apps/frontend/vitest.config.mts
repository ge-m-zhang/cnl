/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import path from 'path';

export default defineConfig(async () => {
  const config = await viteConfig;
  return mergeConfig(
    config,
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/config/jest/setupTests.ts'],
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: [
            'node_modules/',
            'src/config/jest/setupTests.ts',
            'src/vite-env.d.ts',
            'src/**/*.d.ts',
            'src/index.tsx',
          ],
          thresholds: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },
        },
        alias: {
          '@': path.resolve('./src'),
          '@frontend': path.resolve('./src'),
          '@react-ui': path.resolve('../../packages/@react-ui/src'),
        },
      },
    }),
  );
});
