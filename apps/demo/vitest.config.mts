import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  plugins: [react()],
  // Configure Vitest test options. Increase testTimeout for long-running tests.
  test: {
    environment: "jsdom",
    globals: true,
    // Set global test timeout (milliseconds). Adjust as needed; 30000 = 30s
    testTimeout: 30_000,
  },
  resolve: {
    alias: [
      {
        find: "server-only",
        replacement: path.resolve(
          import.meta.dirname,
          "src/shared/testing/server-only.ts"
        ),
      },
      // Match specific toolpad aliases first; otherwise the generic '@' alias captures them.
      {
        find: "@/toolpad/core",
        replacement: path.resolve(
          import.meta.dirname,
          "../../packages/toolpad/core"
        ),
      },
      {
        find: "@/toolpad/node",
        replacement: path.resolve(
          import.meta.dirname,
          "../../packages/toolpad/node"
        ),
      },
      {
        find: "@/toolpad/utils",
        replacement: path.resolve(
          import.meta.dirname,
          "../../packages/toolpad/utils"
        ),
      },
      // map '@' to src so imports like '@/utils/Urls' resolve to ./src/utils/Urls
      { find: "@", replacement: path.resolve(import.meta.dirname, "src") },
    ],
  },
});
