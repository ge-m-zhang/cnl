import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

export default defineConfig({
  plugins: [
    react({
      include: '**/src/**/*.{js,jsx,ts,tsx}',
    }),
  ],
  // No need for alias since using npm package @gmzh/react-ui
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
