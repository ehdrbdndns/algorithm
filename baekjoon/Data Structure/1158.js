function solution(n, k) {
  let arr = [...new Array(n)].map((_, i) => i + 1);
  let index = 0;
  let result = [];
  while (arr.length) {
    index = (index + k - 1) % arr.length;
    result.push(arr[index]);
    arr.splice(index, 1);
  }
  console.log(`<${result.join(', ')}>`);
}

const fs = require('fs');
const [n, k] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

solution(Number(n), Number(k));
