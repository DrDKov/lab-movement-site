const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const matches = [
  ...html.matchAll(/(?:src|href)=\"(assets\/[^"]+)\"/g),
  ...css.matchAll(/url\(\"(assets\/[^"]+)\"\)/g),
];

const missing = [];
for (const match of matches) {
  const filePath = path.join(root, match[1]);
  if (!fs.existsSync(filePath)) missing.push(match[1]);
}

if (missing.length) {
  console.error('Missing local assets:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`OK: ${matches.length} local asset references are valid.`);
