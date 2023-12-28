function solution(list) {
  const result = [];
  const stack = [];
  const operHash = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0,
    ')': 0,
  };

  const isLetter = /[A-Z]/;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (isLetter.test(item)) {
      result.push(item);
    } else {
      if (stack.length === 0) {
        stack.push(item);
      } else if (item === '(') {
        stack.push(item);
      } else if (item === ')') {
        while (stack[stack.length - 1] !== '(') {
          result.push(stack.pop());
        }
        stack.pop();
      } else if (operHash[item] > operHash[stack[stack.length - 1]]) {
        stack.push(item);
      } else if (operHash[item] <= operHash[stack[stack.length - 1]]) {
        while (operHash[item] <= operHash[stack[stack.length - 1]]) {
          result.push(stack.pop());
        }
        stack.push(item);
      }
    }
  }

  while (stack.length) {
    result.push(stack.pop());
  }

  console.log(result.join(''));
}

const fs = require('fs');
const list = fs.readFileSync('/dev/stdin').toString().trim().split('');

// const list = 'A+B*C-D/E'.split('');

solution(list);
