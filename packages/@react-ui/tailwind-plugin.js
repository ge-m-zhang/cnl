const plugin = require('tailwindcss/plugin');
const path = require('path');

/**
 * Tailwind plugin for @gmzh/react-ui.
 *
 * Automatically scans @gmzh/react-ui components for Tailwind classes and adds them to your build.
 * Logging is environment-aware: detailed logs in development, silent in production.
 *
 * @param {Object} [options] - Plugin options.
 * @param {string|string[]} [options.contentPath] - Optional: Override the default content path(s) to scan for Tailwind classes.
 */
module.exports = plugin.withOptions(
  // Plugin function - adds utilities/components
  function (options = {}) {
    return function ({ addUtilities, addComponents, theme }) {
      // Only add utilities that components specifically need
      // Don't override existing Tailwind utilities
      addComponents({
        // Custom component styles if needed
        '.react-ui-focus-ring': {
          '&:focus-visible': {
            outline: '2px solid theme("colors.blue.500")',
            outlineOffset: '2px',
          },
        },
      });
    };
  },
  // Plugin config - extends user's existing config
  function (options = {}) {
    // Allow user to override content path via options.contentPath
    let contentPaths;
    if (options.contentPath) {
      contentPaths = Array.isArray(options.contentPath)
        ? options.contentPath
        : [options.contentPath];
    } else {
      try {
        // Detect if we're running inside @gmzh/react-ui itself to avoid self-resolution
        let contentBasePath;
        if (
          __dirname.includes(`${path.sep}@gmzh${path.sep}react-ui`) ||
          path.basename(path.resolve(__dirname, '..')) === 'react-ui'
        ) {
          // Use local package path
          contentBasePath = path.resolve(__dirname, '..');
        } else {
          // Use resolved package path
          contentBasePath = path.dirname(require.resolve('@gmzh/react-ui'));
        }
        const contentPath = path.join(contentBasePath, '**/*.{js,ts,jsx,tsx}');

        // Log resolved path for debugging (in development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[react-ui/tailwind-plugin] Scanning components at: ${contentPath}`);
        }

        contentPaths = [contentPath];
      } catch (e) {
        // @gmzh/react-ui not found; skip adding its content path
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[react-ui/tailwind-plugin] Warning: @gmzh/react-ui not found. Skipping content path. ' +
              'To fix, install @gmzh/react-ui (npm install @gmzh/react-ui). ' +
              'Error code: REACT_UI_TAILWIND_PLUGIN_MISSING_PACKAGE',
          );
        }
        contentPaths = [];
      }
    }
    return {
      // IMPORTANT: Use content, not replace
      content: contentPaths,
      theme: {
        // Use 'extend' to avoid conflicts
        extend: {
          // Only add what's truly needed for components
          animation: {
            'spin-slow': 'spin 2s linear infinite',
          },
          // Don't override core theme values unless absolutely necessary
        },
      },
    };
  },
);
