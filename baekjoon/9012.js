/**
 *
 * @param {string} n
 * @param {string[]} list
 */
function solution(n, list) {
  let resultList = [];
  for (let i = 0; i < n; i++) {
    let stack = 0;
    let isVPS = 'YES';
    for (let j = 0; j < list[i].length; j++) {
      let item = list[i][j];
      if (item === '(') {
        stack++;
      } else {
        stack--;
        if (stack < 0) {
          isVPS = 'NO';
          break;
        }
      }
    }

    if (stack !== 0) isVPS = 'NO';
    resultList.push(isVPS);
  }
  console.log(resultList.join('\n'));
}

// let testData = `6
// (())())
// (((()())()
// (()())((()))
// ((()()(()))(((())))()
// ()()()()(()()())()
// (()((())()(`;

const fs = require('fs');
const [n, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

// let [n, ...list] = testData.split('\n');
solution(
  n,
  list.map((item) => item.split(''))
);
