import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr()],
    server: {
      port: VITE_PORT || 5173,
      proxy: {
        // NB CORS is in use, ignore anything related to proxy
        // // 1. Test proxy config with fake API, visit `http://localhost:${VITE_PORT || 5173}/(api/)posts/1` to confirm it's working;
        // // if CSR is in control, disable `<RouterProvider>` in `main.jsx`, put `<Footer1>` b/w `<React.StrictMode>`,
        // // then visit `http://localhost:${VITE_PORT || 5173}/api/posts/1` to confirm it's working
        // '/api': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
        // // 2. Proxy config for Express server, visit `http://localhost:${VITE_PORT || 5173}/api/members/all` to confirm it's working
        // '/api': {
        //   target: `http://localhost:${PORT || 3000}`,
        //   changeOrigin: true,
        //   secure: false,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
        // // 3. Proxy config (string shorthand) for Express server, visit `http://localhost:${VITE_PORT || 5173}/members/all` to confirm it's working
        // '/': `http://localhost:${PORT || 3000}`,
      },
    },
  };
});
