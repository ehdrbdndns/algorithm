function solution(list) {
  let stack = [];
  let result = 0;
  let isTrue = true;
  for (let i = 0; i < list.length; i++) {
    const char = list[i];
    if (char === '(' || char === '[') {
      if (i === list.length - 1) {
        isTrue = false;
        break;
      }
      stack.push(char);
    } else if (char === ')') {
      let num = 0;
      let item = stack.pop();
      while (stack.length !== 0 && typeof item === 'number') {
        num += item;
        item = stack.pop();
      }
      if (item === '(') {
        num !== 0 ? stack.push(2 * num) : stack.push(2);
      } else {
        isTrue = false;
        break;
      }
    } else if (char === ']') {
      let num = 0;
      let item = stack.pop();
      while (stack.length !== 0 && typeof item === 'number') {
        num += item;
        item = stack.pop();
      }
      if (item === '[') {
        num !== 0 ? stack.push(3 * num) : stack.push(3);
      } else {
        isTrue = false;
        break;
      }
    }
  }

  if (isTrue) {
    // stack에 문자가 있는지 체크
    for (let i = 0; i < stack.length; i++) {
      if (typeof stack[i] !== 'number') {
        result = 0;
        break;
      }
      result += stack[i];
    }
    console.log(result);
  } else {
    console.log(0);
  }
}

// let list = `(()[[]])([])([])()`.split('');
const fs = require('fs');
const list = fs.readFileSync('/dev/stdin').toString().trim().split('');

solution(list);
