let result = [];
let hash = {};
function solution(n, list) {
  // 초기화
  result.push(0);
  hash[list[0]] = { value: -1, index: 1 };

  for (let i = 0; i < n - 1; i++) {
    const cur = list[i];
    const next = list[i + 1];
    recursive(cur, next, i + 2);
  }

  // console.log(hash);
  console.log(result.join(' '));
}

function recursive(cur, next, i) {
  // console.log(cur, next);
  if (cur < next) {
    // console.log(1);
    if (cur === -1) {
      result.push(0);
      hash[next] = { value: cur, index: i };
      return;
    }
    recursive(hash[cur].value, next, i);
  } else if (cur >= next) {
    // console.log(2);
    result.push(hash[cur].index);
    hash[next] = { value: cur, index: i };
    return;
  }
}

const fs = require('fs');
const [n, list] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const [n, list] = `10
// 6 1 8 5 9 2 4 3 7 10`.split('\n');

solution(
  Number(n),
  list.split(' ').map((item) => Number(item))
);
