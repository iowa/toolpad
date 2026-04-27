import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.',
  plugins: [react()],
  // Configure Vitest test options. Increase testTimeout for long-running tests.
  test: {
    environment: 'jsdom',
    globals: true,
    // Set global test timeout (milliseconds). Adjust as needed; 30000 = 30s
    testTimeout: 30000
  },
  resolve: {
    alias: [
      // Match specific toolpad aliases first; otherwise the generic '@' alias captures them.
      { find: '@/toolpad/core', replacement: path.resolve(__dirname, '../../packages/toolpad/core') },
      { find: '@/toolpad/node', replacement: path.resolve(__dirname, '../../packages/toolpad/node') },
      { find: '@/toolpad/utils', replacement: path.resolve(__dirname, '../../packages/toolpad/utils') },
      // map '@' to src so imports like '@/utils/Urls' resolve to ./src/utils/Urls
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  }
});
