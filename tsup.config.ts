import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/core.ts', 'src/swizz.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: false,
    treeshake: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
  }
]);
