import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr()],
    server: {
      host: env.VITE_SERVER_HOST || 'localhost',
      port: env.VITE_SERVER_PORT || 5173,
    },
  };
});

// References:
// -- https://vitejs.dev/guide/env-and-mode.html#env-variables
// -- https://vitejs.dev/guide/env-and-mode.html#env-files
// -- https://vitejs.dev/config/#using-environment-variables-in-config
// -- https://vitejs.dev/config/shared-options.html#envprefix
// -- https://vitejs.dev/config/shared-options.html#define: NB Bug: this will cause linting error
// -- https://dev.to/whchi/how-to-use-processenv-in-vite-ho9
