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
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      // map '@' to the src directory so imports like '@/utils/Urls' resolve to ./src/utils/Urls
      '@': path.resolve(__dirname, 'src'),
    },
    tsconfigPaths: true,
  }
});
