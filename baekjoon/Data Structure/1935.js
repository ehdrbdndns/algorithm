function solution(_, formula, list) {
  // fomula to arr
  let arr = formula.split('');
  let stack = [];
  // while(formula.length)
  for (let i = 0; i < arr.length; i++) {
    // if A ~ Z, Push stack
    // else Pop 2 element from stack and cal
    let char = arr[i];
    let code = char.charCodeAt(0);
    if (code <= 90 && code >= 65) {
      stack.push(list[code - 65]);
    } else {
      let a = stack.pop();
      let b = stack.pop();
      switch (char) {
        case '+':
          stack.push(a + b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(b / a);
          break;
        case '-':
          stack.push(b - a);
          break;
      }
    }
  }

  console.log(stack[0].toFixed(2));
}

// const test = `5
// ABC*+DE/-
// 1
// 2
// 3
// 4
// 5`;

// const [n, formula, ...list] = test.split('\n');

const fs = require('fs');
const [n, formula, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

solution(
  n,
  formula,
  list.map((item) => Number(item))
);
