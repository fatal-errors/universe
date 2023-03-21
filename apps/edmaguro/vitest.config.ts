import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // [NOTE] https://github.com/vitest-dev/vitest/issues/2008
    threads: false,
  },
});
