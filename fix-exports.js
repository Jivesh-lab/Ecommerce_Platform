const fs = require('fs');
['react-aria', 'react-stately'].forEach(pkg => {
  const pjPath = './node_modules/' + pkg + '/package.json';
  const pj = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
  if (pj.exports) {
    const str = JSON.stringify(pj.exports);
    pj.exports = JSON.parse(str.replace(/\.mjs/g, '.js'));
    fs.writeFileSync(pjPath, JSON.stringify(pj, null, 2));
    console.log(pkg + ': exports fixed (.mjs -> .js)');
  }
});
