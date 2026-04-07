const fs = require('fs');
const path = require('path');

// Patterns that indicate code originating from src/app or referencing the app folder.
const patterns = [
  /@\/app/,
  /src[\\/]+app/,
  /[\\/]app[\\/]/,
];

function isTextFile(filePath) {
  // quick heuristic: check extension
  const textExt = ['.js', '.mjs', '.cjs', '.d.ts', '.ts', '.tsx', '.map', '.json', '.css', '.html'];
  return textExt.includes(path.extname(filePath).toLowerCase());
}

async function findFiles(dir) {
  const results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      results.push(...(await findFiles(full)));
    } else {
      results.push(full);
    }
  }
  return results;
}

(async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  try {
    await fs.promises.access(distDir);
  } catch (err) {
    console.log('verify-no-app-exports: dist directory not found, skipping verification.');
    process.exit(0);
  }

  const files = await findFiles(distDir);
  const offenders = [];

  for (const f of files) {
    if (!isTextFile(f)) continue;
    let content;
    try {
      content = await fs.promises.readFile(f, 'utf8');
    } catch (err) {
      // ignore unreadable files
      continue;
    }
    for (const p of patterns) {
      if (p.test(content)) {
        offenders.push({ file: f, pattern: p.toString() });
        break;
      }
    }
  }

  if (offenders.length > 0) {
    console.error('\nERROR: Found references to `src/app` (or app paths) in build output.');
    console.error('This likely means some code from `src/app` was included in `dist` and may be published.');
    console.error('Offending files:');
    for (const o of offenders) {
      console.error(` - ${o.file} (matched ${o.pattern})`);
    }
    console.error('\nPlease ensure that `src/app` is not imported by your public entry files (src/index.ts, src/core.ts, src/swizz.ts),');
    console.error('or adjust the build config to exclude it.');
    process.exit(1);
  }

  console.log('verify-no-app-exports: OK — no app references found in dist');
  process.exit(0);
})();

