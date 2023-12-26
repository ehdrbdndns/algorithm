function solution(n, m, list) {
  const set = new Set();
  let result = 0;
  for (let i = 0; i < n; i++) {
    set.add(list[i]);
  }

  for (let i = n; i < n + m; i++) {
    set.has(list[i]) && result++;
  }
  console.log(result);
}

const fs = require('fs');
const [option, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

// let test = `5 11
// baekjoononlinejudge
// startlink
// codeplus
// sundaycoding
// codingsh
// baekjoon
// codeplus
// codeminus
// startlink
// starlink
// sundaycoding
// codingsh
// codinghs
// sondaycoding
// startrink
// icerink`;

// const [option, ...list] = test.split('\n');

const [n, m] = option.split(' ');
solution(Number(n), Number(m), list);
