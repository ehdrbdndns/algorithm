function solution(list) {
  let result = 0;
  let stack = 0;
  for (let i = 0; i < list.length; i++) {
    let char = list[i];
    if (char === '(') {
      let next = list[i + 1];
      if (next === ')') {
        // 요것은 레이저이다
        result += stack;
      } else {
        // 요놈은 쇠막대기 생성이다아
        stack++;
      }
    } else {
      let prev = list[i - 1];
      if (prev === ')') {
        result += 1;
        stack--;
      }
    }
  }

  console.log(result);
}

// let test = `()(((()())(())()))(())`;
// let test = `(((()(()()))(())()))(()())`;

// let list = test.split('');

const fs = require('fs');
const list = fs.readFileSync('/dev/stdin').toString().trim().split('');

solution(list);
