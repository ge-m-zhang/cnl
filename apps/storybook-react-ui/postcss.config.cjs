// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-import': {
      // No need for custom resolution since using npm package @gmzh/react-ui
    },
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
