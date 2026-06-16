const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match `fontSize: 'Xpx'` or `fontSize: "Xpx"`
  let updated = content.replace(/fontSize:\s*['"](\d+)px['"]/g, (match, p1) => {
    const newSize = parseInt(p1, 10) + 3; // Bump everything by 3px to be visibly larger
    return `fontSize: '${newSize}px'`;
  });
  if (content !== updated) {
    fs.writeFileSync(file, updated);
  }
});
console.log('Fonts bumped safely by 3px!');
