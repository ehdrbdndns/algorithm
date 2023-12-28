function solution(list) {
  const results = [];
  const realResult = new Set();
  const stack = [];

  if (list.length === 0) return;

  for (let i = 0; i < list.length; i++) {
    if (list[i] === '(') {
      stack.push(i);
    } else if (list[i] === ')') {
      let firstIndex = stack.pop();

      let temp = [...list];
      temp[firstIndex] = '';
      temp[i] = '';

      let temp2List = [];
      results.forEach((value) => {
        let temp2 = [...value];
        temp2[firstIndex] = '';
        temp2[i] = '';
        temp2List.push(temp2);
        realResult.add(temp2.join(''));
      });

      results.push(temp);
      results.push(...temp2List);
      realResult.add(temp.join(''));
    }
  }

  console.log([...realResult].sort().join('\n'));
}

const fs = require('fs');
const list = fs.readFileSync('/dev/stdin').toString().trim();

// const list = '(1+2) + (1-2)';
solution(list.split(''));
