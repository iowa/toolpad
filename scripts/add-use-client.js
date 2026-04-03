const fs = require('node:fs');
const path = require('node:path');

const directive = "'use client';\n";
const files = [
  path.join(__dirname, '..', 'dist', 'index.mjs'),
  path.join(__dirname, '..', 'dist', 'core.mjs'),
  path.join(__dirname, '..', 'dist', 'index.js'),
  path.join(__dirname, '..', 'dist', 'core.js'),
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  if (source.startsWith(directive)) {
    continue;
  }

  fs.writeFileSync(filePath, `${directive}${source}`, 'utf8');
}

