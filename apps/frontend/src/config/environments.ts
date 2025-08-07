type AppEnv = 'local' | 'development' | 'qa' | 'production';

declare global {
  interface Window {
    /** window.env will be injected through `env.js` at runtime */
    env: typeof processEnv;
  }
}

export type Environment = typeof environment;

/**
 *  the keys in `processEnv` are in sync with the keys in `env.js` and `entrypoint.sh`
 */
const processEnv = {
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV as AppEnv,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  // APP_VERSION: process.env.REACT_APP_VERSION,
} as const;

const getEnvVars = () => {
  function determineEnv() {
    const isTestEnv = import.meta.env.MODE === 'test'; // for vitest tests
    const isLocalEnv = processEnv.VITE_APP_ENV === 'local';

    /** Local and legacy CI builds loads env vars from `import.meta.env`  */
    if (isTestEnv || isLocalEnv) {
      return processEnv;
    }
    return window.env;
  }

  const env = determineEnv();

  return {
    app: {
      appEnv: env.VITE_APP_ENV,
      port: 3000,
      backendUrl: env.VITE_BACKEND_URL ?? 'http://localhost:4000',
      // ？app version
    },
  };
};

export const environment = getEnvVars();
