import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr()],
    server: {
      port: VITE_PORT || 5173,
    },
  };
});
