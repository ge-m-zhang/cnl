import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@gmzh/react-ui': path.resolve(__dirname, '../../frontend/node_modules/@gmzh/react-ui'),
        },
      },
    });
  },
};

export default config;
