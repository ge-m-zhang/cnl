// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-import': {
      resolve: (id) => {
        if (id.startsWith('@react-ui/')) {
          return id.replace('@react-ui/', '../../packages/@react-ui/src/');
        }
        return id;
      },
    },
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
