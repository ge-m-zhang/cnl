import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

export default defineConfig({
  plugins: [
    react({
      include: '**/src/**/*.{js,jsx,ts,tsx}',
    }),
  ],
  resolve: {
    alias: {
      '@react-ui': path.resolve(__dirname, '../../packages/@react-ui/src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /packages/],
    },
  },
  server: {
    fs: {
      allow: ['..', '../../packages'],
    },
  },
});
