const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('', (answer) => {
  rl.on('line', solution).on('close', closeListener);
});

let map = new Map();
let result = [];
let count = 0;

// let test = `A
// AA
// AAA
// AAAA
// AAAAA
// AAAAAA
// `.split('\n');

// test.forEach((i) => solution(i));
// closeListener();

function solution(line) {
  if (line === '') return;
  if (map.has(line)) {
    map.set(line, map.get(line) + 1);
  } else {
    map.set(line, 1);
  }
  count++;
}

function closeListener() {
  map.forEach((value, key) => {
    result.push(key + ' ' + ((value / count) * 100).toFixed(4));
  });
  console.log(result.sort().join('\n'));
}
