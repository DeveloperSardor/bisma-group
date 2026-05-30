const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/components/About.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { from: /#00ccff/g, to: '#2997ff' },
  { from: /rgba\(0, 204, 255/g, to: 'rgba(41, 151, 255' },
  { from: /#141442/g, to: '#1d1d1f' },
  { from: /rgba\(20, 20, 66/g, to: 'rgba(0, 0, 0' },
  { from: /var\(--font-serif\)/g, to: 'var(--font-inter)' },
  { from: /\.gold-text-ru/g, to: '.title-accent' },
  { from: /className="gold-text-ru"/g, to: 'className="title-accent"' },
  { from: /font-style: italic;/g, to: 'font-weight: 500;' },
];

for (const { from, to } of replacements) {
  content = content.replace(from, to);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Colors replaced successfully in About.tsx');
