import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const src = path.resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: src,
      ctx: src + "/contexts",
      common: src + "/common",
      features: src + "/features",
      api: src + "/api",
      config: src + "/config",
      utils: src + "/utils",
    },
  },
});
