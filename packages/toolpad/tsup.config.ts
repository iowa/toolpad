import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['core.ts', 'node.ts', 'utils.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: false,
    treeshake: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.build.json',
    onSuccess: async () => {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const files = ['dist/core.mjs', 'dist/core.js'];
      for (const file of files) {
        const filePath = path.resolve(process.cwd(), file);
        try {
          const content = await fs.readFile(filePath, 'utf8');
          if (!content.startsWith('"use client";')) {
            await fs.writeFile(filePath, `"use client";\n${content}`);
            console.log(`Added "use client" to ${file}`);
          }
        } catch (e) {
          console.error(`Failed to process ${file}:`, e);
        }
      }
    },
  }
]);
