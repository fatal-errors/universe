import { defineConfig } from "vite";

export default defineConfig({
  test: {
    // [NOTE] https://github.com/vitest-dev/vitest/issues/2008
    threads: false,
  },
});
