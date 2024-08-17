const fs = require('fs');

function combineTextIntoOneLine(text) {
  const result = text.split('\n').map(line => line.trim()).join(' ');
  fs.writeFileSync('result.txt', result);
  return text.split('\n').map(line => line.trim()).join(' ');
}

const originalText = ``;

const oneLineText = combineTextIntoOneLine(originalText);
console.log(oneLineText);