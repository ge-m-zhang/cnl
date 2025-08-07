module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:vitest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    // removing the Node environment from the frontend ESLint config to prevent accidental use of Node-specific globals in browser code
    // node: true,

    'vitest-globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },

    'import/resolver': {
      typescript: {},
    },
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'vitest', 'import'],
};
