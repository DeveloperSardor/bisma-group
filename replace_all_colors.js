const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') && f !== 'Footer.tsx');

const replacements = [
  { from: /#00ccff/g, to: '#2997ff' },
  { from: /rgba\(0, 204, 255/g, to: 'rgba(41, 151, 255' },
  { from: /#141442/g, to: '#1d1d1f' },
  { from: /rgba\(20, 20, 66/g, to: 'rgba(0, 0, 0' },
  { from: /var\(--font-serif\)/g, to: 'var(--font-inter)' },
  { from: /\.gold-italic\s*\{.*?\}/g, to: '.title-accent { color: #86868b; font-weight: 500; }' },
  { from: /className="gold-italic"/g, to: 'className="title-accent"' },
  { from: /\.gold-text-ru\s*\{.*?\}/g, to: '.title-accent { color: #86868b; font-weight: 500; }' },
  { from: /className="gold-text-ru"/g, to: 'className="title-accent"' }
];

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
}
