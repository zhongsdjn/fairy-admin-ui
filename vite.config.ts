import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  server: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
