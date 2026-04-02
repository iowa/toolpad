import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/core.ts', 'src/utils.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
  },
  {
    entry: ['src/nextjs.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: false,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
    // Keep the Next.js subpath explicitly marked as a client entrypoint.
    banner: {
      js: "'use client';",
    },
  },
]);

