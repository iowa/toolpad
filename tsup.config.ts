import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/core.ts', 'src/utils.ts', 'src/nextjs.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
  }
]);

