import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/core.ts', 'src/nextjs.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: true,
    treeshake: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
  }
]);
