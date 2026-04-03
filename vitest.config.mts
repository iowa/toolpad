import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  root: '.',
  plugins: [],
  resolve: {
    alias: {
      // map '@' to the src directory so imports like '@/utils/Urls' resolve to ./src/utils/Urls
      '@': path.resolve(__dirname, 'src'),
    },
    tsconfigPaths: true,
  }
});
