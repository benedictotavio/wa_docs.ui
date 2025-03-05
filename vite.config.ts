import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_PROXY,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.js",
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
  };
});
