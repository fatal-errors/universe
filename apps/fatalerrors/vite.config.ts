import { defineConfig } from "vite";

export default defineConfig({
  build: {
    cssMinify: "lightningcss",
  },
  css: {
    transformer: "lightningcss",
  },
  server: {
    port: 3000,
  },
});
