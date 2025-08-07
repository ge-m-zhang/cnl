// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as UserConfig['plugins'],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@frontend': path.resolve('./src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
